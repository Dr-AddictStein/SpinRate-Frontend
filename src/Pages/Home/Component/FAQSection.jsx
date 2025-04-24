import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

// Translations object
const translations = {
  en: {
    sectionTitle: "FAQ",
    subtitle: "Got questions? We've got answers.",
    questions: [
      {
        question: "Will it work for my business (restaurant, hair salon, shop, café, hotel, etc.)?",
        answer: "Absolutely! Wheelix is designed for any type of local business. As long as your customers have a phone to scan a QR code, you're ready to go."
      },
      {
        question: "Why should you get Wheelix?",
        answer: "It's simple! Wheelix helps you boost customer engagement, loyalty, and visibility with minimal effort.\n\nIncrease your Google reviews effortlessly — customers leave a review to spin the wheel, boosting your online visibility without you having to ask.\n\nDrive repeat visits and new customers — every prize claim brings people back: they return to redeem their reward, make another purchase, or bring friends. More visits, more sales, more reviews.\n\nGrow your marketing list with every spin — collect valuable data like emails, phone numbers, and customer profiles to re-engage them during events, promotions, or future campaigns to bring them back.\n\nAnalytics dashboard: view all your results in one place and track key metrics like QR code scans, prizes claimed, redemption rates, and enriched customer profiles. Use these insights to optimize your marketing and sales strategies.\n\nFair and secure: we make sure each customer can only spin once — no abuse, just real results."
      },
      {
        question: "How do I set it up?",
        answer: "Super easy. Just create your Wheelix account, customize your prize wheel, and download your QR code. Stick the QR code on a poster in your shop, and you're all set!"
      },
      {
        question: "Can I customize the wheel?",
        answer: "Yes – completely. You can change the colors, prizes, probability of winnings, text, logo, and more. You're in full control of what your wheel says and what rewards you offer."
      },
      {
        question: "Do customers need to install an app?",
        answer: "Nope. Everything runs in the browser. Customers just scan the QR code with their phone, and the Wheelix experience starts instantly."
      },
      {
        question: "What data do I collect?",
        answer: "You collect first names, email addresses, and phone numbers from every spin. You can also enrich this data later and add more info like birthdays, preferences, or visit history to improve your marketing campaigns."
      },
      {
        question: "Can I track results?",
        answer: "Of course. Your dashboard shows all the key stats in one place. You can track QR code scans, reviews left, prizes distributed, redemption rates, accounts created, and enriched customer profiles. You can also export your data anytime to create campaigns and bring back your customers."
      },
      {
        question: "Does it work on mobile?",
        answer: "Definitely. Wheelix is built mobile-first and works perfectly on smartphones."
      },
      {
        question: "Will customers spin the wheel every time?",
        answer: "No, each email and phone number can only be used once. If a customer tries to spin again with the same details, it won't work. This keeps things fair and secure. Once they spin, they enter their first name, and if there's any doubt, you can always check their ID when they claim their prize."
      },
      {
        question: "Is it GDPR compliant?",
        answer: "Yes! We make sure you stay compliant. Every customer must accept your terms before submitting their info."
      },
      {
        question: "How do customers claim their prize?",
        answer: "During their next visit, customers can easily claim their prize. Just log in to Wheelix, go to the \"Clients\" tab, and find the person — either directly or by searching their name, phone number, or email. You'll instantly see if they've won a prize and which one. Then, simply mark it as \"claimed\" using our dedicated feature… and that's it!"
      },
      {
        question: "Can I translate it?",
        answer: "Yes – 100%. All the text in the app is editable, so you can use it in French, English."
      }
    ]
  },
  fr: {
    sectionTitle: "FAQ",
    subtitle: "Vous avez des questions ? Nous avons les réponses.",
    questions: [
      {
        question: "Cela fonctionnera-t-il pour mon entreprise (restaurant, salon de coiffure, boutique, café, hôtel, etc.) ?",
        answer: "Absolument ! Wheelix est conçu pour tout type d'entreprise locale ou de commerce de proximité. Tant que vos clients ont un téléphone, vous êtes prêt à démarrer."
      },
      {
        question: "Pourquoi choisir Wheelix ?",
        answer: "C'est simple : Wheelix vous aide à augmenter l'engagement, la fidélisation et la visibilité de vos clients avec un minimum d'effort.\n\nAugmentez vos avis Google sans même avoir à demander — les clients laissent un avis pour accéder à la roue, ce qui améliore instantanément votre visibilité en ligne.\n\nFaites revenir vos clients et attirez-en de nouveaux — chaque réclamation de prix génère du trafic : les clients reviennent pour récupérer leur gain, consomment à nouveau ou reviennent accompagnés. Résultat : plus de visites, plus de ventes, plus d'avis.\n\nCollectez des données précieuses à chaque spin — emails, numéros de téléphone, profils clients... Idéal pour les recontacter lors de vos événements, promotions ou campagnes marketing et les inciter à revenir.\n\nTableau de bord analytique : visualisez vos performances en un coup d'œil et suivez les métriques clés (scans de QR codes, prix distribués, taux de rédemption, profils enrichis). Utilisez ces insights pour affiner vos stratégies marketing et commerciales.\n\nJuste et sécurisé : un seul spin par client — pas de triche, pas d'abus."
      },
      {
        question: "Comment l'installer ?",
        answer: "C'est super simple. Créez votre compte Wheelix, personnalisez votre roue à prix, et téléchargez votre QR code. Collez le QR code sur un poster dans votre magasin, et le tour est joué !"
      },
      {
        question: "Puis-je personnaliser la roue ?",
        answer: "Oui – entièrement. Vous pouvez modifier les couleurs, les prix, les probabilités de prix, le texte, le logo, et plus encore. Vous avez un contrôle total sur ce que dit votre roue et les récompenses que vous proposez."
      },
      {
        question: "Les clients doivent-ils installer une application ?",
        answer: "Non. Tout fonctionne directement dans le navigateur. Les clients n'ont qu'à scanner le QR code avec leur téléphone, et l'expérience Wheelix commence immédiatement."
      },
      {
        question: "Quelles données est-ce que je collecte ?",
        answer: "Vous collectez les prénoms, adresses e-mail et numéros de téléphone à chaque spin. Vous pouvez également enrichir ces données plus tard en ajoutant des informations comme des dates de naissance, des préférences, ou l'historique des visites pour améliorer vos campagnes marketing."
      },
      {
        question: "Puis-je suivre les résultats ?",
        answer: "Bien sûr. Votre tableau de bord affiche toutes les statistiques clés en un seul endroit. Vous pouvez suivre les scans des QR codes, les avis laissés, les prix distribués, les taux de rédemption, les comptes créés, et les profils clients enrichis. Vous pouvez également exporter vos données à tout moment pour créer des campagnes et ramener vos clients."
      },
      {
        question: "Est-ce que ça fonctionne sur mobile ?",
        answer: "Absolument. Wheelix est conçu en priorité pour mobile et fonctionne parfaitement sur les smartphones."
      },
      {
        question: "Les clients vont-ils faire tourner la roue à chaque fois ?",
        answer: "Non, chaque e-mail et numéro de téléphone ne peuvent être utilisés qu'une seule fois. Si un client essaie de tourner la roue avec les mêmes informations, cela ne fonctionnera pas. Cela garantit l'équité et la sécurité. Une fois qu'ils ont tourné la roue, ils doivent entrer leur prénom, et si nécessaire, vous pouvez toujours vérifier leur identité lorsqu'ils viennent réclamer leur prix."
      },
      {
        question: "Est-ce conforme au RGPD ?",
        answer: "Oui ! Nous veillons à ce que vous soyez conforme. Chaque client doit accepter vos conditions avant de soumettre ses informations."
      },
      {
        question: "Comment les clients réclament-ils leur prix ?",
        answer: "Lors de leur prochaine visite, les clients peuvent facilement réclamer leur lot. Il vous suffit de vous connecter à Wheelix, d'accéder à l'onglet \"Clients\", puis de retrouver la personne — soit directement, soit en effectuant une recherche par prénom, numéro de téléphone ou e-mail. Vous verrez immédiatement si un lot a été gagné, et lequel. Il ne vous reste plus qu'à le marquer comme \"pris\" grâce à notre fonctionnalité dédiée en un clic… et c'est terminé !"
      },
      {
        question: "Puis-je le traduire ?",
        answer: "Oui – à 100%. Tout le texte de l'application est modifiable, vous pouvez donc l'utiliser en français ou anglais."
      }
    ]
  }
};

