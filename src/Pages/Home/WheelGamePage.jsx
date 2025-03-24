import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import spinRateLogo from "../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";

const API_URL = 'https://spin-rate-backend.vercel.app/api';

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
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
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
    
    // Create modern gradient background for the wheel
    const bgGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.1,
      centerX, centerY, radius * 1.1
    );
    bgGradient.addColorStop(0, '#1A1A2E'); // Deep blue center
    bgGradient.addColorStop(1, '#0F0F1B'); // Almost black outer
    
    // Draw outer glow effect
    const glowSize = 15;
    ctx.shadowBlur = glowSize;
    ctx.shadowColor = '#4361EE'; // Bright blue glow
    
    // Draw background circle with glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, 2 * Math.PI);
    ctx.fillStyle = bgGradient;
    ctx.fill();
    
    // Reset shadow for crisp rendering of other elements
    ctx.shadowBlur = 0;
    
    // Add modern metallic ring around edge
    const ringGradient = ctx.createLinearGradient(
      centerX - radius, centerY - radius,
      centerX + radius, centerY + radius
    );
    ringGradient.addColorStop(0, '#FFD700'); // Gold
    ringGradient.addColorStop(0.5, '#FFF8E1'); // Light gold/silver
    ringGradient.addColorStop(1, '#FFD700'); // Gold again
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, 2 * Math.PI);
    ctx.lineWidth = 12;
    ctx.strokeStyle = ringGradient;
    ctx.stroke();
    
    // Add inner ring with neon effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#4361EE'; // Neon blue
    ctx.stroke();
    
    // Add light reflection on ring (3D effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, Math.PI * 1.7, Math.PI * 2.2);
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
        centerX, centerY, radius * 0.3,
        centerX, centerY, radius * 0.85
      );
      
      // Calculate darker version of color for gradient
      const darkerColor = adjustColor(segmentColor, -30);
      const lighterColor = adjustColor(segmentColor, 30);
      
      // Three-color gradient for more depth
      gradient.addColorStop(0, lighterColor);
      gradient.addColorStop(0.7, segmentColor);
      gradient.addColorStop(1, darkerColor);
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius * 0.85, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add 3D effect to segments with bright edge
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius * 0.85, startAngle, endAngle);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();
      
      // Draw divider lines with neon glow effect
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(startAngle) * radius * 0.85,
        centerY + Math.sin(startAngle) * radius * 0.85
      );
      
      // Create gradient for divider lines
      const dividerGradient = ctx.createLinearGradient(
        centerX, centerY,
        centerX + Math.cos(startAngle) * radius * 0.85,
        centerY + Math.sin(startAngle) * radius * 0.85
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
      
      // Text path
      const textDistance = radius * 0.6;
      
      // Modern text styling
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px "Montserrat", "Arial", sans-serif';
      
      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Draw text
      ctx.fillText(lot.name || 'Prize', textDistance, 6);
      
      // Draw a modern highlight icon based on index
      const iconDistance = radius * 0.4;
      ctx.fillStyle = '#FFFFFF';
      
      // Different icons or shapes for different segments
      if (index % 3 === 0) {
        // Star
        const starSize = 10;
        drawStar(ctx, iconDistance, 0, 5, starSize, starSize/2);
      } else if (index % 3 === 1) {
        // Circle
        ctx.beginPath();
        ctx.arc(iconDistance, 0, 6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Diamond
        ctx.beginPath();
        ctx.moveTo(iconDistance, -6);
        ctx.lineTo(iconDistance + 6, 0);
        ctx.lineTo(iconDistance, 6);
        ctx.lineTo(iconDistance - 6, 0);
        ctx.closePath();
        ctx.fill();
      }
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      ctx.restore();
    });
    
    // Draw center embellishment (modern futuristic hub)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.25, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(
      centerX - 10, centerY - 10, 5,
      centerX, centerY, radius * 0.25
    );
    centerGradient.addColorStop(0, '#FFF9C4'); // Light yellow
    centerGradient.addColorStop(0.7, '#FFD700'); // Gold
    centerGradient.addColorStop(1, '#FFA000'); // Darker gold/amber
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    // Add metallic effect to center
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    
    // Add inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.18, 0, 2 * Math.PI);
    const innerCenterGradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, radius * 0.18
    );
    innerCenterGradient.addColorStop(0, '#4361EE'); // Bright blue
    innerCenterGradient.addColorStop(1, '#3A0CA3'); // Deep purple
    ctx.fillStyle = innerCenterGradient;
    ctx.fill();
    
    // Add reflective highlight to center (3D effect)
    ctx.beginPath();
    ctx.arc(centerX - (radius * 0.08), centerY - (radius * 0.08), radius * 0.06, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
    
    // Draw decorative elements around the wheel
    // Animated-looking elements around the rim
    for (let i = 0; i < displayLots.length * 3; i++) {
      const angle = i * Math.PI / (displayLots.length * 1.5);
      const dotSize = i % 3 === 0 ? 4 : 2;
      
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(angle) * (radius * 1.02),
        centerY + Math.sin(angle) * (radius * 1.02),
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
    
    // Helper function to draw a star
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    }
    
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
  
  // Close result modal
  const closeResultModal = () => {
    setShowResultModal(false);
    setShowUserInfoModal(true);
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
        const response = await axios.post('https://spin-rate-backend.vercel.app/api/customer/create', userData);
        
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-6 px-3 sm:py-10 sm:px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
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
            <div className="p-4 sm:p-6 pt-24 sm:pt-28"> {/* Added padding top for logo space */}
              <div className="relative w-full max-w-md mx-auto">
                {/* Glowing outer ring animation */}
                <div className="absolute top-0 left-0 w-full h-full rounded-full animate-pulse-slow opacity-70 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(67, 97, 238, 0) 58%, rgba(67, 97, 238, 0.3) 80%, rgba(67, 97, 238, 0) 100%)',
                    transform: 'scale(1.1)'
                  }}
                ></div>
                
                {/* Enhanced pointer triangle */}
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 pointer"
                  style={{ 
                    filter: 'drop-shadow(0px 0px 8px rgba(67, 97, 238, 0.8))',
                    marginTop: '-10px'
                  }}
                >
                  <svg width="40" height="45" viewBox="0 0 40 45" xmlns="http://www.w3.org/2000/svg">
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
                  className="relative w-full pt-[100%]" // 1:1 Aspect ratio
                  initial={{ rotate: 0 }}
                  animate={{ rotate: rotationDegrees }}
                  transition={{ 
                    duration: isSpinning ? 5 : 0,
                    ease: [0.1, 0.25, 0.3, 1], // More realistic momentum curve
                    type: "tween"
                  }}
                  style={{ 
                    transformOrigin: 'center center',
                    filter: 'drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.5))'
                  }}
                >
                  <canvas 
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </motion.div>
                
                {/* Modern decorative wheel stand */}
                <div className="absolute -left-4 -right-4 -bottom-3 top-[90%] bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl shadow-xl flex items-center justify-center overflow-hidden">
                  {/* Metallic looking base */}
                  <div className="h-full w-full relative">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20"></div>
                    {/* Highlight line */}
                    <div className="bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 h-1.5 w-2/3 rounded-full mx-auto mt-2.5"></div>
                  </div>
                </div>
              </div>
              
              {/* Thank you message - only shown after instruction modal is closed */}
              {!showInstructionModal && (
                <div className="mt-6 sm:mt-8 mb-3 sm:mb-4 text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-indigo-800">
                    Thank you for your contribution, your turn to play!
                  </h2>
                </div>
              )}
              
              {/* Enhanced spin button with glow effect */}
              <div className="mt-4 sm:mt-6 text-center">
                <motion.button
                  className={`px-8 sm:px-10 py-3 sm:py-4 rounded-full ${hasSpun 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 hover:scale-105'} 
                    text-gray-900 font-bold text-base sm:text-lg tracking-wider border-2 ${hasSpun ? 'border-gray-500' : 'border-amber-600'} shadow-lg`}
                  whileHover={{ scale: hasSpun ? 1 : 1.05, boxShadow: hasSpun ? "none" : "0px 6px 15px rgba(255, 200, 10, 0.6)" }}
                  whileTap={{ scale: hasSpun ? 1 : 0.95 }}
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpun || showInstructionModal}
                  style={{ 
                    textShadow: hasSpun ? 'none' : '0px 1px 2px rgba(0,0,0,0.3)',
                    boxShadow: hasSpun ? 'none' : '0px 6px 15px rgba(255, 200, 10, 0.4), 0px 0px 15px rgba(255, 200, 10, 0.3)'
                  }}
                >
                  {isSpinning ? 'SPINNING...' : hasSpun ? 'ALREADY PLAYED' : 'SPIN THE WHEEL'}
                  
                  {/* Animate the button while spinning */}
                  {isSpinning && (
                    <span className="ml-2 inline-block animate-spin">⟳</span>
                  )}
                </motion.button>
              </div>
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
            
            <div className="mt-6 sm:mt-8 text-center space-y-3 sm:space-y-4">
              <motion.button
                className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-800 transform transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReviewButtonClick}
              >
                Your turn !
              </motion.button>
              
              <motion.button
                className="w-full sm:w-auto px-6 sm:px-8 py-2 bg-transparent text-indigo-700 font-medium italic rounded-full border border-indigo-300 hover:bg-indigo-50 transform transition-all duration-200"
                whileHover={{ scale: 1.03 }}
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
            {/* Close button */}
            <button 
              onClick={closeResultModal}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
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
              <h2 className="text-center text-2xl sm:text-3xl font-bold text-amber-900 font-serif mb-1 sm:mb-2">YOU WON!</h2>
              <div className="w-12 sm:w-16 h-1 bg-amber-500 mx-auto mb-3 sm:mb-4"></div>
              
              <p className="text-center text-3xl sm:text-4xl font-bold text-amber-800 mb-4 sm:mb-6 font-serif">
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
              
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  onClick={closeResultModal}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-full shadow-lg hover:from-amber-700 hover:to-amber-800 transform transition-all duration-200 hover:scale-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
      
      {/* User Information Modal */}
      {showUserInfoModal && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white/95 rounded-2xl border border-gray-200 shadow-2xl max-w-md w-[90%] sm:w-full p-5 sm:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              Enter your contact details
            </h2>
            <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">to receive your gift</p>
            
            <form className="space-y-3 sm:space-y-4" onSubmit={(e) => { e.preventDefault(); handleUserInfoSubmit(); }}>
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors text-sm sm:text-base"
                >
                  Submit Information
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WheelGamePage;