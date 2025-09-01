import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const AnimationWrapper = ({ 
  children, 
  variant, 
  className = '',
  delay = 0,
  duration,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '-50px',
  ...props 
}) => {
  const { ref, controls } = useScrollAnimation({
    threshold,
    triggerOnce,
    rootMargin
  });

  // Allow custom transition overrides
  const customTransition = {
    delay,
    ...(duration && { duration })
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variant}
      className={className}
      transition={customTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Higher-order component for scroll animations
export const withScrollAnimation = (Component, animationVariant, options = {}) => {
  return React.forwardRef((props, forwardedRef) => {
    const { ref, controls } = useScrollAnimation(options);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={animationVariant}
      >
        <Component ref={forwardedRef} {...props} />
      </motion.div>
    );
  });
};

// Specialized wrappers for common patterns
export const FadeInSection = ({ children, ...props }) => (
  <AnimationWrapper
    variant={{
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
    {...props}
  >
    {children}
  </AnimationWrapper>
);

export const SlideInSection = ({ children, direction = 'left', ...props }) => {
  const variants = {
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    }
  };

  return (
    <AnimationWrapper
      variant={{
        ...variants[direction],
        visible: {
          ...variants[direction].visible,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }
      }}
      {...props}
    >
      {children}
    </AnimationWrapper>
  );
};

export const ScaleInSection = ({ children, ...props }) => (
  <AnimationWrapper
    variant={{
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }
    }}
    {...props}
  >
    {children}
  </AnimationWrapper>
);

// Stagger container for child animations
export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => {
  const { ref, controls } = useScrollAnimation(props);

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
            staggerChildren: staggerDelay,
            delayChildren: props.delay || 0.2
          }
        }
      }}
      className={props.className}
    >
      {children}
    </motion.div>
  );
};