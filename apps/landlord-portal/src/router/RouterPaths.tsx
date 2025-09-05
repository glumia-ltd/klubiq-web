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
import NotFound from '../pages/ErrorPages/not-found';
import AddTenant from '../pages/Features/Tenant/AddTenant';
import Tenant from '../pages/Features/Tenant';
import { CreateProperty } from '../pages/Features/properties/CreateProperty';
import Forbidden from '../pages/ErrorPages/forbidden';
import { PERMISSIONS } from '../authz/constants';
//import EditLeaseForm from '../pages/Features/Lease/EditLeaseForm';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/login' element={<Login />} />
			<Route path='/not-found' element={<NotFound />} />
			<Route path='/unauthorized' element={<Forbidden />} />
			<Route path='/signup' element={<SignUpPage />} />
			<Route
				path='signup/createaccount'
				element={<Navigate to='/signup' replace />}
			/>
			<Route path='/reset-password' element={<SetPassword />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/verify-email' element={<EmailVerification />} />
			<Route path='/2fa-enroll' element={<MFASetUp />} />
			<Route path='*' element={<Navigate to='/not-found' replace />} />
			<Route path='/' element={<Navigate to='/login' replace />} />

			<Route element={<PrivateRoute />}>
				<Route element={<ViewPortLayout />}>
					{/* Dashboard */}
					<Route element={<PrivateRoute all={[PERMISSIONS.DASHBOARD.READ]} />}>
						<Route
							path='/dashboard'
							element={<DashBoard />}
							errorElement={<ErrorComponent />}
						/>
					</Route>
					{/* Properties */}
					<Route
						element={
							<PrivateRoute
								any={[
									PERMISSIONS.PROPERTY.READ,
									PERMISSIONS.PROPERTY.CREATE,
									PERMISSIONS.PROPERTY.UPDATE,
									PERMISSIONS.PROPERTY.DELETE,
								]}
							/>
						}
					>
						<Route
							path='/properties'
							element={<Properties />}
							errorElement={<ErrorComponent />}
						/>
						{/* Create Property */}
						<Route
							element={<PrivateRoute all={[PERMISSIONS.PROPERTY.CREATE]} />}
						>
							<Route
								path='/properties/create'
								element={<CreateProperty />}
								errorElement={<ErrorComponent />}
							/>
						</Route>
						{/* Property Detail AND Edit Property */}
						<Route path='/properties/:slug' element={<NestedRoutesLayout />}>
							<Route index element={<PropertyPage />} />
							<Route
								element={<PrivateRoute all={[PERMISSIONS.PROPERTY.UPDATE]} />}
							>
								<Route path='edit' element={<EditPropertyPage />} />
							</Route>
							<Route
								element={<PrivateRoute all={[PERMISSIONS.PROPERTY.READ]} />}
							>
								<Route path='unit/:id' element={<UnitInMultiUnitPage />} />
							</Route>
						</Route>
					</Route>

					{/* Leases */}
					<Route
						element={
							<PrivateRoute
								any={[
									PERMISSIONS.LEASE.READ,
									PERMISSIONS.LEASE.CREATE,
									PERMISSIONS.LEASE.UPDATE,
									PERMISSIONS.LEASE.DELETE,
								]}
							/>
						}
					>
						<Route path='/lease' element={<Navigate to='/leases' replace />} />
						<Route
							path='/leases/*'
							element={<Navigate to='/leases' replace />}
						/>
						<Route path='/leases' element={<NestedRoutesLayout />}>
							<Route index element={<Lease />} />
							<Route
								element={<PrivateRoute all={[PERMISSIONS.LEASE.CREATE]} />}
							>
								<Route path='add-lease' element={<AddLeasePage />} />
							</Route>
						</Route>
						<Route element={<PrivateRoute all={[PERMISSIONS.LEASE.READ]} />}>
							<Route path='/leases/:id' element={<LeaseDetails />} />
						</Route>
					</Route>

					{/* Tenants */}
					<Route
						element={
							<PrivateRoute
								any={[
									PERMISSIONS.TENANT.READ,
									PERMISSIONS.TENANT.CREATE,
									PERMISSIONS.TENANT.UPDATE,
									PERMISSIONS.TENANT.DELETE,
								]}
							/>
						}
					>
						<Route path='/tenants' element={<NestedRoutesLayout />}>
							<Route index element={<Tenant />} />
							<Route element={<PrivateRoute all={[PERMISSIONS.TENANT.CREATE]} />}>
								<Route path='add-tenant' element={<AddTenant />} />
								<Route path='invite-tenant' element={<AddTenant />} />
							</Route>
						</Route>
						<Route element={<PrivateRoute all={[PERMISSIONS.TENANT.READ]} />}>
							<Route path='tenants/:id' element={<TenantDetails />} />
						</Route>
					</Route>
					{/* Settings */}
					<Route element={<PrivateRoute all={[PERMISSIONS.SETTINGS.READ]} />}>
						<Route path='/settings' element={<Setting />} />
					</Route>
				</Route>
			</Route>
		</Route>,
	),
);
