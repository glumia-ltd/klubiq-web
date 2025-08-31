import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { KlubiqSnackbar } from '@klubiq/ui-components';
import { router } from './router/RouterPaths';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { closeSnackbar } from './store/GlobalStore/snackbar.slice';

const App = () => {
	const dispatch = useDispatch();
	const { message, severity, isOpen, duration } = useSelector(
		(state: RootState) => state.snack,
	);

	return (
		<ThemeContextProvider>
			<AuthProvider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<RouterProvider router={router} />
					<KlubiqSnackbar
						autoHideDuration={duration || 2000}
						message={message}
						severity={severity}
						open={isOpen}
						handleClose={() => dispatch(closeSnackbar())}
					/>
				</LocalizationProvider>
			</AuthProvider>
		</ThemeContextProvider>
	);
};

export default App;
