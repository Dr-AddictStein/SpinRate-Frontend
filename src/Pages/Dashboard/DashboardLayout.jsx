import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../Components/Loader";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignupModal from "../../Components/SignupModal";

const DashboardLayout = () => {
  const { user, isInitialized } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader text={"Loading..."} />
      </div>
    );
  }

  useEffect(() => {
    // Show signup modal if user is not authenticated
    if (!user?.user?._id) {
      setShowSignupModal(true);
    } else {
      setShowSignupModal(false);
    }
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // If we're here, we're authenticated
  return (
    <div className="w-full min-h-screen bg-gray-50 flex">
      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal closeModal={() => setShowSignupModal(false)} />
      )}

      {/* Mobile menu toggle button - only visible on mobile */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-100"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Desktop sidebar toggle button - only visible when sidebar is collapsed */}
      {!sidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      )}
      
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleMobileMenu}
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <Sidebar toggleSidebar={toggleMobileMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
        className={`hidden lg:block relative z-20 transition-all duration-300 ease-in-out`}
      >
        <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
      </motion.div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Add some top padding on mobile to account for the menu button */}
          <div className="lg:pt-0 pt-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;