import React from 'react';
import { motion } from 'framer-motion';

export const PineBranchPattern = ({ animate = false }) => {
  const branchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const Branch = ({ d, ...props }) => 
    animate ? (
      <motion.path
        d={d}
        variants={branchVariants}
        initial="hidden"
        animate="visible"
        {...props}
      />
    ) : (
      <path d={d} {...props} />
    );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="pineBranches"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          {/* Pine branch 1 */}
          <g transform="translate(50, 50) rotate(-15)">
            <Branch
              d="M0,0 L40,0"
              stroke="#2d5016"
              strokeWidth="2"
              fill="none"
            />
            {/* Needles */}
            <Branch
              d="M5,-5 L10,0 L5,5 M15,-5 L20,0 L15,5 M25,-5 L30,0 L25,5 M35,-5 L40,0 L35,5"
              stroke="#3d6a1f"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* Pine branch 2 */}
          <g transform="translate(150, 100) rotate(25)">
            <Branch
              d="M0,0 L35,0"
              stroke="#2d5016"
              strokeWidth="2"
              fill="none"
            />
            <Branch
              d="M5,-5 L10,0 L5,5 M15,-5 L20,0 L15,5 M25,-5 L30,0 L25,5"
              stroke="#3d6a1f"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* Pine branch 3 */}
          <g transform="translate(100, 150) rotate(-45)">
            <Branch
              d="M0,0 L45,0"
              stroke="#2d5016"
              strokeWidth="2"
              fill="none"
            />
            <Branch
              d="M5,-5 L10,0 L5,5 M15,-5 L20,0 L15,5 M25,-5 L30,0 L25,5 M35,-5 L40,0 L35,5"
              stroke="#3d6a1f"
              strokeWidth="1"
              fill="none"
            />
          </g>

          {/* Pine cone */}
          <g transform="translate(80, 80)">
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="#6d5738" opacity="0.6" />
            <ellipse cx="0" cy="-2" rx="6" ry="4" fill="#8b6f47" opacity="0.4" />
            <ellipse cx="0" cy="2" rx="6" ry="4" fill="#8b6f47" opacity="0.4" />
            <ellipse cx="0" cy="6" rx="4" ry="3" fill="#8b6f47" opacity="0.4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pineBranches)" opacity="0.1" />
    </svg>
  );
};

export const PineBranchDecoration = ({ position = 'top-right', size = 'medium' }) => {
  const sizes = {
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-48 h-48'
  };

  const positions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  return (
    <motion.div
      className={`absolute ${positions[position]} ${sizes[size]} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g transform="translate(20, 20)">
          <path
            d="M0,0 L60,20"
            stroke="#2d5016"
            strokeWidth="3"
            fill="none"
          />
          {/* Needles */}
          <path
            d="M10,-5 L15,0 L10,5 M20,-5 L25,0 L20,5 M30,-5 L35,0 L30,5 M40,-5 L45,0 L40,5 M50,-5 L55,0 L50,5"
            stroke="#3d6a1f"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Secondary branch */}
          <path
            d="M30,10 L45,25"
            stroke="#2d5016"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M32,15 L35,18 L32,21 M38,18 L41,21 L38,24"
            stroke="#3d6a1f"
            strokeWidth="1"
            fill="none"
          />
        </g>
      </svg>
    </motion.div>
  );
};