import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center group hover:shadow-blue-400/40 hover:shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-6 w-6 group-hover:translate-y-[-2px] transition-transform duration-300" />
          <span className="absolute inset-0 rounded-full bg-white opacity-25 group-hover:animate-ping" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 via-blue-300 to-indigo-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
