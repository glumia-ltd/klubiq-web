import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUpWelcomePage";
import SignUpPage from "../pages/SignUp/CreateAccount";

import Login from "../pages/Login";
// import LoginWelcomePage from "../pages/LoginWelcomePage";
import SetPassword from "../pages/SetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import UserProfileDetails from "../pages/UserProfileDetails";
import EmailVerification from "../pages/EmailVerification";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route index path="/" element={<LoginWelcomePage />} /> */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="signup/createaccount" element={<SignUpPage />} />
      <Route path="/signup/profileupdate" element={<UserProfileDetails />} />
      <Route path="/setPassword" element={<SetPassword />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/verifyemail" element={<EmailVerification />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

      {/* <Route element={<PrivateRoute />}>
        <Route path="/" element={<h1>This will contain protected route</h1>} />
      </Route> */}
    </Route>
  )
);
