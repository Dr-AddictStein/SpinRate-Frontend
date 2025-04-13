import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import spinRateLogo from "../../../assets/Design_sans_titre__10_-ai-brush-removebg-5gtqgd1e.png";

const WheelGame = ({ lots, mainColors, customerInstruction = "Give us a review" }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const wheelRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Filter out empty lot names and use default if none provided
  const validLots = lots.filter(lot => lot.name.trim() !== '');
  
  // Use default lots if none provided
  const displayLots = validLots.length > 0 ? validLots : [
    { name: 'Prize A', odds: 1, promoCode: '' },
    { name: 'Prize B', odds: 1, promoCode: '' },
    { name: 'Prize C', odds: 1, promoCode: '' },
    { name: 'Prize D', odds: 1, promoCode: '' },
    { name: 'Prize E', odds: 1, promoCode: '' },
    { name: 'Prize F', odds: 1, promoCode: '' },
    { name: 'Prize G', odds: 1, promoCode: '' },
    { name: 'Prize H', odds: 1, promoCode: '' }
  ];
  
  // Use provided colors or defaults
  const primaryColors = [
    mainColors?.color1 || '#000000',
    mainColors?.color2 || '#6F6F00',
    mainColors?.color3 || '#00AA00',
  ];
  
  const instruction = customerInstruction.trim() !== '' ? customerInstruction : "Give us a review";

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
    const calculateSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get the parent container width
      const containerWidth = canvas.parentElement.clientWidth;
      
      // Set canvas dimensions to match container width
      canvas.width = containerWidth;
      canvas.height = containerWidth;
      
      // Force a redraw with the new dimensions
      drawWheel();
    };
    
    // Calculate size initially
    calculateSize();
    
    // Add resize listener
    window.addEventListener('resize', calculateSize);
    
    // Function to draw the wheel
    function drawWheel() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.92;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add outer border/ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.02, 0, 2 * Math.PI);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#FFFFFF'; // White border
      ctx.stroke();
      
      // Draw segments
      const segmentAngle = (2 * Math.PI) / displayLots.length;
      
      // Position the top segment properly - the pointer in the image points to the top
      const topPosition = Math.PI * 1.5; // 270 degrees
      const startOffset = topPosition - (segmentAngle / 2);
      
      // Center glow/light effect
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
        
        // Use all three colors in a repeating pattern
        const segmentColor = primaryColors[index % 3];
        
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
        let displayText = lot.name || 'Prize';
        
        // Set text properties
        const fontSize = Math.max(Math.min(radius * 0.09, 22), 16);
        ctx.font = `bold ${Math.floor(fontSize)}px Arial, sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        
        // Position context at center of wheel
        ctx.translate(centerX, centerY);
        
        // Rotate to match the segment's midpoint angle
        ctx.rotate(midAngle);
        
        // Draw text along the radial line path
        ctx.textAlign = 'center'; // Center the text on the line
        ctx.textBaseline = 'middle';
        
        // Add shadow for better readability against dark backgrounds
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        const textDistance = radius * 0.6;
        
        // Draw text with better contrast
        ctx.fillText(displayText, textDistance, 0);
        
        ctx.restore();
      });
      
      // Add a center logo circle
      const centerCircleRadius = radius * 0.12; // Small center circle
      
      // Draw white circle background with shadow
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fill();
      
      // Add a black border around the white circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000000";
      ctx.stroke();
      
      // Try to use SpinRate logo if available
      const logoImg = new Image();
      logoImg.src = spinRateLogo;
      
      // Draw the logo once it's loaded
      logoImg.onload = () => {
        // Clear the existing center to redraw
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        
        // Draw the logo in the center circle with clipping
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerCircleRadius - 3, 0, 2 * Math.PI);
        ctx.clip();
        
        // Calculate dimensions to maintain aspect ratio and fit within circle
        const size = centerCircleRadius * 1.5;
        ctx.drawImage(
          logoImg, 
          centerX - size/2, 
          centerY - size/2, 
          size, 
          size
        );
        
        ctx.restore();
        
        // Redraw the black border
        ctx.beginPath();
        ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
      };
      
      // Handle image loading error
      logoImg.onerror = () => {
        // Draw SR text as fallback
        drawCenterText();
      };
      
      // Function to draw text in the center if no logo is available
      function drawCenterText() {
        ctx.font = `bold ${Math.floor(centerCircleRadius * 0.9)}px Arial, sans-serif`;
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "transparent"; // Remove shadow for text
        
        // Draw "SR" for SpinRate
        ctx.fillText("SR", centerX, centerY);
      }
    }
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [displayLots, primaryColors]);
  
  // Handle wheel spin with enhanced animation
  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
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
    
    // Add more rotations for a more exciting spin (3-5 full rotations)
    const rotations = 3 + Math.floor(Math.random() * 2);
    const indexToRotate = (displayLots.length - winner) % displayLots.length;
    const spinDegrees = (360 * rotations) + (indexToRotate * segmentSize);
    
    // Add a bit of randomness to the final position for more realism
    const randomOffset = Math.random() * (segmentSize * 0.3) - (segmentSize * 0.15);
    const targetRotation = rotationDegrees + spinDegrees + randomOffset;
    
    setRotationDegrees(targetRotation);
    
    // Play spin sound if available
    try {
      const spinSound = new Audio();
      spinSound.src = "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3"; // Wheel spinning sound
      spinSound.volume = 0.5;
      spinSound.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
      console.log("Audio play failed:", e);
    }
    
    // Set a timer to show the result
    setTimeout(() => {
      // Play win sound
      try {
        const winSound = new Audio();
        winSound.src = "https://assets.mixkit.co/active_storage/sfx/2008/2008-preview.mp3"; // Win sound
        winSound.volume = 0.5;
        winSound.play().catch(e => console.log("Audio play failed:", e));
      } catch (e) {
        console.log("Audio play failed:", e);
      }
      
      setResult(displayLots[winner]);
      setIsSpinning(false);
    }, 5000); // Match this timing with the animation duration
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="relative w-full pt-6 pb-10 px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{instruction}</h2>
        </div>
        
        {/* Wheel and pointer container */}
        <div className="relative w-full max-w-sm mx-auto">
          {/* Fixed pointer triangle */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
            style={{ marginTop: '-20px' }}
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
          
          {/* Spinning wheel */}
          <motion.div 
            ref={wheelRef}
            className="relative w-full pt-[100%]" // 1:1 Aspect ratio
            initial={{ rotate: 0 }}
            animate={{ rotate: rotationDegrees }}
            transition={{ 
              duration: isSpinning ? 5 : 0,
              ease: [0.1, 0.25, 0.3, 1],
              type: "tween"
            }}
            style={{ 
              transformOrigin: 'center center',
              filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.4))',
              margin: '0'
            }}
          >
            <canvas 
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Spin button */}
      <motion.button
        className="px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg shadow-lg transform transition-all duration-200 text-base sm:text-lg md:text-xl text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={spinWheel}
        disabled={isSpinning}
        style={{ backgroundColor: mainColors?.color1 || '#000000' }}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center">
            <span className="inline-block animate-spin mr-2">⟳</span>
            SPINNING...
          </span>
        ) : (
          'SPIN THE WHEEL'
        )}
      </motion.button>
      
      {/* Result display with animation */}
      {result && (
        <motion.div 
          className="mt-6 p-6 bg-white rounded-xl border-2 text-center w-full max-w-sm shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
          style={{ borderColor: mainColors?.color1 || '#000000' }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.7, times: [0, 0.7, 1] }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center shadow-lg mb-4" 
                 style={{ backgroundColor: mainColors?.color1 || '#000000' }}>
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold mb-2" style={{ color: mainColors?.color1 || '#000000' }}>CONGRATULATIONS!</h3>
          <p className="text-2xl font-bold mb-4" style={{ color: mainColors?.color1 || '#000000' }}>{result.name}</p>
          
          {result.promoCode && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg border" style={{ borderColor: mainColors?.color1 || '#000000' }}>
              <p className="text-gray-700 mb-1 font-medium">Promo Code:</p>
              <p className="text-xl font-bold font-mono tracking-wider" style={{ color: mainColors?.color1 || '#000000' }}>{result.promoCode}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WheelGame;