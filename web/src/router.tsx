import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Incident } from "./pages/Incident";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/incident/:incidentId",
    Component: Incident,
  },
]);
