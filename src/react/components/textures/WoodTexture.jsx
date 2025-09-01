import React from 'react';

export const WoodTexturePattern = ({ opacity = 0.05, className = '' }) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="woodGrain"
          x="0"
          y="0"
          width="200"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <rect width="200" height="200" fill="#8b6f47" />
          {/* Wood grain lines */}
          <path
            d="M0,20 Q50,15 100,20 T200,20 M0,40 Q50,35 100,40 T200,40 M0,60 Q50,55 100,60 T200,60 M0,80 Q50,75 100,80 T200,80 M0,100 Q50,95 100,100 T200,100 M0,120 Q50,115 100,120 T200,120 M0,140 Q50,135 100,140 T200,140 M0,160 Q50,155 100,160 T200,160 M0,180 Q50,175 100,180 T200,180"
            stroke="#6d5738"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M0,30 Q60,25 120,30 T200,30 M0,70 Q60,65 120,70 T200,70 M0,110 Q60,105 120,110 T200,110 M0,150 Q60,145 120,150 T200,150 M0,190 Q60,185 120,190 T200,190"
            stroke="#a68860"
            strokeWidth="0.3"
            fill="none"
            opacity="0.2"
          />
          {/* Wood knots */}
          <circle cx="50" cy="50" r="8" fill="#6d5738" opacity="0.2" />
          <circle cx="150" cy="130" r="6" fill="#6d5738" opacity="0.2" />
          <circle cx="80" cy="170" r="5" fill="#6d5738" opacity="0.15" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#woodGrain)" />
    </svg>
  );
};

export const WoodTextureOverlay = ({ children, opacity = 0.05, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <WoodTexturePattern opacity={opacity} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};