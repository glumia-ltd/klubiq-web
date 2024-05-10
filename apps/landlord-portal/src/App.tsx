/* eslint-disable @typescript-eslint/no-explicit-any */
<<<<<<< HEAD
import { ThemeContextProvider } from "./context/ThemeContext/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/RouterPaths";
import ControlledSnackbar from "./components/ControlledComponents/ControlledSnackbar";
=======
import { ThemeContextProvider } from './context/ThemeContext/ThemeContext';
import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/RouterPaths';

>>>>>>> 25e08bde75cfc13d07926c560e6a4ad906120a4a
// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';

import { useSelector } from "react-redux";
import type { RootState } from "./store";
function App() {

  const { message, isOpen } = useSelector((state: RootState) => state.snack);
  console.log(message);
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
<<<<<<< HEAD
      <RouterProvider router={router} />
      <ControlledSnackbar key={message} message={message} isOpen={isOpen} />
=======
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        dense
        autoHideDuration={5000}
      >
        <RouterProvider router={router} />
      </SnackbarProvider>
>>>>>>> 25e08bde75cfc13d07926c560e6a4ad906120a4a
    </ThemeContextProvider>
  );
}

export default App;
