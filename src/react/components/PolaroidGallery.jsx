import React, { useState, useEffect } from 'react';
import PolaroidFX from './PolaroidFX.jsx';

// Same image data from the original gallery
const imageData = [
  { id: 1, src: '/stills/rum-river-farmhouse-25.jpg', category: 'amenity', title: 'Property Amenities', description: 'Everything you need for a perfect stay' },
  { id: 2, src: '/stills/rum-river-farmhouse-24.jpg', category: 'living', title: 'Interior Details', description: 'Farmhouse style interior design' },
  { id: 3, src: '/stills/rum-river-farmhouse-23.jpg', category: 'exterior', title: 'Landscape', description: 'Beautiful natural landscaping' },
  { id: 4, src: '/stills/rum-river-farmhouse-22.jpg', category: 'amenity', title: 'Farmhouse Features', description: 'Special touches throughout' },
  { id: 5, src: '/stills/rum-river-farmhouse-21.jpg', category: 'kitchen', title: 'Dining & Kitchen', description: 'Open concept kitchen and dining' },
  { id: 6, src: '/stills/rum-river-farmhouse-20.jpg', category: 'living', title: 'Gathering Space', description: 'Perfect for family and friends' },
  { id: 7, src: '/stills/rum-river-farmhouse-19.jpg', category: 'exterior', title: 'Outdoor Views', description: 'Natural beauty surrounding the farmhouse' },
  { id: 8, src: '/stills/rum-river-farmhouse-18.jpg', category: 'bathroom', title: 'Guest Bath', description: 'Additional bathroom facilities' },
  { id: 9, src: '/stills/rum-river-farmhouse-17.jpg', category: 'bedroom', title: 'Cozy Bedroom', description: 'Another comfortable sleeping space' },
  { id: 10, src: '/stills/rum-river-farmhouse-16.jpg', category: 'living', title: 'Common Area', description: 'Welcoming common spaces' },
  { id: 11, src: '/stills/rum-river-farmhouse-15.jpg', category: 'amenity', title: 'Special Features', description: 'Unique farmhouse amenities' },
  { id: 12, src: '/stills/rum-river-farmhouse-14.jpg', category: 'exterior', title: 'Property View', description: 'Scenic views of the surrounding property' },
  { id: 13, src: '/stills/rum-river-farmhouse-13.jpg', category: 'living', title: 'Living Space', description: 'Open and airy living area' },
  { id: 14, src: '/stills/rum-river-farmhouse-12.jpg', category: 'bedroom', title: 'Bedroom', description: 'Peaceful bedroom retreat' },
  { id: 15, src: '/stills/rum-river-farmhouse-11.jpg', category: 'kitchen', title: 'Kitchen Details', description: 'Thoughtfully designed kitchen features' },
  { id: 16, src: '/stills/rum-river-farmhouse-10.jpg', category: 'living', title: 'Family Room', description: 'Comfortable family gathering space' },
  { id: 17, src: '/stills/rum-river-farmhouse-09.jpg', category: 'amenity', title: 'Outdoor Space', description: 'Relaxing outdoor seating area' },
  { id: 18, src: '/stills/rum-river-farmhouse-08.jpg', category: 'exterior', title: 'Backyard View', description: 'Beautiful backyard with natural surroundings' },
  { id: 19, src: '/stills/rum-river-farmhouse-07.jpg', category: 'living', title: 'Dining Area', description: 'Spacious dining area perfect for gatherings' },
  { id: 20, src: '/stills/rum-river-farmhouse-06.jpg', category: 'bathroom', title: 'Bathroom', description: 'Clean and modern bathroom facilities' },
  { id: 21, src: '/stills/rum-river-farmhouse-05.jpg', category: 'bedroom', title: 'Guest Bedroom', description: 'Inviting guest bedroom with warm decor' },
  { id: 22, src: '/stills/rum-river-farmhouse-04.jpg', category: 'bedroom', title: 'Master Bedroom', description: 'Comfortable master bedroom with rustic touches' },
  { id: 23, src: '/stills/rum-river-farmhouse-03.jpg', category: 'kitchen', title: 'Kitchen', description: 'Modern farmhouse kitchen with quality appliances' },
  { id: 24, src: '/stills/rum-river-farmhouse-02.jpg', category: 'living', title: 'Living Room', description: 'Cozy living space with farmhouse charm' },
  { id: 25, src: '/stills/rum-river-farmhouse-01.jpg', category: 'exterior', title: 'Farmhouse Exterior', description: 'Charming farmhouse with welcoming front entrance' }
];

function PolaroidGallery() {
  const [filter, setFilter] = useState('all');
  const [displayedImages, setDisplayedImages] = useState(12);
  const [showingAll, setShowingAll] = useState(false);

  // Setup animation observer
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Set up intersection observer for polaroid animations
      const elements = document.querySelectorAll('.polaroid-item[data-animate]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add staggered delay for each card
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 50);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      });
      
      elements.forEach(el => observer.observe(el));
      
      // Cleanup
      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    }, 100);
    
    return () => clearTimeout(timer);
  }, [filter, displayedImages, showingAll]); // Re-run when images change

  const categories = ['all', 'exterior', 'living', 'bedroom', 'kitchen', 'bathroom', 'amenity'];
  
  const filteredImages = filter === 'all' 
    ? imageData 
    : imageData.filter(img => img.category === filter);
  
  const visibleImages = showingAll 
    ? filteredImages 
    : filteredImages.slice(0, displayedImages);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDisplayedImages(12);
    setShowingAll(false);
  };

  const loadMore = () => {
    setShowingAll(true);
  };

  // Random rotation for each polaroid (-3 to 3 degrees)
  const getRandomRotation = () => (Math.random() * 6 - 3).toFixed(2);
  
  // Random pin position (45% to 55% from left)
  const getRandomPinPosition = () => 45 + Math.random() * 10;
  
  // Random pin rotation (-15 to 15 degrees) 
  const getRandomPinRotation = () => (Math.random() * 30 - 15).toFixed(0);

  return (
    <div className="polaroid-gallery">
      {/* Filter buttons */}
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat === 'all' ? 'All Photos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="polaroid-grid">
        {visibleImages.map((image, index) => {
          const cardRotation = getRandomRotation();
          const pinPosition = getRandomPinPosition();
          const pinRotation = getRandomPinRotation();
          
          return (
            <div
              key={image.id}
              className="polaroid-item"
              data-animate={index % 2 === 0 ? "fade-left" : "fade-right"}
              style={{
                '--card-rotation': `${cardRotation}deg`,
                '--pin-position': `${pinPosition}%`,
                '--pin-rotation': `${pinRotation}deg`,
                '--index': index,
                cursor: 'pointer'
              }}
              onClick={() => {
                // Dispatch custom event for vanilla JS lightbox
                window.dispatchEvent(new CustomEvent('openLightbox', {
                  detail: {
                    index: index,
                    images: filteredImages
                  }
                }));
              }}
            >
              {/* Pushpin */}
              <div className="polaroid-pin"></div>
              
              {/* Polaroid card with normal image for now */}
              <div className="polaroid-card">
                <img 
                  src={image.src}
                  alt={image.title}
                  className="polaroid-image"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Load more button */}
      {!showingAll && displayedImages < filteredImages.length && (
        <button className="load-more-btn" onClick={loadMore}>
          View All
        </button>
      )}
    </div>
  );
}

export default PolaroidGallery;