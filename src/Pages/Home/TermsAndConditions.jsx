import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-6 text-white relative">
            <h1 className="text-2xl font-bold text-center">Game Rules</h1>
          </div>
          
          <div className="p-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Spin Rate Game Rules and Terms</h2>
              
              <p className="mb-4">
                Welcome to the Spin Rate Wheel Game! By participating in this game, you agree to the following terms and conditions:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li>Each participant is entitled to one spin per device.</li>
                <li>The prize shown is the one you will receive based on where the wheel stops.</li>
                <li>To claim your prize, you must provide valid contact information.</li>
                <li>Prizes are subject to availability and may be substituted with an alternative of equal value.</li>
                <li>The business reserves the right to verify your eligibility before awarding any prize.</li>
                <li>By submitting your information, you consent to being contacted regarding your prize.</li>
                <li>The wheel spin result is final and non-negotiable.</li>
                <li>You must be at least 18 years old to participate.</li>
                <li>Employees of the business and their immediate family members are not eligible to participate.</li>
                <li>The business reserves the right to modify these rules at any time.</li>
              </ol>
              
              <h3 className="text-lg font-bold text-indigo-800 mb-3">Privacy Notice</h3>
              <p className="mb-6">
                Information collected through this game will be used solely for the purpose of prize delivery and potential marketing communications. Your information will not be sold to third parties. You may opt out of marketing communications at any time.
              </p>
              
              <h3 className="text-lg font-bold text-indigo-800 mb-3">Limitation of Liability</h3>
              <p>
                The business hosting this game is not responsible for technical issues that may affect the outcome of the spin. We reserve the right to cancel or modify the game if fraud or technical failures compromise the integrity of the game.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Link to="/" className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SpinRate. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions; 