import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://spin-rate-backend.vercel.app/api';

const WheelGamePage = () => {
  const { id } = useParams(); // Get wheel ID from URL
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
    name: '',
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
      wheel.mainColors?.color1 || '#fb1313',
      wheel.mainColors?.color2 || '#05f020',
      wheel.mainColors?.color3 || '#e8d611'
    ];
    
    const displayLots = wheel.lots && wheel.lots.length > 0 
      ? wheel.lots 
      : Array(8).fill({ name: 'Prize', odds: '1', promoCode: '' });
    
    // Create gradient background for the wheel
    const bgGradient = ctx.createRadialGradient(
      centerX, centerY, radius * 0.1,
      centerX, centerY, radius * 1.1
    );
    bgGradient.addColorStop(0, '#111827');
    bgGradient.addColorStop(1, '#030712');
    
    // Draw background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, 2 * Math.PI);
    ctx.fillStyle = bgGradient;
    ctx.fill();
    
    // Add gold ring around edge
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.1, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#D4AF37'; // Gold color
    ctx.stroke();
    
    // Add inner gold ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.85, 0, 2 * Math.PI);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#D4AF37'; // Gold color
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
      
      // Create gradient for segments
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      
      // Calculate darker version of color for gradient
      const darkerColor = adjustColor(segmentColor, -40);
      gradient.addColorStop(0, segmentColor);
      gradient.addColorStop(1, darkerColor);
      
      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius * 0.85, startAngle, endAngle);
      ctx.closePath();
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.strokeStyle = '#D4AF37'; // Gold border
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw divider lines
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(startAngle) * radius * 0.85,
        centerY + Math.sin(startAngle) * radius * 0.85
      );
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(midAngle);
      
      // Text path
      const textDistance = radius * 0.6;
      
      // Text styling
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px "Trajan Pro", serif';
      
      // Add text shadow for royal look
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      // Draw text
      ctx.fillText(lot.name || 'Prize', textDistance, 5);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      ctx.restore();
    });
    
    // Draw center embellishment (gold circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.2, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(
      centerX - 10, centerY - 10, 5,
      centerX, centerY, radius * 0.2
    );
    centerGradient.addColorStop(0, '#FFF2CC'); // Light gold
    centerGradient.addColorStop(1, '#D4AF37'); // Gold
    ctx.fillStyle = centerGradient;
    ctx.fill();
    
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#B8860B'; // Darker gold
    ctx.stroke();
    
    // Add decorative center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = '#111111';
    ctx.fill();
    
    // Draw small decorative dots around the wheel
    for (let i = 0; i < displayLots.length * 2; i++) {
      const angle = i * Math.PI / displayLots.length;
      ctx.beginPath();
      ctx.arc(
        centerX + Math.cos(angle) * (radius * 1.02),
        centerY + Math.sin(angle) * (radius * 1.02),
        3,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = '#FFD700';
      ctx.fill();
    }
    
  }, [wheel, rotationDegrees]);
  
  // Handle wheel spin
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
    
    // The wheel is drawn with segment 0 at the top (so it's already aligned properly)
    // We need to rotate by (segment number * degrees per segment) to bring the winner to the top
    
    // Calculate correct degrees to rotate
    // We add 720 degrees (2 full rotations) + additional rotation
    // We reverse the winner index because the wheel rotates clockwise
    const indexToRotate = (displayLots.length - winner) % displayLots.length;
    const spinDegrees = 720 + (indexToRotate * segmentSize);
    
    // Animate the wheel
    const targetRotation = rotationDegrees + spinDegrees;
    setRotationDegrees(targetRotation);
    
    // Set a timer to show the result
    setTimeout(() => {
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
  
  // Handle user info input changes
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle user info submission
  const handleUserInfoSubmit = () => {
    // Just close the modal for now
    setShowUserInfoModal(false);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header with logo if available */}
          <div className="bg-indigo-600 p-4 text-white text-center relative h-24">
            {wheel?.logoUrl && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-lg">
                <img 
                  src={wheel.logoUrl} 
                  alt="Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
            )}

          </div>
          
          {/* Wheel game - now always visible */}
          {showWheelGame && (
            <div className="p-6">
              <div className="relative w-full max-w-md mx-auto">
                {/* Fixed pointer triangle */}
                <div 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 pointer"
                  style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5))' }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <polygon 
                      points="20,40 0,10 40,10" 
                      fill="#D4AF37" 
                      stroke="#000000" 
                      strokeWidth="2"
                    />
                    <polygon 
                      points="20,35 5,12 35,12" 
                      fill="#FFF2CC" 
                    />
                  </svg>
                </div>
                
                {/* Spinning wheel */}
                <motion.div 
                  ref={wheelRef}
                  className="relative w-full pt-[100%]" // 1:1 Aspect ratio
                  initial={{ rotate: 0 }}
                  animate={{ rotate: rotationDegrees }}
                  transition={{ 
                    duration: isSpinning ? 5 : 0,
                    ease: [0.2, 0.9, 0.1, 1],
                    type: "tween"
                  }}
                  style={{ transformOrigin: 'center center' }}
                >
                  <canvas 
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </motion.div>
                
                {/* Decorative base */}
                <div className="absolute -left-3 -right-3 -bottom-3 top-[90%] bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-xl shadow-lg flex items-center justify-center">
                  <div className="bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 h-2 w-3/4 rounded-full mt-2"></div>
                </div>
              </div>
              
              {/* Spin button - Only show if instruction modal is closed */}
              <div className="mt-16 text-center">
                <motion.button
                  className={`px-10 py-4 rounded-full ${hasSpun 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 hover:scale-105'} 
                    text-gray-900 font-bold text-lg tracking-wider border-2 ${hasSpun ? 'border-gray-500' : 'border-amber-600'} shadow-lg`}
                  whileHover={{ scale: hasSpun ? 1 : 1.05, boxShadow: hasSpun ? "none" : "0px 6px 15px rgba(153, 119, 9, 0.5)" }}
                  whileTap={{ scale: hasSpun ? 1 : 0.95 }}
                  onClick={spinWheel}
                  disabled={isSpinning || hasSpun || showInstructionModal}
                >
                  {isSpinning ? 'SPINNING...' : hasSpun ? 'ALREADY PLAYED' : 'SPIN THE WHEEL'}
                </motion.button>
              </div>
            </div>
          )}
          
          {/* Footer */}
          <div className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SpinRate. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      {/* Initial Instruction Modal */}
      {wheel && showInstructionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 pointer-events-none">
          <motion.div 
            className="bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-2xl border-4 border-indigo-500 shadow-2xl max-w-md w-full p-8 relative pointer-events-auto"
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
            
            <h2 className="text-center text-2xl font-bold text-indigo-900 font-serif mb-6">
              {instruction}
            </h2>
            
            <div className="my-6 space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0">i</div>
                <p className="text-gray-800">Click on the "Rate Us" Button.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0">ii</div>
                <p className="text-gray-800">Press back button of your Phone.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-600 text-white font-bold rounded-full h-7 w-7 flex items-center justify-center flex-shrink-0">iii</div>
                <p className="text-gray-800">Play the game and win prizes!!!</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-indigo-800 transform transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReviewButtonClick}
              >
                Rate Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl border-4 border-amber-500 shadow-2xl max-w-md w-full p-8 relative"
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              className="mx-auto mb-6 relative"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 flex items-center justify-center shadow-lg">
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <h2 className="text-center text-3xl font-bold text-amber-900 font-serif mb-2">CONGRATULATIONS!</h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
              
              <p className="text-center text-4xl font-bold text-amber-800 mb-6 font-serif">
                {result.name}
              </p>
              
              {result.promoCode && (
                <motion.div 
                  className="mt-6 p-4 bg-white rounded-xl border-2 border-amber-300 shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <p className="text-gray-700 mb-1 font-medium text-center">Your Promo Code:</p>
                  <p className="text-2xl font-bold text-amber-800 font-mono tracking-wider text-center bg-amber-50 py-2 rounded">
                    {result.promoCode}
                  </p>
                </motion.div>
              )}
              
              <div className="mt-8 text-center">
                <button
                  onClick={closeResultModal}
                  className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold rounded-full shadow-lg hover:from-amber-700 hover:to-amber-800 transform transition-all duration-200 hover:scale-105"
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Please Share Your Information
            </h2>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleUserInfoSubmit(); }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleUserInfoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
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