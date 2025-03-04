import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const IntegrationCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1.0],
          },
        },
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm p-6 hover:border-blue-100 transition-all duration-300"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start mb-4">
          <motion.div
            className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4"
            whileHover={{ scale: 1.1, backgroundColor: "#EBF5FF" }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 mt-1 mb-4 flex-grow">{description}</p>
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href="#"
            className="text-blue-500 inline-flex items-center font-medium hover:text-blue-600 transition-colors"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

const IntegrationSection = () => {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });
  const titleControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      titleControls.start("visible");
    }
  }, [isInView, titleControls]);

  const integrationCards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      title: "Easy Editable",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Fully Responsive",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Well Documentation",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      title: "Server Solutions",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Creative Design",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Quick Linkup",
      description: "Duis cursus, mi quis viverra ornare eros dolor interdum nulla",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Animated dots grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-blue-600 rounded-full m-8"
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i % 7,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16" ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            <span className="text-blue-500 font-medium">Our Solution</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6"
            initial="hidden"
            animate={titleControls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
          >
            <span className="relative inline-block">
              Easily Integrates With Your
              <motion.span
                className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded opacity-70"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              ></motion.span>
            </span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Favorite Services
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto rounded-full opacity-70"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.7 }}
          ></motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrationCards.map((card, index) => (
            <IntegrationCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;