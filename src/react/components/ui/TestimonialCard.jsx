import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../../animations/variants';

export const TestimonialCard = ({ 
  quote, 
  author, 
  rating = 5,
  date,
  index = 0,
  className = '',
  ...props 
}) => {
  const isEven = index % 2 === 0;
  const slideVariant = isEven ? slideInLeft : slideInRight;

  const quoteMarkVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: { 
      opacity: 0.2, 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1 + 0.3,
        type: "spring",
        stiffness: 150
      }
    }
  };

  return (
    <motion.div
      variants={slideVariant}
      className={`relative bg-morning-mist rounded-lg p-8 shadow-md ${className}`}
      style={{ backgroundColor: 'var(--color-natural-morningMist)' }}
      {...props}
    >
      {/* Large decorative quote mark */}
      <motion.div
        variants={quoteMarkVariants}
        className="absolute top-4 left-4 text-6xl text-lake-blue font-amatic"
        style={{ 
          color: 'var(--color-primary-lakeBlue)',
          fontFamily: 'var(--font-accent)'
        }}
      >
        "
      </motion.div>

      {/* Rating stars */}
      {rating && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="flex mb-3"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.3 + i * 0.05,
                type: "spring",
                stiffness: 300
              }}
              className={`text-xl ${i < rating ? 'text-campfire-yellow' : 'text-gray-300'}`}
              style={{ color: i < rating ? 'var(--color-accent-campfireYellow)' : undefined }}
            >
              ★
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Quote text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.4 }}
        className="text-gray-700 mb-6 relative z-10 italic leading-relaxed"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {quote}
      </motion.p>

      {/* Author info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <p 
            className="font-montserrat font-semibold text-wood-brown"
            style={{ 
              fontFamily: 'var(--font-subheading)',
              color: 'var(--color-natural-woodBrown)'
            }}
          >
            {author}
          </p>
          {date && (
            <p className="text-sm text-gray-500">{date}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        <TestimonialCard {...testimonials[currentIndex]} index={0} />
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevTestimonial}
          className="p-2 rounded-full bg-lake-blue text-white"
          style={{ backgroundColor: 'var(--color-primary-lakeBlue)' }}
        >
          ←
        </motion.button>
        
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-sunset-orange w-8' : 'bg-gray-300'
            }`}
            style={{ 
              backgroundColor: index === currentIndex ? 'var(--color-secondary-sunsetOrange)' : undefined 
            }}
          />
        ))}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-lake-blue text-white"
          style={{ backgroundColor: 'var(--color-primary-lakeBlue)' }}
        >
          →
        </motion.button>
      </div>
    </div>
  );
};