import React from 'react';
import { StaggerContainer } from '../components/AnimationWrapper';
import { SectionHeading } from '../components/ui/AnimatedHeading';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { PineBranchPattern } from '../components/textures/PineBranches';
import { fadeInUp } from '../animations/variants';
import { motion } from 'framer-motion';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "This was the perfect family getaway! The kids loved the private beach and we enjoyed peaceful evenings by the fire pit. The cottage had everything we needed and more.",
      author: "Sarah Johnson",
      rating: 5,
      date: "August 2024"
    },
    {
      quote: "Waking up to the sunrise over the lake was magical. The cottage is beautifully maintained and the hosts thought of every detail. We can't wait to return!",
      author: "Michael Chen",
      rating: 5,
      date: "July 2024"
    },
    {
      quote: "As someone who works remotely, I appreciated the fast WiFi and peaceful environment. Took breaks kayaking on the lake - the perfect work-life balance!",
      author: "Emily Rodriguez",
      rating: 5,
      date: "September 2024"
    },
    {
      quote: "We hosted a small family reunion here and it was perfect. Plenty of space, great amenities, and the location couldn't be better. Highly recommend!",
      author: "David Thompson",
      rating: 5,
      date: "June 2024"
    }
  ];

  return (
    <section className="py-20 bg-morning-mist relative overflow-hidden">
      <PineBranchPattern animate={true} />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Guest Experiences"
          subtitle="See what our visitors have to say"
        />

        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          staggerDelay={0.2}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <TestimonialCard {...testimonial} index={index} />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Decorative quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p 
            className="text-3xl md:text-4xl font-amatic text-lake-blue"
            style={{ 
              fontFamily: 'var(--font-accent)',
              color: 'var(--color-primary-lakeBlue)'
            }}
          >
            "Where memories are made and stories begin"
          </p>
        </motion.div>
      </div>
    </section>
  );
};