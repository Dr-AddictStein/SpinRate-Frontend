import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import spinRateLogo from "../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import ukFlag from "../../assets/flags/uk-flag.svg";
import franceFlag from "../../assets/flags/france-flag.svg";
import instagramLogo from "../../../public/instagram.webp";
import googleReview from "../../../public/googleReview.webp";
import facebookLogo from "../../../public/Facebook_logo_(square).png";

const API_URL = 'https://spin-rate-backend.vercel.app/api';

const WheelGamePage = () => {
  const { id } = useParams(); // Get wheel ID from URL
  const navigate = useNavigate(); // Add navigate for redirection
  const [wheel, setWheel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Language context
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  
  // Force French as default language on component mount - only runs once
  useEffect(() => {
    // If there's no language set in localStorage or it's not French, set it to French
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage || savedLanguage !== 'fr') {
      changeLanguage('fr');
      console.log('Set default language to French');
    } else {
      console.log('Current language is:', savedLanguage);
    }
    // Run this only once when component mounts, don't include changeLanguage in deps
  }, []); // Empty dependency array
  
  // Add a debug effect to log language changes
  useEffect(() => {
    console.log('Language changed to:', language);
  }, [language]);
  
  // Wheel game state
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(true);
  const [showWheelGame, setShowWheelGame] = useState(true);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: ''
  });
  
  // New state for validation popup
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  
  // References
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);
  
  // Fetch wheel data from backend
  useEffect(() => {
    const fetchWheel = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/wheel/getSingleWheel/${id}`);
        
        if (response.data.data) {
          setWheel(response.data.data);
        } else {
          setError('Wheel not found');
        }
      } catch (err) {
        console.error('Error fetching wheel:', err);
        setError('Failed to load wheel game');
        toast.error('Failed to load wheel game');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchWheel();
    }
  }, [id]);
  
  // Update wheel scan count when page loads
  useEffect(() => {
    const updateScanCount = async () => {
      try {
        if (id) {
          await axios.put(`${API_URL}/wheel/updateWheelScans/${id}`);
          console.log('Wheel scan count updated');
        }
      } catch (err) {
        console.error('Error updating wheel scan count:', err);
        // Don't show toast error to user as this is a background operation
      }
    };
    
    updateScanCount();
  }, [id]);
  
  // Add custom animation classes
  useEffect(() => {
    // Add pulse-width animation if not already defined
    const styleSheet = document.styleSheets[0];
    let animationExists = false;
    
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      if (styleSheet.cssRules[i].name === 'pulse-width') {
        animationExists = true;
        break;
      }
    }
    
    if (!animationExists) {
      styleSheet.insertRule(`
        @keyframes pulse-width {
          0%, 100% { width: 10%; }
          50% { width: 90%; }
        }
      `, styleSheet.cssRules.length);
      
      styleSheet.insertRule(`
        .animate-pulse-width {
          animation: pulse-width 2s ease-in-out infinite;
        }
      `, styleSheet.cssRules.length);
      
      styleSheet.insertRule(`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `, styleSheet.cssRules.length);
      
      styleSheet.insertRule(`
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `, styleSheet.cssRules.length);
    }
  }, []);
  
  // Helper function to adjust color brightness
  function adjustColor(color, amount) {
    // Remove the # if present
    const hex = color.replace(/^#/, '');
    
    // Parse the RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Adjust each component
    const newR = Math.min(Math.max(0, r + amount), 255);
    const newG = Math.min(Math.max(0, g + amount), 255);
    const newB = Math.min(Math.max(0, b + amount), 255);
    
    // Convert back to hex
    const newHex = '#' + 
      newR.toString(16).padStart(2, '0') +
      newG.toString(16).padStart(2, '0') +
      newB.toString(16).padStart(2, '0');
    
    return newHex;
  }
  
  // Draw the wheel on canvas
  useEffect(() => {
    if (!wheel || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Dynamically set canvas size based on container size
    const calculateSize = () => {
      // Get the parent container width (accounting for any padding)
      const containerWidth = canvas.parentElement.clientWidth;
      
      // Set canvas dimensions to match container width (for perfect square)
      canvas.width = containerWidth;
      canvas.height = containerWidth;
      
      // Force a redraw with the new dimensions
      drawWheel();
    };
    
    // Calculate size initially
    calculateSize();
    
    // Add resize listener specific to this effect
    window.addEventListener('resize', calculateSize);
    
    // Function to draw the wheel (extracted to be called after resize)
    function drawWheel() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.92;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get wheel data from backend or use defaults
      // Primary wheel colors (alternating colors as shown in the image)
      const primaryColors = [
        wheel.mainColors?.color1 || '#000000', // Black (from the image)
        wheel.mainColors?.color2 || '#6F6F00'  // Olive/dark yellow (from the image)
      ];
      
      // Create sample data if none exists
      const sampleLots = [
        { name: '$8 mandatory', odds: '1' },
        { name: '$8 mandatory', odds: '1' },
        { name: '$8 mandatory', odds: '1' },
        { name: '$8 mandatory', odds: '1' },
        { name: '$8 mandatory', odds: '1' },
        { name: '$5 mandatory', odds: '1' },
        { name: '$3 mandatory', odds: '1' },
        { name: 'ZERO', odds: '1' },
      ];
      
      const displayLots = wheel.lots && wheel.lots.length > 0 
        ? wheel.lots 
        : sampleLots;
      
      // Add outer border/ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.02, 0, 2 * Math.PI);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#FFFFFF'; // White border to match black and white theme
      ctx.stroke();
      
      // Draw segments
      const segmentAngle = (2 * Math.PI) / displayLots.length;
      
      // Position the top segment properly - the pointer in the image points to the top
      const topPosition = Math.PI * 1.5; // 270 degrees
      const startOffset = topPosition - (segmentAngle / 2);
      
      // Center glow/light effect (subtle white radial gradient)
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.9
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw each segment
      displayLots.forEach((lot, index) => {
        const startAngle = startOffset + (index * segmentAngle);
        const endAngle = startOffset + ((index + 1) * segmentAngle);
        const midAngle = startAngle + (segmentAngle / 2);
        
        // Alternate colors for segments
        const segmentColor = primaryColors[index % 2];
        
        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = segmentColor;
        ctx.fill();
        
        // Add white divider lines between segments
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(startAngle) * radius,
          centerY + Math.sin(startAngle) * radius
        );
        
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.stroke();
        
        // Draw text with the same orientation as before
        ctx.save();
        
        // Get prize text
        let displayText = lot.name || '$8 mandatory';
        
        // Set text properties - increase font size for better readability, especially on mobile
        // Increased the multiplier from 0.07 to 0.09 and minimum size from 14 to 16
        const fontSize = Math.max(Math.min(radius * 0.09, 22), 16);
        ctx.font = `bold ${Math.floor(fontSize)}px Arial, sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        
        // Position context at center of wheel
        ctx.translate(centerX, centerY);
        
        // Rotate to match the segment's midpoint angle
        ctx.rotate(midAngle);
        
        // Draw text along the radial line path (but without drawing the line)
        ctx.textAlign = 'center'; // Center the text on the line
        ctx.textBaseline = 'middle';
        
        // Add shadow for better readability against dark backgrounds
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        // Place text in middle of where the line would be - moved slightly outward
        // Adjusted positioning from 0.55 to 0.6 for better placement
        const textDistance = radius * 0.6;
        
        // Draw text with better contrast
        ctx.fillText(displayText, textDistance, 0);
        
        ctx.restore();
      });
      
      // Add center circle (white)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.15, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      
      // Always use English "SPIN NOW" text in the center regardless of selected language
      ctx.font = `bold ${Math.floor(radius * 0.06)}px Arial, sans-serif`;
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Always use English text
      ctx.fillText('SPIN', centerX, centerY - radius * 0.02);
      ctx.fillText('NOW', centerX, centerY + radius * 0.06);
    }
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
    
  }, [wheel, rotationDegrees, language]); // Added language as dependency
  
  // Handle wheel spin with enhanced animation
  const spinWheel = () => {
    if (isSpinning || !wheel || hasSpun) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Create sample data if none exists from the backend
    const sampleLots = [
      { name: '$8 mandatory', odds: '1' },
      { name: '$8 mandatory', odds: '1' },
      { name: '$8 mandatory', odds: '1' },
      { name: '$8 mandatory', odds: '1' },
      { name: '$8 mandatory', odds: '1' },
      { name: '$5 mandatory', odds: '1' },
      { name: '$3 mandatory', odds: '1' },
      { name: 'ZERO', odds: '1' },
    ];
    
    // Get wheel lots
    const displayLots = wheel.lots && wheel.lots.length > 0 
      ? wheel.lots 
      : sampleLots;
    
    // Calculate total odds
    const totalOdds = displayLots.reduce((sum, lot) => sum + (parseInt(lot.odds) || 1), 0);
    
    // Select winning segment based on odds
    let randomValue = Math.random() * totalOdds;
    let winner = 0;
    
    for (let i = 0; i < displayLots.length; i++) {
      randomValue -= (parseInt(displayLots[i].odds) || 1);
      if (randomValue <= 0) {
        winner = i;
        break;
      }
    }
    
    // Calculate rotation to position the winning segment at the top
    const segmentSize = 360 / displayLots.length;
    
    // Calculate correct degrees to rotate
    // Add more rotations for a more exciting spin (3-5 full rotations)
    const rotations = 3 + Math.floor(Math.random() * 2);
    const indexToRotate = (displayLots.length - winner) % displayLots.length;
    const spinDegrees = (360 * rotations) + (indexToRotate * segmentSize);
    
    // Add a bit of randomness to the final position for more realism
    const randomOffset = Math.random() * (segmentSize * 0.3) - (segmentSize * 0.15);
    const targetRotation = rotationDegrees + spinDegrees + randomOffset;
    
    setRotationDegrees(targetRotation);
    
    // Play spin sound if available
    const spinSound = new Audio();
    spinSound.src = "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"; // Wheel spinning sound
    spinSound.volume = 0.5;
    spinSound.play().catch(e => console.log("Audio play failed:", e));
    
    // Set a timer to show the result
    setTimeout(() => {
      // Play win sound
      const winSound = new Audio();
      winSound.src = "https://assets.mixkit.co/active_storage/sfx/2008/2008-preview.mp3"; // Win sound
      winSound.volume = 0.5;
      winSound.play().catch(e => console.log("Audio play failed:", e));
      
      setResult(displayLots[winner]);
      setIsSpinning(false);
      setHasSpun(true);
      setShowResultModal(true);
    }, 5000); // Match this timing with the animation duration
  };
  
  // Close result modal - no longer needed since we don't transition to user info modal
  const closeResultModal = () => {
    setShowResultModal(false);
  };
  
  // Handle button click in instruction modal
  const handleReviewButtonClick = () => {
    if (wheel?.googleReviewLink) {
      // Show validation popup
      setShowValidationPopup(true);
      
      // Open the link immediately in a new tab
      window.open(wheel.googleReviewLink, '_blank');
      
      // Set a timer to close the validation popup after 10 seconds
      setTimeout(() => {
        setShowValidationPopup(false);
        // Close instruction modal 
        setShowInstructionModal(false);
      }, 10000);
    }
  };
  
  // Navigate to game rules
  const handleGameRulesClick = () => {
    // Open the terms and conditions page in a new tab
    window.open('/terms-and-conditions', '_blank');
  };
  
  // Handle user info input changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle user info submission
  const handleUserInfoSubmit = async () => {
    try {
      // Only proceed if we have a wheel ID and a result
      if (id && result) {
        // Prepare the user data
        const userData = {
          email: userInfo.email,
          phone: userInfo.phone,
          wheelId: id,
          prize: result.name || 'No Prize' // Send the prize name to the backend
        };
        
        // Send data to the API endpoint
        const response = await axios.post('https://spin-rate-backend.vercel.app/api/customer/create', userData);
        
        if (response.data && response.data.customer) {
          // Show success message in the appropriate language
          toast.success(
            language === 'fr' 
              ? 'Merci ! Vos informations ont été soumises avec succès.' 
              : 'Thank you! Your information has been submitted successfully.'
          );
          
          // Close the modal
          setShowResultModal(false);
          
          // Navigate to landing page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } else {
        // If no result is available, show an error in the appropriate language
        toast.error(
          language === 'fr'
            ? 'Aucune information sur le prix disponible. Veuillez réessayer de faire tourner la roue.'
            : 'No prize information available. Please try spinning the wheel again.'
        );
      }
    } catch (err) {
      console.error('Error submitting user info:', err);
      
      // Display specific error message from backend if available
      if (err.response && err.response.data && err.response.data.error) {
        const errorMsg = err.response.data.error;
        
        if (errorMsg === "Email already registered") {
          toast.error(
            language === 'fr'
              ? 'Cet email est déjà enregistré ! Veuillez utiliser une adresse différente.'
              : 'This email is already registered! Please use a different email.',
            {
              icon: '📧',
              duration: 5000,
              style: {
                padding: '16px',
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontWeight: 'bold'
              }
            }
          );
        } else if (errorMsg === "Phone number already registered") {
          toast.error(
            language === 'fr'
              ? 'Ce numéro de téléphone est déjà enregistré ! Veuillez utiliser un numéro différent.'
              : 'This phone number is already registered! Please use a different number.',
            {
              icon: '📱',
              duration: 5000,
              style: {
                padding: '16px',
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                fontWeight: 'bold'
              }
            }
          );
        } else {
          toast.error(
            language === 'fr'
              ? `Erreur: ${errorMsg}`
              : `Error: ${errorMsg}`
          );
        }
      } else {
        toast.error(
          language === 'fr'
            ? 'Échec de la soumission de vos informations. Veuillez réessayer.'
            : 'Failed to submit your information. Please try again.'
        );
      }
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-20 h-20 border-t-4 border-b-4 border-black rounded-full animate-spin mx-auto mb-6"></div>
          <div className="relative">
            <div className="h-2 w-48 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-black animate-pulse-width rounded-full"></div>
            </div>
          </div>
          <p className="text-xl font-medium text-black mt-6">Loading your prize wheel...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center border-2 border-black">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-black mb-2">Wheel Not Found</h2>
          <p className="text-black mb-6">Sorry, we couldn't find the prize wheel you're looking for.</p>
          <Link to="/" className="inline-block bg-black hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Customer instruction
  const instruction = wheel?.customerInstruction || t('giveReview');
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-2 px-1 sm:py-4 sm:px-2">
      <div className="mx-auto w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl overflow-visible relative p-1 sm:p-2 md:p-4">
          {/* Language switcher in top right */}
          <div className="absolute right-2 sm:right-4 md:right-6 top-2 sm:top-4 md:top-6 z-10 flex items-center space-x-3">
            {/* Debug display of current language */}
            {/* <div className="text-xs text-gray-500 mr-2">Lang: {language}</div> */}
            
            <button 
              onClick={() => {
                console.log('Switching to French');
                changeLanguage('fr');
              }}
              className={`transition-all duration-200 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
              aria-label="Switch to French"
            >
              <img src={franceFlag} alt="French" className="w-8 h-6 rounded-sm" />
            </button>
            <button 
              onClick={() => {
                console.log('Switching to English');
                changeLanguage('en');
              }}
              className={`transition-all duration-200 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
              aria-label="Switch to English"
            >
              <img src={ukFlag} alt="English" className="w-8 h-6 rounded-sm" />
            </button>
          </div>
          
          {/* Logo at top left with no header */}
          {wheel?.logoUrl && (
            <div className="absolute left-2 sm:left-4 md:left-6 top-2 sm:top-4 md:top-6 z-10 bg-white p-1 sm:p-1.5 md:p-2 rounded-lg shadow-lg border-2 border-gray-400">
              <img 
                src={wheel.logoUrl} 
                alt="Logo" 
                className="h-8 sm:h-12 md:h-16 w-auto object-contain"
              />
            </div>
          )}
          
          {/* Wheel game - now always visible */}
          {showWheelGame && (
            <div className="pt-6 sm:pt-16 md:pt-20 pb-2 sm:pb-6 md:pb-8 overflow-visible"> {/* Reduced padding for mobile */}
              <div className="relative mx-auto w-full lg:w-[95%]"> {/* Use full width on small/medium screens */}
                {/* Enhanced pointer triangle - updated to match the image */}
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 pointer"
                  style={{ 
                    marginTop: '-20px'
                  }}
                >
                  <svg width="50" height="55" viewBox="0 0 30 35" className="sm:w-[60px] sm:h-[65px]">
                    <polygon 
                      points="15,35 0,5 30,5" 
                      fill="#000000" 
                      stroke="#FFFFFF" 
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                
                {/* Spinning wheel with animation effects */}
                <motion.div 
                  ref={wheelRef}
                  className="relative w-full pt-[100%] mb-4 sm:mb-12 md:mb-16" // Reduced bottom margin on mobile
                  initial={{ rotate: 0 }}
                  animate={{ rotate: rotationDegrees }}
                  transition={{ 
                    duration: isSpinning ? 5 : 0,
                    ease: [0.1, 0.25, 0.3, 1], // More realistic momentum curve
                    type: "tween"
                  }}
                  style={{ 
                    transformOrigin: 'center center',
                    filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.4))',
                    margin: '0' // Removed margin
                  }}
                >
                  <canvas 
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </motion.div>
                
                {/* Center Spin Button with neon effect - OUTSIDE the rotating wheel - made more responsive */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="pointer-events-auto">
                    {/* Animated outer glow ring - only visible when not played */}
                    {!hasSpun && !isSpinning && (
                      <div className="absolute inset-0 w-full h-full rounded-full animate-pulse" 
                        style={{
                          background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)',
                          transform: 'scale(1.4)',
                          filter: 'blur(10px)'
                        }}
                      />
                    )}
                    
                    <motion.button
                      className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center relative z-10
                        ${hasSpun 
                          ? 'cursor-not-allowed bg-black/30' 
                          : 'bg-transparent'} 
                        font-bold border-0`}
                      whileHover={hasSpun ? {} : { 
                        scale: 1.05,
                      }}
                      whileTap={hasSpun ? {} : { scale: 0.95 }}
                      onClick={spinWheel}
                      disabled={isSpinning || hasSpun || showInstructionModal}
                      aria-label={t('spinTheWheel')}
                    >
                      <div className="text-center relative z-10">
                        {isSpinning && (
                          <div className="text-xl sm:text-2xl md:text-3xl mt-1 sm:mt-2 rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto flex items-center justify-center">
                            <span className="inline-block animate-spin">⟳</span>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Thank you message - Updated to black text */}
          {!showInstructionModal && (
            <div className="mt-2 sm:mt-6 mb-3 sm:mb-4 text-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-black">
                {wheel?.thankyouMessage || t('thankYouForReview')}
              </h2>
            </div>
          )}
          
          {/* Update footer to match image */}
          <div className="bg-gray-100 p-2 sm:p-3 md:p-4 text-center text-gray-500 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} {t('spinRateCopyright')}</p>
          </div>
        </div>
      </div>
      
      {/* Initial Instruction Modal - updated for white with black text theme */}
      {wheel && showInstructionModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <motion.div 
            className="bg-white rounded-2xl border-4 border-black shadow-2xl max-w-md w-[95%] sm:w-[90%] md:w-full p-4 sm:p-6 md:p-8 relative pointer-events-auto max-h-[90vh] overflow-y-auto my-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            style={{
              maxHeight: "calc(100vh - 2rem)"
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-700 to-black"></div>
            
            {/* Language switcher in modal top right */}
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 flex items-center space-x-2">
              <button 
                onClick={() => {
                  console.log('Switching to French');
                  changeLanguage('fr');
                }}
                className={`transition-all duration-200 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
                aria-label="Switch to French"
              >
                <img src={franceFlag} alt="French" className="w-7 h-5 rounded-sm" />
              </button>
              <button 
                onClick={() => {
                  console.log('Switching to English');
                  changeLanguage('en');
                }}
                className={`transition-all duration-200 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
                aria-label="Switch to English"
              >
                <img src={ukFlag} alt="English" className="w-7 h-5 rounded-sm" />
              </button>
            </div>
            
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 mt-6 sm:mb-6">
              {"How it works 😍"}
            </h2>
            
            <div className="my-4 sm:my-6 space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-black text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center flex-shrink-0 text-sm sm:text-base">1</div>
                <p className="text-black text-sm sm:text-base">{wheel?.instructionStep1 || t('giveReview')}</p>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-black text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center flex-shrink-0 text-sm sm:text-base">2</div>
                <p className="text-black text-sm sm:text-base">{wheel?.instructionStep2 || t('returnToPage')}</p>
              </div>
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="bg-black text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 flex items-center justify-center flex-shrink-0 text-sm sm:text-base">3</div>
                <p className="text-black text-sm sm:text-base">{wheel?.instructionStep3 || t('spinToWin')}</p>
              </div>
            </div>
            <div className="flex w-full gap-3 justify-around">
              <img src={instagramLogo} alt="" className="w-[20%]"/>
              <img src={googleReview} alt="" className="w-[30%]"/>
              <img src={facebookLogo} alt="" className="w-[20%]"/>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-bold rounded-lg shadow-lg transform transition-all duration-200 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReviewButtonClick}
              >
                {t('leaveReview')}
              </motion.button>
            </div>
            
            <div className="mt-4 sm:mt-6 text-center">
              <motion.button
                className="text-sm text-black hover:text-gray-700 underline cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGameRulesClick}
              >
                {t('gameRules')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Result Modal - updated to use white background with black text */}
      {showResultModal && result && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <motion.div 
            className="bg-white rounded-2xl border-4 border-black shadow-2xl max-w-md w-[95%] sm:w-[90%] md:w-full p-4 sm:p-6 md:p-8 relative pointer-events-auto max-h-[90vh] overflow-y-auto my-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            style={{
              maxHeight: "calc(100vh - 2rem)"
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-gray-700 to-black"></div>
            
            {/* Language switcher in modal top right */}
            <div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-10 flex items-center space-x-2">
              <button 
                onClick={() => {
                  console.log('Switching to French');
                  changeLanguage('fr');
                }}
                className={`transition-all duration-200 transform hover:scale-110 ${language === 'fr' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
                aria-label="Switch to French"
              >
                <img src={franceFlag} alt="French" className="w-7 h-5 rounded-sm" />
              </button>
              <button 
                onClick={() => {
                  console.log('Switching to English');
                  changeLanguage('en');
                }}
                className={`transition-all duration-200 transform hover:scale-110 ${language === 'en' ? 'ring-2 ring-black scale-110' : 'opacity-75'}`}
                aria-label="Switch to English"
              >
                <img src={ukFlag} alt="English" className="w-7 h-5 rounded-sm" />
              </button>
            </div>
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="mx-auto mb-2 sm:mb-4 md:mb-5 relative"
            >
              <div className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 mx-auto rounded-full bg-black flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full"
            >
              <h2 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-black mb-1 sm:mb-2">{t('congratulations')}</h2>
              <div className="w-8 sm:w-12 md:w-14 h-1 bg-black mx-auto mb-2 sm:mb-3"></div>
              
              <p className="text-center text-base sm:text-lg md:text-xl font-bold text-black mb-3 sm:mb-4">
                {t('youWon')}: <span className="text-black">{result.name}</span>
              </p>
              
              {result.promoCode && (
                <motion.div 
                  className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gray-200 rounded-xl border-2 border-black shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <p className="text-black mb-1 sm:mb-2 font-medium text-center text-sm">{t('yourPromoCode')}:</p>
                  <p className="text-base sm:text-lg md:text-xl font-bold text-black font-mono tracking-wider text-center bg-gray-100 py-2 rounded">
                    {result.promoCode}
                  </p>
                </motion.div>
              )}
              
              <div className="mt-3 sm:mt-4 border-t border-gray-300 pt-2 sm:pt-3">
                <p className="text-center text-black mb-2 text-xs sm:text-sm">
                  {t('enterContactInfo')}
                </p>
                
                <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); handleUserInfoSubmit(); }}>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleUserInfoChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-700 text-xs sm:text-sm"
                      placeholder={t('email')}
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleUserInfoChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder-gray-700 text-xs sm:text-sm"
                      placeholder={t('phone')}
                      required
                    />
                  </div>
                  
                  <div className="mt-2 sm:mt-3 text-center">
                    <motion.button
                      type="submit"
                      className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-black text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transform transition-all duration-200 text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {t('claimPrize')}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* Awaiting Validation Popup */}
      {showValidationPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
          <motion.div 
            className="bg-white rounded-2xl border-4 border-black shadow-2xl max-w-md w-[80%] sm:w-[60%] md:w-[50%] p-4 sm:p-6 md:p-8 relative pointer-events-auto text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-black mb-4">
                {language === 'fr' ? 'En attente de validation...' : 'Awaiting validation...'}
              </h2>
              
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
              </div>
              
              <p className="text-gray-700 mb-4 text-center">
                {language === 'fr' ? 'Laissez-nous un avis et gagnez le gros lot' : 'Leave us a review and win the grand prize'}
              </p>
              
              <button
                className="px-6 py-2 bg-gray-200 text-black border border-gray-300 rounded-lg flex items-center justify-center space-x-2"
                disabled
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                <span>
                  {language === 'fr' ? 'Laisser un avis' : 'Leave a review'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WheelGamePage;