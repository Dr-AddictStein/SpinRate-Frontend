import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Translations object
const translations = {
  en: {
    title: "Terms and Conditions",
    backToHome: "Back to Home",
    heading: "Terms and Conditions of RevWheel",
    sections: [
      {
        title: "1. Introduction",
        content: "Welcome to RevWheel. By accessing and using our service, you agree to comply with these Terms and Conditions (the \"Terms\"). These Terms govern the use of the RevWheel platform, which allows businesses to collect Google reviews in a fun and engaging way by offering rewards through a prize wheel.\n\nIf you do not agree with these Terms, you must not use our services."
      },
      {
        title: "2. Service Description",
        content: "RevWheel allows businesses to:\n● Collect Google reviews in a simple and non-intrusive way,\n● Offer rewards via a prize wheel after customers leave a review,\n● Collect user contact information (name, phone, email) to follow up if needed.\n\nUsing RevWheel requires creating a user account and agreeing to these Terms."
      },
      {
        title: "3. User Responsibilities",
        content: "By using the service, you agree to:\n● Provide accurate and complete information when registering and using the services,\n● Not use the service for fraudulent, illegal, or harmful purposes,\n● Comply with all applicable local laws and regulations regarding data protection and customer review management,\n● Not abuse the system by creating fake accounts or exploiting flaws in the process."
      },
      {
        title: "4. Business Responsibilities",
        content: "The business using RevWheel is responsible for:\n● Managing and customizing its rewards and prize wheel,\n● Obtaining consent from customers to collect and use their data (name, email, phone),\n● Complying with applicable laws regarding customer reviews, including data protection regulations (GDPR)."
      },
      {
        title: "5. Personal Data",
        content: "RevWheel collects certain personal information from users (name, email, phone number) during the use of its services. This information is necessary for the proper functioning of the platform, including managing rewards.\n\nWe are committed to respecting your privacy and processing your personal data in accordance with our Privacy Policy, available on our website."
      },
      {
        title: "6. Intellectual Property",
        content: "All content available on RevWheel, including logos, images, texts, videos, and other materials, is protected by intellectual property rights. No part of this content may be reproduced, distributed, or used without the explicit permission of RevWheel."
      },
      {
        title: "7. Modifications to the Terms",
        content: "We reserve the right to modify these Terms at any time. We will notify you of any changes through our platform. Your continued use of the service after any modification constitutes acceptance of the new terms."
      },
      {
        title: "8. Suspension and Termination",
        content: "We reserve the right to suspend or terminate your account if we believe you have violated these Terms. In the event of termination, you must immediately cease using our services."
      },
      {
        title: "9. Limitations of Liability",
        content: "RevWheel will not be held responsible for any direct or indirect damages resulting from the use or inability to use the service. We do not guarantee that the service will be free from errors, interruptions, or failures."
      },
      {
        title: "10. Force Majeure",
        content: "We will not be held responsible for delays or the inability to provide our services due to circumstances beyond our control, including but not limited to natural disasters, strikes, social conflicts, or any other cause beyond our control."
      },
      {
        title: "11. Governing Law and Dispute Resolution",
        content: "These Terms are governed by French law. Any disputes related to the use of the services will be subject to the exclusive jurisdiction of the courts of Paris."
      },
      {
        title: "12. Contact",
        content: "For any questions regarding these Terms, you can contact us at the following address:\nEmail: contactpierrepro@gmail.com"
      }
    ]
  },
  fr: {
    title: "Conditions Générales",
    backToHome: "Retour à l'Accueil",
    heading: "Conditions Générales d'Utilisation (CGU) de RevWheel",
    sections: [
      {
        title: "1. Introduction",
        content: "Bienvenue sur RevWheel. En accédant et en utilisant notre service, vous acceptez de vous conformer aux présentes Conditions Générales d'Utilisation (les \"Conditions\"). Ces conditions régissent l'utilisation de la plateforme RevWheel, qui permet aux entreprises de recueillir des avis Google de manière ludique en offrant des récompenses via une roue de la chance.\n\nSi vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services."
      },
      {
        title: "2. Description du service",
        content: "RevWheel permet aux entreprises de :\n● Collecter des avis Google de manière simple et non intrusive,\n● Offrir des récompenses via une roue de la chance après que les clients ont laissé un avis,\n● Collecter les informations de contact des utilisateurs (nom, téléphone, email) pour les recontacter en cas de besoin.\n\nL'utilisation de RevWheel implique la création d'un compte utilisateur et l'acceptation des présentes conditions."
      },
      {
        title: "3. Obligations des utilisateurs",
        content: "En utilisant le service, vous vous engagez à :\n● Fournir des informations exactes et complètes lors de l'inscription et lors de l'utilisation des services.\n● Ne pas utiliser le service à des fins frauduleuses, illégales ou nuisibles.\n● Respecter toutes les lois et régulations locales applicables en matière de protection des données et de gestion des avis clients.\n● Ne pas abuser du système en créant de faux comptes ou en exploitant des failles dans le processus."
      },
      {
        title: "4. Responsabilités de l'entreprise",
        content: "L'entreprise qui utilise RevWheel est responsable de :\n● L'édition et de la gestion de ses récompenses et de sa roue de la chance,\n● L'obtention de l'autorisation des clients pour collecter et utiliser leurs données (nom, email, téléphone),\n● Le respect de la législation applicable concernant les avis clients, y compris les lois sur la protection des données personnelles (RGPD)."
      },
      {
        title: "5. Données personnelles",
        content: "RevWheel collecte certaines informations personnelles des utilisateurs (nom, email, numéro de téléphone) lors de l'utilisation de ses services. Ces informations sont nécessaires pour permettre le bon fonctionnement de la plateforme, notamment pour la gestion des récompenses.\n\nNous nous engageons à respecter votre vie privée et à traiter vos informations personnelles conformément à notre Politique de Confidentialité, disponible sur notre site."
      },
      {
        title: "6. Propriété intellectuelle",
        content: "Tout le contenu disponible sur RevWheel, y compris les logos, images, textes, vidéos, et autres matériaux, est protégé par les droits de propriété intellectuelle. Aucune partie de ce contenu ne peut être reproduite, distribuée ou utilisée sans l'autorisation explicite de RevWheel."
      },
      {
        title: "7. Modifications des conditions",
        content: "Nous nous réservons le droit de modifier ces Conditions à tout moment. Nous vous informerons de toute modification par l'intermédiaire de notre plateforme. Votre utilisation continue du service après toute modification constitue une acceptation de ces nouvelles conditions."
      },
      {
        title: "8. Suspension et résiliation",
        content: "Nous nous réservons le droit de suspendre ou de résilier votre compte si nous estimons que vous avez enfreint ces Conditions. En cas de résiliation, vous devrez cesser d'utiliser immédiatement nos services."
      },
      {
        title: "9. Limitations de responsabilité",
        content: "RevWheel ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation ou de l'incapacité d'utiliser le service. Nous ne garantissons pas que le service sera exempt d'erreurs, d'interruptions ou de défaillances."
      },
      {
        title: "10. Force majeure",
        content: "Nous ne serons pas responsables des retards ou de l'incapacité à fournir nos services en raison de circonstances indépendantes de notre volonté, y compris mais sans s'y limiter, les catastrophes naturelles, grèves, conflits sociaux, ou toute autre cause indépendante de notre volonté."
      },
      {
        title: "11. Loi applicable et règlement des litiges",
        content: "Ces Conditions sont régies par la loi française. Tout litige relatif à l'utilisation des services sera soumis à la compétence exclusive des tribunaux de Paris."
      },
      {
        title: "12. Contact",
        content: "Pour toute question concernant ces Conditions, vous pouvez nous contacter à l'adresse suivante :\nEmail: contactpierrepro@gmail.com"
      }
    ]
  }
};

const TermsAndConditions = () => {
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
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="text-center mb-10"
        >
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <FileText size={24} className="text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl font-semibold text-gray-700">
            {t.heading}
          </p>
        </motion.div>

        {/* Back button - moved to just above content */}
        <div className="mb-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-500 hover:text-blue-700 group transition-colors duration-200"
          >
            <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="font-medium">{t.backToHome}</span>
          </Link>
        </div>

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

export default TermsAndConditions; 