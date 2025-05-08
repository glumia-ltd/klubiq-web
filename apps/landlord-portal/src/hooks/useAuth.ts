import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthState, removeUser, saveUser } from '../store/AuthStore/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import {
	useUpdateUserPreferencesMutation,
	useUpdateNotificationSubscriptionMutation,
	useLazyGetUserByFbidQuery,
	useSignOutMutation,
} from '../store/AuthStore/authApiSlice';
import { subscribeUserToPush } from '../services/pushNotification';
import { consoleDebug, consoleError, consoleLog } from '../helpers/debug-logger';
import { addData, getData } from '../services/indexedDb';
import { UserProfile } from '../shared/auth-types';
import { DialogProps } from '../components/Dialogs/AlertDialog';
import { resetStore } from '../store';
import { MultiFactorUser } from 'firebase/auth';

const useAuth = () => {
	consoleDebug('useAuth hook initialized');
	const configStoreName = 'client-config';
	const { user, isSignedIn } = useSelector(getAuthState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [alertDialogs, setAlertDialogs] = useState<DialogProps[]>([]);
	const [showMFAPrompt, setShowMFAPrompt] = useState(false);
	const [triggerGetUserByFbid, { data: userData }] = useLazyGetUserByFbidQuery();
	const [updateUserPreferences] = useUpdateUserPreferencesMutation();
	const [updateNotificationSubscription] =
		useUpdateNotificationSubscriptionMutation();
	const [signOut] = useSignOutMutation();
	const silentNotificationPermissionRequest = localStorage.getItem(
		'kbq-silent-browser-notification',
	);
	const silentMfaRequest = localStorage.getItem('kbq-silent-mfa-prompt');
	const goToMFASetup = () => {
		setShowMFAPrompt(false);
		navigate(`/2fa-enroll?continueUrl=${window.location.pathname}`, {
			replace: true,
		});
	};
	const handleCloseAlertDialog = (id: string | number) => {
		consoleLog('closing alert', id);
		setAlertDialogs((prev) =>
			prev.filter((alert) => alert.id !== id),
		);
		localStorage.setItem('kbq-silent-browser-notification', 'true');
	};
	const addAlertDialog = useCallback(
		(alert: DialogProps) => {
			const existingAlert = alertDialogs.find((b) => b.id === alert.id);
			if (existingAlert) {
				return;
			}
			setAlertDialogs((prev) => [...prev, alert]);
		},
		[alertDialogs],
	);
	const handleCloseMFAPrompt = () => {
		setShowMFAPrompt(false);
		localStorage.setItem('kbq-silent-mfa-prompt', 'true');
	};
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
	const updateConfigStoreIdb = async (data: object, objectName: string) => {
		const orgConfig = await getData(objectName, configStoreName);
		if (!orgConfig) {
			consoleLog('ORG Config not found: ');
			await addData({ key: objectName, value: data }, configStoreName);
		}
		sessionStorage.setItem(objectName, JSON.stringify(data));
	};
	const handleAuthStateChange = async (userProfile: UserProfile, userMfa?: MultiFactorUser | null) => {
		consoleLog('handleAuthStateChange called with:', { 
			hasUserProfile: !isEmpty(userProfile),
			currentPath: window.location.pathname
		  });
		if(isEmpty(userProfile)) {
			consoleLog('Empty user profile, signing out');
			dispatch(removeUser());
			handleSignOutUser();
			return;
		}
		consoleLog('Dispatching saveUser action');
		dispatch(saveUser({ user: userProfile, isSignedIn: true }));
		const securityPreferences: { twoFactor?: { optOut?: boolean } } = get(userProfile, 'preferences.security', {});
		await updateConfigStoreIdb(userProfile?.orgSettings || {}, 'org-settings');
		await updateConfigStoreIdb(userProfile?.orgSubscription || {}, 'org-subscription');
		if (
			userMfa?.enrolledFactors.length === 0 &&
			silentMfaRequest !== 'true'
		) {
			if (
				securityPreferences &&
				securityPreferences?.twoFactor?.optOut === true
			) {
				setShowMFAPrompt(false);
			}
			setShowMFAPrompt(true);
		}
		if (
			userProfile.notificationSubscription == null &&
			Notification.permission !== 'granted' &&
			silentNotificationPermissionRequest !== 'true'
		) {
			consoleLog('No notification subscription found');
			addAlertDialog({
				id: 'notification-subscription',
				message: 'Enable web notifications to receive important updates',
				title: 'Turn On Web Notifications',
				onClose: () => {
					handleCloseAlertDialog('notification-subscription');
				},
				onConfirmClick: () => {
					updateWebNotificationStatus(
						true,
						'notification-subscription',
						userProfile?.organizationUuid,
					);
				},
				onCancelClick: () => {
					updateWebNotificationStatus(
						false,
						'notification-subscription',
						userProfile?.organizationUuid,
					);
				},
				open: true,
				confirmButtonText: 'Enable',
				cancelButtonText: 'Skip',
			});
		}
		 // Add navigation after successful auth
		//  if (window.location.pathname === '/login') {
		// 	consoleLog('On login page, navigating to dashboard');
		// 	navigate('/dashboard', { replace: true });
		//   }

	}
	const handleSignOutUser = async () => {
		try {
			await signOut({}).unwrap();
			resetStore();
		} catch (error) {
			consoleError('Error during sign out:', error);
		}
	};
	useEffect(() => {

		const checkAuthState = async () => {
			try{
				if (!isEmpty(user) && isSignedIn) {
					consoleLog('User is signed in');
					//const userMfa = multiFactor(currentUser);
					await handleAuthStateChange(user as UserProfile);
				} else if(userData) {
					 // If we have userData from the query, use it
					 consoleLog('Using userData from query', userData);
					 await handleAuthStateChange(userData);
					 dispatch(saveUser({ user: userData, isSignedIn: true }));
					//const userMfa = multiFactor(currentUser);
				} else{
					consoleLog('Fetching user data because user is not signed in and not in store');
					const { data: userProfileData } = await triggerGetUserByFbid();
					if (userProfileData) {
					  await handleAuthStateChange(userProfileData);
					  dispatch(saveUser({ user: userProfileData, isSignedIn: true }));
					}
				}

			} catch(error){
				console.error('Error checking auth state', error);
				dispatch(removeUser());
				handleSignOutUser();
			}
		};
		checkAuthState();
	}, [user, isSignedIn, userData]);
	const requestNotificationPermission = async (orgUuid?: string) => {
		try {
			if ('Notification' in window) {
				const permission = await Notification.requestPermission();
				if (permission === 'granted') {
					consoleLog('Requesting notification permission = granted');
					const subscription = await subscribeUserToPush();
					consoleLog('Subscription:', subscription);
					const subscriptionPayload = {
						subscription: { 'web-push': subscription },
					} as { subscription: { 'web-push': PushSubscription | undefined }, organizationUuid?: string };
					if(orgUuid) {
						subscriptionPayload.organizationUuid = orgUuid;
					}
					consoleLog('Subscription payload:', subscriptionPayload);
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
		orgUuid?: string,
	) => {
		try {
			consoleLog('Updating notification status', status);
			handleCloseAlertDialog(bannerId);
			if (status) {
				await requestNotificationPermission(orgUuid);
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
		alertDialogs,
		handleCloseAlertDialog,
		handleCloseMFAPrompt,
		isSignedIn,
		handleSignOutUser,
	};
};
export default useAuth;
