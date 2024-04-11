import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SignUp from '../pages/SignUp';
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<h1>log in will be here</h1>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='*' element={<Navigate to='/login' replace />} />

      <Route element={<PrivateRoute />}>
        <Route path='/' element={<h1>This will contain protected route</h1>} />
      </Route>
    </Route>
  )
);
