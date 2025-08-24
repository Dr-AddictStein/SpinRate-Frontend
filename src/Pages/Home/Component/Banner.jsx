import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import heroBG from "../../../../public/hero-bg-scaled.jpg"
import revwheelVideo from "../../../../public/Revwheel_Presentation_9-16.mp4"

// Translations object
const translations = {
    en: {
        tagline: "Welcome to SpinRate",
        heading: "Boost your Google Reviews Effortlessly",
        headingSecondLine: "with our unique reward wheel!",
        description: "Businesses increase their Google reviews by an average of ",
        descriptionBold: "300 per month",
        descriptionEnd: " with us.",
        startNow: "START FREE TRIAL",
        learnMore: "Learn more",
        reviewsText: "Google Reviews"
    },
    fr: {
        tagline: "Bienvenue à SpinRate",
        heading: "Boostez vos avis Google sans effort",
        headingSecondLine: "avec notre roue à bonus unique !",
        description: "Les entreprises augmentent en moyenne leurs avis Google de ",
        descriptionBold: "300 par mois",
        descriptionEnd: " avec nous.",
        startNow: "COMMENCER L'ESSAI GRATUIT",
        learnMore: "En savoir plus",
        reviewsText: "Avis Google"
    }
};

const Hero = () => {
    const taglineRef = useRef(null);
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language] || translations.en;

    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const tryAutoplayWithSound = async () => {
            try {
                videoElement.muted = false;
                videoElement.volume = 1.0;
                await videoElement.play();
            } catch (error) {
                try {
                    videoElement.muted = true;
                    await videoElement.play();
                } catch (_) {
                    // If autoplay is completely blocked, do nothing.
                }
            }
        };

        if (videoElement.readyState >= 3) {
            tryAutoplayWithSound();
        } else {
            const onCanPlay = () => {
                tryAutoplayWithSound();
            };
            videoElement.addEventListener('canplay', onCanPlay, { once: true });
            return () => videoElement.removeEventListener('canplay', onCanPlay);
        }
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const updateMuteState = () => {
            setIsMuted(videoElement.muted || videoElement.volume === 0);
        };

        updateMuteState();
        videoElement.addEventListener('volumechange', updateMuteState);
        videoElement.addEventListener('play', updateMuteState);
        videoElement.addEventListener('pause', updateMuteState);

        return () => {
            videoElement.removeEventListener('volumechange', updateMuteState);
            videoElement.removeEventListener('play', updateMuteState);
            videoElement.removeEventListener('pause', updateMuteState);
        };
    }, []);

    // Removed global first-gesture unmute to avoid conflicts with explicit button

    // Rely on native controls; avoid toggling play/pause on container clicks
    const handleVideoClick = undefined;

    return (
        <section className="relative bg-white 2xl:pt-20 pb-16 md:pb-24 overflow-hidden flex flex-col items-center">
            {/* Background image covering top section plus half of video */}
            <div className="absolute top-0 left-0 w-full h-[75%] z-0"
                style={{
                    backgroundImage: `url(${heroBG})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-28">
                {/* Centered content for both mobile and desktop */}
                <div className="flex flex-col items-center text-center">
                    {/* Centered Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 md:space-y-8 z-10 mb-8 max-w-6xl"
                    >
                        {/* Main Heading with animations - More compact and smaller */}
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
                        >
                            <div>
                                <span className="text-white">
                                    {t.heading}
                                </span>
                            </div>
                            <div className="mt-3">
                                <span className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
                                    {t.headingSecondLine}
                                </span>
                            </div>
                        </motion.h1>

                        {/* Description text - BIGGER & centered */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="text-lg md:text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed font-medium"
                        >
                            {t.description}<span className="font-bold">{t.descriptionBold}</span>{t.descriptionEnd}
                        </motion.p>

                        {/* CTA Buttons - ENHANCED and centered */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className="pt-2 md:pt-4 flex flex-wrap justify-center gap-4"
                        >
                            <motion.button
                                onClick={() => navigate('/dashboard')}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 142, 99, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
                            >
                                {t.startNow}
                            </motion.button>
                            
                        </motion.div>
                    </motion.div>

                    {/* Widescreen Video - Increased width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative z-10 w-full max-w-[90%] mx-auto mt-2 md:mt-4"
                    >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            {/* Video glow effect */}
                            <div className="absolute inset-0 bg-blue-400 rounded-2xl filter blur-xl opacity-20"></div>
                            
                            {/* Simple Video Element */}
                            <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                                <video
                                    ref={videoRef}
                                    className="w-full h-auto object-contain cursor-pointer lg:max-h-[65vh] xl:max-h-[60vh] 2xl:max-h-[55vh]"
                                    controls
                                    autoPlay
                                    muted
                                    preload="auto"
                                    loop
                                    playsInline
                                >
                                    <source src={revwheelVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                {isMuted && (
                                    <div className="absolute inset-0 z-10 flex items-start justify-end p-4 pointer-events-none">
                                        <button
                                            className="pointer-events-auto bg-black/60 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-black/70 transition"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                if (!videoRef.current) return;
                                                const v = videoRef.current;
                                                try {
                                                    v.muted = false;
                                                    v.volume = 1.0;
                                                    await v.play();
                                                } catch (_) {}
                                            }}
                                        >
                                            Enable Sound
                                        </button>
                                    </div>
                                )}
                                
                                {/* Optional overlay gradient for better text contrast if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40 pointer-events-none"></div>
                            </div>
                            
                            {/* Decorative border */}
                            <div className="absolute inset-0 border border-blue-200/30 rounded-2xl"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;