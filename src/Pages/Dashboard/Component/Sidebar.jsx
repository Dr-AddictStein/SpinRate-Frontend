import React from 'react';
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
    TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useLogout } from '../../../hooks/useLogout';
import { useNavigate, useLocation } from 'react-router-dom';

const MenuItem = ({ icon: Icon, text, path, active }) => {
    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleClick = () => {
        if (text === "Sign Out") {
            logout();
        } else if (path) {
            navigate(path);
        }
    };

    return (
        <motion.div
            className={`flex items-center p-3 my-2 mx-3 rounded-md cursor-pointer ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
        >
            <Icon className={`w-5 h-5 mr-3 ${active ? 'text-blue-600' : 'text-gray-600'}`} />
            <span className={`${active ? 'font-semibold text-black' : 'text-gray-700'}`}>{text}</span>
        </motion.div>
    );
};

const Sidebar = () => {
    const { user } = useAuthContext();
    const location = useLocation();
    const currentPath = location.pathname;

    // Define menu items with their paths
    const menuItems = [
        { text: "Analytics", icon: BarChart, path: "/dashboard" },
        { text: "Rate", icon: TrendingUp, path: "/dashboard/rate" },
        { text: "My Team", icon: BookCopy, path: "/dashboard/myTeam" },
        { text: "Leaderboard", icon: Award, path: "/dashboard/leaderboard" },
        { text: "History", icon: History, path: "/dashboard/history" },
    ];

    const bottomMenuItems = [
        { text: "Home", icon: Home, path: "/" },
        { text: "Settings", icon: Settings, path: "/dashboard/settings" },
        { text: "Sign Out", icon: LogOut, path: null }
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
        <div className='fixed h-screen bg-white rounded-l-lg 2xl:w-72 w-52 border-r border-gray-200 flex flex-col' style={{ maxHeight: 'calc(100vh)' }}>
            {/* Logo Section */}
            <div className='p-6'>
                <div className='flex items-center'>
                    <div className='flex items-center justify-center w-8 h-8 bg-purple-600 rounded-md'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 12L12 7L17 12L12 17L7 12Z" fill="white" />
                            <path d="M17 4L20 7L17 10" stroke="white" strokeWidth="2" />
                            <path d="M7 4L4 7L7 10" stroke="white" strokeWidth="2" />
                            <path d="M17 20L20 17L17 14" stroke="white" strokeWidth="2" />
                            <path d="M7 20L4 17L7 14" stroke="white" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className='ml-2 text-xl font-bold'>SpinRate</span>
                </div>
            </div>

            {/* Scrollable Menu Items */}
            <div className='mt-4 flex-grow overflow-y-auto'>
                {menuItems.map(item => (
                    <MenuItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        path={item.path}
                        active={isActive(item.path)}
                    />
                ))}
            </div>

            {/* Bottom Menu Items */}
            <div className='mb-6'>
                {bottomMenuItems.map(item => (
                    <MenuItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        path={item.path}
                        active={isActive(item.path)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;