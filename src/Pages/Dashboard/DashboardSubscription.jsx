import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../hooks/useAuthContext';
import { hasLostSubscription, isOnFreeTrial } from '../../utils/subscriptionUtils';
import { useLanguage } from '../../context/LanguageContext';
import PricingCard from '../Home/Component/PricingCard';
import PricingSection from '../Home/Component/PricingCard';

const DashboardSubscription = () => {
  const { user } = useAuthContext();
  const { language } = useLanguage();
  
  const translations = {
    en: {
      title: "Subscription Plans",
      subtitle: "Choose the right plan for your business needs",
      expiredTitle: "Subscription Expired",
      expiredSubtitle: "Your subscription has expired. Please choose a plan to continue using our services.",
      freeTrialTitle: "Upgrade Your Plan",
      freeTrialSubtitle: "Your free trial is active. Choose a plan to continue after your trial ends.",
      currentPlan: "Current Plan",
      monthlyPlan: "Monthly Plan",
      yearlyPlan: "Yearly Plan",
      expiresOn: "Expires on",
      activeUntil: "Active until"
    },
    fr: {
      title: "Plans d'abonnement",
      subtitle: "Choisissez le bon plan pour vos besoins professionnels",
      expiredTitle: "Abonnement expiré",
      expiredSubtitle: "Votre abonnement a expiré. Veuillez choisir un plan pour continuer à utiliser nos services.",
      freeTrialTitle: "Mettez à niveau votre plan",
      freeTrialSubtitle: "Votre essai gratuit est actif. Choisissez un plan pour continuer après la fin de votre essai.",
      currentPlan: "Plan actuel",
      monthlyPlan: "Plan mensuel",
      yearlyPlan: "Plan annuel",
      expiresOn: "Expire le",
      activeUntil: "Actif jusqu'au"
    }
  };

  const t = translations[language] || translations.en;
  
  const subscriptionLost = hasLostSubscription(user);
  const onFreeTrial = isOnFreeTrial(user);

  // Determine current plan type and expiration date
  const getCurrentPlanInfo = () => {
    if (!user?.user) return null;
    
    const { subscriptionRemaining, lastPaymentDate } = user.user;
    
    if (!lastPaymentDate) return null;
    
    let planType = null;
    let expirationDate = null;
    
    // Calculate expiration date based on lastPaymentDate and remaining days
    const lastPayment = new Date(lastPaymentDate);
    const expiration = new Date(lastPayment);
    expiration.setDate(lastPayment.getDate() + subscriptionRemaining);
    
    // Determine plan type based on subscriptionRemaining
    if (subscriptionRemaining === 30) {
      planType = 'monthly';
      expirationDate = expiration;
    } else if (subscriptionRemaining === 365) {
      planType = 'yearly';
      expirationDate = expiration;
    }
    
    return planType ? { planType, expirationDate } : null;
  };

  const currentPlanInfo = getCurrentPlanInfo();

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getTitleAndSubtitle = () => {
    if (subscriptionLost) {
      return {
        title: t.expiredTitle,
        subtitle: t.expiredSubtitle
      };
    } else if (onFreeTrial) {
      return {
        title: t.freeTrialTitle,
        subtitle: t.freeTrialSubtitle
      };
    } else {
      return {
        title: t.title,
        subtitle: t.subtitle
      };
    }
  };

  const { title, subtitle } = getTitleAndSubtitle();

  return (
    <div className="bg-gray-50 min-h-screen px-3 sm:px-6 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">{subtitle}</p>
      </div>
      
      {/* Current Plan Information */}
      {currentPlanInfo && !subscriptionLost && !onFreeTrial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {t.currentPlan}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-blue-600">
                  {currentPlanInfo.planType === 'monthly' ? t.monthlyPlan : t.yearlyPlan}
                </span>
                <div className="text-gray-600">
                  <span className="font-medium">{t.activeUntil}</span>{' '}
                  <span className="text-gray-800">{formatDate(currentPlanInfo.expirationDate)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">
                {t.expiresOn}
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {formatDate(currentPlanInfo.expirationDate)}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <PricingSection />
    </div>
  );
};

export default DashboardSubscription;
