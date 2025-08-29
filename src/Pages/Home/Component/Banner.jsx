import React, { useEffect, useRef, useState, useCallback } from "react";
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

    const [isMuted, setIsMuted] = useState(false); // Start unmuted
    const [isPlaying, setIsPlaying] = useState(false);
    // Controls are ALWAYS visible - no conditional logic needed

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const tryAutoplayWithSound = async () => {
            try {
                // Try to play with sound first
                videoElement.muted = false;
                videoElement.volume = 1.0;
                await videoElement.play();
                console.log('🔊 Video playing with sound!');
            } catch (error) {
                console.log('⚠️ Autoplay with sound failed, trying muted...');
                try {
                    videoElement.muted = true;
                    await videoElement.play();
                    console.log('🔇 Video playing muted due to browser policy');
                } catch (_) {
                    console.log('❌ Autoplay completely blocked');
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

        const updateVideoState = () => {
            setIsMuted(videoElement.muted || videoElement.volume === 0);
            setIsPlaying(!videoElement.paused);
        };

        updateVideoState();
        videoElement.addEventListener('volumechange', updateVideoState);
        videoElement.addEventListener('play', updateVideoState);
        videoElement.addEventListener('pause', updateVideoState);
        videoElement.addEventListener('loadedmetadata', updateVideoState);

        return () => {
            videoElement.removeEventListener('volumechange', updateVideoState);
            videoElement.removeEventListener('play', updateVideoState);
            videoElement.removeEventListener('pause', updateVideoState);
            videoElement.removeEventListener('loadedmetadata', updateVideoState);
        };
    }, []);

    // NO AUTO-HIDE LOGIC - CONTROLS ARE ALWAYS VISIBLE

    // Video control functions - simplified
    const handlePlayPause = useCallback(async (e) => {
        console.log('🎮 Play/Pause button clicked!');
        e?.stopPropagation();
        
        const videoElement = videoRef.current;
        if (!videoElement) {
            console.log('❌ No video element found');
            return;
        }

        try {
            if (videoElement.paused) {
                console.log('▶️ Playing video');
                await videoElement.play();
            } else {
                console.log('⏸️ Pausing video');
                videoElement.pause();
            }
        } catch (error) {
            console.error('❌ Error controlling video playback:', error);
        }
    }, []);

    const handleMuteUnmute = useCallback((e) => {
        console.log('🔊 Mute/Unmute button clicked!');
        e?.stopPropagation();
        
        const videoElement = videoRef.current;
        if (!videoElement) {
            console.log('❌ No video element found');
            return;
        }

        const wasMuted = videoElement.muted;
        videoElement.muted = !videoElement.muted;
        if (!videoElement.muted && videoElement.volume === 0) {
            videoElement.volume = 1.0;
        }
        
        console.log(`🔊 Video ${wasMuted ? 'unmuted' : 'muted'}`);
    }, []);

    // Handle mobile touch controls
    const handleVideoTouch = (e) => {
        e.preventDefault();
        handlePlayPause();
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key.toLowerCase()) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    handlePlayPause();
                    break;
                case 'm':
                    e.preventDefault();
                    handleMuteUnmute();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handlePlayPause, handleMuteUnmute]);

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
                            
                            {/* Custom Video Player */}
                            <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
                                <video
                                    ref={videoRef}
                                    className="w-full h-auto object-contain lg:max-h-[65vh] xl:max-h-[60vh] 2xl:max-h-[55vh] cursor-pointer"
                                    autoPlay
                                    preload="auto"
                                    loop
                                    playsInline
                                    style={{ pointerEvents: 'auto' }}
                                    onClick={(e) => {
                                        console.log('🎬 Video element clicked');
                                        handlePlayPause(e);
                                    }}
                                    onTouchEnd={handleVideoTouch}
                                >
                                    <source src={revwheelVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                
                                {/* Custom Video Controls - ALWAYS VISIBLE */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 pointer-events-none">
                                    {/* Center Play Button (when paused) */}
                                    {!isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="pointer-events-auto">
                                                                                <button
                                                onClick={handlePlayPause}
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-6 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl pointer-events-auto z-50"
                                            >
                                                <svg className="w-12 h-12 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                        </button>
                                            </div>
                                        </div>
                                )}
                                
                                    {/* Bottom Control Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between pointer-events-none">
                                        <div className="flex items-center space-x-4 pointer-events-auto">
                                            {/* Play/Pause Button */}
                                            <button
                                                onClick={handlePlayPause}
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 pointer-events-auto z-50"
                                                title={isPlaying ? "Pause" : "Play"}
                                            >
                                                {isPlaying ? (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z"/>
                                                    </svg>
                                                )}
                                            </button>
                                            
                                            {/* Mute/Unmute Button */}
                                            <button
                                                onClick={handleMuteUnmute}
                                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 pointer-events-auto z-50"
                                                title={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        

                                    </div>
                                </div>
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