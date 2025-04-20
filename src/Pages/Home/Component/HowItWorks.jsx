import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { QrCode, Star, RotateCw, Database, Smartphone, BarChart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

// Translations object
const translations = {
  en: {
    howItWorks: "How does",
    workHighlight: "Wheelix work?",
    steps: [
      {
        title: "Your customers scan a QR code and interact with a prize wheel that you customize.",
        description: "Increase your sales and retain customers with interactive and personalized engagement, powered by our AI."
      },
      {
        title: "They leave a Google review, spin the wheel, for a chance to win a reward.",
        description: "Boost your online visibility and get an average of 300 additional google reviews each month."
      },
      {
        title: "You collect valuable customer data, boost your reviews effortlessly, and strengthen customer loyalty.",
        description: "Collect key data and launch campaigns to retain your customers and maximize returns."
      }
    ],
    startNow: "Start now!"
  },
  fr: {
    howItWorks: "Comment fonctionne",
    workHighlight: "Wheelix ?",
    steps: [
      {
        title: "Vos clients scannent un QR code et interagissent avec une roue de la fortune, que vous personnalisez.",
        description: "Stimulez vos ventes et fidélisez vos clients avec un engagement interactif et personnalisé, grâce à notre IA."
      },
      {
        title: "Ils laissent un avis Google, font tourner la roue pour avoir une chance de remporter une récompense.",
        description: "Boostez votre visibilité en ligne et obtenez en moyenne 300 avis supplémentaires chaque mois."
      },
      {
        title: "Vous collectez leurs informations, les fidélisez pour qu'ils reviennent, et boostez votre visibilité grâce à leurs avis.",
        description: "Collectez des données clés et lancez des campagnes pour fidéliser vos clients et maximiser les retours."
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

  // Steps data with icons
  const steps = [
    {
      icon: <QrCode size={48} className="text-blue-500" />,
      title: t.steps[0].title,
      description: t.steps[0].description,
      color: "blue"
    },
    {
      icon: <RotateCw size={48} className="text-yellow-500" />,
      title: t.steps[1].title,
      description: t.steps[1].description,
      color: "yellow"
    },
    {
      icon: <Database size={48} className="text-green-500" />,
      title: t.steps[2].title,
      description: t.steps[2].description,
      color: "green"
    }
  ];

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

  // Helper function to get background color based on step color
  const getBgColor = (color) => {
    const colors = {
      blue: "bg-blue-50",
      yellow: "bg-yellow-50",
      green: "bg-green-50"
    };
    return colors[color] || "bg-gray-50";
  };

  // Helper function to get border color based on step color
  const getBorderColor = (color) => {
    const colors = {
      blue: "border-blue-200",
      yellow: "border-yellow-200",
      green: "border-green-200"
    };
    return colors[color] || "border-gray-200";
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden w-full" id="how-it-works">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated dots pattern */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>

          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full opacity-50"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-50 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="2xl:max-w-[78%] max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.howItWorks} <span className="text-blue-600">{t.workHighlight}</span>
          </h2>
        </motion.div>

        {/* Steps in a row for desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105"
            >
              {/* Icon with circle background */}
              <div className="mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 rounded-full ${getBgColor(step.color)} border ${getBorderColor(step.color)} flex items-center justify-center shadow-md`}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Number */}
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-4">
                {index + 1}
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            {t.startNow}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 