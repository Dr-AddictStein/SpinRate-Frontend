import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import WheelGame from './WheelGame';

const GamePreviewModal = ({ isOpen, onClose, gameData }) => {
  const { lots, mainColors, customerInstruction } = gameData || {};
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: 50, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] relative"
            variants={modalVariants}
          >
            <div className="sticky top-0 bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-bold">Game Preview</h2>
              <motion.button
                className="text-white rounded-full p-1 hover:bg-indigo-500"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-60px)]">
              <WheelGame 
                lots={lots || []} 
                mainColors={mainColors} 
                customerInstruction={customerInstruction}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamePreviewModal;