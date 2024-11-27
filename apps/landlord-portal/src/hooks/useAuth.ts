import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { multiFactor, onAuthStateChanged } from 'firebase/auth';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import {
	useUpdateUserPreferencesMutation,
	useUpdateNotificationSubscriptionMutation,
} from '../store/AuthStore/authApiSlice';
import { Button } from '@mui/material';
import React from 'react';
import { Stack } from '@mui/system';
import { subscribeUserToPush } from '../services/pushNotification';
import { consoleLog } from '../helpers/debug-logger';

type Banner = {
	id: string;
	message: string;
	type: 'info' | 'error' | 'success';
	actions?: JSX.Element;
	close: () => void;
};
const useAuth = () => {
	const { user } = useSelector(getAuthState);
	const navigate = useNavigate();
	const [banners, setBanners] = useState<Banner[]>([]);
	const [showMFAPrompt, setShowMFAPrompt] = useState(false);
	const [updateUserPreferences] = useUpdateUserPreferencesMutation();
	const [updateNotificationSubscription] =
		useUpdateNotificationSubscriptionMutation();
	const LOGIN_THRESHOLD = 3000;
	const silentNotificationPermissionRequest = localStorage.getItem(
		'kbq-silent-browser-notification',
	);
	const goToMFASetup = () => {
		setShowMFAPrompt(false);
		navigate(`/2fa-enroll?continueUrl=${window.location.pathname}`, {
			replace: true,
		});
	};
	const handleCloseBanner = (id: string | number) => {
		consoleLog('closing banner', id);
		setBanners((prevBanners) =>
			prevBanners.filter((banner) => banner.id !== id),
		);
		localStorage.setItem('kbq-silent-browser-notification', 'true');
	};
	const addBanner = useCallback(
		(banner: Banner) => {
			const existingBanner = banners.find((b) => b.id === banner.id);
			if (existingBanner) {
				return;
			}
			setBanners((prevBanners) => [...prevBanners, banner]);
		},
		[banners],
	);
	const optOutOf2fa = async () => {
		try {
			const preferences = user?.preferences
				? {
						...user.preferences,
						security: {
							...user.preferences.security,
							twoFactor: { optOut: true },
						},
					}
				: { security: { twoFactor: { optOut: true } } };
			await updateUserPreferences(preferences).unwrap();
			setShowMFAPrompt(false);
		} catch (error) {
			console.error('Error opting out of 2fa', error);
		}
	};
	useEffect(() => {
		const listen = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser && !isEmpty(user)) {
				const lastLoginTime = currentUser?.metadata?.lastSignInTime;
				const lastLogin = lastLoginTime ? new Date(lastLoginTime).getTime() : 0;
				const currentLogin = new Date().getTime();
				const userMfa = multiFactor(currentUser);
				const securityPreferences = get(user, 'preferences.security', '');
				if (
					userMfa.enrolledFactors.length === 0 &&
					currentLogin - lastLogin < LOGIN_THRESHOLD
				) {
					if (
						securityPreferences &&
						securityPreferences.twoFactor?.optOut === true
					) {
						setShowMFAPrompt(false);
					}
					setShowMFAPrompt(true);
				} else {
					setShowMFAPrompt(false);
				}
				// Check if user has notification subscription
				if (
					user.notificationSubscription == null &&
					Notification.permission !== 'granted' &&
					silentNotificationPermissionRequest !== 'true'
				) {
					consoleLog('No notification subscription found');
					addBanner({
						id: 'notification-subscription',
						message: 'Enable web notifications to receive important updates',
						type: 'info',
						close: () => {
							handleCloseBanner('notification-subscription');
						},
						actions: React.createElement(
							Stack,
							{ spacing: 1, direction: 'row' },
							[
								React.createElement(
									Button,
									{
										key: 'ok',
										onClick: () => {
											updateWebNotificationStatus(
												true,
												'notification-subscription',
											);
										},
										variant: 'contained',
										color: 'primary',
									},
									'Enable',
								),
								React.createElement(
									Button,
									{
										key: 'cancel',
										onClick: () => {
											updateWebNotificationStatus(
												false,
												'notification-subscription',
											);
										},
										variant: 'text',
										color: 'secondary',
									},
									'Dismiss',
								),
							],
						),
					});
				}

				return () => listen();
			}
		});
	}, [user, addBanner]);
	const requestNotificationPermission = async () => {
		try {
			if ('Notification' in window) {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					const subscription = await subscribeUserToPush();
					const subscriptionPayload = {
						organizationUuid: user.organizationUuid,
						subscription: { 'web-push': subscription },
					};
					await updateNotificationSubscription(subscriptionPayload).unwrap();
				} else {
					consoleLog('Notification permission denied.');
				}
			}
		} catch (error) {
			console.error('Error requesting notification permission', error);
		}
	};
	const updateWebNotificationStatus = async (
		status: boolean,
		bannerId: string,
	) => {
		try {
			consoleLog('Updating notification status', status);
			handleCloseBanner(bannerId);
			if (status) {
				await requestNotificationPermission();
			}
			const preferences = user?.preferences
				? {
						...user.preferences,
						notification: {
							...user.preferences.notification,
							browser: { enabled: status },
						},
					}
				: { notification: { browser: { enabled: status } } };
			await updateUserPreferences(preferences).unwrap();
		} catch (error) {
			console.error('Error updating notification status', error);
		}
	};
	return {
		showMFAPrompt,
		goToMFASetup,
		setShowMFAPrompt,
		optOutOf2fa,
		banners,
		handleCloseBanner,
	};
};
export default useAuth;
