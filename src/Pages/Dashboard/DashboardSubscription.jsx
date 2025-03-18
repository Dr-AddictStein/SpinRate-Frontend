import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const PricingCard = ({ title, price, period, features = [], popular, buttonText, isLoading, onClick }) => {
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
          {features && features.map((feature, index) => (
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
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : buttonText || "Get Started"}
        </motion.button>
      </div>
    </motion.div>
  );
};

const DashboardSubscription = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  
  // Default fallback plans
  const defaultPlans = {
    monthly: [
      {
        id: 1,
        title: 'Standard',
        price: '$49',
        features: [
          'Military Grade Server Protection',
          'All Dashboard Features',
          'API And Webhook Access',
          'Email Support'
        ],
        popular: false
      },
      {
        id: 2,
        title: 'Professional',
        price: '$99',
        features: [
          'Everything in Standard',
          '3 Team Members',
          'Advanced Analytics',
          'Priority Support'
        ],
        popular: true
      },
      {
        id: 3,
        title: 'Premium',
        price: '$249',
        features: [
          'Everything in Professional',
          '8 Team Members',
          'Custom Analytics Filters',
          'Dedicated Account Manager',
          'SLA Guaranteed Uptime'
        ],
        popular: false
      }
    ],
    yearly: [
      {
        id: 1,
        title: 'Standard',
        price: '$470',
        features: [
          'Military Grade Server Protection',
          'All Dashboard Features',
          'API And Webhook Access',
          'Email Support'
        ],
        popular: false
      },
      {
        id: 2,
        title: 'Professional',
        price: '$950',
        features: [
          'Everything in Standard',
          '3 Team Members',
          'Advanced Analytics',
          'Priority Support'
        ],
        popular: true
      },
      {
        id: 3,
        title: 'Premium',
        price: '$2,390',
        features: [
          'Everything in Professional',
          '8 Team Members',
          'Custom Analytics Filters',
          'Dedicated Account Manager',
          'SLA Guaranteed Uptime'
        ],
        popular: false
      }
    ]
  };
  
  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log('Fetching plans from API...');
        const response = await axios.get(`${API_URL}/subscription/plans`);
        console.log('API response:', response.data);
        
        if (response.data.success && response.data.plans && response.data.plans.length > 0) {
          setPlans(response.data.plans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        // We'll fall back to default plans
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
    
    // Add a safety timeout in case the API call hangs
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.log('Safety timeout triggered - forcing loading to false');
        setLoading(false);
      }
    }, 5000); // 5 seconds timeout
    
    return () => clearTimeout(safetyTimeout);
  }, []);
  
  const handleSubscribe = (plan) => {
    // Simple alert for demonstration
    alert(`You selected the ${plan.title} plan (${billingPeriod}). In a real implementation, this would redirect to a payment page.`);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }
  
  // Determine which plans to display
  const displayPlans = plans.length > 0 
    ? plans.map(plan => ({
        id: plan._id,
        title: plan.name.charAt(0).toUpperCase() + plan.name.slice(1),
        price: billingPeriod === 'monthly' ? `$${plan.monthlyPrice}` : `$${plan.yearlyPrice}`,
        features: plan.features,
        popular: plan.isPopular
      }))
    : defaultPlans[billingPeriod];
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Trial message */}
      <div className="max-w-7xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Free Trial</h3>
        <p className="text-gray-600 mb-2">
          You are currently on a free trial that will expire in <span className="font-medium">7 days</span>.
        </p>
        <p className="text-gray-600">
          Select a subscription below to continue accessing all features after your trial ends.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Choose Your Subscription Plan
          </h2>
          
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
          {displayPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PricingCard 
                title={plan.title}
                price={plan.price}
                period={billingPeriod}
                features={plan.features}
                popular={plan.popular}
                buttonText="Subscribe Now"
                isLoading={false}
                onClick={() => handleSubscribe(plan)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSubscription;
