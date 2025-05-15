import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import Login from '@/pages/Auth/Login';
import TenantDashboard from '@/pages/Features/Dashboard';
import LoggedInUserLayout from '@/layouts/LoggedInLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ResetPassword from '@/pages/Auth/ResetPassword';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<AuthLayout />}>
				<Route path='/' element={<Login />} />
				<Route path='/reset-password' element={<ResetPassword />} />
			</Route>

			<Route element={<LoggedInUserLayout />}>
				<Route path='/dashboard' element={<TenantDashboard />} />
			</Route>
			{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
		</Route>,
	),
);
