import { Route, Navigate } from "react-router-dom";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectCreationPage from "../pages/ProjectCreationPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";

const projectRoutes = (isLoggedIn) => [
  <Route
    key="projects"
    path="/projects"
    element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />}
  />,
  <Route
    key="project-creation"
    path="/projects/create"
    element={isLoggedIn ? <ProjectCreationPage /> : <Navigate to="/login" />}
  />,
  <Route
    key="project-detail"
    path="/projects/:projectId"
    element={isLoggedIn ? <ProjectDetailPage /> : <Navigate to="/login" />}
  />,
];

export default projectRoutes;
