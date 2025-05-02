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
        title: "Just when visitors are about to leave your website, a special prize wheel pops up.",
        description: "Unique exit intent pop up that's interactive, customizable and fun for visitors."
      },
      {
        title: "They enter their email address, spin the prize wheel and win a random discount.",
        description: "Grow your email signup conversion rates 3x and boost sales 35%."
      },
      {
        title: "You collect valuable customer data, boost your reviews effortlessly, and strengthen customer loyalty.",
        description: "Responsive to any device screen size so it always looks good on desktop or mobile"
      }
    ],
    startNow: "Start now!"
  },
  fr: {
    howItWorks: "Comment fonctionne",
    workHighlight: "Wheelix ?",
    steps: [
      {
        title: "Lorsque les visiteurs sont sur le point de quitter votre site, une roue de prix spéciale apparaît.",
        description: "Pop-up d'intention de sortie unique, interactif, personnalisable et amusant pour les visiteurs."
      },
      {
        title: "Ils entrent leur adresse e-mail, font tourner la roue et gagnent une remise aléatoire.",
        description: "Augmentez vos taux de conversion d'inscription par e-mail par 3 et stimulez vos ventes de 35%."
      },
      {
        title: "Vous collectez des données clients précieuses, augmentez vos avis sans effort et renforcez la fidélité.",
        description: "Responsive sur tous les appareils pour toujours avoir un bon rendu sur ordinateur ou mobile"
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
  const boxIcons = [
    <QrCode size={48} className="text-blue-500" />,
    <Database size={48} className="text-green-500" />,
    <Smartphone size={48} className="text-purple-500" />
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

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-white relative overflow-hidden w-full" id="how-it-works">
      <div className="2xl:max-w-[78%] max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.howItWorks} <span className="text-blue-600">{t.workHighlight}</span>
          </h2>
        </motion.div>

        {/* Numbered steps at the top */}
        <div className="mb-16 max-w-4xl mx-auto">
          {t.steps.map((step, index) => (
            <div key={index} className="text-center mb-8 whitespace-nowrap">
              <span className="font-bold mr-2 text-lg">{index + 1}.</span>
              <span className="font-semibold text-lg">{step.title}</span>
            </div>
          ))}
        </div>

        {/* Feature boxes below */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {t.steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 transition-transform duration-300 hover:transform hover:scale-105 h-full"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  {boxIcons[index]}
                </div>
              </div>

              {/* Feature label */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {index === 0 ? "Unique" : index === 1 ? "Grow" : "Responsive"}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 