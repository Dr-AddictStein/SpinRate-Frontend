import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

// Translations object
const translations = {
  en: {
    title: "Reserve a Free 15-Minute Chat with Us if You Have Questions!",
    description: "Not sure if our solution is right for you? Schedule a quick call with our team to discuss your needs and how we can help boost your online presence.",
    features: [
      "Quick 15-minute consultation",
      "Get answers to all your questions",
      "Choose a time that works for you"
    ],
    callToAction: "Schedule Your Free Call",
    availableNow: "Available Now",
    teamReady: "Our team is ready to help you succeed"
  },
  fr: {
    title: "Réservez un Chat Gratuit de 15 Minutes avec Nous si Vous Avez des Questions!",
    description: "Vous n'êtes pas sûr que notre solution vous convienne? Planifiez un appel rapide avec notre équipe pour discuter de vos besoins et de la façon dont nous pouvons vous aider à améliorer votre présence en ligne.",
    features: [
      "Consultation rapide de 15 minutes",
      "Obtenez des réponses à toutes vos questions",
      "Choisissez un horaire qui vous convient"
    ],
    callToAction: "Planifiez Votre Appel Gratuit",
    availableNow: "Disponible Maintenant",
    teamReady: "Notre équipe est prête à vous aider à réussir"
  }
};

const CalendlySection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-50 transform translate-x-1/3 -translate-y-1/3 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 transform -translate-x-1/3 translate-y-1/3 z-0"></div>
      
      {/* Animated dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left column: Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {t.title}
                </h2>
                
                <p className="text-lg text-gray-600 mb-8">
                  {t.description}
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Clock size={20} />
                    </div>
                    <span className="ml-4 text-gray-700">{t.features[0]}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <MessageCircle size={20} />
                    </div>
                    <span className="ml-4 text-gray-700">{t.features[1]}</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <Calendar size={20} />
                    </div>
                    <span className="ml-4 text-gray-700">{t.features[2]}</span>
                  </li>
                </ul>
                
                <a 
                  href="https://calendly.com/contactpierrepro/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {t.callToAction}
                </a>
              </motion.div>
            </div>
            
            {/* Right column: Image/Illustration */}
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 md:p-12 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
                  <Calendar className="w-24 h-24 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.availableNow}</h3>
                <p className="text-indigo-100">
                  {t.teamReady}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection; 