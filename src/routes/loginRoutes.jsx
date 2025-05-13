import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import RegistrationSuccessfulPage from "../pages/RegistrationSuccessfulPage";

const authRoutes = [
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route
    key="registration"
    path="/registration"
    element={<RegistrationPage />}
  />,
  <Route
    key="registration-successful"
    path="/registration-successful"
    element={<RegistrationSuccessfulPage />}
  />,
];

export default authRoutes;
