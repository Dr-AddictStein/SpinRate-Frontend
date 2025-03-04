import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const FeatureCard = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            delay: index * 0.2,
            ease: [0.25, 0.1, 0.25, 1.0]
          } 
        }
      }}
      className="relative group bg-white rounded-2xl shadow-lg p-8 transition-all duration-500 hover:shadow-xl overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        animate={{
          background: [
            'linear-gradient(to top right, rgba(239, 246, 255, 0.6), rgba(238, 242, 255, 0.6))',
            'linear-gradient(to top right, rgba(224, 242, 254, 0.6), rgba(224, 231, 255, 0.6))',
            'linear-gradient(to top right, rgba(239, 246, 255, 0.6), rgba(238, 242, 255, 0.6))'
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      {/* Icon container with floating animation */}
      <motion.div 
        className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      
      {/* Title with underline animation */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-900 relative inline-block">
          {title}
          <motion.span 
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h3>
      </div>
      
      {/* Description */}
      <p className="text-gray-600 text-center">{description}</p>
      
      {/* Decorative circles */}
      <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-blue-100 opacity-30" />
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-indigo-100 opacity-30" />
    </motion.div>
  );
};

const Features = () => {
  const titleControls = useAnimation();
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  
  useEffect(() => {
    if (isTitleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, isTitleInView]);
  
  const featuresData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <path d="M17 14h.01" />
        </svg>
      ),
      title: "Trusted Grow Solutions",
      description: "Duis cursus, mi quis viverra ornare, erosrdum nulla ut diam libero vitae erat'ene faucibus nibh et justo",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18.4 14.5 8.1 14.1 6.8 12.8 13.9 7.9 18.4 14.5z" />
          <path d="m8 4 4 6 4-2 3 4" />
        </svg>
      ),
      title: "Digital Data Analytics",
      description: "Duis cursus, mi quis viverra ornare, erosrdum nulla ut diam libero vitae erat'ene faucibus nibh et justo",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      title: "Strategy Buildup Software",
      description: "Duis cursus, mi quis viverra ornare, erosrdum nulla ut diam libero vitae erat'ene faucibus nibh et justo",
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 left-0 w-64 h-64 rounded-full bg-blue-200 opacity-10 -z-10"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-40 right-0 w-96 h-96 rounded-full bg-indigo-200 opacity-10 -z-10"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-200 opacity-10 -z-10"
        animate={{ 
          x: [0, 40, 0],
          y: [0, 10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Features label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-4 bg-blue-50 text-blue-500 rounded-full text-sm font-medium"
          >
            Features
          </motion.div>
          
          {/* Main heading */}
          <motion.div
            ref={titleRef}
            initial="hidden"
            animate={titleControls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6 } }
            }}
            className="relative"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Utilize Your Marketing Data 
              <br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Anywhere
              </motion.span>
            </h2>
            
            {/* Animated accent element */}
            <motion.div 
              className="absolute -right-10 top-0 md:top-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 54C43.2548 54 54 43.2548 54 30C54 16.7452 43.2548 6 30 6C16.7452 6 6 16.7452 6 30C6 43.2548 16.7452 54 30 54Z" fill="#4F46E5" fillOpacity="0.3" />
                <path d="M30 45C38.2843 45 45 38.2843 45 30C45 21.7157 38.2843 15 30 15C21.7157 15 15 21.7157 15 30C15 38.2843 21.7157 45 30 45Z" fill="#4F46E5" fillOpacity="0.6" />
                <path d="M30 36C33.3137 36 36 33.3137 36 30C36 26.6863 33.3137 24 30 24C26.6863 24 24 26.6863 24 30C24 33.3137 26.6863 36 30 36Z" fill="#4F46E5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;