const FAQAccordion = ({ question, answer, isActive, toggleAccordion, index }) => {
  const contentRef = useRef(null);
  const questionRef = useRef(null);
  const isInView = useInView(questionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          delay: index * 0.1,
          duration: 0.5 
        }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div
      ref={questionRef}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
    >
      <button
        className={`w-full p-5 text-left transition-colors flex justify-between items-center ${
          isActive ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={toggleAccordion}
      >
        <span className="text-lg font-medium text-gray-800">{question}</span>
        <ChevronDown 
          size={20} 
          className={`text-blue-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} 
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        <div className="p-5 text-gray-700 whitespace-pre-line">
          {answer}
        </div>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      headerControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
      });
    }
  }, [isInView, headerControls]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-16 bg-gray-50 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10">
        <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M165 50C165 63.807 153.807 75 140 75C126.193 75 115 63.807 115 50C115 36.193 126.193 25 140 25C153.807 25 165 36.193 165 50Z" fill="#3B82F6" opacity="0.2"/>
        </svg>
      </div>
      <div className="absolute bottom-40 right-10">
        <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 140C35 153.807 23.807 165 10 165C-3.80698 165 -15 153.807 -15 140C-15 126.193 -3.80698 115 10 115C23.807 115 35 126.193 35 140Z" fill="#3B82F6" opacity="0.2"/>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={headerControls}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <HelpCircle size={24} className="text-blue-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-xl text-gray-600">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="mt-12">
          {t.questions.map((faq, index) => (
            <FAQAccordion
              key={index}
              question={faq.question}
              answer={faq.answer}
              isActive={activeIndex === index}
              toggleAccordion={() => toggleAccordion(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 