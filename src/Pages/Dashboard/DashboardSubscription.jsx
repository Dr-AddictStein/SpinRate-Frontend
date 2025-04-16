import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../Home/Component/PricingCard';
import PricingSection from '../Home/Component/PricingCard';

const DashboardSubscription = () => {
  const subscriptions = [
    { id: 1, title: 'Standard', price: '$49', period: 'Per Month, Billed Monthly', features: ['Military GradeServer Protection', 'All Dashboard Features', 'API And Webhook Access'], popular: false, buttonText: 'Choose Plan' },
    { id: 2, title: 'Premium', price: '$249', period: 'Per Month, Billed Monthly', features: ['8 Team Members', 'Custom Analytics Filters', 'API And Webhook Access'], popular: true, buttonText: 'Choose Plan' },
    { id: 3, title: 'Professional', price: '$99', period: 'Per Month, Billed Monthly', features: ['Military GradeServer Protection', 'All Dashboard Features', 'API And Webhook Access'], popular: false, buttonText: 'Choose Plan' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-3 sm:px-6 py-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Subscription Plans</h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">Choose the right plan for your business needs</p>
      </div>
      <PricingSection />
    </div>
  );
};

export default DashboardSubscription;
