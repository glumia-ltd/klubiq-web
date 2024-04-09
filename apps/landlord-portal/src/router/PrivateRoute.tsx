import { Outlet, Navigate } from 'react-router-dom';
// import store from '../store';

const PrivateRoute = () => {
  // TODO: Get auth token
  // const auth = store.getState()

  const auth = { token: 'token' };

  return auth.token ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoute;
