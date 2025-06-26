import React from "react";
import { Instagram } from "lucide-react";
import logo from "../../../assets/REVWHEELlogo.png";
import { useTranslation } from "../../../hooks/useTranslation";
import { Link } from "react-router-dom";

const Footer = () => {
    const { t } = useTranslation();
    
    // Function to handle smooth scrolling to section
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <footer className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Company Info */}
                    <div className="lg:col-span-1 flex flex-col items-center md:items-start">
                        <div className="mb-6">
                            <img
                                src={logo}
                                alt="RevWheel Logo"
                                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <a
                                href="https://www.instagram.com/RevWheel.fr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@RevWheel.fr?is_from_webapp=1&sender_device=pc"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-10 h-10 rounded-full flex items-center justify-center border border-blue-200 text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('navigation')}</h3>
                        <ul className="space-y-3 w-full max-w-xs md:max-w-none">
                            <li className="text-center md:text-left">
                                <button 
                                    onClick={() => scrollToSection('how-it-works')}
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('howItWorks')}
                                </button>
                            </li>
                            <li className="text-center md:text-left">
                                <button 
                                    onClick={() => scrollToSection('features')}
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('features')}
                                </button>
                            </li>
                            <li className="text-center md:text-left">
                                <button 
                                    onClick={() => scrollToSection('reviews')}
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('reviews')}
                                </button>
                            </li>
                            <li className="text-center md:text-left">
                                <button 
                                    onClick={() => scrollToSection('pricing')}
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('pricing')}
                                </button>
                            </li>
                            <li className="text-center md:text-left">
                                <button 
                                    onClick={() => scrollToSection('faq')}
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('faq')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Account & Legal */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('account')}</h3>
                        <ul className="space-y-3 w-full max-w-xs md:max-w-none">
                            <li className="text-center md:text-left">
                                <Link 
                                    to="/dashboard" 
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('getStarted')}
                                </Link>
                            </li>
                            <li className="text-center md:text-left">
                                <a 
                                    href="#" 
                                    onClick={(e) => { e.preventDefault(); /* Handle login modal */ }} 
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('signIn')}
                                </a>
                            </li>
                            <li className="text-center md:text-left">
                                <Link 
                                    to="/terms-and-conditions" 
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('termsAndConditions')}
                                </Link>
                            </li>
                            <li className="text-center md:text-left">
                                <Link 
                                    to="/privacy-policy" 
                                    className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200 md:flex md:items-center"
                                >
                                    <span className="text-blue-500 mr-2 hidden md:inline">›</span>
                                    {t('privacyPolicy')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 mt-16 pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
                        <p className="text-gray-600 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} RevWheel. {t('allRightsReserved')}
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link 
                                to="/terms-and-conditions" 
                                className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200"
                            >
                                {t('termsAndConditions')}
                            </Link>
                            <Link 
                                to="/privacy-policy" 
                                className="text-gray-600 hover:text-blue-500 text-sm transition-colors duration-200"
                            >
                                {t('privacyPolicy')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;