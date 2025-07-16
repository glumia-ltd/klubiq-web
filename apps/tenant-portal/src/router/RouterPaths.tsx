import {
	// Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import Login from '@/pages/Auth/Login';
import Payments from '@/pages/Features/Payments';
import TenantDashboard from '@/pages/Features/Dashboard';
import AuthLayout from '@/layouts/AuthLayout';
import ResetPassword from '@/pages/Auth/ResetPassword';
import AppContainer from '@/layouts/AppContainer';
import PrivateRoute from './PrivateRoute';
import ConfirmPayment from '@/pages/Features/Payments/ConfirmPayment';
import CardPayment from '@/pages/Features/Payments/CardPayment';

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
					<Route path='/payments' element={<Payments />} />
					<Route path='/payments/confirm' element={<ConfirmPayment />} />
					<Route path='/payments/card' element={<CardPayment />} />
				</Route>
			</Route>
			{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
		</Route>,
	),
);
