import React from 'react';
import { StatisticsGrid } from '../components/ui/StatisticCounter';
import { WoodTextureOverlay } from '../components/textures/WoodTexture';
import { motion } from 'framer-motion';

export const StatisticsSection = () => {
  const statistics = [
    {
      endValue: 8,
      label: 'Guests',
      suffix: '+'
    },
    {
      endValue: 4,
      label: 'Bedrooms'
    },
    {
      endValue: 150,
      label: 'Feet of Shoreline',
      suffix: 'ft'
    },
    {
      endValue: 98,
      label: 'Guest Satisfaction',
      suffix: '%'
    }
  ];

  return (
    <WoodTextureOverlay opacity={0.05} className="py-16 bg-wood-brown/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 
            className="text-4xl font-bebas text-wood-brown mb-4"
            style={{ 
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-natural-woodBrown)'
            }}
          >
            By The Numbers
          </h3>
          <p 
            className="text-lg text-gray-600 font-montserrat"
            style={{ fontFamily: 'var(--font-subheading)' }}
          >
            Everything you need for the perfect lake retreat
          </p>
        </motion.div>

        <StatisticsGrid statistics={statistics} />
      </div>
    </WoodTextureOverlay>
  );
};