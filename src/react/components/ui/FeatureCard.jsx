import React from 'react';
import { motion } from 'framer-motion';
import { rotateIn, hoverScale } from '../../animations/variants';

export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index = 0,
  className = '',
  ...props 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotate: -5 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180 
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1 + 0.3,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={hoverScale}
      className={`bg-soft-sand rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl ${className}`}
      style={{ backgroundColor: 'var(--color-natural-softSand)' }}
      {...props}
    >
      <motion.div
        variants={iconVariants}
        className="w-16 h-16 mb-4 text-forest-green"
        style={{ color: 'var(--color-natural-forestGreen)' }}
      >
        {typeof icon === 'string' ? (
          <span className="text-4xl">{icon}</span>
        ) : (
          icon
        )}
      </motion.div>
      
      <h3 
        className="text-2xl font-montserrat font-semibold mb-3 text-wood-brown"
        style={{ 
          fontFamily: 'var(--font-subheading)',
          color: 'var(--color-natural-woodBrown)'
        }}
      >
        {title}
      </h3>
      
      <p 
        className="text-gray-600 leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {description}
      </p>
    </motion.div>
  );
};

export const IconFeature = ({ icon, text, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-center space-x-3"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.4, 
          delay: delay + 0.2,
          type: "spring",
          stiffness: 300
        }}
        className="text-2xl text-sunset-orange"
        style={{ color: 'var(--color-secondary-sunsetOrange)' }}
      >
        {icon}
      </motion.div>
      <span className="text-gray-700" style={{ fontFamily: 'var(--font-body)' }}>
        {text}
      </span>
    </motion.div>
  );
};