import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

// Translations object
const translations = {
    en: {
        tagline: "Welcome to SpinRate",
        heading1: "Boost your",
        heading2: "Google Reviews",
        heading3: "Effortlessly!",
        description: "Businesses increase their Google reviews by an average of 300 per month with us.",
        startNow: "Start Free Trial",
        learnMore: "Learn more"
    },
    fr: {
        tagline: "Bienvenue à SpinRate",
        heading1: "Boostez vos",
        heading2: "Avis Google",
        heading3: "Sans effort!",
        description: "Les entreprises augmentent en moyenne leurs avis Google de 300 par mois avec nous.",
        startNow: "Commencer l'essai gratuit",
        learnMore: "En savoir plus"
    }
};

const Hero = () => {
    const taglineRef = useRef(null);
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    // Subtle floating animation for decorative elements
    useEffect(() => {
        const floatingElements = document.querySelectorAll('.floating');

        floatingElements.forEach((element, index) => {
            // Create different animation durations and delays for each element
            const duration = 3 + Math.random() * 2;
            const delay = Math.random() * 2;

            element.animate([
                { transform: 'translateY(0px)' },
                { transform: 'translateY(-10px)' },
                { transform: 'translateY(0px)' }
            ], {
                duration: duration * 1000,
                iterations: Infinity,
                delay: delay * 1000,
                easing: 'ease-in-out'
            });
        });
    }, []);

    return (
        <section className="relative bg-white pt-16 md:pt-20 pb-16 md:pb-24 overflow-hidden flex flex-col items-center">
            {/* Repositioned decorative elements to the sides */}
            <div className="absolute top-20 -left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 floating hidden md:block" />
            <div className="absolute bottom-20 -right-10 w-20 h-20 bg-indigo-100 rounded-full opacity-60 floating hidden md:block" />
            <div className="absolute top-40 -left-20 w-12 h-40 bg-indigo-50 rounded-full opacity-40 floating hidden md:block" />
            <div className="absolute bottom-40 -right-20 w-24 h-24 bg-purple-100 rounded-full opacity-30 floating hidden md:block" />

            {/* Repositioned lines decoration to the sides - hidden on mobile */}
            <div className="absolute top-1/3 right-0 w-40 h-2 bg-blue-400 opacity-50 floating hidden md:block" />
            <div className="absolute top-2/3 -left-20 w-32 h-2 bg-indigo-300 opacity-40 floating hidden md:block" />
            <div className="absolute bottom-1/4 -right-10 w-24 h-2 bg-purple-300 opacity-30 floating hidden md:block" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Centered content for both mobile and desktop */}
                <div className="flex flex-col items-center text-center">
                    {/* Centered Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 md:space-y-8 z-10 mb-8 max-w-3xl"
                    >
                        {/* Main Heading with animations - BIGGER TEXT and centered */}
                        <div className="space-y-2 md:space-y-3">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
                            >
                                {t.heading1}
                            </motion.h1>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-blue-600"
                            >
                                {t.heading2}
                            </motion.h1>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900"
                            >
                                {t.heading3}
                            </motion.h1>
                        </div>

                        {/* Description text - BIGGER & centered */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed pb-4"
                        >
                            {t.description}
                        </motion.p>

                        {/* CTA Buttons - ENHANCED and centered */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="pt-4 md:pt-6 flex flex-wrap justify-center gap-4"
                        >
                            <motion.button
                                onClick={() => navigate('/dashboard')}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 md:px-10 md:py-5 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                {t.startNow}
                            </motion.button>
                            
                        </motion.div>
                    </motion.div>

                    {/* Widescreen Video Replacement */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative z-10 w-full max-w-5xl mx-auto mt-4 md:mt-6"
                    >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            {/* Video glow effect */}
                            <div className="absolute inset-0 bg-blue-400 rounded-2xl filter blur-xl opacity-20"></div>
                            
                            {/* Video wrapper with aspect ratio */}
                            <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                                {/* Actual video element */}
                                <motion.video
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1.5 }}
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src="https://s3.eu-west-2.amazonaws.com/wheelysales/landing/wheely-sales.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </motion.video>
                                
                                {/* Optional overlay gradient for better text contrast if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40"></div>
                            </div>
                            
                            {/* Decorative border */}
                            <div className="absolute inset-0 border border-blue-200/30 rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced background gradient and patterns with reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-50 -z-10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCQkRERkYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDI0VjBoNnYzMHpNMzYgNDhoLTZ2LTZoNnY2em0tNiAwSDI0di02aDZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 -z-10" />
            
            {/* Subtle radial glow for added awesomeness */}
            <div className="absolute inset-0 bg-radial-gradient-blue opacity-20 -z-10" />
        </section>
    );
};

export default Hero;