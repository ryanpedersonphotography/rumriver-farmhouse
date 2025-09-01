import React from 'react';
import { motion } from 'framer-motion';

export const WaveDivider = ({ 
  type = 'gentle', 
  color,
  height = 60,
  flip = false,
  className = '',
  fromColor,
  toColor
}) => {
  const waveTypes = {
    gentle: "M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z",
    smooth: "M0,0 C400,120 800,0 1200,120 L1200,120 L0,120 Z",
    double: "M0,40 Q300,80 600,40 T1200,40 L1200,120 L0,120 Z",
    ripple: "M0,20 C200,60 400,20 600,40 C800,60 1000,20 1200,40 L1200,120 L0,120 Z",
    lake: "M0,40 C300,20 600,60 900,40 C1050,30 1100,50 1200,40 L1200,120 L0,120 Z",
    ocean: "M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
  };

  // Determine the appropriate color based on context
  const waveColor = color || (fromColor && toColor ? toColor : 'var(--color-primary-lakeBlue)');

  // Style object for background transition
  const backgroundStyle = fromColor ? {
    background: fromColor,
    marginTop: '-1px'
  } : {};

  return (
    <div 
      className={`wave-divider ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'rotate(180deg)' : 'none',
        ...backgroundStyle
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'relative',
          display: 'block',
          width: 'calc(100% + 1.3px)',
          height: `${height}px`
        }}
      >
        <path
          d={waveTypes[type] || waveTypes.gentle}
          fill={waveColor}
        />
      </svg>
    </div>
  );
};

export const AnimatedWave = ({ 
  color1 = 'var(--color-natural-morningMist)',
  color2 = 'var(--color-primary-lakeBlue)',
  speed = 20,
  height = 100
}) => {
  return (
    <div 
      className="wave-animated"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: `${height}px`,
        margin: '3rem 0'
      }}
    >
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          width: '200%',
          height: '100%'
        }}
        animate={{
          x: [0, -1200]
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <path
          d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 C1400,20 1600,100 1800,60 C2000,20 2200,100 2400,60 L2400,120 L0,120 Z"
          fill={color1}
          opacity="0.7"
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          width: '200%',
          height: '100%'
        }}
        animate={{
          x: [0, -1200]
        }}
        transition={{
          x: {
            duration: speed * 1.5,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        <path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 C1400,100 1600,20 1800,60 C2000,100 2200,20 2400,60 L2400,120 L0,120 Z"
          fill={color2}
          opacity="0.5"
        />
      </motion.svg>
    </div>
  );
};

export const GradientWave = ({ 
  gradientId = 'waveGradient',
  colors = ['var(--color-natural-morningMist)', 'var(--color-primary-lakeBlue)'],
  type = 'gentle',
  ...props 
}) => {
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                style={{ stopColor: color, stopOpacity: 1 }}
              />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <WaveDivider {...props} type={type} color={`url(#${gradientId})`} />
    </>
  );
};

// Preset wave dividers for common use cases
export const LakeWave = (props) => (
  <WaveDivider type="lake" color="var(--color-primary-lakeBlue)" animated {...props} />
);

export const SunsetWave = (props) => (
  <GradientWave 
    gradientId="sunsetWave"
    colors={[
      'var(--color-secondary-sunsetOrange)',
      'var(--color-accent-campfireYellow)',
      'var(--color-secondary-sunsetOrangeLight)'
    ]}
    type="smooth"
    {...props}
  />
);

export const MorningMistWave = (props) => (
  <WaveDivider type="gentle" color="var(--color-natural-morningMist)" {...props} />
);

export const WoodWave = (props) => (
  <WaveDivider type="ripple" color="var(--color-natural-woodBrown)" {...props} />
);