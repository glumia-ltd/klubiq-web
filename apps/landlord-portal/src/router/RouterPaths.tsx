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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index path='/' element={<LoginWelcomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/login' replace />} />

      <Route element={<PrivateRoute />}>
        <Route path='/' element={<h1>This will contain protected route</h1>} />
      </Route>
    </Route>
  )
);
