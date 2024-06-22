import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getAuthState,
	// saveUser
} from '../store/AuthStore/AuthSlice';
import { firebaseResponseObject } from '../helpers/FirebaseResponse';
// import { useEffect, useState } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { auth } from '../firebase';

const PrivateRoute = () => {
	const { token } = useSelector(getAuthState);

	console.log(token);

	const sessionStorageKey = firebaseResponseObject.sessionStorage!;

	const response = JSON.parse(sessionStorage.getItem(sessionStorageKey) || '');

	const userToken = token || response.stsTokenManager.accessToken;

	// console.log('token from private route', token);

	// const [userToken, setUserToken] = useState(token);
	// const authState = useSelector(getAuthState);
	// const dispatch = useDispatch();

	// useEffect(() => {
	//   if (token) return;

	//   console.log('auth state changed');
	//   const listen = onAuthStateChanged(auth, (user: any) => {
	//     console.log('user', user);
	//     if (user) {
	//       const userInfo = { email: user.email };
	//       dispatch(saveUser({ user: userInfo, token: user.accessToken }));
	//       console.log(user.accessToken);
	//       setUserToken(user.accessToken);
	//     } else {
	//       console.log('no user found yet');
	//     }
	//   });

	//   return () => listen();
	// }, []);

	return userToken ? <Outlet /> : <Navigate to={'/login'} replace={true} />;
};

export default PrivateRoute;
