import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
    freeTrialWarning: "Free trial expires in {days} days",
    freeTrialExpiresToday: "Free trial expires today",
    freeTrialExpired: "Free trial has expired",
    upgradeNow: "Upgrade Now",
    dismiss: "Dismiss"
  },
  fr: {
    freeTrialWarning: "L'essai gratuit expire dans {days} jours",
    freeTrialExpiresToday: "L'essai gratuit expire aujourd'hui",
    freeTrialExpired: "L'essai gratuit a expiré",
    upgradeNow: "Mettre à niveau maintenant",
    dismiss: "Fermer"
  }
};

const SubscriptionAlert = ({ remainingDays, onDismiss, onUpgrade }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const getMessage = () => {
    if (remainingDays === 0) {
      return t.freeTrialExpired;
    } else if (remainingDays === 1) {
      return t.freeTrialExpiresToday;
    } else {
      return t.freeTrialWarning.replace('{days}', remainingDays);
    }
  };

  const getAlertColor = () => {
    if (remainingDays === 0) {
      return 'bg-red-50 border-red-200 text-red-800';
    } else if (remainingDays <= 2) {
      return 'bg-orange-50 border-orange-200 text-orange-800';
    } else {
      return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColor = () => {
    if (remainingDays === 0) {
      return 'text-red-500';
    } else if (remainingDays <= 2) {
      return 'text-orange-500';
    } else {
      return 'text-blue-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 ${getAlertColor()} border rounded-lg shadow-lg`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertTriangle className={`h-5 w-5 ${getIconColor()}`} />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">
              {getMessage()}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
            {remainingDays > 0 && (
              <button
                onClick={onUpgrade}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md font-medium transition-colors"
              >
                {t.upgradeNow}
              </button>
            )}
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionAlert; 