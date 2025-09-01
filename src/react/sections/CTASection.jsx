import React from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '../components/ui/AnimatedButton';
import { LakeDepthPattern } from '../components/textures/TopographicPattern';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const CTASection = () => {
  const { ref, controls } = useScrollAnimation();

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, var(--color-primary-lakeBlue) 0%, var(--color-primary-lakeBlueDark) 100%)`
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={backgroundVariants}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 50%, var(--color-accent-campfireYellow) 0%, transparent 50%),
                        radial-gradient(circle at 70% 50%, var(--color-secondary-sunsetOrange) 0%, transparent 50%)`
          }}
        />
      </motion.div>

      <LakeDepthPattern opacity={0.1} />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={contentVariants}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <h2 
          className="text-5xl md:text-7xl font-bebas text-white mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Ready for Your Lake Adventure?
        </h2>
        
        <p 
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-montserrat"
          style={{ fontFamily: 'var(--font-subheading)' }}
        >
          Book your stay today and create unforgettable memories at our lakeside cottage
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CTAButton size="large" variant="primary" icon="→">
            Check Availability
          </CTAButton>
          <CTAButton size="large" variant="outline" className="border-white text-white hover:bg-white hover:text-lake-blue">
            Contact Hosts
          </CTAButton>
        </div>

        {/* Animated elements */}
        <div className="mt-12 flex justify-center space-x-8">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-4xl"
          >
            🏖️
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 3,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-4xl"
          >
            🚣
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-4xl"
          >
            🌅
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};