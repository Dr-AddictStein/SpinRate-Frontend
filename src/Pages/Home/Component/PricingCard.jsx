import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import heroBG from "../../../../public/hero-bg-scaled.jpg";

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
    freeTrial: "Free Trial",
    smallBusiness: "Small Business",
    mediumBusiness: "Medium Business",
    bigBusiness: "Big Business",
    unlimitedWebsites: "Unlimited websites",
    monthlyViews: "monthly views",
    unlimitedMonthlyViews: "Unlimited monthly views",
    customizeBranding: "Customize branding",
    logoColorsText: "(logo, colors, text)",
    mobileDesktop: "Mobile & desktop",
    advancedAnalytics: "Advanced analytics",
    leadsDataExport: "Leads data export",
    emailSupport: "Email support",
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
    freeTrial: "Essai Gratuit",
    smallBusiness: "Petite Entreprise",
    mediumBusiness: "Moyenne Entreprise",
    bigBusiness: "Grande Entreprise",
    unlimitedWebsites: "Sites web illimités",
    monthlyViews: "vues mensuelles",
    unlimitedMonthlyViews: "Vues mensuelles illimitées",
    customizeBranding: "Personnalisation de la marque",
    logoColorsText: "(logo, couleurs, texte)",
    mobileDesktop: "Mobile et bureau",
    advancedAnalytics: "Analyses avancées",
    leadsDataExport: "Exportation des données de prospects",
    emailSupport: "Support par email",
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
  
  // Define background style based on title
  const getBackgroundStyle = () => {
    if (title === t.monthly || title === "Small Business" || title === "Monthly") {
      return {
        backgroundImage: `url(${heroBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };
  
  // Define text color based on title
  const getTextColor = () => {
    if (title === t.monthly || title === "Small Business" || title === "Monthly") return "text-white";
    return "text-gray-800";
  };
  
  // Define price color based on title
  const getPriceColor = () => {
    if (title === t.monthly || title === "Small Business" || title === "Monthly") return "text-white";
    return "text-gray-800";
  };
  
  // Define border color
  const getBorderColor = () => {
    if (title === t.monthly || title === "Small Business" || title === "Monthly") return "";
    return "border border-gray-200";
  };

  // Get business title based on title
  const getBusinessTitle = () => {
    if (title === t.monthly || title === "Monthly") return t.smallBusiness;
    if (title === t.semiAnnual || title === "6 Months") return t.mediumBusiness;
    if (title === t.yearly || title === "Yearly") return t.bigBusiness;
    return title;
  };
  
  // Get price based on plan
  const getPrice = () => {
    if (title === t.monthly || title === "Monthly") return "29$";
    if (title === t.semiAnnual || title === "6 Months") return "99$";
    if (title === t.yearly || title === "Yearly") return "299$";
    return price;
  };

  return (
    <motion.div 
      className={`${title === t.monthly || title === "Small Business" || title === "Monthly" ? "" : "bg-white"} ${getBorderColor()} rounded-xl shadow-md overflow-hidden h-full`}
      style={getBackgroundStyle()}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 flex flex-col h-full">
        <div>
          <h3 className={`text-xl font-bold text-center ${getTextColor()} mb-3`}>
            {getBusinessTitle()}
          </h3>
          <div className="text-center mb-6">
            <span className={`text-4xl font-bold ${getPriceColor()}`}>{getPrice()}</span>
            <p className={`${getTextColor()} mt-1 opacity-80 text-sm`}>
              {period === 'monthly' ? t.perMonth : 
               period === 'semiAnnual' ? t.perSixMonths : 
               t.perYear}
            </p>
          </div>
        </div>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className={`border-t ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} pt-3`}>
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {t.unlimitedWebsites}
            </p>
            
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {title === t.yearly || title === "Yearly" ? t.unlimitedMonthlyViews : 
               title === t.semiAnnual || title === "6 Months" ? "100,000 " + t.monthlyViews : 
               "25,000 " + t.monthlyViews}
            </p>
            
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {t.customizeBranding}<br/>
              <span className="text-xs opacity-80">{t.logoColorsText}</span>
            </p>
            
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {t.mobileDesktop}
            </p>
            
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {t.advancedAnalytics}
            </p>
            
            <p className={`${getTextColor()} py-2 border-b ${title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200"} text-sm`}>
              {t.leadsDataExport}
            </p>
            
            <p className={`${getTextColor()} py-2 ${title === t.yearly || title === "Yearly" ? "border-b " + (title === t.monthly || title === "Small Business" || title === "Monthly" ? "border-white/30" : "border-gray-200") : ""} text-sm`}>
              {t.emailSupport}
            </p>
          </div>
        </div>
        
        <motion.button 
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors text-sm ${
            title === t.monthly || title === "Small Business" || title === "Monthly"
              ? "bg-gradient-to-r from-orange-400 to-yellow-300 text-white hover:opacity-90" 
              : (popular ? "bg-gradient-to-r from-purple-500 to-blue-400 text-white" : "bg-gradient-to-r from-blue-500 to-blue-400 text-white")
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.freeTrial}
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
    <section id="pricing" className="py-12 bg-gray-50 overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-40 left-10">
        <svg width="60" height="60" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M165 50C165 63.807 153.807 75 140 75C126.193 75 115 63.807 115 50C115 36.193 126.193 25 140 25C153.807 25 165 36.193 165 50Z" fill="#3B82F6" opacity="0.2"/>
          <path d="M35 140C35 153.807 23.807 165 10 165C-3.80698 165 -15 153.807 -15 140C-15 126.193 -3.80698 115 10 115C23.807 115 35 126.193 35 140Z" fill="#3B82F6" opacity="0.2"/>
        </svg>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.p 
            className="text-blue-500 font-medium mb-2 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.priceTable}
          </motion.p>
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.noHiddenCharge}<br />
            {t.chooseYourPlan}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                buttonText={t.freeTrial}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;