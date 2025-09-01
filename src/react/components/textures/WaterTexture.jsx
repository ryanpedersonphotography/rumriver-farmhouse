import React from 'react';
import { motion } from 'framer-motion';

export const WaterTextureOverlay = ({ 
  opacity = 0.15, 
  animated = true,
  className = '' 
}) => {
  return (
    <div 
      className={`water-texture ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'overlay'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, transparent 40%, rgba(42, 77, 117, 0.1) 70%),
            radial-gradient(circle at 60% 70%, transparent 45%, rgba(58, 100, 145, 0.1) 75%),
            radial-gradient(circle at 80% 20%, transparent 35%, rgba(30, 58, 95, 0.1) 65%)
          `,
          filter: 'blur(2px)'
        }}
        animate={animated ? {
          x: [0, -20, 0],
          y: [0, 10, 0],
          scale: [1, 1.02, 1]
        } : {}}
        transition={{
          duration: 25,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(232, 243, 245, 0.03) 3px,
              rgba(232, 243, 245, 0.03) 6px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(232, 243, 245, 0.03) 3px,
              rgba(232, 243, 245, 0.03) 6px
            )
          `,
          transform: 'scale(1.5) rotate(45deg)'
        }}
        animate={animated ? {
          x: [0, 20, 0]
        } : {}}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity
        }}
      />
    </div>
  );
};

export const WaterRipples = ({ count = 3, animated = false }) => {
  const ripples = [];
  
  for (let i = 0; i < count; i++) {
    const cx = Math.random() * 300 + 50;
    const cy = Math.random() * 300 + 50;
    const baseRadius = Math.random() * 30 + 20;
    
    ripples.push({
      cx,
      cy,
      circles: [
        { r: baseRadius, opacity: 0.3, strokeWidth: 2 },
        { r: baseRadius + 20, opacity: 0.2, strokeWidth: 1.5 },
        { r: baseRadius + 40, opacity: 0.1, strokeWidth: 1 }
      ]
    });
  }

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <svg
        viewBox="0 0 400 400"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.5
        }}
      >
        <defs>
          <radialGradient id="waterRippleGradient">
            <stop offset="0%" stopColor="var(--color-primary-lakeBlue)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--color-primary-lakeBlue)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary-lakeBlue)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {ripples.map((ripple, index) => (
          <g key={index}>
            {ripple.circles.map((circle, i) => (
              <motion.circle
                key={i}
                cx={ripple.cx}
                cy={ripple.cy}
                r={circle.r}
                fill="none"
                stroke="url(#waterRippleGradient)"
                strokeWidth={circle.strokeWidth}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={animated ? {
                  opacity: [0, circle.opacity, 0],
                  scale: [0.8, 1.2, 1.4]
                } : {
                  opacity: circle.opacity
                }}
                transition={{
                  duration: 4,
                  delay: index * 0.5 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export const LakeWaterSection = ({ children, className = '' }) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        background: `linear-gradient(to bottom, 
          var(--color-natural-morningMist), 
          var(--color-primary-lakeBlueLight)
        )`
      }}
    >
      <WaterTextureOverlay opacity={0.1} />
      <WaterRipples count={4} animated={true} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};