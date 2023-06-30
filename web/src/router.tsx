import { createBrowserRouter } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project/Project";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/projects",
    Component: Projects,
  },
  {
    path: "/project/:projectId",
    Component: Project,
  },
]);
