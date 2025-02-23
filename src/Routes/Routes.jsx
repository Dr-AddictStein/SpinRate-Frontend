import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Pages/Home/HomeLayout";
import LandingPage from "../Pages/Home/LandingPage";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";



// Define your route objects
const routes = [
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardHome />,
      },
    ],
  },
];

// Create the router instance
export const router = createBrowserRouter(routes);
