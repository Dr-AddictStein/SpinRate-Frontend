import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { QrCode, Star, RotateCw, Database, Smartphone, BarChart, Users, IndentIncrease, Banknote, TrendingUp, DatabaseBackup, ChartSpline } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

// Import images
import englishPC from '../../../assets/English - PC.png';
import englishMobile from '../../../assets/English - Mobile.png';
import frenchPC from '../../../assets/French - PC.png';
import frenchMobile from '../../../assets/French - Mobile.png';

// Translations object
const translations = {
  en: {
    howItWorks: "How does",
    workHighlight: "RevWheel work?",
    steps: [
      {
        title: "Your customers scan a QR code and interact with a <strong>prize wheel</strong> that <strong>you customize</strong>.",
        description: "<strong>Increase</strong> your sales and retain customers with interactive and personalized engagement, powered by our AI."
      },
      {
        title: "They leave a <strong>Google review</strong>, spin the wheel, for a chance to win a <strong>reward</strong>.",
        description: "<strong>Boost</strong> your online visibility and get an average of 300 additional google reviews each month."
      },
      {
        title: "You <strong>collect</strong> valuable <strong>customer data</strong>, <strong>boost your reviews effortlessly</strong>, and <strong>strengthen</strong> customer <strong>loyalty</strong>.",
        description: "<strong>Collect</strong> key data and launch campaigns to retain your customers and maximize returns."
      }
    ],
    startNow: "Start now!"
  },
  fr: {
    howItWorks: "Comment fonctionne",
    workHighlight: "RevWheel ?",
    steps: [
      {
        title: "Vos clients scannent un QR code et interagissent avec une <strong>roue de la fortune</strong>, que <strong>vous personnalisez</strong>.",
        description: "<strong>Stimulez</strong> vos ventes et fidélisez vos clients avec un engagement interactif et personnalisé, grâce à notre IA."
      },
      {
        title: " Ils laissent un <strong>avis Google</strong>, font tourner la roue pour avoir une chance de remporter une <strong>récompense</strong>.",
        description: "<strong>Boostez</strong> votre visibilité en ligne et obtenez en moyenne 300 avis supplémentaires chaque mois."
      },
      {
        title: "Vous <strong>collectez leurs informations</strong>, les fidélisez pour <strong>qu'ils reviennent, et boostez votre visibilité</strong> grâce à leurs avis.",
        description: "<strong>Collectez</strong> des données clés et lancez des campagnes pour fidéliser vos clients et maximiser les retours."
      }
    ],
    startNow: "Commencer!"
  }
};

const HowItWorks = () => {
  // References for animation triggers
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Get the appropriate image based on language and device type
  const getImageSource = () => {
    if (language === 'en') {
      return {
        pc: englishPC,
        mobile: englishMobile
      };
    } else {
      return {
        pc: frenchPC,
        mobile: frenchMobile
      };
    }
  };

  const images = getImageSource();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-12 lg:py-20 bg-white relative overflow-hidden w-full" id="how-it-works">
      <div className="2xl:max-w-[78%] max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
            {t.howItWorks} <span className="text-blue-600">{t.workHighlight}</span>
          </h2>
        </motion.div>

        {/* Numbered steps at the top */}
        <div className="mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto">
          {t.steps.map((step, index) => (
            <div key={index} className="text-center mb-6 md:mb-8 px-2">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                <span className="font-normal text-base sm:text-lg md:text-lg flex-shrink-0">
                  {index + 1}.
                </span>
                <span 
                  className="font-normal text-base sm:text-lg md:text-lg leading-relaxed text-center sm:text-left sm:ml-2"
                  dangerouslySetInnerHTML={{ __html: step.title }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Images section - replacing the feature boxes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <motion.div
            variants={itemVariants}
            className="w-full max-w-6xl"
          >
            {/* Mobile image - shown on mobile devices */}
            <div className="block md:hidden">
              <img 
                src={images.mobile} 
                alt={language === 'en' ? 'RevWheel Mobile Interface' : 'Interface Mobile RevWheel'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            {/* Desktop image - shown on desktop devices */}
            <div className="hidden md:block">
              <img 
                src={images.pc} 
                alt={language === 'en' ? 'RevWheel Desktop Interface' : 'Interface Bureau RevWheel'}
                className="w-full h-auto rounded-lg shadow-lg lg:w-3/4 mx-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 