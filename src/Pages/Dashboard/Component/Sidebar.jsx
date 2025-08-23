import React, { useState } from 'react';
import {
    BarChart,
    ShoppingBag,
    MessageCircle,
    Users,
    Settings,
    LogOut,
    Group,
    BookCopy,
    Contact,
    Volleyball,
    Home,
    Award,
    History,
    TrendingUp,
    HelpCircle,
    Search,
    User,
    ChevronLeft,
    ChevronRight,
    User2,
    User2Icon,
    GroupIcon,
    UserRound,
    Wallet2,
    GitGraph,
    AlertTriangle,
    Mail,
    Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/REVWHEELlogo.png';
import { useTranslation } from '../../../hooks/useTranslation';
import { isOnFreeTrial, getFreeTrialRemainingDays } from '../../../utils/subscriptionUtils';
import SignupModal from '../../../Components/SignupModal.jsx';

const MenuItem = ({ icon: Icon, text, translationKey, path, active, collapsed, badge, onClick }) => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { t, language } = useTranslation();
    const tr = (key, enFallback, frFallback) => {
        const val = t(key);
        if (!val || val === key) {
            return language === 'fr' ? (frFallback || enFallback) : enFallback;
        }
        return val;
    };
    const displayText = translationKey ? t(translationKey) : text;

    const handleClick = () => {
        // Handle navigation first
        if (translationKey === "logout") {
            logout();
        } else if (path) {
            navigate(path);
        }
        
        // Then handle sidebar toggle if provided
        if (onClick) {
            onClick();
        }
    };

    return (
        <motion.div
            className={`flex items-center p-2 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
                active 
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
            } ${collapsed ? 'justify-center' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
        >
            <div className={`relative ${active ? 'text-blue-600' : 'text-gray-500'}`}>
                <Icon size={collapsed ? 20 : 18} />
                {badge && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
            </div>
            
            {!collapsed && (
                <span className={`ml-2 text-sm transition-opacity duration-200 ${active ? 'text-blue-700' : 'text-gray-700'}`}>
                    {displayText}
                </span>
            )}
        </motion.div>
    );
};

const SearchBox = ({ collapsed }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { t, language } = useTranslation();
    const tr = (key, enFallback, frFallback) => {
        const val = t(key);
        if (!val || val === key) {
            return language === 'fr' ? (frFallback || enFallback) : enFallback;
        }
        return val;
    };
    
    if (collapsed && !isExpanded) {
        return (
            <div className="px-2 py-2">
                <button 
                    onClick={() => setIsExpanded(true)}
                    className="w-full flex justify-center p-1.5 rounded-lg text-gray-500 hover:bg-gray-50"
                >
                    <Search size={18} />
                </button>
            </div>
        );
    }
    
    return (
        <div className={`px-4 py-2 ${collapsed ? 'absolute top-0 left-full ml-2 bg-white shadow-lg rounded-lg z-50 w-64' : ''}`}>
            <div className="relative">
                <input 
                    type="text" 
                    placeholder={t('search')}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    autoFocus={collapsed && isExpanded}
                    onBlur={() => collapsed && setIsExpanded(false)}
                />
                <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
};

const Sidebar = ({ collapsed = false, toggleSidebar }) => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const location = useLocation();
    const currentPath = location.pathname;
    const { t, language } = useTranslation();
    const tr = (key, enFallback, frFallback) => {
        const val = t(key);
        if (!val || val === key) {
            return language === 'fr' ? (frFallback || enFallback) : enFallback;
        }
        return val;
    };
    const navigate = useNavigate();

    // Check if user is on free trial
    const onFreeTrial = isOnFreeTrial(user);
    const remainingDays = getFreeTrialRemainingDays(user);

    // Email verification modal state
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [sendingVerification, setSendingVerification] = useState(false);

    // Subscription alert translations
    const getTrialMessage = () => {
        if (remainingDays === 0) {
            return t('freeTrialExpired') || "Free trial expired";
        } else if (remainingDays === 1) {
            return t('freeTrialExpiresToday') || "Free trial expires today";
        } else {
            return (t('freeTrialWarning') || "Free trial expires in {days} days").replace('{days}', remainingDays);
        }
    };

    const handleSendVerification = async () => {
        if (sendingVerification) return;
        setSendingVerification(true);
        try {
            await fetch(`https://api.revwheel.fr/api/user/send-verification-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: user?.user?.fullName || '',
                    email: user?.user?.email || ''
                })
            });
        } catch (e) {
            // no-op; still open modal to guide user
        } finally {
            setSendingVerification(false);
            setShowVerifyModal(true);
        }
    };

    // Define all menu items with their paths
    const menuItems = [
        { translationKey: "Analytics", icon: GitGraph, path: "/dashboard", badge: false },
        { translationKey: "customers", icon: UserRound, path: "/dashboard/customers", badge: false },
        { translationKey: "settings", icon: Settings, path: "/dashboard/settings" },
        { translationKey: "subscription", icon: Wallet2, path: "/dashboard/subscription", badge: false },
    ];

    // Helper function to check if a path is active
    const isActive = (path) => {
        if (!path) return false;

        // Exact match for dashboard root
        if (path === "/dashboard") {
            return currentPath === "/dashboard" || currentPath === "/dashboard/";
        }

        // For other paths, check if current path matches exactly or starts with path/
        return currentPath === path ||
            currentPath === path + "/" ||
            (currentPath.startsWith(path + "/") && path !== "/dashboard");
    };

    return (
        <div className={`fixed h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-30 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo Section with toggle button - compact space but larger logo */}
            <div className={`${collapsed ? 'py-2' : 'py-3 px-4'} flex items-center border-b border-gray-100 relative`}>
                {!collapsed ? (
                    <>
                        <Link to={'/'} className='flex-1 flex justify-center overflow-hidden'>
                            <img 
                                src={logo} 
                                alt="SpinRate Logo" 
                                className="h-32 w-auto object-contain max-w-[80%]"
                            />
                        </Link>
                        <button 
                            onClick={toggleSidebar}
                            className="flex-shrink-0 p-1.5 rounded-md text-gray-500 hover:bg-gray-50 ml-1"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    </>
                ) : (
                    <div className="w-full flex justify-center">
                        <button 
                            onClick={toggleSidebar}
                            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            

            {/* User Profile */}
            <div className={`px-4 py-3 border-b border-gray-100 ${collapsed ? 'flex justify-center items-center' : ''}`}>
                <div className={`${collapsed ? '' : 'flex items-start'}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                        {user ? user?.user?.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    {!collapsed && (
                        <div className="ml-2 flex-1">
                            <p className="text-sm font-medium text-gray-700 truncate max-w-[160px]">{user?.user?.fullName || 'User'}</p>
                            <p className="text-xs text-gray-600">{user?.user?.email}</p>
                            {/* <p className="text-xs text-gray-500">{user?.user?.userName}</p> */}
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Items - adjusted spacing */}
            <div className={`mt-1 flex-grow overflow-y-auto ${collapsed ? 'px-2' : 'px-4'}`}>
                {menuItems.map(item => (
                    <MenuItem
                        key={item.translationKey}
                        icon={item.icon}
                        translationKey={item.translationKey}
                        path={item.path}
                        active={isActive(item.path)}
                        collapsed={collapsed}
                        badge={item.badge}
                        onClick={toggleSidebar}
                    />
                ))}
            </div>

            {/* Email Verification Alert - shown above Free Trial */}
            {!collapsed && user?.user && user?.user?.email && user?.user?.emailVerified === false && (
                <div className="px-4 py-3 border-t border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                    >
                        <div className="flex items-start">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="ml-2 flex-1">
                                <p className="text-xs font-medium text-blue-800">
                                    {tr('pleaseVerifyEmailForFullAccess', 'Please verify your email to gain full access to the dashboard.', 'Veuillez vérifier votre e-mail pour un accès complet au tableau de bord.')}
                                </p>
                                <button
                                    onClick={handleSendVerification}
                                    disabled={sendingVerification}
                                    className={`mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded font-medium transition-colors ${sendingVerification ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <span className="inline-flex items-center">
                                        <Mail className="h-3.5 w-3.5 mr-1.5" />
                                        {sendingVerification 
                                            ? tr('resending', 'Sending...', 'Envoi...') 
                                            : tr('sendVerificationEmail', 'Send verification email', "Envoyer l'e-mail de vérification")}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Free Trial Alert */}
            {onFreeTrial && !collapsed && (
                <div className="px-4 py-3 border-t border-gray-100">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-orange-50 border border-orange-200 rounded-lg p-3"
                    >
                        <div className="flex items-start">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <div className="ml-2 flex-1">
                                                                 <p className="text-xs font-medium text-orange-800">
                                     {getTrialMessage()}
                                 </p>
                                 <button
                                     onClick={() => {
                                         navigate('/dashboard/subscription');
                                         if (toggleSidebar) toggleSidebar();
                                     }}
                                     className="mt-2 text-xs bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded font-medium transition-colors"
                                 >
                                     {t('upgradeNow') || "Upgrade Now"}
                                 </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Verification Modal */}
            {showVerifyModal && (
                <SignupModal
                    closeModal={() => setShowVerifyModal(false)}
                    openToVerificationNotice={true}
                    initialEmail={user?.user?.email || ''}
                    initialFullName={user?.user?.fullName || ''}
                    closeTo={currentPath}
                />
            )}

            {/* Sign Out Button at the bottom */}
            <div className={`${collapsed ? 'px-2' : 'px-4'} py-4 border-t border-gray-100`}>
                <MenuItem
                    icon={LogOut}
                    translationKey="logout"
                    path={null}
                    active={false}
                    collapsed={collapsed}
                    badge={false}
                    onClick={toggleSidebar}
                />
            </div>
        </div>
    );
};

export default Sidebar;