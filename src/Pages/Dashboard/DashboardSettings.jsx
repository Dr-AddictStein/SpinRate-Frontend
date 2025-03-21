import React, { useState } from 'react';
import { Check, Info, Upload, Copy, Download, Grid, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import GamePreviewModal from './Component/GamePreviewModal';

const WheelGameDashboard = () => {
  // Toggle preview modal
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const openPreviewModal = () => setIsPreviewModalOpen(true);
  const closePreviewModal = () => setIsPreviewModalOpen(false);

  const [googleReviewLink, setGoogleReviewLink] = useState('');
  const [customerInstruction, setCustomerInstruction] = useState('');
  const [mainColors, setMainColors] = useState({
    color1: '#fb1313',
    color2: '#05f020',
    color3: '#e8d611'
  });
  const [lots, setLots] = useState([
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' },
    { name: '', odds: '1', promoCode: '' }
  ]);
  const [logoFile, setLogoFile] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isWheelSaved, setIsWheelSaved] = useState(false);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    // This will be implemented when connecting to the backend
    console.log({
      googleReviewLink,
      customerInstruction,
      mainColors,
      lots,
      logoFile
    });

    // Set wheel as saved to show QR code and download options
    setIsWheelSaved(true);
  };

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-bold text-gray-800">Wheel Game Configuration</h1>
        <div className="flex space-x-2">
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openPreviewModal}
          >
            <Grid className="w-5 h-5" />
            <span>Preview Game</span>
          </motion.button>
        </div>
        <GamePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={closePreviewModal}
          gameData={{
            lots,
            mainColors,
            customerInstruction
          }}
        />
      </motion.div>

      {/* Google Review Link */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('google')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <label className="font-semibold text-gray-800 text-lg">Google Review Link</label>
          </div>
          <div className="relative flex items-center w-3/4">
            <input
              type="text"
              value={googleReviewLink}
              onChange={(e) => setGoogleReviewLink(e.target.value)}
              placeholder="https://www.google.com/search?hl=en-BDXgbcbdxq=Michiko,+20+FL+des+"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            />
            {googleReviewLink && (
              <motion.div
                className="absolute right-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <Check className="text-green-500 w-5 h-5" />
              </motion.div>
            )}
            <motion.button
              className="absolute right-12 text-gray-400 hover:text-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Copy className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Customer Instruction */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('instruction')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <Info className="w-5 h-5 text-purple-600" />
            </div>
            <label className="font-semibold text-gray-800 text-lg">
              Customer instruction <span className="text-sm font-normal text-gray-500">(20 character limit)</span>
            </label>
          </div>
          <div className="w-3/4">
            <div className="relative">
              <input
                type="text"
                value={customerInstruction}
                onChange={(e) => setCustomerInstruction(e.target.value)}
                placeholder="If empty default text: 'Give us a review'"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                maxLength={20}
              />
              <span className="absolute right-3 top-3 text-xs text-gray-500">
                {customerInstruction.length}/20
              </span>
            </div>
          </div>
        </div>
      </motion.div>



      {/* Main Colors */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('colors')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-red-400 via-green-400 to-yellow-400 rounded-full flex items-center justify-center mr-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <label className="font-semibold text-gray-800 text-lg">3 main colors</label>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 1</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color1 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color1}
                  onChange={(e) => setMainColors({ ...mainColors, color1: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color1.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 2</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color2 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color2}
                  onChange={(e) => setMainColors({ ...mainColors, color2: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color2.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-b from-white to-gray-50 p-4 rounded-lg shadow-sm"
          >
            <div className="mb-2 text-center font-medium text-gray-700">Color 3</div>
            <div className="relative">
              <div
                className="w-full h-16 rounded-lg mb-2 shadow-inner"
                style={{ backgroundColor: mainColors.color3 }}
              ></div>
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <input
                  type="color"
                  value={mainColors.color3}
                  onChange={(e) => setMainColors({ ...mainColors, color3: e.target.value })}
                  className="w-full h-10 cursor-pointer rounded-lg border-2 border-gray-300"
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                  {mainColors.color3.toUpperCase()}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="font-medium mb-2">Preview</div>
          <div className="h-8 w-full rounded-lg" style={{
            background: `linear-gradient(to right, ${mainColors.color1} 0%, ${mainColors.color1} 33%, ${mainColors.color2} 33%, ${mainColors.color2} 66%, ${mainColors.color3} 66%, ${mainColors.color3} 100%)`
          }}></div>
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('logo')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Upload className="w-5 h-5 text-green-600" />
            </div>
            <label className="font-semibold text-gray-800 text-lg">Logo</label>
          </div>
          <div className="flex w-3/4 items-center">
            <div className="relative flex-grow mr-6">
              <input
                type="file"
                id="logo-file"
                className="hidden"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              <label
                htmlFor="logo-file"
                className="cursor-pointer flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg py-4 px-4 w-full transition duration-300 ease-in-out hover:border-green-500 hover:bg-green-50"
              >
                <div className="flex flex-col items-center">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Choose File</span>
                  <span className="text-gray-400 text-sm mt-1">or drag and drop</span>
                </div>
              </label>
              {logoFile && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  <Check className="text-white w-4 h-4" />
                </motion.div>
              )}
            </div>
            <motion.div
              className="w-32 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shadow-inner"
              whileHover={{ scale: 1.05 }}
            >
              {logoFile ? (
                <img src={URL.createObjectURL(logoFile)} alt="Logo preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <img src="/api/placeholder/96/64" alt="Logo preview" className="max-w-full max-h-full opacity-50" />
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Lots */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('lots')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
            <div className="text-amber-600 font-bold text-lg">🎁</div>
          </div>
          <label className="font-semibold text-gray-800 text-lg">Wheel Lots Configuration</label>
        </div>

        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100 mb-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">8 mandatory batches, if you don't have enough you can repeat them.</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">In case Losing is possible, write "Lost" in a batch and put a probability that it will happen, the message will change.</div>
            </div>

            <div className="flex items-start">
              <div className="text-blue-500 mr-2 mt-1">▲</div>
              <div className="text-blue-800">For the odds, there is no obligation that it be at 100, if you put 1 in each lot they will each have a 1 in 8 chance of being drawn.</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-4 bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 font-medium text-gray-700">
            <div className="col-span-5">Lot Name</div>
            <div className="col-span-2 text-center">Odds</div>
            <div className="col-span-5">Promo Code (optional)</div>
          </div>

          {lots.map((lot, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-12 gap-4 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="col-span-5 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center font-medium text-gray-800">
                  {String.fromCharCode(65 + index)}
                </div>
                <input
                  type="text"
                  value={lot.name}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].name = e.target.value;
                    setLots(newLots);
                  }}
                  placeholder={`Prize ${index + 1}`}
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                />
                {lot.name && (
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Check className="text-green-500 w-5 h-5" />
                  </motion.div>
                )}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  value={lot.odds}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].odds = e.target.value;
                    setLots(newLots);
                  }}
                  className="w-full p-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                />
              </div>
              <div className="col-span-5">
                <input
                  type="text"
                  value={lot.promoCode}
                  onChange={(e) => {
                    const newLots = [...lots];
                    newLots[index].promoCode = e.target.value;
                    setLots(newLots);
                  }}
                  placeholder="Promo Code (optional)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            className="bg-amber-100 text-amber-700 py-2 px-4 rounded-lg flex items-center space-x-2 font-medium hover:bg-amber-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Reset Default Values</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button and QR Section */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
        onMouseEnter={() => setActiveSection('save')}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      >
        <div className={`flex ${isWheelSaved ? 'items-center justify-between' : 'justify-center'}`}>
          {!isWheelSaved ? (
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-10 rounded-lg font-medium text-lg shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
            >
              Save the Wheel
            </motion.button>
          ) : (
            <>
              <div className="w-1/2 flex flex-col items-center space-y-8">
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-10 rounded-lg font-medium text-lg shadow-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save the Wheel
                </motion.button>

                <motion.div
                  className="w-40 h-40 bg-white border-2 border-gray-200 rounded-xl p-3 flex items-center justify-center shadow-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                >
                  <img src="/api/placeholder/140/140" alt="QR Code" className="w-32 h-32" />
                </motion.div>
              </div>

              <motion.div
                className="w-1/2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Download Options</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download SVG</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PNG</span>
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Poster Options</h3>
                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>English Poster</span>
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>French Poster</span>
                    </motion.button>
                  </div>
                </div>

                <div className="pt-3">
                  <motion.button
                    className="w-full border border-gray-300 hover:border-gray-400 bg-white text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02, backgroundColor: '#f9fafb' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy Game URL</span>
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex justify-center mt-8 mb-6 text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </motion.div>
    </motion.div>
  );
};

export default WheelGameDashboard;