import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import spinRateLogo from "../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";

const API_URL = 'http://localhost:4000/api';

const WheelGamePage = () => {
  const { id } = useParams(); // Get wheel ID from URL
  const navigate = useNavigate(); // Add navigate for redirection
  const [wheel, setWheel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      const radius = Math.min(centerX, centerY) * 0.92; // Increased radius proportion
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get wheel data
      const colors = [
        wheel.mainColors?.color1 || '#FF6B6B', // Modern vibrant red
        wheel.mainColors?.color2 || '#4ECDC4', // Teal
        wheel.mainColors?.color3 || '#FFD166'  // Vibrant yellow
      ];
      
      const displayLots = wheel.lots && wheel.lots.length > 0 
        ? wheel.lots 
        : Array(8).fill({ name: 'Prize', odds: '1', promoCode: '' });
      
      // Add modern metallic ring around edge
      const ringGradient = ctx.createLinearGradient(
        centerX - radius, centerY - radius,
        centerX + radius, centerY + radius
      );
      ringGradient.addColorStop(0, '#FFD700'); // Gold
      ringGradient.addColorStop(0.5, '#FFF8E1'); // Light gold/silver
      ringGradient.addColorStop(1, '#FFD700'); // Gold again
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.02, 0, 2 * Math.PI); // Slightly adjusted radius
      ctx.lineWidth = 10; // Reduced thickness for better fit
      ctx.strokeStyle = ringGradient;
      ctx.stroke();
      
      // Add outer shadow to the ring for better visibility
      ctx.shadowBlur = 8; // Reduced shadow blur
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.03, 0, 2 * Math.PI); // Slightly increased
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Add inner ring with neon effect
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.95, 0, 2 * Math.PI); // Reduced radius
      ctx.lineWidth = 3; // Reduced width
      ctx.strokeStyle = '#4361EE'; // Neon blue
      ctx.stroke();
      
      // Add light reflection on ring (3D effect)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.05, Math.PI * 1.7, Math.PI * 2.2); // Adjusted radius
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.stroke();
      
      // Draw segments
      const segmentAngle = (2 * Math.PI) / displayLots.length;
      
      // Top of the wheel is at 270 degrees (Math.PI * 1.5) in our canvas coordinate system
      const topPosition = Math.PI * 1.5;
      const startOffset = topPosition - (segmentAngle / 2);
      
      displayLots.forEach((lot, index) => {
        const startAngle = startOffset + (index * segmentAngle);
        const endAngle = startOffset + ((index + 1) * segmentAngle);
        const midAngle = startAngle + (segmentAngle / 2);
        
        // Select color from the palette, cycling through the available colors
        const segmentColor = colors[index % colors.length];
        
        // Create advanced gradient for segments
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0, // Start from center
          centerX, centerY, radius * 0.85
        );
        
        // Calculate darker version of color for gradient
        const darkerColor = adjustColor(segmentColor, -30);
        const lighterColor = adjustColor(segmentColor, 30);
        
        // Three-color gradient for more depth
        gradient.addColorStop(0, lighterColor);
        gradient.addColorStop(0.7, segmentColor);
        gradient.addColorStop(1, darkerColor);
        
        // Draw segment - extended all the way to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius * 0.98, startAngle, endAngle); // Increased segment radius
        ctx.closePath();
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add 3D effect to segments with bright edge
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius * 0.98, startAngle, endAngle); // Increased segment radius
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.stroke();
        
        // Draw divider lines with neon glow effect
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(startAngle) * radius * 0.98, // Increased radius
          centerY + Math.sin(startAngle) * radius * 0.98 // Increased radius
        );
        
        // Create gradient for divider lines
        const dividerGradient = ctx.createLinearGradient(
          centerX, centerY,
          centerX + Math.cos(startAngle) * radius * 0.98, // Increased radius
          centerY + Math.sin(startAngle) * radius * 0.98 // Increased radius
        );
        dividerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        dividerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
        
        ctx.strokeStyle = dividerGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Add text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(midAngle);
        
        // Text path - adjusted based on segment size and number of segments
        const textDistance = radius * 0.68; // Adjusted for larger wheel
        
        // Determine font size dynamically based on the number of segments and radius
        const segmentCount = displayLots.length;
        const radiusBasedFontSize = Math.max(radius * 0.08, 24); // Increased base font size
        
        let fontSize = radiusBasedFontSize; // Default font size based on radius
        
        // Further adjust based on segment count
        if (segmentCount > 10) {
          fontSize = radiusBasedFontSize * 0.85;
        } else if (segmentCount > 8) {
          fontSize = radiusBasedFontSize * 0.92;
        }
        
        // Modern text styling with larger font
        ctx.textAlign = 'center';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${Math.floor(fontSize)}px "Arial", sans-serif`;
        
        // Apply all text rendering techniques for maximum readability
        ctx.textBaseline = 'middle'; // Better text vertical alignment
        
        // Create a strong high-contrast outline
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.lineWidth = Math.max(4, Math.floor(fontSize / 6)); // Scale outline with font size
        ctx.lineJoin = 'round'; // Smoother text outline
        
        // Add strong text shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 1)';
        ctx.shadowBlur = Math.max(5, Math.floor(fontSize / 4)); // Scale blur with font size
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Get text metrics to check width - limit text length if needed
        let displayText = lot.name || 'Prize';
        const metrics = ctx.measureText(displayText);
        
        // If text is too wide for segment, truncate it
        const maxTextWidth = radius * 0.4; // Maximum allowed text width
        if (metrics.width > maxTextWidth) {
          // Truncate text
          let truncatedText = displayText;
          while (ctx.measureText(truncatedText + "...").width > maxTextWidth && truncatedText.length > 0) {
            truncatedText = truncatedText.substring(0, truncatedText.length - 1);
          }
          displayText = truncatedText + "...";
        }
        
        // Draw text with outline for maximum contrast
        ctx.strokeText(displayText, textDistance, 0); // Adjusted y coordinate to center text
        ctx.fillText(displayText, textDistance, 0); // Adjusted y coordinate to center text
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        
        ctx.restore();
      });
      
      // Draw decorative elements around the wheel
      // Animated-looking elements around the rim
      for (let i = 0; i < displayLots.length * 3; i++) {
        const angle = i * Math.PI / (displayLots.length * 1.5);
        const dotSize = i % 3 === 0 ? 4 : 2;
        
        ctx.beginPath();
        ctx.arc(
          centerX + Math.cos(angle) * (radius * 0.97), // Adjusted inward slightly
          centerY + Math.sin(angle) * (radius * 0.97), // Adjusted inward slightly
          dotSize,
          0,
          2 * Math.PI
        );
        
        // Alternate colors for more visual interest
        if (i % 2 === 0) {
          ctx.fillStyle = '#4CC9F0'; // Light blue
        } else {
          ctx.fillStyle = '#F72585'; // Pink
        }
        ctx.fill();
      }
      
      // Don't draw the center button on canvas - it will be an HTML element overlay
    }
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
    
  }, [wheel, rotationDegrees]);
  
  // Handle wheel spin with enhanced animation
  const spinWheel = () => {
    if (isSpinning || !wheel || !wheel.lots || hasSpun) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Get wheel lots
    const displayLots = wheel.lots && wheel.lots.length > 0 
      ? wheel.lots 
      : Array(8).fill({ name: 'Prize', odds: '1', promoCode: '' });
    
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
      window.open(wheel.googleReviewLink, '_blank');
      
      // Close instruction modal immediately
      setShowInstructionModal(false);
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
        
        // Send data to the local API endpoint
        const response = await axios.post('http://localhost:4000/api/customer/create', userData);
        
        if (response.data && response.data.customer) {
          // Show success message
          toast.success('Thank you! Your information has been submitted successfully.');
          
          // Close the modal
          setShowUserInfoModal(false);
          
          // Navigate to landing page after a short delay
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } else {
        // If no result is available, show an error
        toast.error('No prize information available. Please try spinning the wheel again.');
      }
    } catch (err) {
      console.error('Error submitting user info:', err);
      
      // Display specific error message from backend if available
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(`Error: ${err.response.data.error}`);
      } else {
        toast.error('Failed to submit your information. Please try again.');
      }
      
      // Keep the modal open if there's an error
      // so the user can try again or correct their info
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-medium text-gray-700">Loading wheel game...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Wheel Not Found</h2>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the wheel game you're looking for.</p>
          <Link to="/" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
            Go Home
          </Link>
        </div>
      </div>
    );
  }
  
  // Customer instruction
  const instruction = wheel?.customerInstruction || "Give us a review";
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-4 px-2"> {/* Reduced padding to allow more space */}
      <div className="mx-auto w-full"> {/* Removed max-width constraint to use full width */}
        <div className="bg-white rounded-xl shadow-xl overflow-visible relative p-2 sm:p-4"> {/* Reduced padding on small screens */}
          {/* Logo at top left with no header */}
          {wheel?.logoUrl && (
            <div className="absolute left-4 sm:left-6 top-4 sm:top-6 z-10 bg-white p-1.5 sm:p-2 rounded-lg shadow-lg border-2 border-amber-300">
              <img 
                src={wheel.logoUrl} 
                alt="Logo" 
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </div>
          )}
          
          {/* SpinRate logo at top right */}
          <div className="absolute right-4 sm:right-6 top-4 sm:top-6 z-10">
            <img 
              src={spinRateLogo} 
              alt="SpinRate" 
              className="h-20 sm:h-32 w-auto object-contain"
            />
          </div>
          
          {/* Wheel game - now always visible */}
          {showWheelGame && (
            <div className="pt-20 sm:pt-24 pb-8 overflow-visible"> {/* Reduced top/bottom padding */}
              <div className="relative mx-auto w-full lg:w-[95%]"> {/* Use full width on small/medium screens */}
                {/* Enhanced pointer triangle - made bigger */}
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 pointer"
                  style={{ 
                    filter: 'drop-shadow(0px 0px 10px rgba(67, 97, 238, 0.8))',
                    marginTop: '-30px'  /* Adjusted for larger pointer */
                  }}
                >
                  <svg width="80" height="85" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg"> {/* Increased size */}
                    <defs>
                      <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" />
                        <stop offset="50%" stopColor="#FFF8E1" />
                        <stop offset="100%" stopColor="#FFD700" />
                      </linearGradient>
                    </defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <polygon 
                      points="20,45 0,10 40,10" 
                      fill="url(#pointerGradient)" 
                      filter="url(#glow)"
                      stroke="#FFA000" 
                      strokeWidth="1.5"
                    />
                    <polygon 
                      points="20,38 6,12 34,12" 
                      fill="#FFFFFF" 
                      opacity="0.2"
                    />
                  </svg>
                </div>
                
                {/* Spinning wheel with animation effects */}
                <motion.div 
                  ref={wheelRef}
                  className="relative w-full pt-[100%] mb-16" // Reduced bottom margin
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
                
                {/* Center Spin Button with neon effect - OUTSIDE the rotating wheel */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="pointer-events-auto">
                    {/* Animated outer glow ring - only visible when not played */}
                    {!hasSpun && !isSpinning && (
                      <div className="absolute inset-0 w-full h-full rounded-full animate-pulse" 
                        style={{
                          background: 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,215,0,0) 70%)',
                          transform: 'scale(1.4)',
                          filter: 'blur(10px)'
                        }}
                      />
                    )}
                    
                    <motion.button
                      className={`w-28 h-28 sm:w-40 sm:h-40 rounded-full flex items-center justify-center relative z-10
                        ${hasSpun 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-br from-amber-500 via-yellow-400 to-amber-600 overflow-hidden'} 
                        text-white font-bold border-4 ${hasSpun ? 'border-gray-500' : 'border-amber-300'}`}
                      whileHover={hasSpun ? {} : { 
                        scale: 1.05,
                        boxShadow: '0 0 25px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.6)'
                      }}
                      whileTap={hasSpun ? {} : { scale: 0.95 }}
                      onClick={spinWheel}
                      disabled={isSpinning || hasSpun || showInstructionModal}
                      style={{ 
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                        boxShadow: hasSpun 
                          ? 'none' 
                          : '0 0 20px rgba(255, 215, 0, 0.7), 0 0 40px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      {/* Shine effect overlay for button */}
                      {!hasSpun && (
                        <div 
                          className="absolute inset-0 w-full h-full opacity-30" 
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0) 100%)',
                            transition: 'all 0.3s ease'
                          }}
                        />
                      )}
                      
                      <div className="text-center relative z-10">
                        <div className="text-sm sm:text-3xl font-bold">
                          {isSpinning ? 'SPINNING' : hasSpun ? 'PLAYED' : 'SPIN'}
                        </div>
                        {isSpinning && (
                          <div className="text-3xl mt-2 bg-amber-600/30 rounded-full w-10 h-10 mx-auto flex items-center justify-center">
                            <span className="inline-block animate-spin">⟳</span>
                          </div>
                        )}
                        {!isSpinning && !hasSpun && (
                          <div className="text-xl sm:text-3xl mt-2 font-bold">NOW!</div>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Thank you message - only shown after instruction modal is closed */}
              {!showInstructionModal && (
                <div className="mt-6 mb-3 text-center"> {/* Reduced margin */}
                  <h2 className="text-lg sm:text-xl font-bold text-indigo-800">
                    Thank you for your contribution, your turn to play!
                  </h2>
                </div>
              )}
            </div>
          )}
          
          {/* Footer */}
          <div className="bg-gray-100 p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} SpinRate. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Initial Instruction Modal */}
      {wheel && showInstructionModal && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gradient-to-b from-indigo-50/95 to-indigo-100/95 rounded-2xl border-4 border-indigo-500 shadow-2xl max-w-md w-[90%] sm:w-full p-5 sm:p-8 relative pointer-events-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500"></div>
            
            <h2 className="text-center text-xl sm:text-2xl font-bold text-indigo-900 font-serif mb-4 sm:mb-6">
              How it works? 😍
            </h2>
            
            <div className="my-4 sm:my-6 space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center flex-shrink-0">1</div>
                <p className="text-gray-800 text-sm sm:text-base">Give us a review.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center flex-shrink-0">2</div>
                <p className="text-gray-800 text-sm sm:text-base">Press the return key on your phone.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center flex-shrink-0">3</div>
                <p className="text-gray-800 text-sm sm:text-base">Come back to spin the wheel!</p>
              </div>
            </div>
            
            <div className="mt-6 sm:mt-8 text-center">
              <motion.button
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-800 transform transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReviewButtonClick}
              >
                Your turn !
              </motion.button>
            </div>
            
            <div className="mt-4 sm:mt-6 text-center">
              <motion.button
                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-800 underline cursor-pointer italic"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGameRulesClick}
              >
                Game Rules
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gradient-to-b from-amber-50/95 to-amber-100/95 rounded-2xl border-4 border-amber-500 shadow-2xl max-w-md w-[90%] sm:w-full p-5 sm:p-8 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="mx-auto mb-4 sm:mb-6 relative"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -inset-2 rounded-full border-4 border-dashed border-amber-400 animate-spin-slow opacity-70"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-center text-3xl sm:text-4xl font-bold text-amber-900 font-serif mb-3">YOU WON 🥳</h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
              
              <p className="text-center text-2xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-6 font-serif">
                {result.name}
              </p>
              
              {result.promoCode && (
                <motion.div 
                  className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/90 rounded-xl border-2 border-amber-300 shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <p className="text-gray-700 mb-1 font-medium text-center text-sm sm:text-base">Your Promo Code:</p>
                  <p className="text-xl sm:text-2xl font-bold text-amber-800 font-mono tracking-wider text-center bg-amber-50/90 py-2 rounded">
                    {result.promoCode}
                  </p>
                </motion.div>
              )}
              
              <div className="mt-6 border-t border-amber-200 pt-4">
                <p className="text-center text-gray-600 mb-4 text-sm sm:text-base">
                  Enter your contact details to receive your gift
                </p>
                
                <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); handleUserInfoSubmit(); }}>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleUserInfoChange}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                      placeholder="Email Address"
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
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm sm:text-base"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button
                      type="submit"
                      className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-lg shadow-lg hover:from-amber-700 hover:to-amber-800 transform transition-all duration-200"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WheelGamePage;