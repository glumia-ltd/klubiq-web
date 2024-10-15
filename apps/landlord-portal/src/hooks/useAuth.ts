import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { multiFactor, onAuthStateChanged } from 'firebase/auth';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { consoleLog } from '../helpers/debug-logger';
import { useUpdateUserPreferencesMutation } from '../store/AuthStore/authApiSlice';

const useAuth = () => {
	const { user } = useSelector(getAuthState);
	const navigate = useNavigate();
	const [showMFAPrompt, setShowMFAPrompt] = useState(false);
	const [updateUserPreferences] = useUpdateUserPreferencesMutation();
	const LOGIN_THRESHOLD = 3000;
	// const update2FAPrompt = (promptAgain: boolean) => {
	// 	localStorage.setItem('2fa-prompt', promptAgain ? 'true' : 'false');
	// };
	const goToMFASetup = () => {
		setShowMFAPrompt(false);
		navigate(`/2fa-enroll?continueUrl=${window.location.pathname}`, {
			replace: true,
		});
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
			consoleLog('User opted out of 2fa', preferences);
			await updateUserPreferences(preferences).unwrap();
			setShowMFAPrompt(false);
		} catch (error) {
			console.error('Error opting out of 2fa', error);
		}
	};
	useEffect(() => {
		const listen = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser && user) {
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
						return;
					}
					setShowMFAPrompt(true);
				} else {
					setShowMFAPrompt(false);
					return;
				}
			}
		});

		return () => listen();
	});
	return { showMFAPrompt, goToMFASetup, setShowMFAPrompt, optOutOf2fa };
};
export default useAuth;
