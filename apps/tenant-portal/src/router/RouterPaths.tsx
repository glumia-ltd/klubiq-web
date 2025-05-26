import {
	// Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';


import Login from '@/pages/Auth/Login';
import TenantDashboard from '@/pages/Features/Dashboard';
import AuthLayout from '@/layouts/AuthLayout';
import ResetPassword from '@/pages/Auth/ResetPassword';
import AppContainer from '@/layouts/AppContainer';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<AuthLayout />}>
				<Route path='/' element={<Login />} />
				<Route path='/login' element={<Login />} />
				<Route path='/reset-password' element={<ResetPassword />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route element={<AppContainer />}>
					<Route path='/dashboard' element={<TenantDashboard />} />
				</Route>
			</Route>
			{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
		</Route>,
	),
);
