import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserByFbidQuery } from '../../store/AuthStore/authApiSlice';
import { saveUser, removeUser } from '../../store/AuthStore/AuthSlice';
// import Loader from '../../components/LoaderComponent/Loader';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: user, 
    // isLoading, 
    error } = useGetUserByFbidQuery();

  useEffect(() => {
    console.log('AuthProvider mounted');
    if (user) {
      dispatch(saveUser({ user, isSignedIn: true }));
    } else if (error) {
      dispatch(removeUser());
    }
    return () => {
      console.log('AuthProvider unmounted');
    };
  }, [user, error]);

  // if (isLoading) {
  //   return <Loader />; // Your loading component
  // }

  return <>{children}</>;
};