import React from "react";
import { Instagram } from "lucide-react";
import logo from "../../../assets/Wheelix final logo.png";
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <img
                            src={logo}
                            alt="Wheelix Logo"
                            className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105 -my-2"
                        />
                        <p className="text-gray-600 mb-6">
                            {t('footerText')}
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="https://www.instagram.com/wheelix.fr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@wheelix.fr?is_from_webapp=1&sender_device=pc"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                >
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('navigation')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <button 
                                    onClick={() => scrollToSection('how-it-works')}
                                    className="text-gray-600 hover:text-blue-500 flex items-center"
                                >
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('howItWorks')}
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('features')}
                                    className="text-gray-600 hover:text-blue-500 flex items-center"
                                >
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('features')}
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('reviews')}
                                    className="text-gray-600 hover:text-blue-500 flex items-center"
                                >
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('reviews')}
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('pricing')}
                                    className="text-gray-600 hover:text-blue-500 flex items-center"
                                >
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('pricing')}
                                </button>
                            </li>
                            <li>
                                <button 
                                    onClick={() => scrollToSection('faq')}
                                    className="text-gray-600 hover:text-blue-500 flex items-center"
                                >
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('faq')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Account & Legal */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('account')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/dashboard" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('getStarted')}
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => { e.preventDefault(); /* Handle login modal */ }} className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('signIn')}
                                </a>
                            </li>
                            <li>
                                <Link to="/terms-and-conditions" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('termsAndConditions')}
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('privacyPolicy')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Download Link */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('downloadLink')}</h3>
                        <div className="space-y-4">
                            <a href="#" className="block">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="Download on App Store"
                                    className="h-12"
                                />
                            </a>
                            <a href="#" className="block">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Get it on Google Play"
                                    className="h-12"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 mt-12 pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                    <p>© {new Date().getFullYear()} Wheelix. {t('allRightsReserved')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;