import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import allPhone from "../../../assets/allphone.png";

export default function VideoSection() {
    // Set up animations for sections based on scroll position
    const controls = useAnimation();
    const titleControls = useAnimation();
    const listControls = useAnimation();
    const videoControls = useAnimation();
    const phoneControls = useAnimation();

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
            titleControls.start("visible");
            listControls.start("visible");
            videoControls.start("visible");
            phoneControls.start("visible");
        }
    }, [controls, isInView, titleControls, listControls, videoControls, phoneControls]);

    // Animation variants
    const fadeInUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.4, 0, 0.2, 1] 
            } 
        }
    };

    const staggerListVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const listItemVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                duration: 0.5, 
                ease: "easeOut" 
            } 
        }
    };

    return (
        <section 
            ref={sectionRef}
            className="px-6 md:px-20 py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50"
        >
            {/* Decorative background elements */}
            <motion.div 
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-20 -z-10"
                animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-40 right-10 w-72 h-72 rounded-full bg-indigo-100 opacity-20 -z-10"
                animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Animated lines */}
            <motion.div 
                className="absolute top-1/4 right-0 w-32 h-1 bg-blue-200 -z-10"
                animate={{ 
                    width: [0, 32, 0],
                    opacity: [0, 0.5, 0],
                    x: [0, 100, 200]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute bottom-1/3 left-0 w-32 h-1 bg-indigo-200 -z-10"
                animate={{ 
                    width: [0, 64, 0],
                    opacity: [0, 0.5, 0],
                    x: [0, 100, 200]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            {/* Main Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Text and Bullet Points Section - Completely redesigned */}
                <motion.div 
                    className="text-center md:text-left space-y-8"
                    initial="hidden"
                    animate={controls}
                    variants={fadeInUpVariant}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1 mb-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                        Customer Experience
                    </motion.div>
                    
                    <motion.h1 
                        className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
                        initial="hidden"
                        animate={titleControls}
                        variants={fadeInUpVariant}
                    >
                        Simple & Engaging <span className="text-blue-600">Experience</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg text-gray-600 max-w-lg"
                    >
                        Our platform transforms the review collection process into an engaging experience 
                        that customers actually enjoy, increasing your online visibility and customer loyalty.
                    </motion.p>
                    
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
                        initial="hidden"
                        animate={listControls}
                        variants={staggerListVariant}
                    >
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                            variants={listItemVariant}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <motion.div 
                                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0"
                                whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <h3 className="font-semibold text-lg text-center sm:text-left">Get More Reviews</h3>
                            <p className="text-gray-600 text-sm mt-2 text-center sm:text-left">
                                Encourage customers to share their experiences on Google.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                            variants={listItemVariant}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <motion.div 
                                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0"
                                whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                            <h3 className="font-semibold text-lg text-center sm:text-left">Boost Loyalty</h3>
                            <p className="text-gray-600 text-sm mt-2 text-center sm:text-left">
                                Let customers spin a wheel for rewards after leaving reviews.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                            variants={listItemVariant}
                            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <motion.div 
                                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto sm:mx-0"
                                whileHover={{ scale: 1.1, backgroundColor: "#DBEAFE" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </motion.div>
                            <h3 className="font-semibold text-lg text-center sm:text-left">Drive Returns</h3>
                            <p className="text-gray-600 text-sm mt-2 text-center sm:text-left">
                                Grow your email list and encourage customers to return.
                            </p>
                        </motion.div>
                    </motion.div>
                    
                    <motion.button 
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#2098F3] transition-all mt-6"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        Start Free Trial
                    </motion.button>
                </motion.div>

                {/* Video Section */}
                <motion.div 
                    className="relative w-full flex justify-center"
                    initial="hidden"
                    animate={videoControls}
                    variants={fadeInUpVariant}
                >
                    <motion.div 
                        className="overflow-hidden rounded-xl shadow-lg border border-gray-200 relative"
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Decorative element */}
                        <motion.div 
                            className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-blue-500 opacity-80 z-10"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div 
                            className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-indigo-500 opacity-70 z-10"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                        
                        <iframe
                            className="w-[320px] sm:w-[400px] md:w-[480px] lg:w-[550px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] relative z-0"
                            src="https://www.youtube.com/embed/W-ND-zTvFB8?si=waDEbDFOuY0LGij4"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </motion.div>
            </div>

            {/* Section-2 */}
            <motion.div 
                className="text-center px-6 py-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.5 }}
            >
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                    Engage Customers & Make Reviews Fun!
                </h2>
                <motion.div 
                    className="h-1 w-24 bg-blue-400 mx-auto mt-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "6rem" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                />
            </motion.div>

            
        </section>
    );
}