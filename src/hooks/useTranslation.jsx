import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    if (!translations[language]) {
      console.warn(`Missing translations for language: ${language}`);
      return key;
    }
    
    if (!translations[language][key]) {
      console.warn(`Missing translation for key: ${key} in language ${language}`);
      return key;
    }
    
    return translations[language][key];
  };
  
  return { t, language };
}; 