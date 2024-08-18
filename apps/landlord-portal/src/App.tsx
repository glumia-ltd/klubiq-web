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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';

function App() {
	const { message, severity, isOpen } = useSelector(
		(state: RootState) => state.snack,
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const listen = onAuthStateChanged(auth, (user: any) => {
			if (user) {
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
