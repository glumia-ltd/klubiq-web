import {
	Navigate,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../pages/SignUp/CreateAccount';
import Login from '../pages/Login';
// import LoginWelcomePage from '../pages/LoginWelcomePage';
import SetPassword from '../pages/SetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import UserProfileDetails from '../pages/UserProfileDetails';
import EmailVerification from '../pages/EmailVerification';
import PrivatePage from '../pages/PrivatePage/PrivatePage';
import DashBoard from '../pages/Dashboard';
import ViewPort from '../components/Viewport/ViewPort';
import Setting from '../pages/Settings';
import Support from '../pages/Support';
import Message from '../pages/Message';
import Maintenance from '../pages/Maintenance';
import Lease from '../pages/Lease';
import Properties from '../pages/Properties';
export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			{/* <Route index path="/" element={<LoginWelcomePage />} /> */}
			<Route path='/' element={<Login />} />
			{/* <Route path='/signup' element={<SignUp />} /> */}
			<Route path='signup/createaccount' element={<SignUpPage />} />
			<Route path='/signup/profileupdate' element={<UserProfileDetails />} />
			<Route path='/setPassword' element={<SetPassword />} />
			<Route path='/forgotPassword' element={<ForgotPassword />} />
			<Route path='/verify-email' element={<EmailVerification />} />
			<Route path='*' element={<Navigate to='/login' replace />} />
			<Route
				path='/dashboard'
				element={
					<ViewPort>
						<DashBoard />
					</ViewPort>
				}
			/>
			<Route
				path='/properties'
				element={
					<ViewPort>
						<Properties />
					</ViewPort>
				}
			/>
			<Route
				path='/lease'
				element={
					<ViewPort>
						<Lease />
					</ViewPort>
				}
			/>
			<Route
				path='/maintenance'
				element={
					<ViewPort>
						<Maintenance />
					</ViewPort>
				}
			/>
			<Route
				path='/message'
				element={
					<ViewPort>
						<Message />
					</ViewPort>
				}
			/>
			<Route
				path='/support'
				element={
					<ViewPort>
						<Support />
					</ViewPort>
				}
			/>
			<Route
				path='/settings'
				element={
					<ViewPort>
						<Setting />
					</ViewPort>
				}
			/>
			<Route element={<PrivateRoute />}>
				<Route path='/private' element={<PrivatePage />} />
			</Route>
		</Route>,
	),
);
