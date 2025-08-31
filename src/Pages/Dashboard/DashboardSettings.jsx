import React, { useState, useEffect } from 'react';
import { Check, Info, Upload, Copy, Download, Grid } from 'lucide-react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import GamePreviewModal from './Component/GamePreviewModal';
import { useAuthContext } from '../../hooks/useAuthContext';
import wheelApi from './API/wheelApi.js';
import { toast } from 'react-toastify';
import { useLanguage } from '../../context/LanguageContext';
import LinkAssist from "../../../public/LinkAssist.png"
import SignupModal from '../../Components/SignupModal.jsx'

// Translations object
const translations = {
  en: {
    title: "Wheel Game Configuration",
    previewGame: "Preview Game",
    businessName: "Business Name",
    googleReviewLink: "Google Review Link",
    socialMediaLink: "Social Media Link (optional)",
    orSocialMediaLink: "or social media link",
    customerInstruction: "Customer instruction",
    characterLimit: "(40 character limit)",
    mainColors: "3 main colors",
    color1: "Color 1",
    color2: "Color 2",
    color3: "Color 3",
    preview: "Preview",
    logo: "Logo",
    chooseFile: "Choose File",
    dragAndDrop: "or drag and drop",
    wheelLotsConfiguration: "Wheel Lots Configuration",
    lotInfo1: "8 mandatory batches, if you don't have enough you can repeat them.",
    lotInfo2: "In case Losing is possible, write \"Lost\" in a batch and put a probability that it will happen, the message will change.",
    lotInfo3: "For the odds, there is no obligation that it be at 100, if you put 1 in each lot they will each have a 1 in 8 chance of being drawn.",
    lotName: "Lot Name",
    odds: "Odds",
    promoCode: "Promo Code (optional)",
    prize: "Prize",
    resetDefaultValues: "Reset Default Values",
    saveWheel: "Save the Wheel",
    saving: "Saving...",
    requiredFieldsWarning: "Please fill in all required fields marked with * before saving the wheel.",
    scanToPlay: "Scan to Play",
    posterOptions: "Poster Options",
    englishPoster: "English Poster",
    frenchPoster: "French Poster",
    downloadOptions: "Download Options",
    downloadSVG: "Download SVG",
    downloadPNG: "Download PNG",
    lastUpdated: "Last updated",
    linkInstructionText: "Find your link in your Google Business listing (shown above) and fill it in the \"Google Review Link\" field",
    
    // Validation messages
    loginRequired: "You must be logged in to save a wheel",
    businessNameRequired: "Business Name is required",
    googleReviewRequired: "Google Review Link is required",
    customerInstructionRequired: "Customer instruction is required",
    logoRequired: "Logo is required",
    lotsRequired: "All lots must have a name and odds value",
    fillAllRequiredFields: "Please fill in all required fields to save your wheel",
    logoUploadFailed: "Failed to upload logo image",
    wheelUpdateSuccess: "Wheel updated successfully",
    wheelCreateSuccess: "Wheel created successfully",
    saveFailed: "Failed to save wheel",
    loadConfigFailed: "Failed to load your wheel configuration",
    valuesReset: "Default values reset",
    linkCopied: "Google Review Link copied!",
    enterBusinessName: "Please enter your business name",
    enterGoogleReview: "Please enter a Google Review Link",
    enterCustomerInstructions: "Please enter customer instructions",
    uploadLogo: "Please upload a logo for your wheel",
    fillLotFields: "Please fill in all lot names and odds values",
    posterPreparingEn: "Preparing your poster...",
    posterPreparingFr: "Préparation de votre affiche...",
    posterDownloaded: "{language} poster has been downloaded as PDF",
    pdfGenerationError: "Error generating PDF. Downloading as image instead."
  },
  fr: {
    title: "Configuration du Jeu de Roue",
    previewGame: "Aperçu du Jeu",
    businessName: "Nom de l'Entreprise",
    googleReviewLink: "Lien Google Review",
    socialMediaLink: "Lien de Réseau social (optionnel)",
    orSocialMediaLink: "ou lien de réseau social",
    customerInstruction: "Instruction client",
    characterLimit: "(limite de 40 caractères)",
    mainColors: "3 couleurs principales",
    color1: "Couleur 1",
    color2: "Couleur 2",
    color3: "Couleur 3",
    preview: "Aperçu",
    logo: "Logo",
    chooseFile: "Choisir un Fichier",
    dragAndDrop: "ou glisser-déposer",
    wheelLotsConfiguration: "Configuration des Lots de la Roue",
    lotInfo1: "8 lots obligatoires, si vous n'en avez pas assez, vous pouvez les répéter.",
    lotInfo2: "En cas de possibilité de perdre, écrivez \"Perdu\" dans un lot et mettez une probabilité que cela se produise, le message changera.",
    lotInfo3: "Pour les probabilités, il n'y a pas d'obligation qu'elles soient à 100, si vous mettez 1 dans chaque lot, ils auront chacun 1 chance sur 8 d'être tirés.",
    lotName: "Nom du Lot",
    odds: "Probabilités",
    promoCode: "Code Promo (optionnel)",
    prize: "Prix",
    resetDefaultValues: "Réinitialiser les Valeurs",
    saveWheel: "Enregistrer la Roue",
    saving: "Enregistrement...",
    requiredFieldsWarning: "Veuillez remplir tous les champs obligatoires marqués d'un * avant d'enregistrer la roue.",
    scanToPlay: "Scanner pour Jouer",
    posterOptions: "Options d'Affiche",
    englishPoster: "Affiche Anglaise",
    frenchPoster: "Affiche Française",
    downloadOptions: "Options de Téléchargement",
    downloadSVG: "Télécharger SVG",
    downloadPNG: "Télécharger PNG",
    lastUpdated: "Dernière mise à jour",
    linkInstructionText: "Trouvez votre lien dans votre fiche Google Business (photo ci-dessus) et remplissez-le dans la case \"Lien google review\"",
    
    // Validation messages
    loginRequired: "Vous devez être connecté pour enregistrer une roue",
    businessNameRequired: "Le nom de l'entreprise est requis",
    googleReviewRequired: "Le lien Google Review est requis",
    customerInstructionRequired: "L'instruction client est requise",
    logoRequired: "Le logo est requis",
    lotsRequired: "Tous les lots doivent avoir un nom et une valeur de probabilité",
    fillAllRequiredFields: "Veuillez remplir tous les champs obligatoires pour enregistrer votre roue",
    logoUploadFailed: "Échec du téléchargement de l'image du logo",
    wheelUpdateSuccess: "Roue mise à jour avec succès",
    wheelCreateSuccess: "Roue créée avec succès",
    saveFailed: "Échec de l'enregistrement de la roue",
    loadConfigFailed: "Échec du chargement de la configuration de votre roue",
    valuesReset: "Valeurs par défaut réinitialisées",
    linkCopied: "Lien Google Review copié!",
    enterBusinessName: "Veuillez entrer le nom de votre entreprise",
    enterGoogleReview: "Veuillez entrer un lien Google Review",
    enterCustomerInstructions: "Veuillez entrer les instructions client",
    uploadLogo: "Veuillez télécharger un logo pour votre roue",
    fillLotFields: "Veuillez remplir tous les noms et probabilités des lots",
    posterPreparingEn: "Préparation de votre affiche en anglais...",
    posterPreparingFr: "Préparation de votre affiche en français...",
    posterDownloaded: "L'affiche en {language} a été téléchargée en PDF",
    pdfGenerationError: "Erreur lors de la génération du PDF. Téléchargement en tant qu'image à la place."
  }
};

