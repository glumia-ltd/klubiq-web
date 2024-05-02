/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeContextProvider } from "./context/ThemeContext/ThemeContext";
import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/RouterPaths";
// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';
// import { saveUser } from './store/AuthStore/AuthSlice';
// import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user: any) => {
  //     if (user) {
  //       console.log('auth state has changed', user.accessToken);
  //       console.log('user email verified', user.emailVerified);
  //       const userInfo = { email: user.email };
  //       dispatch(saveUser({ user: userInfo, token: user.accessToken }));
  //     } else {
  //       console.log('no user found yet');
  //     }
  //   });

  //   return () => listen();
  // }, []);
  
  return (
    <ThemeContextProvider>
      <SnackbarProvider anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            dense
            autoHideDuration={5000}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeContextProvider>
  );
}

export default App;
