import React, { useState, useEffect } from 'react';
import EnhancedPolaroidCard from './EnhancedPolaroidCard.jsx';
import '../styles/EnhancedPolaroid.css';

// Same image data from the original gallery
const imageData = [
  { id: 1, src: '/stills/rum-river-farmhouse-25.jpg', category: 'amenity', title: 'Property Amenities' },
  { id: 2, src: '/stills/rum-river-farmhouse-24.jpg', category: 'living', title: 'Interior Details' },
  { id: 3, src: '/stills/rum-river-farmhouse-23.jpg', category: 'exterior', title: 'Landscape' },
  { id: 4, src: '/stills/rum-river-farmhouse-22.jpg', category: 'amenity', title: 'Farmhouse Features' },
  { id: 5, src: '/stills/rum-river-farmhouse-21.jpg', category: 'kitchen', title: 'Dining & Kitchen' },
  { id: 6, src: '/stills/rum-river-farmhouse-20.jpg', category: 'living', title: 'Gathering Space' },
  { id: 7, src: '/stills/rum-river-farmhouse-19.jpg', category: 'exterior', title: 'Outdoor Views' },
  { id: 8, src: '/stills/rum-river-farmhouse-18.jpg', category: 'bathroom', title: 'Guest Bath' },
  { id: 9, src: '/stills/rum-river-farmhouse-17.jpg', category: 'bedroom', title: 'Cozy Bedroom' },
  { id: 10, src: '/stills/rum-river-farmhouse-16.jpg', category: 'living', title: 'Common Area' },
  { id: 11, src: '/stills/rum-river-farmhouse-15.jpg', category: 'amenity', title: 'Special Features' },
  { id: 12, src: '/stills/rum-river-farmhouse-14.jpg', category: 'exterior', title: 'Property View' }
];

function EnhancedPolaroidGallery({ useWebGL = true }) {
  const [filter, setFilter] = useState('all');
  const [displayedImages, setDisplayedImages] = useState(8);
  const [showingAll, setShowingAll] = useState(false);

  const categories = ['all', 'exterior', 'living', 'bedroom', 'kitchen', 'bathroom', 'amenity'];
  
  const filteredImages = filter === 'all' 
    ? imageData 
    : imageData.filter(img => img.category === filter);
  
  const visibleImages = showingAll 
    ? filteredImages 
    : filteredImages.slice(0, displayedImages);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setDisplayedImages(8);
    setShowingAll(false);
  };

  const loadMore = () => {
    setShowingAll(true);
  };

  // Generate random rotations for natural scatter effect
  const getRandomRotation = () => (Math.random() * 12 - 6).toFixed(2);

  return (
    <div className="enhanced-polaroid-gallery">
      {/* Filter buttons */}
      <div className="gallery-filters" style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        marginBottom: '3rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => handleFilterChange(cat)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: filter === cat ? '#4a3c28' : 'rgba(250, 246, 240, 0.9)',
              color: filter === cat ? '#f5f1e8' : '#4a3c28',
              border: '2px solid rgba(139, 111, 71, 0.6)',
              borderRadius: '25px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'inherit',
              textTransform: 'uppercase',
              fontSize: '0.825rem',
              letterSpacing: '0.05em'
            }}
          >
            {cat === 'all' ? 'All Photos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery container with scattered layout */}
      <div className="enhanced-gallery-container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem',
        minHeight: '600px',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8dcc6 100%)',
        borderRadius: '12px'
      }}>
        {visibleImages.map((image, index) => (
          <EnhancedPolaroidCard
            key={image.id}
            src={image.src}
            title={image.title}
            rotation={getRandomRotation()}
            useWebGL={useWebGL}
          />
        ))}
      </div>

      {/* Load more button */}
      {!showingAll && displayedImages < filteredImages.length && (
        <button 
          className="load-more-btn" 
          onClick={loadMore}
          style={{
            display: 'block',
            margin: '3rem auto 0',
            padding: '1rem 2.5rem',
            backgroundColor: '#8B6F47',
            color: '#f5f1e8',
            border: '2px solid #8B6F47',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            fontFamily: 'inherit'
          }}
        >
          View All Photos
        </button>
      )}

      {/* Toggle WebGL */}
      <div style={{
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <label style={{
          fontSize: '0.9rem',
          color: '#6b5b47',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <input
            type="checkbox"
            checked={useWebGL}
            onChange={() => {}}
            style={{ marginRight: '0.5rem' }}
          />
          Enable Film Effects (WebGL)
        </label>
      </div>
    </div>
  );
}

export default EnhancedPolaroidGallery;