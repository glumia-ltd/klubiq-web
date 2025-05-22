/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterPaths';
import ControlledSnackbar from './components/ControlledComponents/ControlledSnackbar';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { initDB } from './services/indexedDb';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';
import { BreadcrumbProvider } from './context/BreadcrumbContext/BreadcrumbContext';
import { AuthProvider } from './context/AuthContext/AuthProvider';
function App() {
	const { message, severity, isOpen, duration } = useSelector(
		(state: RootState) => state.snack,
	);
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			const executeOnLoad = () => {
				initDB();
			};
			if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', executeOnLoad);
			} else {
				executeOnLoad();
			}
		}
	}, []);

	return (
		<ThemeContextProvider>
			<AuthProvider>
				<BreadcrumbProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<AnimatePresence mode='wait'>
							<PageTransition key={location.pathname}>
								<RouterProvider router={router} />

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
							</PageTransition>
						</AnimatePresence>
					</LocalizationProvider>
				</BreadcrumbProvider>
			</AuthProvider>
		</ThemeContextProvider>
	);
}

export default App;
