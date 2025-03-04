import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import allPhone from "../../../assets/allphone.png"; // Using your existing phone image

const CloudManagement = () => {
  const controls = useAnimation();
  const textControls = useAnimation();
  const listControls = useAnimation();
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      textControls.start("visible");
      listControls.start("visible");
    }
  }, [controls, isInView, textControls, listControls]);

  // Animation variants
  const fadeInLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      } 
    }
  };

  const fadeInRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      } 
    }
  };

  const staggerListVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const listItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white"
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-50 opacity-60 -z-10"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-50 opacity-50 -z-10"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Animated accent lines */}
      <motion.div 
        className="absolute top-1/4 right-0 w-32 h-1 bg-blue-200 opacity-50 -z-10"
        animate={{ 
          width: [0, 64, 0],
          opacity: [0, 0.5, 0],
          x: [0, 100, 200]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-0 w-24 h-1 bg-indigo-300 opacity-40 -z-10"
        animate={{ 
          width: [0, 48, 0],
          opacity: [0, 0.4, 0],
          x: [0, 80, 160]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Device Mockup */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate={controls}
            variants={fadeInLeftVariant}
          >
            <motion.div 
              className="relative mx-auto max-w-lg"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {/* Device frame/shadow for depth */}
              <div className="relative">
                <motion.div 
                  className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-lg"
                  animate={{ 
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <img src={allPhone} alt="Analytics Dashboard" className="w-full h-auto" />
                  
                  {/* Animated overlay elements */}
                  <motion.div 
                    className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 0.6, 0.8]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                      80%
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-10 right-10 px-3 py-1 bg-blue-500 text-white text-xs rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    Create Schedule
                  </motion.div>

                  <motion.div 
                    className="absolute top-1/4 right-8 w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div 
                    className="absolute bottom-1/3 left-8 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                </div>
              </div>
              
              {/* Shadow effect beneath the floating device */}
              <motion.div
                className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black opacity-20 blur-xl rounded-full"
                animate={{ 
                  width: ["70%", "60%", "70%"],
                  opacity: [0.2, 0.15, 0.2]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-8 -left-8 w-16 h-16 bg-indigo-100 rounded-full -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate={textControls}
            variants={fadeInRightVariant}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
            >
              Data Analysis
            </motion.div>
            
            <motion.div>
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Most Reliable Cloud
                <br />
                Management Software
              </motion.h2>
              
              <motion.div 
                className="mt-6 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>
                  Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo
                  diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lore
                  imperdiet. Nunc ut sem vitae risus tristique posuere.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate={listControls}
              variants={staggerListVariant}
            >
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                variants={listItemVariant}
                whileHover={{ 
                  y: -3, 
                  transition: { duration: 0.2 },
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"
                    whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Unlimited Design Possibility</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                variants={listItemVariant}
                whileHover={{ 
                  y: -3, 
                  transition: { duration: 0.2 },
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"
                    whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Beautiful Mobile Apps</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                variants={listItemVariant}
                whileHover={{ 
                  y: -3, 
                  transition: { duration: 0.2 },
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div 
                    className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"
                    whileHover={{ scale: 1.1, backgroundColor: "#EFF6FF" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">Easy Project Management</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CloudManagement;