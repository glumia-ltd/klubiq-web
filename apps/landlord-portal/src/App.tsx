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
import { api } from './api';
import { authEndpoints } from './helpers/endpoints';
import { UserProfile } from './shared/auth-types';

function App() {
	const { user } = useSelector(getAuthState);
	const { message, severity, isOpen } = useSelector(
		(state: RootState) => state.snack,
	);

	const dispatch = useDispatch();
	useEffect(() => {
		const listen = onAuthStateChanged(auth, async (currentUser: any) => {
			if (currentUser) {
				if (!user.fbId) {
					const {
						data: { data },
					} = await api.get(authEndpoints.getUserByFbid());
					if (!data) throw new Error('User not found');
					const payload = {
						token: currentUser.accessToken,
						user: data as UserProfile,
					};
					dispatch(saveUser(payload));
				}
				// const userToken = currentUser.accessToken;
				// const profile = await getProfile(userToken

				// if (profile.data) {
				// 	const payload = {
				// 		token: userToken,
				// 		user: profile.data,
				// 	};
				// 	dispatch(saveUser(payload));
				// } else {
				// 	throw new Error('User not found');
				// }
				//const userInfo = { email: currentUser.email };
				//dispatch(saveUser({ user: userInfo, token: currentUser.accessToken }));
			} else {
				console.log('no user found yet');
				const payload = {
					token: null,
					user: {} as UserProfile,
				};
				dispatch(saveUser(payload));
				auth.signOut();
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
				autoHideDuration={5000}
				key={message}
				message={message}
				severity={severity}
				open={isOpen}
			/>
		</ThemeContextProvider>
	);
}

export default App;
