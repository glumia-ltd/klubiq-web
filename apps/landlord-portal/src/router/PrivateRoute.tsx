import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/AuthStore/AuthSlice';
import { firebaseResponseObject } from '../helpers/FirebaseResponse';

const PrivateRoute = () => {
	const { token } = useSelector(getAuthState);

	const storedSession = sessionStorage.getItem(
		firebaseResponseObject.sessionStorage || '',
	);

	const storedSessionObject = storedSession && JSON.parse(storedSession);

	const userToken = token || storedSessionObject?.stsTokenManager?.accessToken;

	return userToken ? <Outlet /> : <Navigate to={'/'} replace={true} />;
};

export default PrivateRoute;
