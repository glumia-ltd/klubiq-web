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
import ConfirmPayment from '@/pages/Features/Payments/ConfirmPayment';
import CardPayment from '@/pages/Features/Payments/CardPayment';
import PaymentsPage from '@/pages/Features/Payments';
import Maintenance from '@/pages/Features/maintenance';
import Documents from '@/pages/Features/documents';
import Profile from '@/pages/Auth/profile';

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
					<Route path='/payments' element={<PaymentsPage />} />
					<Route path='/payments/confirm' element={<ConfirmPayment />} />
					<Route path='/payments/card' element={<CardPayment />} />
					<Route path='/maintenance' element={<Maintenance />} />
					<Route path='/documents' element={<Documents />} />
					<Route path='/profile' element={<Profile />} />
				</Route>
			</Route>
			{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
		</Route>,
	),
);
