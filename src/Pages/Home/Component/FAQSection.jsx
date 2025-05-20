import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';

// Translations object
const translations = {
  en: {
    sectionTitle: "Questions",
    sectionSubtitle: "and answers",
    introduction: "Here are some questions new users often ask when first getting their popup wheels setup.",
    contactText: "But if you have any other questions,",
    contactLinkText: "don't hesitate to contact us!",
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
    sectionTitle: "Questions",
    sectionSubtitle: "et réponses",
    introduction: "Voici quelques questions que les nouveaux utilisateurs posent souvent lors de la première configuration de leurs roues popup.",
    contactText: "Mais si vous avez d'autres questions,",
    contactLinkText: "n'hésitez pas à nous contacter !",
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

const FAQItem = ({ question, answer, isOpen, toggleOpen, index, isVisible }) => {
  return (
    <div 
      className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      <button 
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors duration-200"
        onClick={toggleOpen}
      >
        <span className="font-medium">{question}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ 
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: isOpen 
            ? 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out 0.1s' 
            : 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.1s ease-in-out'
        }}
      >
        <div className="px-6 py-4 bg-gray-50 whitespace-pre-wrap text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const [openItemIndex, setOpenItemIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleItem = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            {t.sectionTitle} <span className="font-normal text-gray-600">{t.sectionSubtitle}</span>
          </h2>
          
          <p className="text-gray-600 mt-8 mb-4 max-w-3xl mx-auto">
            {t.introduction}
          </p>
          
          <p className="text-gray-600">
            {t.contactText} <a href="#contact" className="text-blue-500 hover:underline">{t.contactLinkText}</a>
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {t.questions.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItemIndex === index}
              toggleOpen={() => toggleItem(index)}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 