import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import LoginWelcomePage from '../pages/LoginWelcomePage';
import SetPassword from '../pages/SetPassword';
import ForgotPassword from '../pages/ForgotPassword';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path='/' element={<LoginWelcomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/setPassword' element={<SetPassword />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='*' element={<Navigate to='/login' replace />} />

      <Route element={<PrivateRoute />}>
        <Route
          path='/private'
          element={<h1>This will contain protected route</h1>}
        />
      </Route>
    </Route>
  )
);
