import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { multiFactor, onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
	const navigate = useNavigate();
	const [showMFAPrompt, setShowMFAPrompt] = useState(false);
	const LOGIN_THRESHOLD = 3000;
	const update2FAPrompt = (promptAgain: boolean) => {
		localStorage.setItem('2fa-prompt', promptAgain ? 'true' : 'false');
	};
	const goToMFASetup = () => {
		setShowMFAPrompt(false);
		navigate(`/2fa-enroll`, { replace: true });
	};
	useEffect(() => {
		const listen = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				const lastLoginTime = currentUser?.metadata?.lastSignInTime;
				const lastLogin = lastLoginTime ? new Date(lastLoginTime).getTime() : 0;
				const currentLogin = new Date().getTime();
				const userMfa = multiFactor(currentUser);
				const promptAgain = localStorage.getItem('2fa-prompt') === 'true';
				if (
					userMfa.enrolledFactors.length === 0 &&
					currentLogin - lastLogin < LOGIN_THRESHOLD
				) {
					console.log('2fa prompt', promptAgain);
					setShowMFAPrompt(true);
				} else {
					setShowMFAPrompt(false);
				}
			}
		});

		return () => listen();
	}, []);
	return { showMFAPrompt, goToMFASetup, setShowMFAPrompt };
};
export default useAuth;
