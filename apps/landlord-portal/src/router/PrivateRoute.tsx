// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Outlet, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   getAuthState,
//   // saveUser
// } from "../store/AuthStore/AuthSlice";
// // import { useEffect, useState } from 'react';
// // import { onAuthStateChanged } from 'firebase/auth';
// // import { useDispatch } from 'react-redux';
// // import { auth } from '../firebase';

// const PrivateRoute = () => {
//   const { token } = useSelector(getAuthState);

//   // const userToken = token || localStorage.getItem('token');

//   // console.log('token from private route', token);

//   // const [userToken, setUserToken] = useState(token);
//   // const authState = useSelector(getAuthState);
//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (token) return;

//   //   console.log('auth state changed');
//   //   const listen = onAuthStateChanged(auth, (user: any) => {
//   //     console.log('user', user);
//   //     if (user) {
//   //       const userInfo = { email: user.email };
//   //       dispatch(saveUser({ user: userInfo, token: user.accessToken }));
//   //       console.log(user.accessToken);
//   //       setUserToken(user.accessToken);
//   //     } else {
//   //       console.log('no user found yet');
//   //     }
//   //   });

//   //   return () => listen();
//   // }, []);

//   return token ? <Outlet /> : <Navigate to={"/login"} replace={true} />;
// };

// export default PrivateRoute;
