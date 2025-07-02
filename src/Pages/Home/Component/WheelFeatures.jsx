import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useLanguage } from '../../../context/LanguageContext';

// Import images from assets
import image1_1 from '../../../assets/1.1 (2).png';
import image1_2 from '../../../assets/1.2.png';
import image1_3 from '../../../assets/1.3.png';
import image2_1 from '../../../assets/2.1.png';
import image2_2 from '../../../assets/2.2.png';
import image3_1 from '../../../assets/3.1.png';
import image3_2_1 from '../../../assets/3.2 (2).png';
import image3_2_2 from '../../../assets/3.2.png';
import revwheelMainFrontEN from '../../../assets/RevwheelMainFront.png';
import revwheelMainFrontFR from '../../../assets/RevwheelMainFrontFR.png';

// Translations object
const translations = {
  en: {
    sectionTitle: "Wheel Features",
    features: [
      {
        title: "<span class='font-bold'>Fully Customized</span> for your brand",
        description: [
          "Control all the text and colors so you can design it to match your website.",
          "Add your company's logo for additional branding.",
          "Specify the exact prizes your visitors can win and the probability of how frequently each prize is awarded."
        ]
      },
      {
        title: "<span class='font-bold'>Get Results</span> - Emails, Sales & Analytics",
        description: [
          "Thanks to our Artificial Intelligence, track and analyze key metrics automatically: QR code scans, prizes distributed, accounts created, enriched, and prize redemption rates.",
          "Collect names, emails, and phone numbers once your visitors have spun the wheel. Enrich this data during prize redemption and export it at any time."
        ]
      },
      {
        title: "<span class='font-bold'>Mobile, Marketing</span> Materials",
        description: [
          "RevWheel is fully responsive, ensuring a smooth experience on all devices.",
          "We also provide printable marketing materials, with your QR code and logo automatically integrated, for counters or tables."
        ]
      }
    ]
  },
  fr: {
    sectionTitle: "Fonctionnalités de la roue",
    features: [
      {
        title: "<span class='font-bold'>Personnalisation complète</span> pour votre marque",
        description: [
          "Personnalisez le texte, les couleurs pour que la roue s'adapte parfaitement à votre marque.",
          "Ajoutez le logo de votre entreprise pour renforcer votre branding.",
          "Définissez les prix exacts et ajustez la probabilité de chaque récompense pour créer une expérience captivante et sur mesure pour vos clients."
        ]
      },
      {
        title: "<span class='font-bold'>Obtenez des résultats</span> - Emails, ventes & analyses",
        description: [
          "Grâce à notre Intelligence artificielle, suivez et analysez automatiquement les métriques clés : scans du QR code, prix distribués, comptes créés, enrichis et taux de rédemption des prix.",
          "Récupérez les noms, emails, numéros de téléphone après que vos visiteurs aient tourné la roue. Enrichissez ces données lors de la rédemption du prix et exportez-les à tout moment."
        ]
      },
      {
        title: "<span class='font-bold'>Mobile, Supports</span> marketing",
        description: [
          "RevWheel est entièrement responsive, garantissant une expérience fluide sur tous les appareils.",
          "Nous vous fournissons également des supports marketing imprimables, avec votre QR code et logo automatiquement intégrés, pour le comptoir ou sur les tables."
        ]
      }
    ]
  }
};

// Function to get feature images based on language
const getFeatureImages = (language) => ({
  // Feature 1: Fully Customized for your brand
  customization: [
    language === 'fr' ? revwheelMainFrontFR : revwheelMainFrontEN,
    image1_1, 
    image1_2, 
    image1_3
  ],
  
  // Feature 2: Get Results - Emails, Sales & Analytics
  analytics: [image2_1, image2_2],
  
  // Feature 3: Mobile, Marketing Materials
  marketing: [image3_1, image3_2_1, image3_2_2]
});

// Image carousel component
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  
  // If we have more than one image, set up automatic rotation
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % images.length
      );
    }
  };
  
  // For multiple images, create a carousel
  return (
    <div className="relative overflow-hidden rounded-xl shadow-xl h-[350px] md:h-[450px] bg-gray-50 w-full max-w-[400px] mx-auto">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, x: index > currentIndex ? '100%' : '-100%' }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : index > currentIndex ? '100%' : '-100%',
              zIndex: index === currentIndex ? 10 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={image}
              alt={`Feature showcase ${index + 1}`}
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>
        ))}
      </div>
      
      {/* Carousel navigation controls */}
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button 
            onClick={() => navigate('prev')}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 flex items-center justify-center z-20 shadow-md transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => navigate('next')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 flex items-center justify-center z-20 shadow-md transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Navigation dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to stylize text by highlighting keywords
const StylizedText = ({ text }) => {
  // Keywords to highlight
  const keywords = [
    'text and colors', 'company\'s logo', 'exact prizes', 'how frequently each prize',
    'Artificial Intelligence', 'QR code', 'names, emails', 'phone numbers',
    'responsive', 'marketing materials',
    // French keywords
    'texte, les couleurs', 'logo de votre entreprise', 'prix exacts', 'probabilité',
    'Intelligence artificielle', 'QR code', 'noms, emails', 'numéros',
    'responsive', 'supports marketing'
  ];

  // Process text to add spans around keywords
  let processedText = text;
  keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword.toLowerCase())) {
      const regex = new RegExp(`(${keyword})`, 'gi');
      processedText = processedText.replace(regex, '<span class="font-semibold text-gray-900">$1</span>');
    }
  });

  return <p dangerouslySetInnerHTML={{ __html: processedText }} />;
};

const WheelFeatureSection = ({ title, description, images, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Alternate layout based on index
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.8, delay: 0.2 }
        }
      }}
      className="py-16 w-full flex justify-center"
    >
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-8 md:gap-12 max-w-5xl w-full px-4 mx-auto`}>
        {/* Text Content - Styled to match the image design */}
        <div className="w-full md:w-5/12 space-y-6 flex flex-col justify-center">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }
            }}
            className="text-3xl md:text-4xl font-normal text-gray-800"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          
          <div className="space-y-5">
            {description.map((paragraph, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, delay: 0.1 * (i + 1) }
                  }
                }}
                className="text-gray-600 text-lg leading-relaxed"
              >
                <StylizedText text={paragraph} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Carousel */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: isReversed ? -30 : 30 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.8, delay: 0.4 }
            }
          }}
          className="w-full md:w-7/12 flex justify-center"
        >
          <ImageCarousel images={images} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const WheelFeatures = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const featureImages = getFeatureImages(language);
  const titleControls = useAnimation();
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  useEffect(() => {
    if (isTitleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, isTitleInView]);

  return (
    <section id="features" className="py-16 relative overflow-hidden bg-white">
      {/* Background elements */}
      <motion.div
        className="absolute top-40 left-0 w-64 h-64 rounded-full bg-blue-200 opacity-10 -z-10"
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-0 w-96 h-96 rounded-full bg-indigo-200 opacity-10 -z-10"
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full flex flex-col items-center">
        {/* Section title */}
        <div className="text-center mb-16 px-4">
          {/* <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-blue-50 text-blue-500 rounded-full text-sm font-medium"
          >
            {language === 'fr' ? 'FONCTIONNALITÉS' : 'FEATURES'}
          </motion.div> */}
          
          <motion.h2
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            {t.sectionTitle}
          </motion.h2>
        </div>

        {/* Features sections */}
        <div className="w-full">
          {t.features.map((feature, index) => (
            <WheelFeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              images={featureImages[Object.keys(featureImages)[index]]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WheelFeatures; 