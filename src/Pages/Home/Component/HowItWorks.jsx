import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { QrCode, Star, RotateCw, Award, Database } from 'lucide-react';

const HowItWorks = () => {
  // References for animation triggers
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Steps data
  const steps = [
    {
      icon: <QrCode size={48} className="text-blue-500" />,
      title: "Invite your clients to scan the QR code",
      description: "We provide you with flyers for your sales counter, and in your delivery bags.",
      color: "blue"
    },
    {
      icon: <Star size={48} className="text-yellow-500" />,
      title: "Clients leave a Google Review",
      description: "The client sees on the flyer there's a prize wheel spin after they leave a review.",
      color: "yellow"
    },
    {
      icon: <RotateCw size={48} className="text-green-500" />,
      title: "Time to turn the wheel!",
      description: "Once the google review is submitted, the client spin the wheel and hopes to land on a gift",
      color: "green"
    },
    {
      icon: <Award size={48} className="text-purple-500" />,
      title: "#1 on Google",
      description: "You boost your ranking on Google reviews, enhance customer trust and drive new clients!",
      color: "purple"
    },
    {
      icon: <Database size={48} className="text-indigo-500" />,
      title: "Data collected",
      description: "You communicate through the data you collected for offers, events, to drive repeat business, and increase your turnover!",
      color: "indigo"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Helper function to get background color based on step color
  const getBgColor = (color) => {
    const colors = {
      blue: "bg-blue-50",
      yellow: "bg-yellow-50",
      green: "bg-green-50",
      purple: "bg-purple-50",
      indigo: "bg-indigo-50"
    };
    return colors[color] || "bg-gray-50";
  };

  // Helper function to get border color based on step color
  const getBorderColor = (color) => {
    const colors = {
      blue: "border-blue-200",
      yellow: "border-yellow-200",
      green: "border-green-200",
      purple: "border-purple-200",
      indigo: "border-indigo-200"
    };
    return colors[color] || "border-gray-200";
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated dots pattern */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: '3.5s' }}></div>
          
          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full opacity-50"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-50 rounded-full opacity-60"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Does It <span className="text-blue-600">Work?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 5-step process makes it easy to boost your Google reviews and grow your business
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connecting line - moved to a lower z-index */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-100 transform -translate-x-1/2 hidden md:block z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center mb-16 md:mb-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Icon container with animations - increased z-index */}
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mx-8 z-20">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full ${getBgColor(step.color)} border-2 ${getBorderColor(step.color)} flex items-center justify-center shadow-lg relative`}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 opacity-50"
                  ></motion.div>
                  {step.icon}
                </motion.div>
              </div>

              {/* Content - increased z-index and added background */}
              <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? 'md:text-right' : ''} max-w-lg mx-auto md:mx-0 z-10 relative`}>
                <div className="bg-white bg-opacity-90 p-4 rounded-lg">
                  <motion.h3 
                    whileHover={{ scale: 1.02 }}
                    className="text-2xl md:text-3xl font-bold mb-4"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-lg text-gray-600"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Start now!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 