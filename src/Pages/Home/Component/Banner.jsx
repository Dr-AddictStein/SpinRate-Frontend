import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mobile from '../../../assets/mobile.png';
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";

// Translations object
const translations = {
    en: {
        tagline: "Welcome to SpinRate",
        heading1: "Increase your",
        heading2: "Google Reviews",
        heading3: "Effortlessly!",
        description: "Boost your Google Reviews and online visibility without asking for reviews. Our reward-driven experience encourages clients to scan a qr code, to leave a review and spin the wheel!",
        startNow: "Start now",
        learnMore: "Learn more"
    },
    fr: {
        tagline: "Bienvenue à SpinRate",
        heading1: "Augmentez vos",
        heading2: "Avis Google",
        heading3: "Sans effort!",
        description: "Augmentez vos avis Google et votre visibilité en ligne sans demander d'avis. Notre expérience basée sur les récompenses encourage les clients à scanner un code QR, à laisser un avis et à faire tourner la roue!",
        startNow: "Commencer",
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
        <section className="relative bg-white pt-24 md:pt-16 pb-20 md:pb-32 overflow-x-hidden">
            {/* Enhanced decorative elements */}
            <div className="absolute top-20 right-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50 floating" />
            <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-indigo-100 rounded-full opacity-60 floating" />
            <div className="absolute top-40 left-10 w-12 h-40 bg-indigo-50 rounded-full opacity-40 floating" />
            <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-30 floating" />

            {/* Modern lines decoration - MOVED FURTHER LEFT */}
            <div className="absolute top-1/3 right-0 w-40 h-2 bg-blue-400 opacity-70 floating" />
            <div className="absolute top-2/3 -left-[3%] w-32 h-2 bg-indigo-300 opacity-60 floating" />
            {/* This is the line causing the issue - moved further left and adjusted position */}
            <div className="absolute bottom-1/4 left-16 w-24 h-2 bg-purple-300 opacity-50 floating" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile: Show phone on top for small screens */}
                <div className="block md:hidden mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                rotateZ: [0, 1, 0]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            className="origin-bottom w-4/5 max-w-xs relative"
                        >
                            {/* Add glow effect behind the phone */}
                            <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-3xl opacity-20 transform scale-90"></div>
                            <img
                                src={mobile}
                                alt="Mobile App Interface"
                                className="w-full h-auto relative z-10"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Text Content - Added margin bottom for spacing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-6 space-y-6 md:space-y-8 z-10 mb-8"
                    >
                        {/* Enhanced tag line */}
                        <motion.div
                            ref={taglineRef}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-block px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-base font-medium shadow-sm"
                        >
                            {t.tagline}
                        </motion.div>

                        {/* Main Heading with animations - BIGGER TEXT */}
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

                        {/* Description text - BIGGER & Added padding bottom */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed pb-6"
                        >
                            {t.description}
                        </motion.p>

                        {/* CTA Button - ENHANCED */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="pt-4 md:pt-6"
                        >
                            <motion.button
                                onClick={() => navigate('/dashboard')}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 md:px-10 md:py-5 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                {t.startNow}
                            </motion.button>
                            
                            {/* Add a secondary action */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-4 px-8 py-4 md:px-10 md:py-5 bg-white text-blue-600 text-lg font-bold rounded-xl shadow-md border border-blue-200 hover:bg-blue-50 transition-all duration-300"
                            >
                                {t.learnMore}
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: App Mockup - Hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden md:block md:col-span-6 relative z-10"
                    >
                        {/* Mobile mockups */}
                        <div className="relative flex items-center justify-center">
                            {/* Enhanced floating circles */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.8, scale: 1 }}
                                transition={{ duration: 0.8, delay: 1.8 }}
                                className="absolute -top-16 -left-16 w-40 h-40 bg-blue-100 rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                transition={{ duration: 0.8, delay: 2.2 }}
                                className="absolute top-1/3 -left-8 w-20 h-20 bg-indigo-100 rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.7, scale: 1 }}
                                transition={{ duration: 0.8, delay: 2.0 }}
                                className="absolute -bottom-12 -right-20 w-36 h-36 bg-blue-50 rounded-full"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                                className="relative z-20"
                            >
                                {/* Phone with enhanced effects */}
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotateZ: [0, 2, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    className="origin-bottom transform scale-150 relative"
                                >
                                    {/* Add glow effect behind the phone */}
                                    <div className="absolute inset-0 bg-blue-400 rounded-full filter blur-3xl opacity-20 transform scale-90"></div>
                                    
                                    {/* Add a decorative ring around the phone */}
                                    <div className="absolute inset-0 border-4 border-blue-200 rounded-3xl opacity-70 transform scale-105"></div>
                                    
                                    <img
                                        src={mobile}
                                        alt="Mobile App Interface"
                                        className="w-full h-auto max-w-md mx-auto relative z-10 drop-shadow-2xl"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced background gradient and patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70 -z-10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCQkRERkYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDI0VjBoNnYzMHpNMzYgNDhoLTZ2LTZoNnY2em0tNiAwSDI0di02aDZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-15 -z-10" />
        </section>
    );
};

export default Hero;