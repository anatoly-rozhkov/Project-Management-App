import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import projectRoutes from "../routes/projectRoutes";
import authRoutes from "../routes/loginRoutes";

const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {projectRoutes(isLoggedIn)}
        {authRoutes}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/projects" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
