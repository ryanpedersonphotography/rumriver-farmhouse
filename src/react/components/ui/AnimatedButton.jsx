import React from 'react';
import { motion } from 'framer-motion';
import { pulse } from '../../animations/variants';

export const AnimatedButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  animated = true,
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-montserrat font-semibold rounded-full transition-all duration-300 transform';
  
  const variants = {
    primary: `bg-sunset-orange text-white hover:bg-sunset-orange-dark shadow-lg hover:shadow-xl`,
    secondary: `bg-lake-blue text-white hover:bg-lake-blue-dark shadow-lg hover:shadow-xl`,
    outline: `border-2 border-sunset-orange text-sunset-orange hover:bg-sunset-orange hover:text-white`,
    ghost: `text-lake-blue hover:bg-morning-mist`
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const buttonStyles = {
    backgroundColor: variant === 'primary' ? 'var(--color-secondary-sunsetOrange)' : 
                     variant === 'secondary' ? 'var(--color-primary-lakeBlue)' : undefined,
    fontFamily: 'var(--font-subheading)'
  };

  const ButtonComponent = animated ? motion.button : 'button';
  const animationProps = animated ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    animate: pulse
  } : {};

  return (
    <ButtonComponent
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={buttonStyles}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
};

export const CTAButton = ({ children, icon, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatedButton {...props}>
        {children}
        {icon && (
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            {icon}
          </motion.span>
        )}
      </AnimatedButton>
    </motion.div>
  );
};

export const FloatingActionButton = ({ icon, onClick, className = '' }) => {
  return (
    <motion.button
      className={`fixed bottom-8 right-8 w-14 h-14 bg-campfire-yellow text-lake-blue rounded-full shadow-xl flex items-center justify-center ${className}`}
      style={{ 
        backgroundColor: 'var(--color-accent-campfireYellow)',
        color: 'var(--color-primary-lakeBlue)'
      }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  );
};