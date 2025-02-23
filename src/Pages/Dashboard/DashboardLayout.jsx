import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../Components/Loader";

const DashboardLayout = () => {
  const { user, isInitialized } = useAuthContext();

  // Show loading state while auth is initializing
  // if (!isInitialized) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center">
  //       <Loader text={"Loading..."} />
  //     </div>
  //   );
  // }

  // Redirect if no user after initialization
  // if (!user) {
  //   return <Navigate to="/" replace />;
  // }

  // If we're here, we're authenticated
  return (
    <div className="w-full min-h-screen grid grid-cols-12 bg-white rounded-lg">
      <div className="col-span-2 h-full">
        <Sidebar />
      </div>
      <div className="col-span-10 h-full w-full pt-7">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;