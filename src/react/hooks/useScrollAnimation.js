import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const defaultOptions = {
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-50px',
    ...options
  };

  const isInView = useInView(ref, {
    amount: defaultOptions.threshold,
    once: defaultOptions.triggerOnce,
    margin: defaultOptions.rootMargin,
  });

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView: prefersReducedMotion ? true : isInView,
    hasAnimated,
    controls: prefersReducedMotion ? 'visible' : (isInView ? 'visible' : 'hidden')
  };
};

// Hook for parallax effects
export const useParallax = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const element = ref.current;
      const { top } = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = element.offsetHeight;
      
      // Calculate if element is in viewport
      if (top + elementHeight >= 0 && top <= windowHeight) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offsetY };
};

// Hook for counting animations
export const useCountAnimation = (endValue, duration = 2000, startValue = 0) => {
  const [count, setCount] = useState(startValue);
  const { ref, isInView } = useScrollAnimation({ triggerOnce: true });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      
      const startTime = Date.now();
      const timer = setInterval(() => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
        
        setCount(currentCount);
        
        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16); // 60fps

      return () => clearInterval(timer);
    }
  }, [isInView, hasStarted, endValue, startValue, duration]);

  return { ref, count };
};

// Hook for staggered animations
export const useStaggerAnimation = (itemCount, baseDelay = 0, staggerDelay = 0.1) => {
  const { ref, isInView } = useScrollAnimation();
  
  const getItemProps = (index) => ({
    initial: 'hidden',
    animate: isInView ? 'visible' : 'hidden',
    transition: {
      delay: baseDelay + (index * staggerDelay)
    }
  });

  return { ref, getItemProps, isInView };
};