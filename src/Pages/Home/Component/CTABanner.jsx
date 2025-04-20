import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';

const translations = {
  en: {
    title: "Start your 10-day free trial on Wheelix.",
    buttonText: "Get Started For Free"
  },
  fr: {
    title: "Démarrez votre essai gratuit de 10 jours sur Wheelix.",
    buttonText: "Commencez gratuitement"
  }
};

const CTABanner = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-16"
        >
          {t.title}
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 rounded-lg font-semibold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg bg-gradient-to-r from-[#FF8E63] via-[#FFAF58] to-[#FFEB70] w-full max-w-lg"
          >
            {t.buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner; 