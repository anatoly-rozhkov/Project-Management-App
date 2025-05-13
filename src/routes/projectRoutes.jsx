import { Route, Navigate } from "react-router-dom";
import ProjectsPage from "../pages/ProjectsPage";

const projectRoutes = (isLoggedIn) => [
  <Route
    key="projects"
    path="/projects"
    element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />}
  />,
];

export default projectRoutes;
