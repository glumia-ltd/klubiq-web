import { Outlet, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser, saveUser } from '../store/AuthStore/AuthSlice';
import useAuth from '../hooks/useAuth';
import MFAPrompt from '../components/Dialogs/MfaPrompts';
import { SessionTimeoutProvider } from '../context/SessionContext/SessionTimeoutContext';
import AlertDialog from '../components/Dialogs/AlertDialog';
import { useLazyGetUserByFbidQuery } from '../store/AuthStore/authApiSlice';
import { useEffect, useState } from 'react';
import { consoleDebug, consoleError } from '../helpers/debug-logger';
import Loader from '../components/LoaderComponent/Loader';

const PrivateRoute = () => {
	const {
		showMFAPrompt,
		goToMFASetup,
		optOutOf2fa,
		handleCloseMFAPrompt,
		alertDialogs,
		isSignedIn,
	} = useAuth();
	const [getUserByFbid] = useLazyGetUserByFbidQuery();
	const dispatch = useDispatch();
	const [isVerifying, setIsVerifying] = useState(true);
	consoleDebug('PrivateRoute - Current isSignedIn state:', isSignedIn);

	useEffect(() => {
		const verifySession = async () => {
			consoleDebug('Verifying session...');
			try {
				const user = await getUserByFbid().unwrap();
				consoleDebug('Session verification result:', user);
				if (user) {
					consoleDebug('Dispatching saveUser in PrivateRoute...');
					dispatch(saveUser({ user, isSignedIn: true }));
					// Force a re-render after user is saved
					setIsVerifying(false);
				} else {
					consoleDebug('No user found during verification');
					dispatch(removeUser());
					setIsVerifying(false);
				}
			} catch (error) {
				consoleError('Session verification error:', error);
				dispatch(removeUser());
				setIsVerifying(false);
			}
		};

		verifySession();
	}, [dispatch, getUserByFbid]);

	consoleDebug('PrivateRoute - Rendering with isSignedIn:', isSignedIn);

	if (isVerifying) {
		return <Loader />;
	}

	const loginUrl = 'login';
	if (!isSignedIn) {
		consoleDebug('PrivateRoute - Redirecting to login...');
		return <Navigate to={loginUrl} replace={true} />;
	}

	return (
		<SessionTimeoutProvider>
			{showMFAPrompt && (
				<MFAPrompt
					open={showMFAPrompt}
					onClose={() => {
						handleCloseMFAPrompt();
					}}
					onMFASetupClick={goToMFASetup}
					onOptOutClick={optOutOf2fa}
				></MFAPrompt>
			)}
			{alertDialogs.length > 0 &&
				alertDialogs.map((alert) => (
					<AlertDialog
						key={alert.id}
						open={alert.open}
						title={alert.title}
						message={alert.message}
						onClose={alert.onClose}
						onConfirmClick={alert.onConfirmClick}
						onCancelClick={alert.onCancelClick}
						id={alert.id}
						cancelButtonText={alert.cancelButtonText}
						confirmButtonText={alert.confirmButtonText}
					></AlertDialog>
				))}
			<Outlet />
		</SessionTimeoutProvider>
	);
};

export default PrivateRoute;

