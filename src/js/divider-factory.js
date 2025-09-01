/**
 * Divider Factory - Helper functions for creating section dividers
 */

export const dividerShapes = {
  curveConcave: {
    viewBox: '0 0 1200 100',
    path: 'M0,0 L0,40 C400,80 800,80 1200,40 L1200,100 L0,100 Z'
  },
  curveConcaveGentle: {
    viewBox: '0 0 1200 60',
    path: 'M0,0 L0,20 C400,40 800,40 1200,20 L1200,60 L0,60 Z'
  },
  curveConcaveSteep: {
    viewBox: '0 0 1200 140',
    path: 'M0,0 L0,60 C400,120 800,120 1200,60 L1200,140 L0,140 Z'
  },
  curveConvex: {
    viewBox: '0 0 1200 100',
    path: 'M0,100 L0,60 C400,20 800,20 1200,60 L1200,0 L0,0 Z'
  },
  curveConvexGentle: {
    viewBox: '0 0 1200 60',
    path: 'M0,60 L0,40 C400,20 800,20 1200,40 L1200,0 L0,0 Z'
  },
  curveConvexSteep: {
    viewBox: '0 0 1200 140',
    path: 'M0,140 L0,80 C400,20 800,20 1200,80 L1200,0 L0,0 Z'
  },
  diagonal: {
    viewBox: '0 0 1200 60',
    path: 'M0,0 L1200,60 L1200,60 L0,60 Z'
  },
  jagged: {
    viewBox: '0 0 1200 40',
    path: 'M0,20 L150,0 L300,20 L450,0 L600,20 L750,0 L900,20 L1050,0 L1200,20 L1200,40 L0,40 Z'
  },
  arrow: {
    viewBox: '0 0 1200 80',
    path: 'M0,0 L600,60 L1200,0 L1200,80 L0,80 Z'
  },
  torn: {
    viewBox: '0 0 1200 30',
    path: 'M0,5 L50,8 L100,3 L150,7 L200,4 L250,9 L300,5 L350,8 L400,3 L450,7 L500,4 L550,9 L600,5 L650,8 L700,3 L750,7 L800,4 L850,9 L900,5 L950,8 L1000,3 L1050,7 L1100,4 L1150,9 L1200,5 L1200,30 L0,30 Z'
  },
  cloud: {
    viewBox: '0 0 1200 120',
    path: 'M0,60 C100,20 200,20 300,60 C400,100 500,100 600,60 C700,20 800,20 900,60 C1000,100 1100,100 1200,60 L1200,120 L0,120 Z'
  },
  step: {
    viewBox: '0 0 1200 50',
    path: 'M0,0 L0,25 L300,25 L300,0 L600,0 L600,25 L900,25 L900,0 L1200,0 L1200,50 L0,50 Z'
  },
  curveDouble: {
    viewBox: '0 0 1200 100',
    path: 'M0,20 C200,0 400,40 600,20 C800,0 1000,40 1200,20 L1200,100 L0,100 Z'
  }
};

/**
 * Create a divider element
 * @param {Object} options - Configuration options
 * @param {string} options.shape - Shape name from dividerShapes (e.g., 'curveConcave', 'curveConcaveGentle')
 * @param {string} options.position - 'top' or 'bottom'
 * @param {string} options.fillColor - Color variable name (e.g., 'mist', 'pearl')
 * @param {boolean} options.flipHorizontal - Flip horizontally
 * @param {boolean} options.flipVertical - Flip vertically
 * @param {boolean} options.stacked - For stacked dividers
 * @returns {HTMLElement} The divider element
 */
export function createDivider(options = {}) {
  const {
    shape = 'curveConcave',
    position = 'bottom',
    fillColor = 'white',
    flipHorizontal = false,
    flipVertical = false,
    stacked = false
  } = options;

  const shapeData = dividerShapes[shape];
  if (!shapeData) {
    console.error(`Unknown divider shape: ${shape}`);
    return null;
  }

  // Create the divider container
  const divider = document.createElement('div');
  const classes = ['divider'];
  
  // Position class
  if (stacked) {
    classes.push('divider--bottom-stacked');
  } else {
    classes.push(`divider--${position}`);
  }
  
  // Shape class - convert camelCase to kebab-case
  const shapeClass = shape.replace(/([A-Z])/g, '-$1').toLowerCase();
  classes.push(`divider--${shapeClass}`);
  
  // Fill color class
  classes.push(`divider--fill-${fillColor}`);
  
  // Flip classes
  if (flipHorizontal) classes.push('divider--flip-horizontal');
  if (flipVertical) classes.push('divider--flip-vertical');
  
  divider.className = classes.join(' ');

  // Create the SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', shapeData.viewBox);
  svg.setAttribute('preserveAspectRatio', 'none');

  // Create the path
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', shapeData.path);

  svg.appendChild(path);
  divider.appendChild(svg);

  return divider;
}

/**
 * Add a divider to a section
 * @param {HTMLElement} section - The section element
 * @param {Object} options - Divider options (see createDivider)
 */
export function addDividerToSection(section, options) {
  const divider = createDivider(options);
  if (divider) {
    section.appendChild(divider);
  }
}

/**
 * Initialize dividers from data attributes
 * Looks for elements with data-divider attributes
 */
export function initializeDividers() {
  const sections = document.querySelectorAll('[data-divider]');
  
  sections.forEach(section => {
    const dividerData = section.dataset.divider;
    try {
      const options = JSON.parse(dividerData);
      addDividerToSection(section, options);
    } catch (error) {
      console.error('Invalid divider data:', error);
    }
  });
}

// Export for use in other modules
export default {
  dividerShapes,
  createDivider,
  addDividerToSection,
  initializeDividers
};