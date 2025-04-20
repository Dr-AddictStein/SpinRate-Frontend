import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";

// Translations object
const translations = {
  en: {
    priceTable: "Price Table",
    noHiddenCharge: "No Hidden Charge Applied,",
    chooseYourPlan: "Choose Your Plan",
    monthly: "Monthly",
    semiAnnual: "6 Months",
    yearly: "Yearly",
    perMonth: "Per Month",
    perSixMonths: "For 6 Months",
    perYear: "Per Year",
    discount: "discount",
    getStarted: "Get Started",
    popular: "Popular",
    features: {
      monthly: [
        "Full Access to All Features",
        "Priority Support",
        "Regular Updates"
      ],
      semiAnnual: [
        "Full Access to All Features",
        "Priority Support",
        "Regular Updates",
        "20% Discount"
      ],
      yearly: [
        "Full Access to All Features",
        "Priority Support",
        "Regular Updates",
        "25% Discount",
        "Free Setup Assistance"
      ]
    }
  },
  fr: {
    priceTable: "Tableau des Prix",
    noHiddenCharge: "Aucun Frais Caché,",
    chooseYourPlan: "Choisissez Votre Forfait",
    monthly: "Mensuel",
    semiAnnual: "6 Mois",
    yearly: "Annuel",
    perMonth: "Par Mois",
    perSixMonths: "Pour 6 Mois",
    perYear: "Par An",
    discount: "de réduction",
    getStarted: "Commencer",
    popular: "Populaire",
    features: {
      monthly: [
        "Accès complet à toutes les fonctionnalités",
        "Support prioritaire",
        "Mises à jour régulières"
      ],
      semiAnnual: [
        "Accès complet à toutes les fonctionnalités",
        "Support prioritaire",
        "Mises à jour régulières",
        "20% de réduction"
      ],
      yearly: [
        "Accès complet à toutes les fonctionnalités",
        "Support prioritaire",
        "Mises à jour régulières",
        "25% de réduction",
        "Assistance à la configuration gratuite"
      ]
    }
  }
};

const PricingCard = ({ title, price, period, features = [], popular, buttonText }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden h-full ${popular ? "relative" : ""}`}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white py-1 px-8 transform rotate-45 translate-x-8 translate-y-3 text-sm font-semibold shadow-md">
            {t.popular}
          </div>
        </div>
      )}
      
      <div className="p-8 flex flex-col h-full">
        <div>
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h3>
          <div className="text-center mb-6">
            <span className="text-5xl font-bold text-blue-500">{price}</span>
            <p className="text-gray-600 mt-2">
              {period === 'monthly' ? t.perMonth : 
               period === 'semiAnnual' ? t.perSixMonths : 
               t.perYear}
            </p>
          </div>
        </div>
        
        <div className="space-y-4 mt-8 flex-grow">
          {features && features.length > 0 && features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
          
          {/* Add invisible placeholder items for the yearly plan to ensure consistent height */}
          {period !== 'yearly' && period === 'monthly' && (
            <>
              <div className="opacity-0 h-5"></div>
              <div className="opacity-0 h-5"></div>
            </>
          )}
          
          {period !== 'yearly' && period === 'semiAnnual' && (
            <div className="opacity-0 h-5"></div>
          )}
        </div>
        
        <motion.button 
          className={`w-full mt-8 py-3 px-4 rounded-lg font-semibold transition-colors ${
            popular 
              ? "bg-blue-500 text-white hover:bg-blue-600" 
              : "bg-white border border-blue-500 text-blue-500 hover:bg-blue-50"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {buttonText || t.getStarted}
        </motion.button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  
  const pricingPlans = [
    {
      title: t.monthly,
      price: "€10",
      period: "monthly",
      features: t.features.monthly,
      popular: false
    },
    {
      title: t.semiAnnual,
      price: "€49",
      period: "semiAnnual",
      features: t.features.semiAnnual,
      popular: true
    },
    {
      title: t.yearly,
      price: "€89",
      period: "yearly",
      features: t.features.yearly,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50 overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-40 left-10">
        <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M165 50C165 63.807 153.807 75 140 75C126.193 75 115 63.807 115 50C115 36.193 126.193 25 140 25C153.807 25 165 36.193 165 50Z" fill="#3B82F6" opacity="0.2"/>
          <path d="M35 140C35 153.807 23.807 165 10 165C-3.80698 165 -15 153.807 -15 140C-15 126.193 -3.80698 115 10 115C23.807 115 35 126.193 35 140Z" fill="#3B82F6" opacity="0.2"/>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.p 
            className="text-blue-500 font-medium mb-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.priceTable}
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.noHiddenCharge}<br />
            {t.chooseYourPlan}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="h-full"
            >
              <PricingCard 
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                popular={plan.popular}
                buttonText={t.getStarted}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;