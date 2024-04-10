import { Outlet, Navigate } from 'react-router-dom';
// import store from '../store';

const PrivateRoute = () => {
  // TODO: Get auth token
  // const auth = store.getState()

  const auth = { token: '' };

  return auth.token ? <Outlet /> : <Navigate to={'/login'} replace={true} />;
};

export default PrivateRoute;
