import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/login' element={<h1>Login will be here</h1>} />
      <Route path='/signup' element={<h1>Sign up will be here</h1>} />
      <Route path='*' element={<Navigate to='/login' replace />} />

      <Route element={<PrivateRoute />}>
        <Route path='/' element={<h1>This will contain protected route</h1>} />
      </Route>
    </Route>
  )
);
