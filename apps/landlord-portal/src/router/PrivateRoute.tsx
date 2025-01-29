import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import { firebaseResponseObject } from '../helpers/FirebaseResponse';
import useAuth from '../hooks/useAuth';
import MFAPrompt from '../components/Dialogs/MfaPrompts';
import { SessionTimeoutProvider } from '../context/SessionContext/SessionTimoutContext';
import { useLocation } from 'react-router-dom';
import AlertBanner from '../components/AlertBannerComonent/AlertBanner';

const PrivateRoute = () => {
	const {
		showMFAPrompt,
		goToMFASetup,
		setShowMFAPrompt,
		optOutOf2fa,
		banners,
	} = useAuth();
	const { token } = useSelector(getAuthState);
	const location = useLocation();
	const storedSession = sessionStorage.getItem(
		firebaseResponseObject.sessionStorage || '',
	);
	const storedSessionObject = storedSession && JSON.parse(storedSession);

	const userToken = token || storedSessionObject?.stsTokenManager?.accessToken;
	const loginUrl = location.pathname
		? `login?continue_path=${location.pathname}`
		: 'login';

	return userToken ? (
		<>
			{banners.map((banner) => (
				<AlertBanner
					key={banner.id}
					message={banner.message}
					type={banner.type as 'info' | 'error' | 'success'}
					onClose={banner.close}
					actions={banner.actions || <></>}
				/>
			))}
			<SessionTimeoutProvider>
				{showMFAPrompt && (
					<MFAPrompt
						open={showMFAPrompt}
						onClose={() => {
							setShowMFAPrompt(false);
						}}
						onMFASetupClick={goToMFASetup}
						onOptOutClick={optOutOf2fa}
					></MFAPrompt>
				)}
				<Outlet />
			</SessionTimeoutProvider>
		</>
	) : (
		<Navigate to={loginUrl} replace={true} />
	);
};

export default PrivateRoute;
