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
import { auth } from '../../firebase';
import { consoleLog } from '../../helpers/debug-logger';
import { useSignOutMutation } from '../../store/AuthStore/authApiSlice';
import { resetStore } from '../../store';

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
	const [userSignOut] = useSignOutMutation();
	const [isTimedOut, setIsTimedOut] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [timeLeft, setTimeLeft] = useState(60); // 60 seconds warning before logout
	const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes inactivity limit
	const WARNING_TIME = 25 * 60 * 1000; // Show warning after 25 minutes of inactivity
	const COUNTDOWN_TIME = 60; // 60 seconds countdown before auto-logout

	let countdownInterval: ReturnType<typeof setInterval>;

	// Function to update the last activity timestamp in sessionStorage
	const updateLastActivity = () => {
		sessionStorage.setItem(
			'lastActivity',
			JSON.stringify(new Date().getTime()),
		);
	};

	const handleSignOut = async () => {
		await userSignOut({}).unwrap();
		resetStore();
		sessionStorage.clear();
		auth.signOut();
	};

	// Function to check whether the user has been inactive for too long
	const checkInactivity = useCallback(() => {
		const lastActivity = sessionStorage.getItem('lastActivity');
		if (lastActivity) {
			const currentTime = new Date().getTime();
			const timeSinceLastActivity = currentTime - parseInt(lastActivity, 10);
			if (timeSinceLastActivity >= INACTIVITY_LIMIT) {
				setIsTimedOut(true);
				handleSignOut();
			} else if (timeSinceLastActivity >= WARNING_TIME) {
				setShowModal(true); // Show inactivity warning modal
				startCountdown();
			}
		}
	}, []);

	// Function to start the countdown timer
	const startCountdown = useCallback(() => {
		clearInterval(countdownInterval); // Clear any existing interval
		countdownInterval = setInterval(() => {
			setTimeLeft((prevTimeLeft) => {
				if (prevTimeLeft <= 1) {
					clearInterval(countdownInterval);
					handleSignOut();
					return 0;
				}
				return prevTimeLeft - 1;
			});
		}, 1000); // Decrease countdown every second
	}, []);

	// Function to handle "Stay Logged In" button click
	const stayLoggedIn = useCallback(() => {
		consoleLog('stayLoggedIn Clicked');
		setIsTimedOut(false);
		setShowModal(false); // Hide the modal when the user confirms to stay logged in
		setTimeLeft(COUNTDOWN_TIME); // Reset countdown timer
		updateLastActivity(); // Update the last activity time
		clearInterval(countdownInterval); // Clear countdown
	}, []);

	// Effect to set up the event listeners for user activity and inactivity tracking
	useEffect(() => {
		if (!window.location.href.includes('login')) {
			const activityEvents = ['mousemove', 'keypress', 'click', 'scroll'];

			// Update last activity timestamp on any user interaction
			const handleUserActivity = () => {
				updateLastActivity();
				if (showModal) {
					setShowModal(false);
					clearInterval(countdownInterval);
					setTimeLeft(COUNTDOWN_TIME);
				}
			};
			// Attach event listeners for activity detection
			activityEvents.forEach((event) => {
				window.addEventListener(event, handleUserActivity);
			});

			// Periodically check for user inactivity
			const interval = setInterval(checkInactivity, 10000);

			// Set initial last activity timestamp on app load
			updateLastActivity();
			return () => {
				// Cleanup: Remove event listeners and clear timeouts/intervals
				activityEvents.forEach((event) =>
					window.removeEventListener(event, handleUserActivity),
				);
				clearInterval(interval);
				clearInterval(countdownInterval);
			};
		}
	}, [checkInactivity, showModal]);

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
						onClick={() => {
							handleSignOut();
						}}
					>
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</SessionTimeoutContext.Provider>
	);
};

export default SessionTimeoutContext;
