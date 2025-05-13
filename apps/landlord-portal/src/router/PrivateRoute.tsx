import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import useAuth from '../hooks/useAuth';
import MFAPrompt from '../components/Dialogs/MfaPrompts';
import { SessionTimeoutProvider } from '../context/SessionContext/SessionTimeoutContext';
import AlertDialog from '../components/Dialogs/AlertDialog';
import { consoleDebug } from '../helpers/debug-logger';

const PrivateRoute = () => {
	const {isSignedIn } = useSelector(getAuthState);
	const {
		showMFAPrompt,
		goToMFASetup,
		optOutOf2fa,
		handleCloseMFAPrompt,
		alertDialogs,
	} = useAuth();


	const loginUrl = 'login';
	if (!isSignedIn) {
		consoleDebug('PrivateRoute User not signed in - Redirecting to login...');
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

