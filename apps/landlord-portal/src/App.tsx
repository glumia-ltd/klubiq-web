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
import { useMediaQuery, useTheme } from '@mui/material';

function App() {
	const { message, severity, isOpen, duration } = useSelector(
		(state: RootState) => state.snack,
	);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<ThemeContextProvider>
				<AuthProvider>
					<BreadcrumbProvider>
						<AnimatePresence mode='wait'>
							<PageTransition key={window.location.pathname}>
								<RouterProvider router={router} />
								<ControlledSnackbar
									anchorOrigin={{
										vertical: isMobile ? 'bottom' : 'top',
										horizontal: isMobile ? 'center' : 'right',
									}}
									autoHideDuration={duration || 2000}
									key={message}
									message={message}
									severity={severity}
									open={isOpen}
								/>
							</PageTransition>
						</AnimatePresence>
					</BreadcrumbProvider>
				</AuthProvider>
			</ThemeContextProvider>
		</LocalizationProvider>
	);
}

export default App;
