import React from 'react';
import { motion } from 'framer-motion';

export const TopographicPattern = ({ animated = false, color = '#1e3a5f', opacity = 0.1 }) => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    }
  };

  const Path = ({ d, delay = 0 }) =>
    animated ? (
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="0.5"
        fill="none"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay }}
      />
    ) : (
      <path d={d} stroke={color} strokeWidth="0.5" fill="none" />
    );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="topographic"
          x="0"
          y="0"
          width="400"
          height="300"
          patternUnits="userSpaceOnUse"
        >
          {/* Elevation lines */}
          <Path d="M50,150 Q100,140 150,150 T250,150 Q300,140 350,150" delay={0} />
          <Path d="M40,160 Q100,150 160,160 T260,160 Q320,150 360,160" delay={0.1} />
          <Path d="M30,170 Q100,160 170,170 T270,170 Q340,160 370,170" delay={0.2} />
          <Path d="M20,180 Q100,170 180,180 T280,180 Q360,170 380,180" delay={0.3} />
          <Path d="M10,190 Q100,180 190,190 T290,190 Q380,180 390,190" delay={0.4} />
          
          {/* Lake depth contours */}
          <ellipse cx="200" cy="100" rx="80" ry="40" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
          <ellipse cx="200" cy="100" rx="60" ry="30" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4" />
          <ellipse cx="200" cy="100" rx="40" ry="20" stroke={color} strokeWidth="0.5" fill="none" opacity="0.5" />
          <ellipse cx="200" cy="100" rx="20" ry="10" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6" />
          
          {/* Additional terrain features */}
          <Path d="M100,50 Q150,40 200,50 T300,50" delay={0.5} />
          <Path d="M120,250 Q170,240 220,250 T320,250" delay={0.6} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topographic)" />
    </svg>
  );
};

export const LakeDepthPattern = ({ opacity = 0.1 }) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="lakeGradient">
          <stop offset="0%" stopColor="#e8f3f5" />
          <stop offset="30%" stopColor="#3a6491" />
          <stop offset="60%" stopColor="#2a4d75" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </radialGradient>
      </defs>
      {/* Lake shape with depth gradient */}
      <path
        d="M100,200 Q150,100 250,150 Q350,200 300,300 Q200,350 100,300 Q50,200 100,200"
        fill="url(#lakeGradient)"
        opacity="0.3"
      />
      {/* Depth contour lines */}
      <path
        d="M120,220 Q180,140 230,180 Q280,220 250,280 Q200,310 150,280 Q100,220 120,220"
        stroke="#1e3a5f"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M140,230 Q180,170 210,200 Q240,230 220,260 Q200,280 170,260 Q140,230 140,230"
        stroke="#1e3a5f"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M160,235 Q180,195 200,220 Q220,235 210,250 Q200,260 180,250 Q160,235 160,235"
        stroke="#1e3a5f"
        strokeWidth="0.5"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
};