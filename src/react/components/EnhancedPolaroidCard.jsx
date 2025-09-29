import React, { useState } from 'react';
import PolaroidFX from './PolaroidFX.jsx';

const EnhancedPolaroidCard = ({ 
  src, 
  title, 
  width = 240, 
  height = 300,
  rotation = 0,
  useWebGL = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    transform: `rotate(${rotation}deg) ${isHovered ? 'scale(1.05) translateY(-10px)' : 'scale(1)'}`,
    transformOrigin: 'center center',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    margin: '20px',
    display: 'inline-block'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="enhanced-polaroid-card"
    >
      <div className="polaroid-frame">
        {useWebGL ? (
          <PolaroidFX 
            src={src}
            width={width - 32} // Account for border
            height={height - 96} // Account for border + bottom space
            strength={0.85}
            grain={0.06}
            vignette={0.5}
          />
        ) : (
          <img 
            src={src} 
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        <div className="polaroid-caption">
          {title}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPolaroidCard;