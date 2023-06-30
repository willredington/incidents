import { createBrowserRouter } from "react-router-dom";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Incident/Incident";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/incident/:incidentId",
    Component: Project,
  },
]);
