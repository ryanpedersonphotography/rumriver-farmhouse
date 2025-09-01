import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { drawPath } from '../../animations/variants';

export const AnimatedHeading = ({ 
  children, 
  level = 'h2',
  underline = true,
  className = '',
  ...props 
}) => {
  const { ref, controls } = useScrollAnimation();
  const Tag = level;

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div ref={ref} className="relative inline-block">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={headingVariants}
      >
        <Tag 
          className={`font-bebas text-wood-brown ${className}`}
          style={{ fontFamily: 'var(--font-heading)' }}
          {...props}
        >
          {children}
        </Tag>
      </motion.div>
      
      {underline && (
        <motion.svg
          className="absolute -bottom-2 left-0 w-full h-4"
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          initial="hidden"
          animate={controls}
        >
          <motion.path
            d="M0,10 Q50,5 100,10 T200,10"
            stroke="var(--color-accent-campfireYellow)"
            strokeWidth="3"
            fill="none"
            variants={drawPath}
          />
        </motion.svg>
      )}
    </div>
  );
};

export const SectionHeading = ({ title, subtitle, centered = true, ...props }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
      {...props}
    >
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        className="text-5xl md:text-6xl font-bebas text-wood-brown mb-4"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-lg md:text-xl text-gray-600 font-montserrat"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};