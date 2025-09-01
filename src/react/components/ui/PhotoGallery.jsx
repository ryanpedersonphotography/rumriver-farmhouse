import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scaleIn } from '../../animations/variants';
import { useStaggerAnimation } from '../../hooks/useScrollAnimation';

export const PhotoGallery = ({ images, columns = 3 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, getItemProps } = useStaggerAnimation(images.length);

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <>
      <div 
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            {...getItemProps(index)}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05, 
              zIndex: 10,
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
            className="relative overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-lake-blue/80 to-transparent flex items-end p-4"
            >
              <div className="text-white">
                <h4 className="font-montserrat font-semibold">{image.title}</h4>
                {image.description && (
                  <p className="text-sm opacity-90">{image.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage.src}
              alt={selectedImage.alt}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const MasonryGallery = ({ images }) => {
  const { ref, getItemProps } = useStaggerAnimation(images.length, 0, 0.05);

  return (
    <div ref={ref} className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          {...getItemProps(index)}
          variants={scaleIn}
          className="mb-4 break-inside-avoid"
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
            className="w-full rounded-lg cursor-pointer"
            loading="lazy"
          />
        </motion.div>
      ))}
    </div>
  );
};

export const FilterableGallery = ({ images, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <div>
      {/* Filter buttons */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FilterButton
          active={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        >
          All
        </FilterButton>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </motion.div>

      {/* Animated gallery */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <PhotoGallery images={filteredImages} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const FilterButton = ({ children, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full font-montserrat transition-all ${
      active 
        ? 'bg-sunset-orange text-white' 
        : 'bg-morning-mist text-gray-700 hover:bg-gray-200'
    }`}
    style={{ 
      backgroundColor: active ? 'var(--color-secondary-sunsetOrange)' : 'var(--color-natural-morningMist)',
      fontFamily: 'var(--font-subheading)'
    }}
  >
    {children}
  </motion.button>
);