import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Component/Sidebar";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../Components/Loader";
import { Menu, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SignupModal from "../../Components/SignupModal";
import SubscriptionGuard from "../../Components/SubscriptionGuard";
import { useTranslation } from "../../hooks/useTranslation";
import { useLanguage } from "../../context/LanguageContext";
import { useRefreshUser } from "../../hooks/useRefreshUser";
import ukFlag from "../../assets/flags/uk-flag.svg";
import franceFlag from "../../assets/flags/france-flag.svg";

const DashboardLayout = () => {
  const { user, isInitialized } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const { refreshUserData } = useRefreshUser();

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

  // Auto-refresh user data when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      if (user?.user?._id) {
        refreshUserData();
      }
    };

    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, [user, refreshUserData]);

  // Handle scroll to hide/show navigation buttons
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50); // Hide buttons after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };



  const handleRefreshUserData = async () => {
    setIsRefreshing(true);
    try {
      const success = await refreshUserData();
      if (success) {
        console.log('User data refreshed successfully');
        // Show a brief success message
        setTimeout(() => setIsRefreshing(false), 1000);
      } else {
        console.error('Failed to refresh user data');
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      setIsRefreshing(false);
    }
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
    <SubscriptionGuard>
      <div className="w-full min-h-screen bg-gray-50 flex overflow-hidden">
        {/* Language Selector and Refresh Button - hidden when scrolled */}
      <div className={`fixed top-4 right-4 z-[60] flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-lg transition-all duration-300 ${
        isScrolled ? 'opacity-0 pointer-events-none transform translate-y-[-100%]' : 'opacity-100'
      }`}>
        <button 
          onClick={handleRefreshUserData}
          disabled={isRefreshing}
          className={`p-2 rounded-md bg-white shadow-sm text-gray-600 hover:bg-gray-100 transition-all duration-200 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Refresh user data"
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
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

      {/* Mobile menu toggle button - hidden when scrolled */}
      <button 
        onClick={toggleMobileMenu}
        className={`lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-md bg-white/90 backdrop-blur-sm shadow-lg text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-all duration-300 ${
          isScrolled ? 'opacity-0 pointer-events-none transform translate-y-[-100%]' : 'opacity-100'
        }`}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      
      {/* Desktop sidebar toggle button - hidden when scrolled */}
      {!sidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className={`hidden lg:flex fixed top-4 left-4 z-[60] p-2 rounded-md bg-white/90 backdrop-blur-sm shadow-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 ${
            isScrolled ? 'opacity-0 pointer-events-none transform translate-y-[-100%]' : 'opacity-100'
          }`}
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
            <div className="relative flex-1 flex flex-col max-w-[280px] w-full h-full bg-white border-r border-gray-200 overflow-y-auto">
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
          {/* Add appropriate padding to prevent content from being blocked by fixed buttons */}
          <div className="pt-16">
            <Outlet />
          </div>
        </div>
      </main>
      </div>
    </SubscriptionGuard>
  );
};

export default DashboardLayout;