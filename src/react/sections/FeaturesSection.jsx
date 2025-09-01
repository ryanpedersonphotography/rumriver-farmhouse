import React from 'react';
import { motion } from 'framer-motion';
import { StaggerContainer } from '../components/AnimationWrapper';
import { SectionHeading } from '../components/ui/AnimatedHeading';
import { FeatureCard } from '../components/ui/FeatureCard';
import { WoodTextureOverlay } from '../components/textures/WoodTexture';
import { PineBranchDecoration } from '../components/textures/PineBranches';
import { fadeInUp } from '../animations/variants';

export const FeaturesSection = () => {
  const features = [
    {
      icon: '🏖️',
      title: 'Private Beach Access',
      description: 'Enjoy exclusive access to our pristine sandy beach with complimentary kayaks and paddleboards.'
    },
    {
      icon: '🔥',
      title: 'Lakeside Fire Pit',
      description: 'Gather around our stone fire pit for s\'mores and stories under the starlit sky.'
    },
    {
      icon: '🛏️',
      title: '4 Cozy Bedrooms',
      description: 'Sleep soundly in our comfortable beds with luxury linens and lake views.'
    },
    {
      icon: '🍳',
      title: 'Fully Equipped Kitchen',
      description: 'Cook memorable meals with modern appliances and all the amenities you need.'
    },
    {
      icon: '🌲',
      title: 'Nature Trails',
      description: 'Explore miles of scenic hiking trails right from your doorstep.'
    },
    {
      icon: '🚣',
      title: 'Water Activities',
      description: 'Free use of our canoes, fishing gear, and swimming dock.'
    }
  ];

  return (
    <WoodTextureOverlay opacity={0.03} className="py-20 bg-soft-sand relative">
      <PineBranchDecoration position="top-right" size="large" />
      
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Your Lakeside Amenities"
          subtitle="Everything you need for the perfect getaway"
        />

        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <FeatureCard {...feature} index={index} />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </WoodTextureOverlay>
  );
};