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
    <div className=" bg-gray-50 min-h-screen">
      <PricingSection />
    </div>
  );
};

export default DashboardSubscription;
