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
    Wallet2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png';

const MenuItem = ({ icon: Icon, text, path, active, collapsed, badge, onClick }) => {
    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        
        if (text === "Sign Out") {
            logout();
        } else if (path) {
            navigate(path);
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
                    {text}
                </span>
            )}
        </motion.div>
    );
};

const SearchBox = ({ collapsed }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
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
                    placeholder="Search..." 
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

    // Define all menu items with their paths
    const menuItems = [
        { text: "Analytics", icon: BarChart, path: "/dashboard", badge: false },
        { text: "Customers", icon: UserRound, path: "/dashboard/customers", badge: false },
        { text: "Settings", icon: Settings, path: "/dashboard/settings" },
        { text: "Subscription", icon: Wallet2, path: "/dashboard/subscription", badge: false },
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
        <div className={`h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
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
                        {user ? user?.user?.userName.charAt(0).toUpperCase() : 'U'}
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
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        path={item.path}
                        active={isActive(item.path)}
                        collapsed={collapsed}
                        badge={item.badge}
                    />
                ))}
            </div>

            {/* Sign Out Button at the bottom */}
            <div className={`mt-auto mb-6 ${collapsed ? 'px-2' : 'px-4'}`}>
                <MenuItem
                    icon={LogOut}
                    text="Sign Out"
                    path={null}
                    active={false}
                    collapsed={collapsed}
                    badge={false}
                />
            </div>
        </div>
    );
};

export default Sidebar;