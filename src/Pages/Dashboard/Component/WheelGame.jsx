import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
  
  const segmentSize = 360 / displayLots.length;
  
  // Use provided colors or defaults
  const colors = [
    mainColors?.color1 || '#fb1313',
    mainColors?.color2 || '#05f020',
    mainColors?.color3 || '#e8d611'
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
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
    
    // FIX FOR SEGMENT ALIGNMENT
    // Canvas: 0 degrees = 3 o'clock, we want to start at 12 o'clock (top/270 degrees)
    // Critical insight: When the wheel rotates clockwise, the first segment should
    // be the one that appears at the top in the initial position
    
    // Start at the top (Math.PI * 1.5 or 270 degrees)
    const topPosition = Math.PI * 1.5;
    // Move back half a segment to center the first segment at the top
    const startOffset = topPosition - (segmentAngle / 2);
    
    // Draw a visual indicator for exact alignment check
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY - radius * 0.85, // Position at the top of the wheel
      5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = '#ffffff'; // White color
    ctx.fill();
    
    // Create an array to store the positions of segments
    const segmentPositions = [];
    
    // Draw each segment
    displayLots.forEach((lot, index) => {
      const startAngle = startOffset + (index * segmentAngle);
      const endAngle = startOffset + ((index + 1) * segmentAngle);
      const midAngle = startAngle + (segmentAngle / 2);
      
      // Store position info for debugging
      segmentPositions.push({
        name: lot.name,
        index,
        startAngle: (startAngle * 180 / Math.PI) % 360,
        midAngle: (midAngle * 180 / Math.PI) % 360,
        endAngle: (endAngle * 180 / Math.PI) % 360
      });
      
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
      
      // Draw text
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
      ctx.fillText(lot.name, textDistance, 5);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      ctx.restore();
    });
    
    // IMPORTANT: Show our segment positioning to debug the issue
    console.log('Segment Positions:', segmentPositions);
    console.log('Segment at top (270°) is initially:', displayLots[0].name);
    console.log('Total segments:', displayLots.length);
    console.log('Degrees per segment:', 360 / displayLots.length);
    
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
    
  }, [displayLots, colors]);
  
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
    
    // CRITICAL FIX: The rotation and winner selection
    console.log(`Selected winner index: ${winner}, Prize: ${displayLots[winner].name}`);
    
    // When we draw the wheel, segment 0 is already at the top (with a small offset)
    // To rotate winner to top, we need to:
    // A) Make several full rotations (720 degrees = 2 full rotations)
    // B) Then rotate by (winner * segmentSize)
    
    // IMPORTANT: Notice the direction here
    // If we spin clockwise (positive degrees), we need the segment that is
    // (number_of_segments - winner) % number_of_segments from segment 0
    // This is because clockwise rotation means segments move from top to right to bottom to left
    
    const degreePerSegment = 360 / displayLots.length;
    
    // Calculate correct degrees to rotate
    // We add 720 degrees (2 full rotations) + additional rotation
    // We reverse the winner index because the wheel rotates clockwise
    const indexToRotate = (displayLots.length - winner) % displayLots.length;
    const spinDegrees = 720 + (indexToRotate * degreePerSegment);
    
    console.log(`Spinning ${spinDegrees} degrees to position winner ${winner} (${displayLots[winner].name}) at top`);
    
    // Set up animation settings
    const targetRotation = rotationDegrees + spinDegrees;
    
    // Play spin sound
    const spinSound = new Audio('/api/placeholder/1/1');
    spinSound.volume = 0.5;
    spinSound.play().catch(e => console.log('Sound play error:', e));
    
    // Animate the wheel
    setRotationDegrees(targetRotation);
    
    // Set a timer to show the result
    setTimeout(() => {
      setResult(displayLots[winner]);
      setIsSpinning(false);
      
      // Play win sound
      const winSound = new Audio('/api/placeholder/1/1');
      winSound.volume = 0.7;
      winSound.play().catch(e => console.log('Sound play error:', e));
      
    }, 5000); // Match this timing with the animation duration
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="relative w-full pt-6 pb-10 px-4">
        {/* Title with royal design */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-amber-600 mb-2 font-serif tracking-wider">{instruction}</h2>
          <div className="flex items-center justify-center">
            <div className="h-1 w-12 bg-amber-600"></div>
            <div className="mx-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4AF37" />
              </svg>
            </div>
            <div className="h-1 w-12 bg-amber-600"></div>
          </div>
        </div>
        
        {/* Wheel and pointer container */}
        <div className="relative w-full max-w-sm mx-auto">
          {/* Fixed pointer triangle - updated to point down toward the wheel */}
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
          
          {/* Decorative elements */}
          <div className="absolute -left-3 -right-3 -bottom-3 top-[90%] bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-xl shadow-lg flex items-center justify-center">
            <div className="bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 h-2 w-3/4 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
      
      {/* Spin button with royal design */}
      <motion.button
        className="px-10 py-4 rounded-full bg-gradient-to-r from-amber-700 via-yellow-500 to-amber-700 text-gray-900 font-bold text-lg tracking-wider border-2 border-amber-600 shadow-lg my-4"
        whileHover={{ scale: 1.05, boxShadow: "0px 6px 15px rgba(153, 119, 9, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
      </motion.button>
      
      {/* Result display with animation */}
      {result && (
        <motion.div 
          className="mt-6 p-6 bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl border-2 border-amber-400 text-center w-full max-w-sm shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.7, times: [0, 0.7, 1] }}
          >
            <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#D4AF37" />
            </svg>
          </motion.div>
          
          <h3 className="text-xl font-bold text-amber-900 mb-2 font-serif">CONGRATULATIONS!</h3>
          <p className="text-2xl font-bold text-amber-800 mb-4 font-serif">{result.name}</p>
          
          {result.promoCode && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-300">
              <p className="text-gray-700 mb-1 font-medium">Promo Code:</p>
              <p className="text-xl font-bold text-amber-800 font-mono tracking-wider">{result.promoCode}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default WheelGame;