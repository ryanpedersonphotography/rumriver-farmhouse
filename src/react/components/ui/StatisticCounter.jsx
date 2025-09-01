import React from 'react';
import { motion } from 'framer-motion';
import { useCountAnimation } from '../../hooks/useScrollAnimation';

export const StatisticCounter = ({ 
  endValue, 
  label, 
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
  ...props 
}) => {
  const { ref, count } = useCountAnimation(endValue, duration);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <motion.div
        className="text-5xl md:text-6xl font-bebas text-lake-blue mb-2"
        style={{ 
          fontFamily: 'var(--font-heading)',
          color: 'var(--color-primary-lakeBlue)'
        }}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 0.2
        }}
      >
        {prefix}{count}{suffix}
      </motion.div>
      
      <motion.p
        className="text-lg font-montserrat text-gray-600"
        style={{ fontFamily: 'var(--font-subheading)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export const StatisticsGrid = ({ statistics }) => {
  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {statistics.map((stat, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }
          }}
        >
          <StatisticCounter {...stat} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export const AnimatedPercentage = ({ value, label, color = 'var(--color-primary-lakeBlue)' }) => {
  const { ref, count } = useCountAnimation(value, 1500);
  
  return (
    <div ref={ref} className="relative">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="var(--color-natural-morningMist)"
          strokeWidth="12"
          fill="none"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="56"
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: count / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            strokeDasharray: `${2 * Math.PI * 56}`,
            strokeDashoffset: 0
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div 
            className="text-3xl font-bebas text-lake-blue"
            style={{ 
              fontFamily: 'var(--font-heading)',
              color
            }}
          >
            {count}%
          </div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};