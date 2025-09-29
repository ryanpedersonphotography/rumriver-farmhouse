"use client";

import React, { useEffect, useState } from 'react';

interface PinOverlayProps {
  variant?: number;
  imageWidth: number;
  imageHeight: number;
  onPinClick?: () => void;
}

// Pin variants configuration
// Since we have a 1024x1024 pins.png, we'll divide it into regions
// Assuming pins are arranged in a grid pattern
const PIN_GRID = {
  cols: 4,
  rows: 4,
  sourceSize: 1024,
};

const getPinPosition = (variant: number) => {
  const col = variant % PIN_GRID.cols;
  const row = Math.floor(variant / PIN_GRID.cols);
  const size = PIN_GRID.sourceSize / PIN_GRID.cols;
  
  return {
    x: col * size,
    y: row * size,
    size,
  };
};

export const PinOverlay: React.FC<PinOverlayProps> = ({
  variant = 0,
  imageWidth,
  imageHeight,
  onPinClick,
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  const maxVariants = PIN_GRID.cols * PIN_GRID.rows;

  // Calculate pin size based on image dimensions
  const calculatePinSize = () => {
    const avgDimension = (imageWidth + imageHeight) / 2;
    
    if (avgDimension < 200) {
      return { width: 20, height: 20, top: -10 };
    } else if (avgDimension < 400) {
      return { width: 30, height: 30, top: -15 };
    } else if (avgDimension < 600) {
      return { width: 40, height: 40, top: -20 };
    } else {
      return { width: 50, height: 50, top: -25 };
    }
  };

  const pinSize = calculatePinSize();
  const pinPos = getPinPosition(currentVariant % maxVariants);

  // Handle keyboard shortcut for cycling pins
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        setCurrentVariant((prev) => (prev + 1) % maxVariants);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [maxVariants]);

  // Handle URL parameter for pin variant
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pinParam = params.get('pin');
    if (pinParam) {
      const pinIndex = parseInt(pinParam, 10);
      if (!isNaN(pinIndex) && pinIndex >= 0 && pinIndex < maxVariants) {
        setCurrentVariant(pinIndex);
      }
    }
  }, [maxVariants]);

  return (
    <div
      className="pin-overlay"
      style={{
        position: 'absolute',
        top: `${pinSize.top}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${pinSize.width}px`,
        height: `${pinSize.height}px`,
        cursor: onPinClick ? 'pointer' : 'default',
        zIndex: 10,
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
      }}
      onClick={onPinClick}
      title={`Pin variant ${currentVariant + 1}`}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/pins.png)',
          backgroundPosition: `-${(pinPos.x / PIN_GRID.sourceSize) * pinSize.width * PIN_GRID.cols}px -${(pinPos.y / PIN_GRID.sourceSize) * pinSize.height * PIN_GRID.rows}px`,
          backgroundSize: `${pinSize.width * PIN_GRID.cols}px ${pinSize.height * PIN_GRID.rows}px`,
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
};

// Hook to manage pin cycling globally
export const usePinCycling = () => {
  const [globalPinVariant, setGlobalPinVariant] = useState(0);
  const maxVariants = PIN_GRID.cols * PIN_GRID.rows;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        setGlobalPinVariant((prev) => (prev + 1) % maxVariants);
        
        // Update URL parameter
        const url = new URL(window.location.href);
        url.searchParams.set('pin', String((globalPinVariant + 1) % maxVariants));
        window.history.replaceState({}, '', url.toString());
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [globalPinVariant, maxVariants]);

  useEffect(() => {
    // Initialize from URL parameter
    const params = new URLSearchParams(window.location.search);
    const pinParam = params.get('pin');
    if (pinParam) {
      const pinIndex = parseInt(pinParam, 10);
      if (!isNaN(pinIndex) && pinIndex >= 0 && pinIndex < maxVariants) {
        setGlobalPinVariant(pinIndex);
      }
    }
  }, [maxVariants]);

  return globalPinVariant;
};

export default PinOverlay;