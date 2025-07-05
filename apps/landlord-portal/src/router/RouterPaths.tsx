import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../pages/Auth/SignUp/CreateAccount';
import Login from '../pages/Auth/Login';
import SetPassword from '../pages/Auth/SetPassword';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import EmailVerification from '../pages/Auth/EmailVerification';
import DashBoard from '../pages/Features/Dashboard';
import Setting from '../pages/Settings';
import Lease from '../pages/Features/Lease';
import MFASetUp from '../pages/Auth/MFAPage';
import PropertyPage from '../pages/Features/properties/PropertyDetail';
import AddLeasePage from '../pages/Features/Lease/AddLeasePage';
// import TenantDetails from '../pages/Features/Tenant/TenantDetails';
import NestedRoutesLayout from '../Layouts/NestedRoutesLayout/NestedRoutesLayout';
import TenantDetails from '../pages/Features/Tenant/TenantDetails';
import Properties from '../pages/Features/properties';

import ViewPortLayout from '../Layouts/ViewPortLayout';

import ErrorComponent from '../components/ErrorComponent/ErrorComponent';
import UnitInMultiUnitPage from '../pages/Features/properties/UnitInMultiUnitPage';
import LeaseDetails from '../pages/Features/Lease/LeaseDetails';

import EditPropertyPage from '../pages/Features/properties/EditProperty';
import NotFound from '../pages/ErrorPages/404';
import AddTenant from '../pages/Features/Tenant/AddTenant';
import Tenant from '../pages/Features/Tenant';
import { CreateProperty } from '../pages/Features/properties/CreateProperty';
import EditLeaseForm from '../pages/Features/Lease/EditLeaseForm';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/login' element={<Login />} />
			<Route path='/404' element={<NotFound />} />
			<Route path='signup/createaccount' element={<SignUpPage />} />
			<Route path='/reset-password' element={<SetPassword />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/verify-email' element={<EmailVerification />} />
			<Route path='/2fa-enroll' element={<MFASetUp />} />
			<Route path='*' element={<Navigate to='/404' replace />} />
			<Route path='/' element={<Navigate to='/login' replace />} />

			<Route element={<PrivateRoute />}>
				<Route element={<ViewPortLayout />}>
					<Route
						path='/dashboard'
						element={<DashBoard />}
						errorElement={<ErrorComponent />}
					/>
					<Route
						path='/properties'
						element={<Properties />}
						errorElement={<ErrorComponent />}
					/>
					<Route
						path='/properties/create'
						element={<CreateProperty />}
						errorElement={<ErrorComponent />}
					/>

					<Route path='/properties/:slug' element={<NestedRoutesLayout />}>
						<Route index element={<PropertyPage />} />
						<Route path='edit' element={<EditPropertyPage />} />
						<Route path='unit/:id' element={<UnitInMultiUnitPage />} />
					</Route>
					<Route path='/lease' element={<Navigate to='/leases' replace />} />
					<Route path='/leases/*' element={<Navigate to='/leases' replace />} />
					<Route path='/leases' element={<NestedRoutesLayout />}>
						<Route index element={<Lease />} />
						<Route path='add-lease' element={<AddLeasePage />} />
						<Route path='edit/:leaseId' element={<EditLeaseForm />} />
					</Route>
					<Route path='/leases/:id' element={<LeaseDetails />} />
					<Route path='/tenants' element={<NestedRoutesLayout />}>
						<Route index element={<Tenant />} />
						<Route path='add-tenant' element={<AddTenant />} />
						<Route path='invite-tenant' element={<AddTenant />} />
					</Route>
					<Route path='tenants/:id' element={<TenantDetails />} />

					<Route path='/settings' element={<Setting />} />
				</Route>
			</Route>
		</Route>,
	),
);
