// Natural, serene animation variants for lake cottage theme

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // Custom easing for natural movement
    }
  }
};

export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const rotateIn = {
  hidden: { 
    opacity: 0, 
    rotate: -5,
    y: 50 
  },
  visible: { 
    opacity: 1, 
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Gentle floating animation (like leaves on water)
export const float = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Ripple effect (like water)
export const ripple = {
  hidden: { 
    opacity: 0,
    scale: 0.9
  },
  visible: { 
    opacity: [0, 1, 1, 0],
    scale: [0.9, 1, 1.1, 1.2],
    transition: {
      duration: 2,
      times: [0, 0.2, 0.5, 1],
      ease: "easeOut"
    }
  }
};

// Container variants for staggered animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Draw SVG path animation
export const drawPath = {
  hidden: { 
    pathLength: 0,
    opacity: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { 
        duration: 2, 
        ease: "easeInOut" 
      },
      opacity: { 
        duration: 0.01 
      }
    }
  }
};

// Parallax-style animation
export const parallax = {
  hidden: { 
    y: -50,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Gentle wave animation
export const wave = {
  hidden: { 
    x: -20,
    opacity: 0 
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1]
    }
  }
};

// Slide and fade animations for testimonials
export const slideInLeft = {
  hidden: { 
    x: -100,
    opacity: 0 
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export const slideInRight = {
  hidden: { 
    x: 100,
    opacity: 0 
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Pulse animation for CTAs
export const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 1,
    repeat: Infinity,
    repeatDelay: 2
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

export const hoverFloat = {
  y: -5,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};