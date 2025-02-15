/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterPaths';
import ControlledSnackbar from './components/ControlledComponents/ControlledSnackbar';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import { saveUser, getAuthState } from './store/AuthStore/AuthSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { UserProfile } from './shared/auth-types';
import { useLazyGetUserByFbidQuery } from './store/AuthStore/authApiSlice';
import { addData, getData, initDB } from './services/indexedDb';
import { consoleLog } from './helpers/debug-logger';
function App() {
	const { user } = useSelector(getAuthState);
	const { message, severity, isOpen, duration } = useSelector(
		(state: RootState) => state.snack,
	);
	const [triggerGetUserByFbid] = useLazyGetUserByFbidQuery();
	const dispatch = useDispatch();
	const configStoreName = 'client-config';
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			window.addEventListener('load', () => {
				navigator.serviceWorker
					.register('/service-worker.js')
					.then(() => {
						initDB();
					})
					.catch((error) => {
						consoleLog('ServiceWorker registration failed: ', error);
					});
			});
		}
		const updateConfigStoreIdb = async (data: any) => {
			const orgConfig = await getData('org-settings', configStoreName);
			if (!orgConfig) {
				consoleLog('ORG Config not found: ');
				await addData({ key: 'org-settings', value: data }, 'client-config');
			}
			localStorage.setItem('org-settings', JSON.stringify(data));
		};

		const listen = onAuthStateChanged(auth, async (currentUser) => {
			consoleLog('currentUser called in app');
			if (currentUser) {
				const token = await currentUser.getIdToken();
				if (!user.fbId) {
					const response = await triggerGetUserByFbid();
					if (!response.data) throw new Error('User not found');
					const payload = {
						token: token,
						user: response?.data as UserProfile,
						isSignedIn: true,
					};
					dispatch(saveUser(payload));
					await updateConfigStoreIdb(response?.data?.orgSettings);
				} else {
					await updateConfigStoreIdb(user.orgSettings);
				}
			} else {
				const payload = {
					token: null,
					user: {} as UserProfile,
					isSignedIn: false,
				};
				dispatch(saveUser(payload));
				auth.signOut();
				sessionStorage.clear();
			}
		});
		return () => listen();
	}, []);

	return (
		<ThemeContextProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<RouterProvider router={router} />
			</LocalizationProvider>
			<ControlledSnackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				autoHideDuration={duration || 2000}
				key={message}
				message={message}
				severity={severity}
				open={isOpen}
			/>
		</ThemeContextProvider>
	);
}

export default App;
