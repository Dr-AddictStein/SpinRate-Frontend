import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import man from '../../../assets/banner (1).png';

// Enhanced testimonial data with avatars
const testimonials = [
    {
        name: "David Peretti",
        role: "CEO, Kebab Terre Neuve",
        review:
            "Riwil's digital wheel game has not only increased our Google Reviews but also created genuine excitement among customers. They return often, boosting loyalty and allowing us to gather valuable customer insights.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        company: "Kebab Terre Neuve",
        location: "Lyon, France"
    },
    {
        name: "Sophie Martin",
        role: "Marketing Director, Foodie Hub",
        review:
            "The QR code system made it easy for our customers to leave reviews, and the interactive wheel kept them engaged. We've seen a significant increase in feedback and online presence!",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        company: "Foodie Hub",
        location: "Paris, France"
    },
    {
        name: "Marco Rossi",
        role: "Restaurant Owner",
        review:
            "Implementing this solution has transformed how we collect feedback. Our Google ratings have improved dramatically, and customers love the gamification aspect!",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        company: "Trattoria Milano",
        location: "Milan, Italy"
    },
];

const TestimonialCard = ({ testimonial, isActive, direction }) => {
    return (
        <motion.div
            className={`absolute inset-0 w-full h-full ${isActive ? "z-20" : "z-10"}`}
            initial={{ 
                opacity: 0, 
                x: direction === "right" ? 300 : -300,
                rotateY: direction === "right" ? 15 : -15
            }}
            animate={{ 
                opacity: 1, 
                x: 0,
                rotateY: 0,
                transition: { 
                    type: "spring", 
                    stiffness: 60, 
                    damping: 20 
                } 
            }}
            exit={{ 
                opacity: 0, 
                x: direction === "right" ? -300 : 300,
                rotateY: direction === "right" ? -15 : 15,
                transition: { duration: 0.4 } 
            }}
        >
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500 h-full flex flex-col">
                <div className="flex-1 p-8">
                    {/* Quote icon */}
                    <div className="text-6xl text-blue-100 leading-none mb-4">"</div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                        {testimonial.review}
                    </p>

                    <div className="mb-4 flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <motion.span 
                                key={i} 
                                className="text-yellow-400 text-xl"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i, duration: 0.3 }}
                            >
                                ★
                            </motion.span>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="flex items-center">
                        <div className="relative">
                            <motion.div 
                                className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name} 
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <motion.div 
                                className="absolute -bottom-1 -right-1 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                            >
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                </svg>
                            </motion.div>
                        </div>
                        <div className="ml-4">
                            <motion.h3 
                                className="text-lg font-bold text-gray-900"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                {testimonial.name}
                            </motion.h3>
                            <motion.p 
                                className="text-sm text-gray-600"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.3 }}
                            >
                                {testimonial.role}
                            </motion.p>
                            <motion.p 
                                className="text-xs text-blue-500"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.3 }}
                            >
                                {testimonial.location}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Feedback = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [autoplay, setAutoplay] = useState(true);
    const autoplayRef = useRef(null);
    const controls = useAnimation();

    // Floating animation for the image
    useEffect(() => {
        controls.start({
            y: [0, -15, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }
        });
    }, [controls]);

    // Handle autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayRef.current = setInterval(() => {
                goToNext();
            }, 8000);
        }
        
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [autoplay, currentIndex]);

    const goToPrev = () => {
        setDirection("left");
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    const pauseAutoplay = () => setAutoplay(false);
    const resumeAutoplay = () => setAutoplay(true);

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                {/* Animated circles */}
                <motion.div 
                    className="absolute -top-20 -right-20 w-80 h-80 bg-blue-50 rounded-full opacity-40"
                    animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-50 rounded-full opacity-50"
                    animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, -10, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-10"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1 mb-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                        Client Success Stories
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        <span className="text-blue-600">+650</span> Clients in Europe
                    </motion.h2>
                    
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "80px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-blue-500 mx-auto rounded-full my-4"
                    />
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-gray-600 text-lg"
                    >
                        See what our clients have to say about our innovative solutions
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Testimonial Cards */}
                    <div 
                        className="relative h-96 sm:h-80"
                        onMouseEnter={pauseAutoplay}
                        onMouseLeave={resumeAutoplay}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <TestimonialCard 
                                key={currentIndex}
                                testimonial={testimonials[currentIndex]} 
                                isActive={true}
                                direction={direction}
                            />
                        </AnimatePresence>
                        
                        {/* Navigation controls */}
                        <div className="absolute bottom-4 right-4 flex space-x-2 z-30">
                            <button
                                onClick={goToPrev}
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={goToNext}
                                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Pagination dots */}
                        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > currentIndex ? "right" : "left");
                                        setCurrentIndex(i);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        i === currentIndex 
                                            ? "bg-blue-600 w-6" 
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: Image with stats */}
                    <div className="relative flex justify-center items-center">
                        <motion.div
                            className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-blue-50 p-2 w-full max-w-md"
                            initial={{ opacity: 0, y: 40 }}
                            animate={controls}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <img
                                src={man}
                                alt="Happy Customer"
                                className="w-full h-auto rounded-xl object-cover"
                                style={{ maxHeight: "500px" }}
                            />
                            
                            {/* Stats overlay */}
                            <motion.div
                                className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-blue-100"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Satisfaction Rate</p>
                                        <p className="text-xl font-bold text-blue-600">98.7%</p>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-blue-100"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Review Growth</p>
                                        <p className="text-xl font-bold text-blue-600">+235%</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                        
                        {/* Background elements */}
                        <div className="absolute inset-0 transform translate-x-6 translate-y-6 -z-10">
                            <div className="absolute inset-0 bg-blue-100 opacity-30 rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Feedback;