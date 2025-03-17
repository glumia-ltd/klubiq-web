import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { multiFactor, MultiFactorUser, onAuthStateChanged, User } from 'firebase/auth';
import { getAuthState, removeUser, saveUser } from '../store/AuthStore/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { get, isEmpty } from 'lodash';
import {
	useUpdateUserPreferencesMutation,
	useUpdateNotificationSubscriptionMutation,
	useLazyGetOrgSettingsQuery,
	useLazyGetOrgSubscriptionQuery,
	useLazyGetUserByFbidQuery,
} from '../store/AuthStore/authApiSlice';
import { subscribeUserToPush } from '../services/pushNotification';
import { consoleLog } from '../helpers/debug-logger';
import { addData, getData } from '../services/indexedDb';
import { UserProfile } from '../shared/auth-types';
import { DialogProps } from '../components/Dialogs/AlertDialog';

const useAuth = () => {
	const configStoreName = 'client-config';
	const { user, orgSettings, orgSubscription, isSignedIn } = useSelector(getAuthState);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [alertDialogs, setAlertDialogs] = useState<DialogProps[]>([]);
	const [showMFAPrompt, setShowMFAPrompt] = useState(false);
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();
	const [triggerGetOrgSettingsQuery] = useLazyGetOrgSettingsQuery();
	const [triggerGetOrgSubscriptionQuery] = useLazyGetOrgSubscriptionQuery();
	const [updateUserPreferences] = useUpdateUserPreferencesMutation();
	const [updateNotificationSubscription] =
		useUpdateNotificationSubscriptionMutation();
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
	const handleAuthStateChange = async (currentUser:User, userProfile: UserProfile, userMfa?: MultiFactorUser) => {
		let orgSettingsData = null;
		let orgSubscriptionData = null;
		const securityPreferences: { twoFactor?: { optOut?: boolean } } = get(userProfile, 'preferences.security', {});
		if ( isEmpty(orgSettings) && userProfile.organizationUuid) {
			orgSettingsData = await triggerGetOrgSettingsQuery(
				{ orgId: userProfile?.organizationUuid },
			).unwrap();
			await updateConfigStoreIdb(orgSettingsData, 'org-settings');
		} else if(userProfile.organizationUuid) {
			await updateConfigStoreIdb(orgSettings, 'org-settings');
		}
		if (isEmpty(orgSubscription) && userProfile.organizationUuid) {
			orgSubscriptionData = await triggerGetOrgSubscriptionQuery(
				{ orgId: userProfile.organizationUuid },
			).unwrap();
			await updateConfigStoreIdb(orgSubscriptionData, 'org-subscription');
			
		} else if(userProfile.organizationUuid)  {
			await updateConfigStoreIdb(orgSubscription, 'org-subscription');
		}
		const payload = {
			token: await currentUser.getIdToken(),
			user: userProfile,
			isSignedIn: true,
			orgSettings: isEmpty(orgSettings) ? orgSettingsData : orgSettings,
			orgSubscription: isEmpty(orgSubscription) ? orgSubscriptionData : orgSubscription,
		};
		dispatch(saveUser(payload));
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

	}
	// const handleSignOut = async () => {
	// 	dispatch(removeUser());
	// 	sessionStorage.clear();
	// 	auth.signOut();
	// };

	useEffect(() => {
		const invTime = Date.now();
		consoleLog('useAuth mounted at', invTime);
    	consoleLog('auth:', auth);
    	consoleLog('user:', user);

		const listen = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser && !isEmpty(user)) {
				consoleLog('User is signed in');
				const userMfa = multiFactor(currentUser);
				await handleAuthStateChange(currentUser, user as UserProfile, userMfa);
			} else if (currentUser && isEmpty(user)) {
				consoleLog('User is signed in but not in store');
				const userMfa = multiFactor(currentUser);
				const userProfileData = await triggerGetUserByFbid().unwrap();
				await handleAuthStateChange(currentUser, userProfileData, userMfa);
			}
		});
		if(!isSignedIn) {
			return () => listen();
		}
	}, []);
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
	};
};
export default useAuth;
