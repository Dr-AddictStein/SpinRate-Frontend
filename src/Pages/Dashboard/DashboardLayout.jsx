import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../Components/Loader";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignupModal from "../../Components/SignupModal";
import { useTranslation } from "../../hooks/useTranslation";
import { useLanguage } from "../../context/LanguageContext";
import ukFlag from "../../assets/flags/uk-flag.svg";
import franceFlag from "../../assets/flags/france-flag.svg";

const DashboardLayout = () => {
  const { user, isInitialized } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Show signup modal if user is not authenticated
    if (!user?.user?._id) {
      setShowSignupModal(true);
    } else {
      setShowSignupModal(false);
    }
  }, [user]);

  useEffect(() => {
    // Handle resize events to determine if we're on mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar automatically on small screens
      if (window.innerWidth < 1024 && sidebarOpen) {
        setSidebarOpen(false);
      } else if (window.innerWidth >= 1024 && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial check
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Show loading state while auth is initializing
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader text={t('loading')} />
      </div>
    );
  }

  // If we're here, we're authenticated
  return (
    <div className="w-full min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Language Selector - fixed position with improved mobile positioning */}
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <button 
          onClick={() => changeLanguage('fr')}
          className={`transition-all duration-200 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-indigo-600 scale-110' : 'opacity-75'}`}
          aria-label="Switch to French"
        >
          <img src={franceFlag} alt="French" className="w-8 h-6 rounded-sm" />
        </button>
        <button 
          onClick={() => changeLanguage('en')}
          className={`transition-all duration-200 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-indigo-600 scale-110' : 'opacity-75'}`}
          aria-label="Switch to English"
        >
          <img src={ukFlag} alt="English" className="w-8 h-6 rounded-sm" />
        </button>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <SignupModal closeModal={() => setShowSignupModal(false)} />
      )}

      {/* Mobile menu toggle button - improved positioning and visibility */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-100 flex items-center justify-center"
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      
      {/* Desktop sidebar toggle button - only visible when sidebar is collapsed */}
      {!sidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="hidden lg:flex fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md text-gray-600 hover:bg-gray-100"
          aria-label="Expand sidebar"
        >
          <Menu size={20} />
        </button>
      )}
      
      {/* Mobile Sidebar - improved animation and sizing */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-gray-600 bg-opacity-75" 
              onClick={toggleMobileMenu}
              aria-hidden="true"
            ></div>
            <div className="relative flex-1 flex flex-col max-w-[280px] w-full h-full bg-white overflow-y-auto">
              <div className="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleMobileMenu}
                  aria-label="Close sidebar"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>
              <Sidebar toggleSidebar={toggleMobileMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar - with responsive behavior */}
      <motion.div 
        initial={false}
        animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
        className={`hidden lg:block relative z-20 transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <Sidebar collapsed={!sidebarOpen} toggleSidebar={toggleSidebar} />
      </motion.div>
      
      {/* Main Content Area - improved responsive padding and spacing */}
      <main className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 
                        px-3 py-4 sm:p-5 md:p-6 lg:p-8`}>
        <div className="max-w-7xl mx-auto">
          {/* Add appropriate padding on mobile to account for menu button */}
          <div className="pt-12 lg:pt-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;