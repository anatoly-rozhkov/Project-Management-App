import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import RegistrationSuccessfulPage from "../pages/RegistrationSuccessfulPage";
import ProjectsPage from "../pages/ProjectsPage";

const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/registration-successful"
          element={<RegistrationSuccessfulPage />}
        />
        <Route
          path="/projects"
          element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/projects" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