const WheelGameDashboard = () => {
  const { user, isInitialized } = useAuthContext();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Toggle preview modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const openPreviewModal = () => setIsPreviewModalOpen(true);
  const closePreviewModal = () => setIsPreviewModalOpen(false);

  // Email verification modal state
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);

  const sendVerificationAndOpen = async () => {
    if (sendingVerification) return;
    setSendingVerification(true);
    try {
      await fetch(`https://api.revwheel.fr/api/user/send-verification-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: user?.user?.fullName || '',
          email: user?.user?.email || ''
        })
      });
    } catch (e) {
      // no-op; still open modal to guide user
    } finally {
      setSendingVerification(false);
      setShowVerifyModal(true);
    }
  };

  // State variables for wheel configuration
  const [wheelId, setWheelId] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [googleReviewLink, setGoogleReviewLink] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
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
  const [validationErrors, setValidationErrors] = useState({
    businessName: false,
    googleReviewLink: false,
    customerInstruction: false,
    logo: false,
    lots: []
  });

  // Refs for scrolling to elements
  const businessNameRef = React.useRef(null);
  const googleReviewRef = React.useRef(null);
  const customerInstructionRef = React.useRef(null);
  const logoRef = React.useRef(null);
  const lotsRef = React.useRef(null);

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
        setBusinessName(wheel.businessName || '');
        setGoogleReviewLink(wheel.googleReviewLink || '');
        setSocialMediaLink(wheel.socialMediaLink || '');
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
      toast.error(t.loadConfigFailed);
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
    toast.success(t.valuesReset);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user?.user?._id) {
      toast.error(t.loginRequired);
      return;
    }

    // Gate by email verification
    if (user?.user?.emailVerified === false) {
      await sendVerificationAndOpen();
      return;
    }

    // Reset validation errors
    setValidationErrors({
      businessName: false,
      googleReviewLink: false,
      customerInstruction: false,
      logo: false,
      lots: []
    });

    // Validate required fields
    let hasErrors = false;
    let errors = {
      businessName: false,
      googleReviewLink: false,
      customerInstruction: false,
      logo: false,
      lots: Array(8).fill(false)
    };
    
    // Check Business Name
    if (!businessName.trim()) {
      toast.error(t.businessNameRequired);
      errors.businessName = true;
      hasErrors = true;
      // Scroll to the element
      if (businessNameRef.current) {
        businessNameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Check Google Review Link
    if (!googleReviewLink.trim()) {
      toast.error(t.googleReviewRequired);
      errors.googleReviewLink = true;
      hasErrors = true;
      // Scroll to the element
      if (googleReviewRef.current) {
        googleReviewRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Check Customer Instruction
    if (!customerInstruction.trim()) {
      toast.error(t.customerInstructionRequired);
      errors.customerInstruction = true;
      hasErrors = true;
      // If Business Name and Google Review Link weren't errors, scroll to this element
      if (!errors.businessName && !errors.googleReviewLink && customerInstructionRef.current) {
        customerInstructionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Check Logo
    if (!logoFile && !logoPreview) {
      toast.error(t.logoRequired);
      errors.logo = true;
      hasErrors = true;
      // If previous fields weren't errors, scroll to this element
      if (!errors.businessName && !errors.googleReviewLink && !errors.customerInstruction && logoRef.current) {
        logoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Check Lots - ensure each lot has a name and odds
    let lotErrors = Array(8).fill(false);
    lots.forEach((lot, index) => {
      if (!lot.name.trim() || !lot.odds.trim()) {
        lotErrors[index] = true;
        hasErrors = true;
      }
    });
    
    if (lotErrors.some(error => error)) {
      toast.error(t.lotsRequired);
      errors.lots = lotErrors;
      // If previous fields weren't errors, scroll to this element
      if (!errors.businessName && !errors.googleReviewLink && !errors.customerInstruction && !errors.logo && lotsRef.current) {
        lotsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // Set validation errors
    setValidationErrors(errors);
    
    // If validation fails, don't proceed
    if (hasErrors) {
      toast.error(t.fillAllRequiredFields, { autoClose: 5000 });
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
          toast.error(t.logoUploadFailed);
          // Continue with the wheel save even if logo upload fails
        }
      }

      // Prepare wheel data
      const wheelData = {
        userId: user.user._id,
        businessName,
        googleReviewLink,
        socialMediaLink,
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
        toast.success(t.wheelUpdateSuccess);
      } else {
        // Create new wheel
        response = await wheelApi.createWheel(wheelData);
        if (response.wheel?._id) {
          setWheelId(response.wheel._id);
        }
        toast.success(t.wheelCreateSuccess);
      }

      // Show saved UI elements
      setIsWheelSaved(true);
    } catch (error) {
      console.error("Error saving wheel:", error);
      toast.error(error.message || t.saveFailed);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate QR code URL
  const getQrCodeUrl = () => {
    if (!wheelId) return '';
    return `https://revwheel.fr/wheelGame/${wheelId}`;
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
    toast.info(t.posterPreparingEn);

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
              // Set logo dimensions to 260px x 260px
              const logoWidth = 260;
              const logoHeight = 260;

              // Position logo near the top center, above the main text
              const logoX = (templateImg.width - logoWidth) / 2;
              const logoY = templateImg.height * 0.05; // 5% from the top

              ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);

              // Generate PDF
              generatePDF(canvas, 'English');
            };
            logoImg.onerror = () => {
              toast.error(t.logoUploadFailed);
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
    templateImg.src = '/English2.png'; // Path to the template in public folder
  };

  const downloadFrenchPoster = () => {
    if (!wheelId) return;

    setIsLoading(true);
    toast.info(t.posterPreparingFr);

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
              // Set logo dimensions to 260px x 260px
              const logoWidth = 260;
              const logoHeight = 260;

              // Position logo near the top center, above the main text
              const logoX = (templateImg.width - logoWidth) / 2;
              const logoY = templateImg.height * 0.05; // 5% from the top

              ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);

              // Generate PDF
              generatePDF(canvas, 'French');
            };
            logoImg.onerror = () => {
              toast.error(t.logoUploadFailed);
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

      const langText = language === 'English' ? (language === 'fr' ? 'anglais' : 'English') : 
                       (language === 'fr' ? 'français' : 'French');
      
      toast.success(t.posterDownloaded.replace('{language}', langText));
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(t.pdfGenerationError);

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
      className="w-full max-w-6xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8 gap-3"
        variants={itemVariants}
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{t.title}</h1>
        <motion.button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 shadow-lg w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openPreviewModal}
          disabled={isLoading}
        >
          <Grid className="w-5 h-5" />
          <span>{t.previewGame}</span>
        </motion.button>
      </motion.div>

      {/* Business Name */}
      <motion.div
        ref={businessNameRef}
        className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border ${validationErrors.businessName ? 'border-red-500 shadow-red-100' : 'border-gray-100'}`}
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('businessName')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <label className="font-semibold text-gray-800 text-base sm:text-lg">{t.businessName} <span className="text-xs sm:text-sm font-normal text-gray-500">(25 character limit)</span> <span className="text-red-500">*</span></label>
          </div>
          <div className="relative flex items-center w-full sm:w-3/4">
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                if (validationErrors.businessName) {
                  setValidationErrors({...validationErrors, businessName: false});
                }
              }}
              placeholder={language === 'fr' ? "Entrez le nom de votre entreprise" : "Enter your business name"}
              className={`w-full p-2 sm:p-3 text-sm rounded-lg border ${validationErrors.businessName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out`}
              maxLength={25}
              disabled={isLoading}
              required
            />
            <span className="absolute right-10 sm:right-12 text-xs text-gray-500">
              {businessName.length}/25
            </span>
            {businessName && (
              <motion.div
                className="absolute right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            )}
          </div>
        </div>
        {validationErrors.businessName && (
          <div className="mt-2 text-red-500 text-xs sm:text-sm">
            {t.enterBusinessName}
          </div>
        )}
      </motion.div>

      {/* Google Review Link */}
      <motion.div
        ref={googleReviewRef}
        className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border ${validationErrors.googleReviewLink ? 'border-red-500 shadow-red-100' : 'border-gray-100'}`}
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('google')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <label className="font-semibold text-gray-800 text-base sm:text-lg">{t.googleReviewLink} <span className="text-red-500">*</span></label>
          </div>
          <div className="relative flex items-center w-full sm:w-3/4">
            <input
              type="text"
              value={googleReviewLink}
              onChange={(e) => {
                setGoogleReviewLink(e.target.value);
                if (validationErrors.googleReviewLink) {
                  setValidationErrors({...validationErrors, googleReviewLink: false});
                }
              }}
              placeholder=""
              className={`w-full p-2 sm:p-3 text-sm rounded-lg border ${validationErrors.googleReviewLink ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out`}
              disabled={isLoading}
              required
            />
            {googleReviewLink && (
              <motion.div
                className="absolute right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            )}
            <motion.button
              className="absolute right-10 sm:right-12 text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (googleReviewLink) {
                  navigator.clipboard.writeText(googleReviewLink);
                  toast.success(t.linkCopied);
                }
              }}
              disabled={!googleReviewLink || isLoading}
            >
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </div>
        <div className="flex items-center ml-2 sm:ml-4 -mt-2 sm:-mt-3 mb-2">
          <span className="font-semibold text-gray-800 text-sm sm:text-lg">{t.orSocialMediaLink}</span>
        </div>
        <div className="mt-2 flex justify-center">
          <img src={LinkAssist} alt="Link instructions" className="max-w-full h-auto rounded-lg shadow-sm" />
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs sm:text-sm italic text-gray-600">{t.linkInstructionText}</p>
        </div>
        {validationErrors.googleReviewLink && (
          <div className="mt-2 text-red-500 text-xs sm:text-sm">
            {t.enterGoogleReview}
          </div>
        )}
      </motion.div>

      {/* Customer Instruction */}
      <motion.div
        ref={customerInstructionRef}
        className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border ${validationErrors.customerInstruction ? 'border-red-500 shadow-red-100' : 'border-gray-100'}`}
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('instruction')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <label className="font-semibold text-gray-800 text-base sm:text-lg">
              {t.customerInstruction} <span className="text-xs sm:text-sm font-normal text-gray-500">{t.characterLimit}</span> <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-full sm:w-3/4">
            <div className="relative">
              <input
                type="text"
                value={customerInstruction}
                onChange={(e) => {
                  setCustomerInstruction(e.target.value);
                  if (validationErrors.customerInstruction) {
                    setValidationErrors({...validationErrors, customerInstruction: false});
                  }
                }}
                placeholder={language === 'fr' ? "Si vide, texte par défaut: 'Donnez-nous un avis'" : "If empty default text: 'Give us a review'"}
                className={`w-full p-2 sm:p-3 text-sm sm:text-base border ${validationErrors.customerInstruction ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200`}
                maxLength={40}
                disabled={isLoading}
                required
              />
              <span className="absolute right-3 top-2 sm:top-3 text-xs text-gray-500">
                {customerInstruction.length}/40
              </span>
            </div>
          </div>
        </div>
        {validationErrors.customerInstruction && (
          <div className="mt-2 text-red-500 text-xs sm:text-sm">
            {t.enterCustomerInstructions}
          </div>
        )}
      </motion.div>

      {/* Main Colors */}
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('colors')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full"></div>
          </div>
          <label className="font-semibold text-gray-800 text-base sm:text-lg">{t.mainColors}</label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-3 sm:p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-sm sm:text-base text-gray-700">{t.color1}</div>
            <div className="relative">
              <div
                className="w-full h-12 sm:h-16 rounded-lg mb-2 shadow-inner"
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
                  className="w-full h-8 sm:h-10 cursor-pointer rounded-lg border-2 border-gray-300"
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
            className="bg-gradient-to-b from-white to-gray-50 p-3 sm:p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-sm sm:text-base text-gray-700">{t.color2}</div>
            <div className="relative">
              <div
                className="w-full h-12 sm:h-16 rounded-lg mb-2 shadow-inner"
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
                  className="w-full h-8 sm:h-10 cursor-pointer rounded-lg border-2 border-gray-300"
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
            className="bg-gradient-to-b from-white to-gray-50 p-3 sm:p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-sm sm:text-base text-gray-700">{t.color3}</div>
            <div className="relative">
              <div
                className="w-full h-12 sm:h-16 rounded-lg mb-2 shadow-inner"
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
                  className="w-full h-8 sm:h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                  disabled={isLoading}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color3.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-2 text-sm sm:text-base">{t.preview}</div>
          <div className="h-6 sm:h-8 w-full rounded-lg" style={{
            background: `linear-gradient(to right, ${mainColors.color1} 0%, ${mainColors.color1} 33%, ${mainColors.color2} 33%, ${mainColors.color2} 66%, ${mainColors.color3} 66%, ${mainColors.color3} 100%)`
          }}></div>
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div
        ref={logoRef}
        className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border ${validationErrors.logo ? 'border-red-500 shadow-red-100' : 'border-gray-100'}`}
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('logo')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <label className="font-semibold text-gray-800 text-base sm:text-lg">{t.logo} <span className="text-red-500">*</span></label>
          </div>
          <div className="flex flex-col sm:flex-row sm:w-3/4 items-center gap-3 sm:gap-0">
            <div className="relative flex-grow w-full sm:mr-6">
              <input
                type="file"
                id="logo-file"
                className="hidden"
                onChange={(e) => {
                  handleLogoChange(e);
                  if (validationErrors.logo) {
                    setValidationErrors({...validationErrors, logo: false});
                  }
                }}
                disabled={isLoading}
                required
              />
              <label
                htmlFor="logo-file"
                className={`cursor-pointer flex items-center justify-center bg-white border-2 border-dashed ${validationErrors.logo ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg py-3 sm:py-4 px-3 sm:px-4 w-full transition duration-300 ease-in-out hover:border-green-500 hover:bg-green-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <Upload className={`w-6 h-6 sm:w-8 sm:h-8 ${validationErrors.logo ? 'text-red-400' : 'text-gray-400'} mb-1 sm:mb-2`} />
                  <span className={`${validationErrors.logo ? 'text-red-600' : 'text-gray-600'} font-medium text-sm sm:text-base`}>{t.chooseFile}</span>
                  <span className={`${validationErrors.logo ? 'text-red-400' : 'text-gray-400'} text-xs sm:text-sm mt-1`}>{t.dragAndDrop}</span>
                </div>
              </label>
              {logoFile && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <Check className="text-white w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
              )}
            </div>
            <motion.div
              className={`w-24 sm:w-32 h-20 sm:h-24 ${validationErrors.logo ? 'bg-red-50 border-red-200' : 'bg-gray-100 border-gray-200'} rounded-lg border flex items-center justify-center overflow-hidden shadow-inner`}
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
        {validationErrors.logo && (
          <div className="mt-2 text-red-500 text-xs sm:text-sm">
            {t.uploadLogo}
          </div>
        )}
      </motion.div>

      {/* Lots */}
      <motion.div
        ref={lotsRef}
        className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border ${validationErrors.lots.some(error => error) ? 'border-red-500 shadow-red-100' : 'border-gray-100'}`}
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('lots')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
            <div className="text-amber-600 font-bold text-lg">🎁</div>
          </div>
          <label className="font-semibold text-gray-800 text-base sm:text-lg">{t.wheelLotsConfiguration} <span className="text-red-500">*</span></label>
        </div>

        <div className="mt-3 sm:mt-4 bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-100 mb-4 sm:mb-6">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1 flex-shrink-0">▲</div>
              <div className="text-blue-800 text-xs sm:text-sm">{t.lotInfo1}</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1 flex-shrink-0">▲</div>
              <div className="text-blue-800 text-xs sm:text-sm">{t.lotInfo2}</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1 flex-shrink-0">▲</div>
              <div className="text-blue-800 text-xs sm:text-sm">{t.lotInfo3}</div>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="mb-3 sm:mb-4 bg-gray-50 rounded-lg p-2 sm:p-3 grid grid-cols-12 gap-2 sm:gap-4 font-medium text-gray-700 text-xs sm:text-sm">
            <div className="col-span-5">{t.lotName} <span className="text-red-500">*</span></div>
            <div className="col-span-2 text-center">{t.odds} <span className="text-red-500">*</span></div>
            <div className="col-span-5">{t.promoCode}</div>
          </div>

          <div className="space-y-3">
            {lots.map((lot, index) => (
              <motion.div
                key={index}
                className="grid grid-cols-12 gap-2 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="col-span-5 relative">
                  <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-medium text-gray-800 text-xs sm:text-sm">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <input
                    type="text"
                    value={lot.name}
                    onChange={(e) => {
                      const newLots = [...lots];
                      newLots[index].name = e.target.value;
                      setLots(newLots);
                      
                      if (validationErrors.lots[index]) {
                        const newLotErrors = [...validationErrors.lots];
                        newLotErrors[index] = false;
                        setValidationErrors({...validationErrors, lots: newLotErrors});
                      }
                    }}
                    placeholder={`${t.prize} ${index + 1}`}
                    className={`w-full p-2 sm:p-3 pl-8 sm:pl-12 text-xs sm:text-sm border ${validationErrors.lots[index] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200`}
                    disabled={isLoading}
                    required
                  />
                  {lot.name && (
                    <motion.div
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      <Check className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
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
                      
                      if (validationErrors.lots[index]) {
                        const newLotErrors = [...validationErrors.lots];
                        newLotErrors[index] = false;
                        setValidationErrors({...validationErrors, lots: newLotErrors});
                      }
                    }}
                    className={`w-full p-2 sm:p-3 text-center text-xs sm:text-sm border ${validationErrors.lots[index] ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200`}
                    disabled={isLoading}
                    required
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
                    placeholder={t.promoCode}
                    className="w-full p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {validationErrors.lots.some(error => error) && (
          <div className="mt-3 sm:mt-4 text-red-500 text-xs sm:text-sm">
            {t.fillLotFields}
          </div>
        )}

        <div className="mt-4 sm:mt-6 flex justify-end">
          <motion.button
            className="bg-amber-100 text-amber-700 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center space-x-1 sm:space-x-2 font-medium hover:bg-amber-200 text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetForm}
            disabled={isLoading}
          >
            <span>{t.resetDefaultValues}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button and QR Section */}
      <motion.div
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('save')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className={`flex flex-col ${isWheelSaved ? 'sm:flex-row sm:items-center sm:justify-between' : 'sm:flex-row sm:justify-between sm:items-center'} gap-4`}>
          {!isWheelSaved ? (
            <>
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-6 sm:px-10 rounded-lg font-medium text-base sm:text-lg shadow-lg w-full sm:w-auto"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? t.saving : t.saveWheel}
              </motion.button>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 max-w-md">
                <div className="flex items-start">
                  <div className="text-amber-500 mr-2 mt-1 flex-shrink-0">⚠️</div>
                  <div className="text-xs sm:text-sm">{t.requiredFieldsWarning}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full sm:w-1/2 flex flex-col items-center space-y-6 sm:space-y-8">
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-3 px-6 sm:px-10 rounded-lg font-medium text-base sm:text-lg shadow-lg w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? t.saving : t.saveWheel}
                </motion.button>

                <motion.div
                  className="w-32 h-32 sm:w-40 sm:h-40 bg-white border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  {wheelId ? (
                    <QRCodeSVG
                      id="wheel-qr-code"
                      value={getQrCodeUrl()}
                      size={wheelId ? (window.innerWidth < 640 ? 100 : 128) : 0}
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
                      <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎮</div>
                      <div className="text-xs sm:text-sm">{t.saveWheel}</div>
                    </div>
                  )}
                </motion.div>

                {wheelId && (
                  <div className="text-center">
                    <div className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{t.scanToPlay}</div>
                    <div className="text-xs text-gray-500 break-all max-w-[180px] sm:max-w-[200px]">
                      {getQrCodeUrl()}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="w-full sm:w-1/2 space-y-4 sm:space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">{t.posterOptions}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadEnglishPoster}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{t.englishPoster}</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadFrenchPoster}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{t.frenchPoster}</span>
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">{t.downloadOptions}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadQRCodeAsSVG}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{t.downloadSVG}</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 shadow-md text-xs sm:text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={downloadQRCodeAsPNG}
                      disabled={isLoading || !wheelId}
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{t.downloadPNG}</span>
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
        className="flex justify-center mt-6 sm:mt-8 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>{t.lastUpdated}: {new Date().toLocaleDateString()}</p>
      </motion.div>

      {/* Preview Modal */}
      <GamePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        gameData={{
          lots,
          mainColors,
          customerInstruction,
          logoUrl: logoPreview
        }}
      />

      {showVerifyModal && (
        <SignupModal
          closeModal={() => setShowVerifyModal(false)}
          openToVerificationNotice={true}
          initialEmail={user?.user?.email || ''}
          initialFullName={user?.user?.fullName || ''}
          closeTo={'/dashboard/settings'}
        />
      )}
    </motion.div>
  );
};

export default WheelGameDashboard;