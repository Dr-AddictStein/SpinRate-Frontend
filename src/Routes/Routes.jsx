import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Pages/Home/HomeLayout";
import LandingPage from "../Pages/Home/LandingPage";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import DashboardCustomers from "../Pages/Dashboard/DashboardCustomers";
import DashboardSubscription from "../Pages/Dashboard/DashboardSubscription"; 
import DashboardSettings from "../Pages/Dashboard/DashboardSettings";
import WheelGamePage from "../Pages/Home/WheelGamePage";
import TermsAndConditions from "../Pages/Home/TermsAndConditions";
import DashboardAnalytics from "../Pages/Dashboard/DashboardAnalytics";

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
        element: <DashboardCustomers />,
      },
      {
        path: "analytics",
        element: <DashboardAnalytics />,
      },
      {
        path: "customers",
        element: <DashboardCustomers />,
      },
      {
        path: "customers",
        element: <DashboardCustomers />,
      },
      {
        path: "subscription",
        element: <DashboardSubscription />,
      },
      {
        path: "settings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "/wheelGame/:id",
    element: <WheelGamePage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
];

// Create the router instance
export const router = createBrowserRouter(routes);
