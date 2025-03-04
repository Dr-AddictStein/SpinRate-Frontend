import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mobile from '../../../assets/mobile.png';

const Hero = () => {
    const taglineRef = useRef(null);

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
        <section className="relative bg-white pt-20 md:pt-24 pb-12 overflow-x-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 right-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-50 floating" />
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-indigo-100 rounded-full opacity-60 floating" />
            <div className="absolute top-40 left-10 w-8 h-32 bg-indigo-50 rounded-full opacity-40 floating" />

            {/* Modern lines decoration */}
            <div className="absolute top-1/3 right-0 w-32 h-1 bg-blue-400 opacity-70 floating" />
            <div className="absolute top-2/3 left-0 w-24 h-1 bg-indigo-300 opacity-60 floating" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile: Show phone on top for small screens */}
                <div className="block md:hidden mb-8">
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
                            className="origin-bottom w-3/4 max-w-xs"
                        >
                            <img
                                src={mobile}
                                alt="Mobile App Interface"
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-5 space-y-4 md:space-y-6 z-10"
                    >
                        {/* Subtle tag line */}
                        <motion.div
                            ref={taglineRef}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-block px-4 py-1 bg-blue-50 text-blue-500 rounded-full text-sm font-medium"
                        >
                            Welcome to SpinRate
                        </motion.div>

                        {/* Main Heading with animations */}
                        <div className="space-y-1 md:space-y-2">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
                            >
                                Increase your
                            </motion.h1>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
                            >
                                Google Reviews
                            </motion.h1>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="text-xl sm:text-2xl lg:text-4xl font-extrabold tracking-tight text-gray-900"
                            >
                                Without doing anything
                            </motion.h1>
                        </div>

                        {/* Description text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-base md:text-lg text-gray-500 max-w-3xl"
                        >
                            We've transformed how
                            businesses collect Google Reviews and strengthen their online visibility. Our
                            groundbreaking approach enables you to captivate customers with an engaging and
                            rewarding experience while amplifying their digital presence on Google
                        </motion.p>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="pt-2 md:pt-5"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 md:px-8 md:py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
                            >
                                Start now
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: App Mockup - Hidden on mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="hidden md:block md:col-span-7 relative z-10"
                    >
                        {/* Mobile mockups */}
                        <div className="relative flex items-center justify-center">
                            {/* Enhanced floating circles */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.8, scale: 1 }}
                                transition={{ duration: 0.8, delay: 1.8 }}
                                className="absolute -top-16 -left-16 w-32 h-32 bg-blue-100 rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.6, scale: 1 }}
                                transition={{ duration: 0.8, delay: 2.2 }}
                                className="absolute top-1/3 -left-8 w-16 h-16 bg-indigo-100 rounded-full"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.7, scale: 1 }}
                                transition={{ duration: 0.8, delay: 2.0 }}
                                className="absolute -bottom-12 -right-20 w-28 h-28 bg-blue-50 rounded-full"
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                                className="relative z-20"
                            >
                                {/* Phone - Single Larger Phone */}
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
                                    className="origin-bottom transform scale-150"
                                >
                                    <img
                                        src={mobile}
                                        alt="Mobile App Interface"
                                        className="w-full h-auto max-w-md mx-auto"
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background gradient and patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50 -z-10" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNCQkRERkYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwSDI0VjBoNnYzMHpNMzYgNDhoLTZ2LTZoNnY2em0tNiAwSDI0di02aDZ2NnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 -z-10" />
        </section>
    );
};

export default Hero;