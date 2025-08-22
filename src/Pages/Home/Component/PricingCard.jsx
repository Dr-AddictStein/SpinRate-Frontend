import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import logo from "../../../assets/REVWHEELlogo.png";

// Translations object
const translations = {
  en: {
    oneAffordablePlan: "One affordable plan",
    revwheelProPlan: "Revwheel Pro Plan 🔥",
    monthly: "Monthly",
    yearly: "Yearly",
    euroMonth: "9€/MONTH",
    euroYear: "84€/YEAR",
    noCommitment: "No commitment",
    setUp: "Set up in 5 minutes",
    boostReviews: "BOOST YOUR GOOGLE REVIEWS",
    driveRepeatBusiness: "Drive repeat business",
    support247: "Support 24/7",
    startFreeTrial: "Start your free trial",
    chooseYourPlan: "Choose your plan",
    creatingSession: "Creating session...",
  },
  fr: {
    oneAffordablePlan: "Un forfait abordable",
    revwheelProPlan: "Formule Revwheel Pro 🔥",
    monthly: "Mensuel",
    yearly: "Annuel",
    euroMonth: "9€/MOIS",
    euroYear: "84€/AN",
    noCommitment: "Aucun engagement",
    setUp: "Configuration en 5 minutes",
    boostReviews: "BOOSTEZ VOS AVIS GOOGLE",
    driveRepeatBusiness: "Stimulez les affaires récurrentes",
    support247: "Support 24/7",
    startFreeTrial: "Commencez votre essai gratuit",
    chooseYourPlan: "Choisissez votre formule",
    creatingSession: "Création de la session...",
  }
};



const PricingSection = () => {
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const t = translations[language] || translations.en;
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTrial = async () => {
    try {
      setIsLoading(true);
      
      // Check if user is logged in
      if (!user?.user) {
        // If user is not logged in, navigate to dashboard
        navigate('/dashboard');
        setIsLoading(false);
        return;
      }

      const subscriptionType = isYearly ? 'yearly' : 'monthly';
      const userEmail = user?.user?.email || '';
      const userId = user?.user?._id;

      if (!userId) {
        console.error('User ID not found');
        setIsLoading(false);
        return;
      }

      // Create checkout session
      const response = await fetch('http://localhost:4000/api/webhooks/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          subscriptionType: subscriptionType,
          userEmail: userEmail
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.open(data.url, '_blank');
      } else {
        console.error('Failed to create checkout session:', data.error);
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-12 bg-gray-50 overflow-hidden relative">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.revwheelProPlan}
          </motion.h2>

          <motion.p
            className="text-lg font-semibold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.oneAffordablePlan}
          </motion.p>
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6 text-center">
            {/* Logo */}
            <div className="mb-6 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={logo}
                  alt="RevWheel Logo"
                  className="h-28 md:h-32 lg:h-36 w-auto object-contain"
                />
              </motion.div>
            </div>

            {/* Enhanced Toggle with smooth animations */}
            <div className="flex items-center justify-center mb-6 relative">
              <div className="relative bg-gray-100 rounded-full p-1 max-w-xs mx-auto">
                {/* Background slider */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-blue-600 rounded-full shadow-md"
                  initial={false}
                  animate={{
                    left: isYearly ? "50%" : "4px",
                    right: isYearly ? "4px" : "50%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />

                {/* Toggle buttons */}
                <div className="relative z-10 flex">
                  <motion.button
                    onClick={() => setIsYearly(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isYearly
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-800'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.monthly}
                  </motion.button>

                  <motion.button
                    onClick={() => setIsYearly(true)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isYearly
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-800'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.yearly}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Price with smooth transition */}
            <div className="mb-8 relative h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isYearly ? 'yearly' : 'monthly'}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3
                  }}
                  className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight"
                >
                  {isYearly ? t.euroYear : t.euroMonth}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8 text-left">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-gray-700 text-lg">{t.noCommitment}</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-gray-700 text-lg">{t.setUp}</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-gray-700 text-lg font-semibold">{t.boostReviews}</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-gray-700 text-lg">{t.driveRepeatBusiness}</span>
              </motion.div>

              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 500 }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                <span className="text-gray-700 text-lg">{t.support247}</span>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={handleStartTrial}
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-md relative overflow-hidden ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              whileHover={!isLoading ? {
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
              } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0"
                whileHover={!isLoading ? { opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    {t.creatingSession || "Creating session..."}
                  </>
                ) : (
                  user?.user ? t.chooseYourPlan : t.startFreeTrial
                )}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;