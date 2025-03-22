import React, { useState, useEffect } from 'react';
import { Check, Info, Upload, Copy, Download, Grid } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import GamePreviewModal from './Component/GamePreviewModal';
import { useAuthContext } from '../../hooks/useAuthContext';
import wheelApi from './API/wheelApi.js';
import { toast } from 'react-toastify';

const WheelGameDashboard = () => {
  const { user, isInitialized } = useAuthContext();

  // Toggle preview modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const openPreviewModal = () => setIsPreviewModalOpen(true);
  const closePreviewModal = () => setIsPreviewModalOpen(false);

  // State variables for wheel configuration
  const [wheelId, setWheelId] = useState(null);
  const [googleReviewLink, setGoogleReviewLink] = useState('');
  const [customerInstruction, setCustomerInstruction] = useState('');
  const [mainColors, setMainColors] = useState({
    color1: '#fb1313',
    color2: '#05f020',
    color3: '#e8d611'
  });
  const [lots, setLots] = useState([
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' }
  ]);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isWheelSaved, setIsWheelSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Fetch user's wheel configuration when component mounts
  useEffect(() => {
    if (user?.user?._id) {
      fetchUserWheel();
    }
  }, [user]);

  // Fetch the user's wheel configuration from the backend
  const fetchUserWheel = async () => {
    if (!user?.user?._id) return;

    try {
      setIsLoading(true);
      const response = await wheelApi.getWheelsByUserId(user.user._id);

      if (response.wheels && response.wheels.length > 0) {
        // User has at least one wheel saved
        const wheel = response.wheels[0]; // Get the first wheel

        // Update state with wheel data
        setWheelId(wheel._id);
        setGoogleReviewLink(wheel.googleReviewLink || '');
        setCustomerInstruction(wheel.customerInstruction || '');

        // Set colors
        if (wheel.mainColors) {
          setMainColors(wheel.mainColors);
        }

        // Set lots (ensure we have exactly 8)
        if (wheel.lots && wheel.lots.length > 0) {
          // Create a new array with the existing lots
          const wheelLots = [...wheel.lots];

          // If less than 8 lots, add empty ones
          while (wheelLots.length < 8) {
            wheelLots.push({ name: '', odds: '1', promoCode: '' });
          }

          // Set at most 8 lots
          setLots(wheelLots.slice(0, 8));
        }

        // Set logo preview if available
        if (wheel.logoUrl) {
          setLogoPreview(wheel.logoUrl);
        }

        setIsWheelSaved(true);
      }
    } catch (error) {
      console.error("Error fetching wheel:", error);
      toast.error("Failed to load your wheel configuration");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logo file upload
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      // Create a preview URL
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  // Reset lots to default values
  const handleResetForm = () => {
    setLots([
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' },
      { name: '', odds: '1', promoCode: '' }
    ]);
    toast.success("Default values reset");
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user?.user?._id) {
      toast.error("You must be logged in to save a wheel");
      return;
    }

    try {
      setIsLoading(true);

      // First, upload the logo if a new one is selected
      let logoUrl = logoPreview;
      if (logoFile) {
        try {
          const uploadResponse = await wheelApi.uploadFile(logoFile);
          if (uploadResponse.filePath) {
            logoUrl = uploadResponse.filePath;
          }
        } catch (uploadError) {
          console.error("Error uploading logo:", uploadError);
          toast.error("Failed to upload logo image");
          // Continue with the wheel save even if logo upload fails
        }
      }

      // Prepare wheel data
      const wheelData = {
        userId: user.user._id,
        googleReviewLink,
        customerInstruction,
        mainColors,
        lots,
        logoUrl
      };

      // Either create a new wheel or update an existing one
      let response;
      if (wheelId) {
        // Update existing wheel
        response = await wheelApi.updateWheel(wheelId, wheelData);
        toast.success("Wheel updated successfully");
      } else {
        // Create new wheel
        response = await wheelApi.createWheel(wheelData);
        if (response.wheel?._id) {
          setWheelId(response.wheel._id);
        }
        toast.success("Wheel created successfully");
      }

      // Show saved UI elements
      setIsWheelSaved(true);
    } catch (error) {
      console.error("Error saving wheel:", error);
      toast.error(error.message || "Failed to save wheel");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate QR code URL
  const getQrCodeUrl = () => {
    if (!wheelId) return '';
    return `http://localhost:5173/wheelGame/${wheelId}`;
  };

  // Download QR code as SVG
  const downloadQRCodeAsSVG = () => {
    if (!wheelId) return;
    
    const svgElement = document.getElementById('wheel-qr-code');
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `wheel-qr-code-${wheelId}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  // Download QR code as PNG
  const downloadQRCodeAsPNG = () => {
    if (!wheelId) return;
    
    const svgElement = document.getElementById('wheel-qr-code');
    if (svgElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create an image from the SVG
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width * 2;  // Scale up for better quality
        canvas.height = img.height * 2;
        
        // Draw white background and the image
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to PNG and download
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `wheel-qr-code-${wheelId}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      };
      
      img.src = svgUrl;
    }
  };

  // Download poster functions
  const downloadEnglishPoster = () => {
    if (!wheelId) return;
    
    setIsLoading(true);
    toast.info("Preparing your poster...");
    
    // Get QR code as image
    const getQRCodeImage = () => {
      return new Promise((resolve) => {
        const svgElement = document.getElementById('wheel-qr-code');
        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const svgUrl = URL.createObjectURL(svgBlob);
          
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
            URL.revokeObjectURL(svgUrl);
          };
          img.src = svgUrl;
        } else {
          resolve(null);
        }
      });
    };
    
    // Load the template poster
    const templateImg = new Image();
    templateImg.crossOrigin = "Anonymous"; // Handle CORS if needed
    templateImg.onload = async () => {
      // Create canvas for composite image
      const canvas = document.createElement('canvas');
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;
      const ctx = canvas.getContext('2d');
      
      // Draw the template image
      ctx.drawImage(templateImg, 0, 0);
      
      // Get QR code image
      const qrCodeDataUrl = await getQRCodeImage();
      if (qrCodeDataUrl) {
        const qrImg = new Image();
        qrImg.onload = () => {
          // Draw QR code below the PLAY button
          // Adjusted position based on your feedback - more to the right
          const qrSize = templateImg.width * 0.22; // QR code size
          
          // Position the QR code more to the right, below the PLAY button
          // Based on the image, PLAY button is around 60% from the left
          // Moving further to the right as requested
          const qrX = templateImg.width * 0.72 - qrSize / 2; // Moved further right (from 0.6 to 0.67)
          const qrY = templateImg.height * 0.78; // Position below the PLAY button
          
          ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
          
          // Add logo at the top if available
          if (logoPreview) {
            const logoImg = new Image();
            logoImg.crossOrigin = "Anonymous";
            logoImg.onload = () => {
              // Draw logo near the top (position based on the template)
              // The logo should go above the "Spin now" text
              const logoMaxWidth = templateImg.width * 0.3; // Maximum logo width
              const logoMaxHeight = templateImg.height * 0.1; // Maximum logo height
              
              // Calculate logo dimensions while preserving aspect ratio
              const logoAspect = logoImg.width / logoImg.height;
              let logoWidth, logoHeight;
              
              if (logoAspect > 1) {
                // Wider logo
                logoWidth = Math.min(logoMaxWidth, logoImg.width);
                logoHeight = logoWidth / logoAspect;
              } else {
                // Taller logo
                logoHeight = Math.min(logoMaxHeight, logoImg.height);
                logoWidth = logoHeight * logoAspect;
              }
              
              // Position logo near the top center, above the main text
              const logoX = (templateImg.width - logoWidth) / 2;
              const logoY = templateImg.height * 0.05; // 5% from the top
              
              ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
              
              // Generate PDF
              generatePDF(canvas, 'English');
            };
            logoImg.onerror = () => {
              toast.error("Failed to load logo image");
              // Still generate PDF without logo
              generatePDF(canvas, 'English');
              setIsLoading(false);
            };
            logoImg.src = logoPreview;
          } else {
            // No logo, proceed directly to PDF generation
            generatePDF(canvas, 'English');
          }
        };
        qrImg.onerror = () => {
          toast.error("Failed to load QR code image");
          setIsLoading(false);
        };
        qrImg.src = qrCodeDataUrl;
      }
    };
    templateImg.onerror = () => {
      toast.error("Failed to load the English poster template");
      setIsLoading(false);
    };
    templateImg.src = '/English Poster.png'; // Path to the template in public folder
  };
  
  const downloadFrenchPoster = () => {
    if (!wheelId) return;
    
    setIsLoading(true);
    toast.info("Préparation de votre affiche...");
    
    // Get QR code as image
    const getQRCodeImage = () => {
      return new Promise((resolve) => {
        const svgElement = document.getElementById('wheel-qr-code');
        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const svgUrl = URL.createObjectURL(svgBlob);
          
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
            URL.revokeObjectURL(svgUrl);
          };
          img.src = svgUrl;
        } else {
          resolve(null);
        }
      });
    };
    
    // Load the template poster
    const templateImg = new Image();
    templateImg.crossOrigin = "Anonymous"; // Handle CORS if needed
    templateImg.onload = async () => {
      // Create canvas for composite image
      const canvas = document.createElement('canvas');
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;
      const ctx = canvas.getContext('2d');
      
      // Draw the template image
      ctx.drawImage(templateImg, 0, 0);
      
      // Get QR code image
      const qrCodeDataUrl = await getQRCodeImage();
      if (qrCodeDataUrl) {
        const qrImg = new Image();
        qrImg.onload = () => {
          // Draw QR code below the PLAY button
          // Adjusted position based on your feedback - more to the right
          const qrSize = templateImg.width * 0.22; // QR code size
          
          // Position the QR code more to the right, below the PLAY button
          // Based on the image, PLAY button is around 60% from the left
          // Moving further to the right as requested
          const qrX = templateImg.width * 0.72 - qrSize / 2; // Moved further right (from 0.6 to 0.67)
          const qrY = templateImg.height * 0.78; // Position below the PLAY button
          
          ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
          
          // Add logo at the top if available
          if (logoPreview) {
            const logoImg = new Image();
            logoImg.crossOrigin = "Anonymous";
            logoImg.onload = () => {
              // Draw logo near the top (position based on the template)
              // The logo should go above the "Spin now" text
              const logoMaxWidth = templateImg.width * 0.3; // Maximum logo width
              const logoMaxHeight = templateImg.height * 0.1; // Maximum logo height
              
              // Calculate logo dimensions while preserving aspect ratio
              const logoAspect = logoImg.width / logoImg.height;
              let logoWidth, logoHeight;
              
              if (logoAspect > 1) {
                // Wider logo
                logoWidth = Math.min(logoMaxWidth, logoImg.width);
                logoHeight = logoWidth / logoAspect;
              } else {
                // Taller logo
                logoHeight = Math.min(logoMaxHeight, logoImg.height);
                logoWidth = logoHeight * logoAspect;
              }
              
              // Position logo near the top center, above the main text
              const logoX = (templateImg.width - logoWidth) / 2;
              const logoY = templateImg.height * 0.05; // 5% from the top
              
              ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
              
              // Generate PDF
              generatePDF(canvas, 'French');
            };
            logoImg.onerror = () => {
              toast.error("Failed to load logo image");
              // Still generate PDF without logo
              generatePDF(canvas, 'French');
              setIsLoading(false);
            };
            logoImg.src = logoPreview;
          } else {
            // No logo, proceed directly to PDF generation
            generatePDF(canvas, 'French');
          }
        };
        qrImg.onerror = () => {
          toast.error("Failed to load QR code image");
          setIsLoading(false);
        };
        qrImg.src = qrCodeDataUrl;
      }
    };
    templateImg.onerror = () => {
      toast.error("Failed to load the French poster template");
      setIsLoading(false);
    };
    templateImg.src = '/French Poster.png'; // Path to the template in public folder
  };
  
  // Generate PDF from canvas
  const generatePDF = (canvas, language) => {
    try {
      // Get canvas data as image
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions for A4 paper
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Calculate image dimensions to fit A4
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      let finalWidth, finalHeight;
      if (ratio > pdfWidth / pdfHeight) {
        // Image is wider than A4 ratio
        finalWidth = pdfWidth;
        finalHeight = pdfWidth / ratio;
      } else {
        // Image is taller than A4 ratio
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * ratio;
      }
      
      // Center the image on the page
      const xOffset = (pdfWidth - finalWidth) / 2;
      const yOffset = (pdfHeight - finalHeight) / 2;
      
      // Create PDF with A4 size
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add the image to the PDF, centered
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight);
      
      // Save the PDF
      pdf.save(`wheel-poster-${language.toLowerCase()}-${wheelId}.pdf`);
      
      toast.success(`${language} poster has been downloaded as PDF`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Error generating PDF. Downloading as image instead.');
      
      // Fallback to PNG download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `wheel-poster-${language.toLowerCase()}-${wheelId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold text-gray-800">Wheel Game Configuration</h1>
        <div className="flex space-x-2">
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openPreviewModal}
            disabled={isLoading}
          >
            <Grid className="w-5 h-5" />
            <span>Preview Game</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Google Review Link */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('google')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <label className="font-semibold text-gray-800 text-lg">Google Review Link</label>
          </div>
          <div className="relative flex items-center w-3/4">
            <input
              type="text"
              value={googleReviewLink}
              onChange={(e) => setGoogleReviewLink(e.target.value)}
              placeholder="https://www.google.com/search?hl=en-BDXgbcbdxq=Michiko,+20+FL+des+"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
              disabled={isLoading}
            />
            {googleReviewLink && (
              <motion.div
                className="absolute right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Check className="text-green-500 w-5 h-5" />
              </motion.div>
            )}
            <motion.button
              className="absolute right-12 text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (googleReviewLink) {
                  navigator.clipboard.writeText(googleReviewLink);
                  toast.success("Google Review Link copied!");
                }
              }}
              disabled={!googleReviewLink || isLoading}
            >
              <Copy className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Customer Instruction */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('instruction')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Info className="w-5 h-5 text-purple-600" />
            </div>
            <label className="font-semibold text-gray-800 text-lg">
              Customer instruction <span className="text-sm font-normal text-gray-500">(20 character limit)</span>
            </label>
          </div>
          <div className="w-3/4">
            <div className="relative">
              <input
                type="text"
                value={customerInstruction}
                onChange={(e) => setCustomerInstruction(e.target.value)}
                placeholder="If empty default text: 'Give us a review'"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                maxLength={20}
                disabled={isLoading}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {customerInstruction.length}/20
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Colors */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('colors')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 rounded-full flex items-center justify-center mr-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <label className="font-semibold text-gray-800 text-lg">3 main colors</label>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 1</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color1 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color1}
                  onChange={(e) => setMainColors({ ...mainColors, color1: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                  disabled={isLoading}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color1.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 2</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color2 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color2}
                  onChange={(e) => setMainColors({ ...mainColors, color2: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                  disabled={isLoading}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color2.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 3</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color3 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color3}
                  onChange={(e) => setMainColors({ ...mainColors, color3: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                  disabled={isLoading}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color3.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-2">Preview</div>
          <div className="h-8 w-full rounded-lg" style={{
            background: `linear-gradient(to right, ${mainColors.color1} 0%, ${mainColors.color1} 33%, ${mainColors.color2} 33%, ${mainColors.color2} 66%, ${mainColors.color3} 66%, ${mainColors.color3} 100%)`
          }}></div>
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('logo')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <label className="font-semibold text-gray-800 text-lg">Logo</label>
          </div>
          <div className="flex w-3/4 items-center">
            <div className="relative flex-grow mr-6">
              <input
                type="file"
                id="logo-file"
                className="hidden"
                onChange={handleLogoChange}
                disabled={isLoading}
              />
              <label
                htmlFor="logo-file"
                className={`cursor-pointer flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg py-4 px-4 w-full transition duration-300 ease-in-out hover:border-green-500 hover:bg-green-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Choose File</span>
                  <span className="text-gray-400 text-sm mt-1">or drag and drop</span>
                </div>
              </label>
              {logoFile && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <Check className="text-white w-4 h-4" />
                </motion.div>
              )}
            </div>
            <motion.div
              className="w-32 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shadow-inner"
              whileHover={{ scale: 1.05 }}
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <img src="/api/placeholder/96/64" alt="Logo preview" className="max-w-full max-h-full opacity-50" />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Lots */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('lots')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
            <div className="text-amber-600 font-bold text-lg">🎁</div>
          </div>
          <label className="font-semibold text-gray-800 text-lg">Wheel Lots Configuration</label>
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">8 mandatory batches, if you don't have enough you can repeat them.</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">In case Losing is possible, write "Lost" in a batch and put a probability that it will happen, the message will change.</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">For the odds, there is no obligation that it be at 100, if you put 1 in each lot they will each have a 1 in 8 chance of being drawn.</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-4 bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 font-medium text-gray-700">
            <div className="col-span-5">Lot Name</div>
            <div className="col-span-2 text-center">Odds</div>
            <div className="col-span-5">Promo Code (optional)</div>
          </div>

          {lots.map((lot, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-12 gap-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="col-span-5 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center font-medium text-gray-800">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="text"
                  value={lot.name}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].name = e.target.value;
                    setLots(newLots);
                  }}
                  placeholder={`Prize ${index + 1}`}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                  disabled={isLoading}
                />
                {lot.name && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Check className="text-green-500 w-5 h-5" />
                  </motion.div>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  value={lot.odds}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].odds = e.target.value;
                    setLots(newLots);
                  }}
                  className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                  disabled={isLoading}
                />
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  value={lot.promoCode}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].promoCode = e.target.value;
                    setLots(newLots);
                  }}
                  placeholder="Promo Code (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                  disabled={isLoading}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            className="bg-amber-100 text-amber-700 py-2 px-4 rounded-lg flex items-center space-x-2 font-medium hover:bg-amber-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetForm}
            disabled={isLoading}
          >
            <span>Reset Default Values</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button and QR Section */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('save')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className={`flex ${isWheelSaved ? 'items-center justify-between' : 'justify-center'}`}>
          {!isWheelSaved ? (
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-10 rounded-lg font-medium text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save the Wheel'}
            </motion.button>
          ) : (
            <>
              <div className="w-1/2 flex flex-col items-center space-y-8">
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-10 rounded-lg font-medium text-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save the Wheel'}
                </motion.button>

                <motion.div
                  className="w-40 h-40 bg-white border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  {wheelId ? (
                    <QRCodeSVG
                      id="wheel-qr-code"
                      value={getQrCodeUrl()}
                      size={128}
                      level="H"
                      includeMargin={true}
                      imageSettings={{
                        src: logoPreview || '',
                        x: undefined,
                        y: undefined,
                        height: 24,
                        width: 24,
                        excavate: true,
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <div className="text-3xl mb-2">🎮</div>
                      <div className="text-sm">Save wheel to generate QR code</div>
                    </div>
                  )}
                </motion.div>
                
                {wheelId && (
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">Scan to Play</div>
                    <div className="text-xs text-gray-500 break-all max-w-[200px]">
                      {getQrCodeUrl()}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="w-1/2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Download Options</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadQRCodeAsSVG}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download SVG</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadQRCodeAsPNG}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PNG</span>
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Poster Options</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadEnglishPoster}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-4 h-4" />
                      <span>English Poster</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadFrenchPoster}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-4 h-4" />
                      <span>French Poster</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex justify-center mt-8 mb-6 text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>

      {/* Preview Modal */}
      <GamePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        gameData={{
          lots,
          mainColors,
          customerInstruction
        }}
      />
    </motion.div>
  );
};

export default WheelGameDashboard;