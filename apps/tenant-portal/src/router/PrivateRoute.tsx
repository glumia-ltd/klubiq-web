import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthState } from '@/store/AuthStore/auth.slice';


const PrivateRoute = () => {
	const {isAuthenticated } = useSelector(getAuthState);



	const loginUrl = 'login';
	if (!isAuthenticated) {
		return <Navigate to={loginUrl} replace={true} />;
	}

	return (
		<Outlet />
	);
};

export default PrivateRoute;

