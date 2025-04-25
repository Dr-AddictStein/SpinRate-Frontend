import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import logo from "../../../assets/Wheelix final logo.png";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useTranslation } from "../../../hooks/useTranslation";
import ukFlag from "../../../assets/flags/uk-flag.svg";
import franceFlag from "../../../assets/flags/france-flag.svg";
import LoginModal from "../../../Components/LoginModal";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { language, changeLanguage } = useLanguage();
    const { t } = useTranslation(); 

    // Handle scroll event to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
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

    // Function to handle smooth scrolling to section
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close mobile menu if open
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img 
                                src={logo} 
                                alt="Klane Logo" 
                                className={`h-20 md:h-28 lg:h-32 xl:h-36 w-auto object-contain transition-transform duration-300 hover:scale-105 -my-8 md:-my-10 lg:-my-12 xl:-my-14 ${!scrolled ? 'brightness-110 contrast-125' : ''}`}
                            />
                        </Link>
                    </div>

                    {/* Desktop navigation layout */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* Navigation links */}
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-400 font-medium transition-colors duration-200`}
                            >
                                {t('howItWorks')}
                            </button>
                            <button
                                onClick={() => scrollToSection('features')}
                                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-400 font-medium transition-colors duration-200`}
                            >
                                {t('features')}
                            </button>
                            <button
                                onClick={() => scrollToSection('reviews')}
                                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-400 font-medium transition-colors duration-200`}
                            >
                                {t('reviews')}
                            </button>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className={`${scrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-400 font-medium transition-colors duration-200`}
                            >
                                {t('pricing')}
                            </button>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/dashboard"
                                className="bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                            >
                                {t('getStarted')}
                            </Link>
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                            >
                                {t('signIn')}
                            </button>
                        </div>

                        {/* Language flags moved to the far right */}
                        <div className="flex items-center space-x-3 ml-4">
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

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        {/* Add mobile language flags right next to menu button */}
                        <div className="flex items-center space-x-2 mr-3">
                            <button 
                                onClick={() => changeLanguage('fr')}
                                className={`transition-all duration-200 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-indigo-600 scale-105' : 'opacity-75'}`}
                                aria-label="Switch to French"
                            >
                                <img src={franceFlag} alt="French" className="w-7 h-5 rounded-sm" />
                            </button>
                            <button 
                                onClick={() => changeLanguage('en')}
                                className={`transition-all duration-200 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-indigo-600 scale-105' : 'opacity-75'}`}
                                aria-label="Switch to English"
                            >
                                <img src={ukFlag} alt="English" className="w-7 h-5 rounded-sm" />
                            </button>
                        </div>
                        
                        <button
                            onClick={toggleMenu}
                            className={`inline-flex items-center justify-center p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-400 focus:outline-none transition-colors duration-200`}
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
                    {/* Navigation links */}
                    <button
                        className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        onClick={() => scrollToSection('how-it-works')}
                    >
                        {t('howItWorks')}
                    </button>
                    <button
                        className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        onClick={() => scrollToSection('features')}
                    >
                        {t('features')}
                    </button>
                    <button
                        className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        onClick={() => scrollToSection('reviews')}
                    >
                        {t('reviews')}
                    </button>
                    <button
                        className="block w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                        onClick={() => scrollToSection('pricing')}
                    >
                        {t('pricing')}
                    </button>
                    <Link
                        to="/dashboard"
                        className="block w-full px-3 py-3 text-center bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] text-white font-semibold rounded-lg mt-3 transition-colors duration-200"
                        onClick={toggleMenu}
                    >
                        {t('getStarted')}
                    </Link>
                    <button
                        className="block w-full px-3 py-3 text-center bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] text-white font-semibold rounded-lg mt-3 transition-colors duration-200"
                        onClick={() => {
                            toggleMenu();
                            setIsLoginModalOpen(true);
                        }}
                    >
                        {t('signIn')}
                    </button>
                </div>
            </div>

            {/* Login Modal */}
            {isLoginModalOpen && (
                <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
            )}
        </nav>
    );
};

export default Navbar;