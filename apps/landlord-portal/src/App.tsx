import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterPaths';
import ControlledSnackbar from './components/ControlledComponents/ControlledSnackbar';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import { saveUser } from './store/AuthStore/AuthSlice';

function App() {
	const { message, severity, isOpen } = useSelector(
		(state: RootState) => state.snack,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user: any) => {
			if (user) {
				// console.log('auth state has changed', user.accessToken);
				// console.log('user email verified', user.emailVerified);
				const userInfo = { email: user.email };
				dispatch(saveUser({ user: userInfo, token: user.accessToken }));
			} else {
				console.log('no user found yet');
			}
		});

		return () => listen();
	}, []);

	return (
		<ThemeContextProvider>
			<RouterProvider router={router} />
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
