import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import spinRateLogo from "../../../assets/REVWHEELlogo.png";

const GamePreviewModal = ({ isOpen, onClose, gameData }) => {
  const { lots, mainColors, customerInstruction, logoUrl, businessName } = gameData || {};
  
  // Loading state
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  // Wheel game state
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  
  // References
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);
  
  // Filter out empty lot names and use default if none provided
  const validLots = lots?.filter(lot => lot.name.trim() !== '') || [];
  
  // Use default lots if none provided
  const displayLots = validLots.length > 0 ? validLots : [
    { name: '$8 mandatory', odds: '1' },
    { name: '$8 mandatory', odds: '1' },
    { name: '$8 mandatory', odds: '1' },
    { name: '$8 mandatory', odds: '1' },
    { name: '$8 mandatory', odds: '1' },
    { name: '$5 mandatory', odds: '1' },
    { name: '$3 mandatory', odds: '1' },
    { name: 'ZERO', odds: '1' },
  ];
  
  // Use provided colors or defaults
  const primaryColors = [
    mainColors?.color1 || '#000000',
    mainColors?.color2 || '#6F6F00',
    mainColors?.color3 || '#00AA00',
  ];

  // Set data as loaded when gameData is available
  useEffect(() => {
    if (gameData) {
      console.log('GamePreviewModal - gameData received:', gameData);
      console.log('GamePreviewModal - logoUrl:', gameData.logoUrl);
      
      // Small delay to ensure all data is processed
      const timer = setTimeout(() => {
        setIsDataLoaded(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsDataLoaded(false);
    }
  }, [gameData]);

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
  
  // Draw the wheel on canvas - only when data is loaded
  useEffect(() => {
    // Only draw if data is loaded and canvas exists
    if (!isDataLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let pixelRatio = window.devicePixelRatio || 1;
    let scaledOnce = false;

    // Dynamically set canvas size based on container size
    const calculateSize = () => {
      // Reset transform to prevent accumulating scales
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      scaledOnce = false;

      // Get the parent container width (accounting for any padding)
      const containerWidth = canvas.parentElement.clientWidth;

      // Set display size (css pixels)
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerWidth}px`;

      // Set actual size in memory (scaled for pixel ratio)
      canvas.width = containerWidth * pixelRatio;
      canvas.height = containerWidth * pixelRatio;

      // Force a redraw with the new dimensions
      drawWheel(containerWidth);
    };

    // Calculate size initially
    calculateSize();

    // Add resize listener specific to this effect
    window.addEventListener('resize', calculateSize);

    // Function to draw the wheel (extracted to be called after resize)
    function drawWheel(containerWidth) {
      // Apply scale for high DPI displays ONLY ONCE per redraw
      if (!scaledOnce) {
        ctx.scale(pixelRatio, pixelRatio);
        scaledOnce = true;
      }

      const centerX = containerWidth / 2;
      const centerY = containerWidth / 2;
      // Increase the radius factor from 0.92 to 0.96 to make wheel bigger
      const radius = Math.min(centerX, centerY) * 0.96;

      // Clear canvas
      ctx.clearRect(0, 0, containerWidth, containerWidth);

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
      const startOffset = topPosition - segmentAngle / 2;

      // Center glow/light effect (subtle white radial gradient)
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 0.9
      );
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw each segment
      displayLots.forEach((lot, index) => {
        const startAngle = startOffset + index * segmentAngle;
        const endAngle = startOffset + (index + 1) * segmentAngle;
        const midAngle = startAngle + segmentAngle / 2;

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
        let displayText = lot.name || '$8 mandatory';

        // Reduce font size for better content fitting
        // Reduced the multiplier from 0.11 to 0.09 and minimum size from 18 to 14
        const fontSize = Math.max(Math.min(radius * 0.09, 20), 14);
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

        // Place text in middle of where the line would be
        // Adjust the positioning for the new wheel size - move text slightly outward
        const textDistance = radius * 0.68;

        // Handle text wrapping for long text
        if (displayText.length > 14) {
          // Split text into two lines
          const words = displayText.split(' ');
          let line1 = '';
          let line2 = '';

          // Simple split at middle if no spaces
          if (words.length === 1) {
            const mid = Math.ceil(displayText.length / 2);
            line1 = displayText.substring(0, mid);
            line2 = displayText.substring(mid);
          } else {
            // Try to split at a space
            const mid = Math.ceil(words.length / 2);
            line1 = words.slice(0, mid).join(' ');
            line2 = words.slice(mid).join(' ');
          }

          // Draw first line - adjust line spacing for smaller text
          ctx.fillText(line1, textDistance, -fontSize * 0.6);
          // Draw second line
          ctx.fillText(line2, textDistance, fontSize * 0.6);
        } else {
          // Draw single line text
          ctx.fillText(displayText, textDistance, 0);
        }

        ctx.restore();
      });

      // Add a center logo circle
      const centerCircleRadius = radius * 0.14; // Increased from 0.12 to 0.14

      // Draw white circle background with shadow
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fill();

      // Add a black border around the white circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // If a logo URL exists, draw it in the center circle
      if (logoUrl) {
        // Create an image object for the logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous'; // Add CORS support
        logoImg.src = logoUrl;

        // Draw the logo once it's loaded
        logoImg.onload = () => {
          // Clear the existing center to redraw
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Draw the logo in the center circle with clipping
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius - 3, 0, 2 * Math.PI);
          ctx.clip();

          // Calculate dimensions to maintain aspect ratio and fit within circle
          // Using the same size factor as for the primary logo
          ctx.drawImage(
            logoImg,
            centerX - (centerCircleRadius * 1.7) / 2,
            centerY - (centerCircleRadius * 1.7) / 2,
            centerCircleRadius * 1.7,
            centerCircleRadius * 1.7
          );

          ctx.restore();

          // Redraw the black border
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#000000';
          ctx.stroke();
        };

        // Handle image loading error
        logoImg.onerror = () => {
          console.log('Failed to load custom logo, using fallback');
          // Draw SR text as fallback
          drawCenterText();
        };
      } else {
        // Draw SR text when no logo is available
        drawCenterText();
      }

      // Function to draw text in the center if no logo is available
      function drawCenterText() {
        // Create an image object for the SpinRate logo
        const logoImg = new Image();
        logoImg.src = spinRateLogo;

        // Draw the logo once it's loaded
        logoImg.onload = () => {
          // Clear the existing center
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Draw the SpinRate logo in the center circle with clipping
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius - 3, 0, 2 * Math.PI);
          ctx.clip();

          // Calculate dimensions to maintain aspect ratio and fit within circle
          // Using the same size factor as for the primary logo
          ctx.drawImage(
            logoImg,
            centerX - (centerCircleRadius * 1.7) / 2,
            centerY - (centerCircleRadius * 1.7) / 2,
            centerCircleRadius * 1.7,
            centerCircleRadius * 1.7
          );

          ctx.restore();

          // Redraw the black border
          ctx.beginPath();
          ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#000000';
          ctx.stroke();
        };

        // Handle image loading error
        logoImg.onerror = () => {
          console.log('Failed to load SpinRate logo, using text fallback');
          // Fallback to text if logo fails to load
          ctx.font = `bold ${Math.floor(
            centerCircleRadius * 1.1
          )}px Arial, sans-serif`; // Increased from 0.9 to 1.1
          ctx.fillStyle = '#000000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'transparent';
          ctx.fillText('SR', centerX, centerY);
        };
      }
    }

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [isDataLoaded, displayLots, primaryColors, logoUrl, rotationDegrees]);

  // Handle wheel spin with enhanced animation
  const spinWheel = () => {
    if (isSpinning || hasSpun || !isDataLoaded) return;

    setIsSpinning(true);
    setResult(null);

    // Filter lots for winner selection (exclude 0 odds)
    const winnerLots = displayLots.filter((lot) => parseInt(lot.odds) > 0);

    // If no valid lots remain after filtering, show error
    if (winnerLots.length === 0) {
      setIsSpinning(false);
      return;
    }

    // Calculate total odds
    const totalOdds = winnerLots.reduce(
      (sum, lot) => sum + (parseInt(lot.odds) || 1),
      0
    );

    // Select winning segment based on odds
    let randomValue = Math.random() * totalOdds;
    let winnerIndex = 0;

    for (let i = 0; i < winnerLots.length; i++) {
      randomValue -= parseInt(winnerLots[i].odds) || 1;
      if (randomValue <= 0) {
        winnerIndex = i;
        break;
      }
    }

    // Find the winner's position in the original array
    const winnerName = winnerLots[winnerIndex].name;
    const winner = displayLots.findIndex((lot) => lot.name === winnerName);

    // Calculate rotation to position the winning segment at the top
    const segmentSize = 360 / displayLots.length;

    // Calculate correct degrees to rotate
    // Add more rotations for a more exciting spin (3-5 full rotations)
    const rotations = 3 + Math.floor(Math.random() * 2);
    const indexToRotate = (displayLots.length - winner) % displayLots.length;
    const spinDegrees = 360 * rotations + indexToRotate * segmentSize;

    // Add a bit of randomness to the final position for more realism
    const randomOffset =
      Math.random() * (segmentSize * 0.3) - segmentSize * 0.15;
    const targetRotation = rotationDegrees + spinDegrees + randomOffset;

    setRotationDegrees(targetRotation);

    // Set a timer to show the result
    setTimeout(() => {
      // Store the winning result
      const winningResult = displayLots[winner];
      setResult(winningResult);
      setIsSpinning(false);
      setHasSpun(true);
    }, 5000); // Match this timing with the animation duration
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 50, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] relative"
            variants={modalVariants}
          >
            <div className="sticky top-0 bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-bold">Game Preview</h2>
              <motion.button
                className="text-white rounded-full p-1 hover:bg-indigo-500"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-60px)]">
              {!isDataLoaded ? (
                // Loading state
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-12 h-12 border-t-4 border-b-4 border-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading game preview...</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-xl overflow-visible relative p-1 sm:p-2 md:p-4 flex flex-col flex-1">
                  {/* Logo at top left with no header */}
                  {logoUrl && (
                    <div className="absolute left-0 sm:left-2 md:left-4 top-0 sm:top-2 md:top-4 z-10 bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-lg border-2 border-gray-400">
                      <img
                        src={logoUrl}
                        alt="Logo"
                        className="w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] object-contain"
                        onLoad={() => {
                          console.log('Top-left logo loaded successfully:', logoUrl);
                        }}
                        onError={(e) => {
                          console.log('Failed to load top-left logo:', logoUrl);
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Wheel game - now always visible */}
                  <div className="pt-32 sm:pt-40 md:pt-52 pb-2 sm:pb-6 md:pb-8 overflow-visible flex-1 flex flex-col justify-center">
                    <div className="mx-auto w-full lg:w-[95%]">
                      {/* Spin button above wheel */}
                      <div className="text-center mb-6 sm:mb-8 md:mb-10">
                        <motion.button
                          className={`px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg shadow-lg transform transition-all duration-200 text-base sm:text-lg md:text-xl
                            ${
                              hasSpun || isSpinning
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "text-white hover:opacity-90"
                            }`}
                          whileHover={
                            hasSpun || isSpinning
                              ? {}
                              : { scale: 1.05 }
                          }
                          whileTap={
                            hasSpun || isSpinning
                              ? {}
                              : { scale: 0.95 }
                          }
                          onClick={spinWheel}
                          disabled={isSpinning || hasSpun}
                          style={
                            hasSpun || isSpinning
                              ? {}
                              : {
                                  backgroundColor:
                                    mainColors?.color1 || '#000000',
                                }
                          }
                        >
                          {isSpinning ? (
                            <span className="flex items-center justify-center">
                              <span className="inline-block animate-spin mr-2">
                                ⟳
                              </span>
                              SPINNING...
                            </span>
                          ) : (
                            'SPIN THE WHEEL'
                          )}
                        </motion.button>
                      </div>

                      {/* Wheel container with pointer */}
                      <div className="relative">
                        {/* Pointer triangle */}
                        <div
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
                          style={{ marginTop: "-20px" }}
                        >
                          <svg
                            width="50"
                            height="55"
                            viewBox="0 0 30 35"
                            className="sm:w-[60px] sm:h-[65px]"
                          >
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
                          className="relative w-full pt-[100%] mb-4 sm:mb-12 md:mb-16"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: rotationDegrees }}
                          transition={{
                            duration: isSpinning ? 5 : 0,
                            ease: [0.1, 0.25, 0.3, 1],
                            type: "tween",
                          }}
                          style={{
                            transformOrigin: "center center",
                            filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.4))",
                            margin: "0",
                          }}
                        >
                          <canvas
                            ref={canvasRef}
                            className="absolute top-0 left-0 w-full h-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-100 p-2 sm:p-3 md:p-4 text-center text-gray-500 text-xs sm:text-sm mt-auto">
                    <p>© {new Date().getFullYear()} RevWheel. All rights reserved.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamePreviewModal;