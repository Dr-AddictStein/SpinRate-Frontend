import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Translations object
const translations = {
  en: {
    title: "Privacy Policy",
    backToHome: "Back to Home",
    heading: "RevWheel Privacy Policy",
    sections: [
      {
        title: "1. Introduction",
        content: "At RevWheel, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information when you use our platform. By accessing our service, you agree to the terms of this policy."
      },
      {
        title: "2. Information We Collect",
        content: "We collect the following information when you use RevWheel:\n● Personal Information: Name, email, phone number.\n● Usage Information: Data about your use of our service, including information related to your participation in the prize wheel."
      },
      {
        title: "3. Use of Information",
        content: "We use the information we collect for the following purposes:\n● To manage and improve our service,\n● To provide rewards after participating in the prize wheel,\n● To contact users for promotions or relevant information regarding the service,\n● To comply with our legal obligations."
      },
      {
        title: "4. Sharing of Information",
        content: "We do not share your personal information with third parties, except in the following cases:\n● If required by law,\n● If necessary to protect our rights or the rights of our users."
      },
      {
        title: "5. Data Security",
        content: "We implement security measures to protect your personal information from loss, misuse, or unauthorized access. However, no method of transmission over the Internet is completely secure, and we cannot guarantee absolute security."
      },
      {
        title: "6. Your Rights",
        content: "Under data protection laws (including the GDPR), you have the following rights:\n● Right to access your data,\n● Right to correct your data,\n● Right to delete your data,\n● Right to data portability,\n● Right to object to the processing of your data.\n\nTo exercise these rights, you can contact us at contactpierrepro@gmail.com."
      },
      {
        title: "7. Changes to This Policy",
        content: "We reserve the right to modify this privacy policy at any time. We will inform you of changes through our platform. Any modifications will be effective as soon as they are posted."
      },
      {
        title: "8. Contact",
        content: "If you have any questions regarding this privacy policy, please contact us by email at contactpierrepro@gmail.com."
      }
    ]
  },
  fr: {
    title: "Politique de Confidentialité",
    backToHome: "Retour à l'Accueil",
    heading: "Politique de Confidentialité de RevWheel",
    sections: [
      {
        title: "1. Introduction",
        content: "Chez RevWheel, nous prenons votre vie privée au sérieux. Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme. En accédant à notre service, vous acceptez les termes de cette politique."
      },
      {
        title: "2. Informations que nous collectons",
        content: "Nous collectons les informations suivantes lorsque vous utilisez RevWheel :\n● Informations personnelles : Nom, prénom, email, numéro de téléphone.\n● Informations liées à l'utilisation : Données sur l'utilisation de notre service, y compris les informations relatives à votre participation à la roue de la chance."
      },
      {
        title: "3. Utilisation des informations",
        content: "Nous utilisons les informations que nous collectons pour les finalités suivantes :\n● Gérer et améliorer notre service,\n● Fournir des récompenses après participation à la roue de la chance,\n● Contacter les utilisateurs pour des promotions ou des informations pertinentes concernant le service,\n● Respecter nos obligations légales."
      },
      {
        title: "4. Partage des informations",
        content: "Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les situations suivantes :\n● Si la loi nous y oblige,\n● Si cela est nécessaire pour protéger nos droits ou ceux de nos utilisateurs."
      },
      {
        title: "5. Sécurité des données",
        content: "Nous mettons en œuvre des mesures de sécurité pour protéger vos informations personnelles contre toute perte, utilisation abusive ou accès non autorisé. Cependant, aucune méthode de transmission sur Internet n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue."
      },
      {
        title: "6. Vos droits",
        content: "Conformément à la législation sur la protection des données personnelles (notamment le RGPD), vous disposez des droits suivants :\n● Droit d'accès à vos données,\n● Droit de rectification de vos données,\n● Droit à l'effacement de vos données,\n● Droit à la portabilité des données,\n● Droit d'opposition au traitement de vos données.\n\nPour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : contactpierrepro@gmail.com."
      },
      {
        title: "7. Modifications de cette politique",
        content: "Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Nous vous informerons des modifications via notre plateforme. Toute modification sera effective dès sa publication."
      },
      {
        title: "8. Contact",
        content: "Si vous avez des questions concernant cette politique de confidentialité, n'hésitez pas à nous contacter par email à contactpierrepro@gmail.com."
      }
    ]
  }
};

const PrivacyPolicy = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const headerControls = useAnimation();
  const contentRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Start header animation
    headerControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  }, [headerControls]);

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6 group"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t.backToHome}</span>
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="text-center mb-10"
        >
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Shield size={24} className="text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl font-semibold text-gray-700">
            {t.heading}
          </p>
        </motion.div>

        {/* Content */}
        <div 
          ref={contentRef}
          className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-10"
        >
          {t.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + (index * 0.05), duration: 0.5 }}
              className="mb-8 last:mb-0"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {section.title}
              </h2>
              <div className="text-gray-700 whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last update notice */}
        <div className="text-center text-sm text-gray-500">
          {new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 