import React, { useState } from 'react';
import PolaroidCardGL from './PolaroidCardGL.jsx';
import '../styles/EnhancedGloss.css';

// Image data for the gallery
const imageData = [
  { id: 1, src: '/stills/rum-river-farmhouse-01.jpg', title: 'Farmhouse Exterior', category: 'exterior' },
  { id: 2, src: '/stills/rum-river-farmhouse-02.jpg', title: 'Living Room', category: 'living' },
  { id: 3, src: '/stills/rum-river-farmhouse-03.jpg', title: 'Kitchen', category: 'kitchen' },
  { id: 4, src: '/stills/rum-river-farmhouse-04.jpg', title: 'Master Bedroom', category: 'bedroom' },
  { id: 5, src: '/stills/rum-river-farmhouse-05.jpg', title: 'Dining Area', category: 'living' },
  { id: 6, src: '/stills/rum-river-farmhouse-06.jpg', title: 'Guest Room', category: 'bedroom' }
];

function EnhancedGlossGallery() {
  const [filter, setFilter] = useState('all');
  const [displayedImages, setDisplayedImages] = useState(4);

  const categories = ['all', 'exterior', 'living', 'bedroom', 'kitchen'];
  
  const filteredImages = filter === 'all' 
    ? imageData 
    : imageData.filter(img => img.category === filter);
  
  const visibleImages = filteredImages.slice(0, displayedImages);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDisplayedImages(4);
  };

  const loadMore = () => {
    setDisplayedImages(filteredImages.length);
  };

  return (
    <div className="enhanced-gloss-gallery">
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

      {/* Gallery container with WebGL polaroids */}
      <div className="enhanced-gloss-container">
        {visibleImages.map((image, index) => {
          // Random rotations for natural scatter effect
          const rotation = (Math.random() * 12 - 6);
          
          return (
            <div 
              key={image.id} 
              className="polaroid-wrapper"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <PolaroidCardGL
                photo={image.src}
                frame=""
                lutSrc="/public/luts/polaroid.png"
                haldSize={16}
                lutStrength={0.85}
                gloss={0.65}
                specPower={80}
                fresnel={0.25}
                roll={0.32}
                streak={0.4}
                width={360}
                height={450}
                inset={{ t: 0.055, r: 0.055, b: 0.18, l: 0.055 }}
              />
              
              {/* Caption below the card */}
              <div className="polaroid-gl-caption">
                {image.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Load more button */}
      {displayedImages < filteredImages.length && (
        <button 
          className="load-more-btn" 
          onClick={loadMore}
        >
          View All Photos ({filteredImages.length - displayedImages} more)
        </button>
      )}

      {/* Technical note */}
      <div className="tech-note">
        <h3>Enhanced WebGL Polaroid Effects</h3>
        <p>
          These polaroids feature realistic gloss effects with anisotropic streaking, 
          Fresnel edge lighting, film grain, and authentic color grading. 
          Move your mouse over the cards to see the dynamic light reflections!
        </p>
      </div>
    </div>
  );
}

export default EnhancedGlossGallery;