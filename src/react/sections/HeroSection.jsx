import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, parallax } from '../animations/variants';
import { useParallax } from '../hooks/useScrollAnimation';
import { CTAButton } from '../components/ui/AnimatedButton';
import { LakeDepthPattern } from '../components/textures/TopographicPattern';

export const HeroSection = () => {
  const { ref: parallaxRef, offsetY } = useParallax(0.3);

  const heroImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ y: offsetY }}
      >
        <img
          src={heroImage}
          alt="Lake cottage view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lake-blue/30 via-transparent to-lake-blue/60" />
      </motion.div>

      {/* Lake depth pattern overlay */}
      <LakeDepthPattern opacity={0.1} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-7xl md:text-8xl font-bebas text-white mb-6 drop-shadow-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Escape to Serenity
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-white/90 mb-8 font-montserrat"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            Your perfect lakeside retreat awaits at Breezy Point
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTAButton size="large" icon="→">
              Book Your Stay
            </CTAButton>
            <CTAButton variant="outline" size="large">
              Virtual Tour
            </CTAButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};