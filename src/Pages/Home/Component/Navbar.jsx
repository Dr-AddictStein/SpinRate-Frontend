import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import logo from "../../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useTranslation } from "../../../hooks/useTranslation";
import ukFlag from "../../../assets/flags/uk-flag.svg";
import franceFlag from "../../../assets/flags/france-flag.svg";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation();

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup event listener on component unmount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={logo} 
                                alt="Klane Logo" 
                                className="h-20 md:h-28 lg:h-32 xl:h-36 w-auto object-contain transition-transform duration-300 hover:scale-105 -my-8 md:-my-10 lg:-my-12 xl:-my-14" 
                            />
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {/* Language flags */}
                            <div className="flex items-center space-x-4">
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
                        </div>
                    </div>

                    {/* Get Started button */}
                    <div className="hidden md:block flex items-center space-x-4">
                        <Link
                            to="/dashboard"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            {t('getStarted')}
                        </Link>
                        <Link
                            to="/dashboard"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                        >
                            {t('signIn')}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors duration-200"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div 
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="px-4 pt-2 pb-4 space-y-2 bg-white shadow-lg rounded-b-lg">
                    {/* Language flags for mobile */}
                    <div className="flex justify-center space-x-4 my-3">
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
                    
                    <Link
                        to="/dashboard"
                        className="block w-full px-3 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-3 transition-colors duration-200"
                    >
                        {t('getStarted')}
                    </Link>
                    <Link
                        to="/dashboard"
                        className="block w-full px-3 py-3 text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-3 transition-colors duration-200"
                    >
                        {t('signIn')}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;