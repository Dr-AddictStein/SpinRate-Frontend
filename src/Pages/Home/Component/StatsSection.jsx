import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TrendingUp, Users, RotateCw, DollarSign } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

// Translations object
const translations = {
  en: {
    sectionTitle: "Proven Results",
    sectionDescription: "Our platform delivers measurable impact for businesses of all sizes",
    stats: [
      {
        value: "+300",
        description: "New Google Reviews per month"
      },
      {
        value: "x6",
        description: "Bring your customers back"
      },
      {
        value: "+85%",
        description: "Increase your customer database"
      },
      {
        value: "+10-20%",
        description: "Increase your revenue yearly"
      }
    ]
  },
  fr: {
    sectionTitle: "Résultats Prouvés",
    sectionDescription: "Notre plateforme offre un impact mesurable pour les entreprises de toutes tailles",
    stats: [
      {
        value: "+300",
        description: "Nouveaux avis Google par mois"
      },
      {
        value: "x6",
        description: "Fidélisez vos clients"
      },
      {
        value: "+85%",
        description: "Augmentez votre base de données clients"
      },
      {
        value: "+10-20%",
        description: "Augmentez votre chiffre d'affaires annuel"
      }
    ]
  }
};

const StatCard = ({ icon: Icon, value, description, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.2,
            ease: [0.25, 0.1, 0.25, 1.0]
          }
        }
      }}
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Icon with background */}
      <div className="mb-4 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
        <Icon size={24} />
      </div>
      
      {/* Value with animation */}
      <motion.h3 
        className="text-3xl font-bold text-gray-900 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
      >
        {value}
      </motion.h3>
      
      {/* Description */}
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const titleRef = useRef(null);
  const titleControls = useAnimation();
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  useEffect(() => {
    if (isTitleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, isTitleInView]);

  const stats = [
    {
      icon: TrendingUp,
      value: t.stats[0].value,
      description: t.stats[0].description
    },
    {
      icon: RotateCw,
      value: t.stats[1].value,
      description: t.stats[1].description
    },
    {
      icon: Users,
      value: t.stats[2].value,
      description: t.stats[2].description
    },
    {
      icon: DollarSign,
      value: t.stats[3].value,
      description: t.stats[3].description
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t.sectionDescription}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              description={stat.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 