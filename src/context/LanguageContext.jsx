import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Default language is French
  const [language, setLanguage] = useState('fr');

  // Load language from localStorage on initial load
  useEffect(() => {
    // Get saved language or default to French
    const savedLanguage = localStorage.getItem('language');
    
    // Set default language to French if none exists yet
    if (!savedLanguage) {
      localStorage.setItem('language', 'fr');
      console.log('No language found in localStorage, defaulting to French');
    } else {
      // Otherwise use the saved language (could be fr or en)
      console.log('Found language in localStorage:', savedLanguage);
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const changeLanguage = (lang) => {
    console.log('Changing language to:', lang);
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 