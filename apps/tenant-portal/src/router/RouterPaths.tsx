import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';

import Login from '@/pages/Login';
import TenantDashboard from '@/pages/dashboard';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/' element={<Login />} />
			<Route path='/dashboard' element={<TenantDashboard />} />
			{/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
		</Route>,
	),
);
