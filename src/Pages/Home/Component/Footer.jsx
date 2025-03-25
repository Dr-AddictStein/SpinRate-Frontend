import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import logo from "../../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";
import { useTranslation } from "../../../hooks/useTranslation";

const Footer = () => {
    const { t } = useTranslation();
    
    return (
        <footer className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <img
                            src={logo}
                            alt="Klane Logo"
                            className="h-20 md:h-28 w-auto object-contain transition-transform duration-300 hover:scale-105 -my-2"
                        />
                        <p className="text-gray-600 mb-6">
                            {t('footerText')}
                        </p>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Twitter"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="#"
                                aria-label="Google"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="18"
                                    height="18"
                                    fill="currentColor"
                                >
                                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="w-8 h-8 rounded-full flex items-center justify-center border border-blue-300 text-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('company')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('aboutUs')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('blog')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('ourTeam')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('services')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('contactUs')}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">{t('usefulLinks')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('pricing')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('appDownload')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('howItWorks')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('termsAndConditions')}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 hover:text-blue-500 flex items-center">
                                    <span className="text-blue-500 mr-2">›</span>
                                    {t('privacyPolicy')}
                                </a>
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
                    <p>{t('copyright')} <a href="#" className="text-blue-500 hover:underline">HiboTheme</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;