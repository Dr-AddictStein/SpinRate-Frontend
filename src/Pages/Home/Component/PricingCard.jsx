import React, { useState } from "react";
import { motion } from "framer-motion";

const PricingCard = ({ title, price, period, features = [], popular, buttonText }) => {
  return (
    <motion.div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${popular ? "relative" : ""}`}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-blue-500 text-white py-1 px-8 transform rotate-45 translate-x-8 translate-y-3 text-sm font-semibold shadow-md">
            Popular
          </div>
        </div>
      )}
      
      <div className="p-8">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h3>
        <div className="text-center mb-6">
          <span className="text-5xl font-bold text-blue-500">{price}</span>
          <p className="text-gray-600 mt-2">Per Month, Billed {period === 'yearly' ? 'Yearly' : 'Monthly'}</p>
        </div>
        
        <div className="space-y-4 mt-8">
          {features && features.length > 0 && features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
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
          {buttonText || "Get Started"}
        </motion.button>
      </div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  
  const pricingPlans = {
    monthly: [
      {
        title: "Standard",
        price: "$49",
        features: [
          "Military GradeServer Protection",
          "All Dashboard Features",
          "API And Webhook Access"
        ],
        popular: false
      },
      {
        title: "Premium",
        price: "$249",
        features: [
          "8 Team Members",
          "Custom Analytics Filters",
          "API And Webhook Access"
        ],
        popular: true
      },
      {
        title: "Professional",
        price: "$99",
        features: [
          "Military GradeServer Protection",
          "All Dashboard Features",
          "API And Webhook Access"
        ],
        popular: false
      }
    ],
    yearly: [
      {
        title: "Standard",
        price: "$470",
        features: [
          "Military GradeServer Protection",
          "All Dashboard Features",
          "API And Webhook Access"
        ],
        popular: false
      },
      {
        title: "Premium",
        price: "$2,390",
        features: [
          "8 Team Members",
          "Custom Analytics Filters",
          "API And Webhook Access"
        ],
        popular: true
      },
      {
        title: "Professional",
        price: "$950",
        features: [
          "Military GradeServer Protection",
          "All Dashboard Features",
          "API And Webhook Access"
        ],
        popular: false
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50 overflow-hidden relative">
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
            Price Table
          </motion.p>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            No Hidden Charge Applied,<br />
            Choose Your Plan
          </motion.h2>
          
          {/* Billing toggle */}
          <div className="inline-flex p-1 bg-white rounded-lg shadow-sm border border-gray-200 mb-10">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                billingPeriod === "monthly" 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
                billingPeriod === "yearly" 
                  ? "bg-blue-500 text-white" 
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setBillingPeriod("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans[billingPeriod].map((plan, index) => (
            <motion.div
              key={`${billingPeriod}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <PricingCard 
                title={plan.title}
                price={plan.price}
                period={billingPeriod}
                features={plan.features}
                popular={plan.popular}
                buttonText="Get Started"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;