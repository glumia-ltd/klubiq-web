/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TimerIcon from '@mui/icons-material/Timer';
import { Typography } from '@mui/material';

const SessionTimeoutContext = createContext({
	isTimedOut: false,
	stayLoggedIn: () => {},
});

interface SessionTimeoutProviderProps {
	children: ReactNode;
}

export const SessionTimeoutProvider = ({
	children,
}: SessionTimeoutProviderProps) => {
	const [isTimedOut, setIsTimedOut] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60); // 60 seconds warning before logout
	let timeout: ReturnType<typeof setTimeout>;
	let warningTimeout: ReturnType<typeof setTimeout>;
	let countdownInterval: ReturnType<typeof setInterval>;

	// Function to reset the inactivity timers
	const resetTimer = useCallback(() => {
		clearTimeout(timeout); // Clear auto-logout timeout
		clearTimeout(warningTimeout); // Clear warning timeout
		clearInterval(countdownInterval); // Clear the countdown

		setShowModal(false); // Hide modal if user confirms to stay logged in
		setTimeLeft(60); // Reset countdown

		// Start warning timer (e.g., after 4.5 minutes of inactivity)
		warningTimeout = setTimeout(
			() => {
				setShowModal(true); // Show the inactivity warning modal
				startCountdown(); // Start the countdown timer
			},
			55 * 60 * 1000,
		); // Show warning after 4.5 minutes of inactivity

		// Start auto-logout timer (e.g., after 5 minutes of inactivity)
		timeout = setTimeout(
			() => {
				setIsTimedOut(true);
				//window.location.href = '/login'; // Redirect to login
			},
			60 * 60 * 1000,
		); // Auto-logout after 5 minutes
	}, []);

	// Function to start the countdown timer
	const startCountdown = useCallback(() => {
		let countdown = 60; // 60 seconds countdown
		countdownInterval = setInterval(() => {
			setTimeLeft(--countdown);
			if (countdown <= 0) {
				clearInterval(countdownInterval);
				window.location.href = '/login'; // Auto logout after countdown ends
			}
		}, 1000); // Decrease countdown every second
	}, []);

	// Function to handle "Stay Logged In" button click
	const stayLoggedIn = useCallback(() => {
		setShowModal(false); // Hide the modal when the user confirms to stay logged in
		setTimeLeft(60); // Reset countdown timer
		resetTimer(); // Reset both warning and logout timers
	}, [resetTimer]);

	// Effect to set up the event listeners for user activity and inactivity tracking
	useEffect(() => {
		if (!window.location.href.includes('login')) {
			const activityEvents = ['mousemove', 'keypress', 'click', 'scroll'];

			// Attach event listeners for activity detection
			activityEvents.forEach((event) => {
				window.addEventListener(event, resetTimer);
			});

			// Initial reset of the timer when the app loads
			resetTimer();

			return () => {
				// Cleanup: Remove event listeners and clear timeouts/intervals
				activityEvents.forEach((event) =>
					window.removeEventListener(event, resetTimer),
				);
				clearTimeout(timeout);
				clearTimeout(warningTimeout);
				clearInterval(countdownInterval);
			};
		}
	}, [resetTimer]);

	return (
		<SessionTimeoutContext.Provider value={{ isTimedOut, stayLoggedIn }}>
			{children}
			<Dialog open={showModal} keepMounted>
				<DialogContent>
					<Stack
						direction={'column'}
						spacing={2}
						sx={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TimerIcon
							sx={{
								fontSize: '60',
								color: 'primary.main',
							}}
						/>
						<Typography variant='body1'>
							You have been inactive for a while.
						</Typography>
						<Typography variant='body2'>
							For security reasons, you will be logged out in {timeLeft}{' '}
							seconds.
						</Typography>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						variant='contained'
						sx={{
							backgroundColor: 'primary.main',
						}}
						onClick={stayLoggedIn}
					>
						Stay Logged In
					</Button>
					<Button
						variant='outlined'
						onClick={() => (window.location.href = '/login')}
					>
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</SessionTimeoutContext.Provider>
	);
};

export default SessionTimeoutContext;
