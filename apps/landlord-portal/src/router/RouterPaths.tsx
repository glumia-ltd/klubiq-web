import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../pages/SignUp/CreateAccount';
import Login from '../pages/Login';
import SetPassword from '../pages/SetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import UserProfileDetails from '../pages/UserProfileDetails';
import EmailVerification from '../pages/EmailVerification';
import DashBoard from '../pages/Dashboard';
import Setting from '../pages/Settings';
import Support from '../pages/Support';
import Message from '../pages/Message';
import Maintenance from '../pages/Maintenance';
import Lease from '../pages/Lease';
import AddProperties from '../pages/AddProperties';
import PropertyPage from '../pages/PropertyPage';

import PropertyCategory from '../components/PropertiesCategory';
import PropertiesDetails from '../components/PropertiesDetails';
import UnitType from '../components/PropertiesDetail';

import Properties from '../pages/Properties';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/' element={<Login />} />
			<Route path='signup/createaccount' element={<SignUpPage />} />
			<Route path='/signup/profileupdate' element={<UserProfileDetails />} />
			<Route path='/reset-password' element={<SetPassword />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/verify-email' element={<EmailVerification />} />
			<Route path='*' element={<Navigate to='/' replace />} />

			<Route path='/properties' element={<Properties />} />

			<Route path='/properties/:slug' element={<PropertyPage />} />

			<Route path='/properties/*' element={<AddProperties />}>
				<Route path='property-category' element={<PropertyCategory />} />
				<Route path='property-details' element={<PropertiesDetails />} />
				<Route path='unit-type' element={<UnitType />} />
				<Route path='bank-account' element={<h1>Page in development</h1>} />

				<Route path='*' element={<Navigate to='/properties' replace />} />
			</Route>

			<Route element={<PrivateRoute />}>
				<Route path='/dashboard' element={<DashBoard />} />
				<Route path='/lease' element={<Lease />} />
				<Route path='/maintenance' element={<Maintenance />} />
				<Route path='/message' element={<Message />} />
				<Route path='/support' element={<Support />} />
				<Route path='/settings' element={<Setting />} />
			</Route>
		</Route>,
	),
);
