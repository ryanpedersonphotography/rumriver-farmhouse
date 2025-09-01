export const colors = {
  primary: {
    // Warmer, more inviting lake blues - like a perfect summer day
    lakeBlueDark: '#1e4d6b',     // Deeper, richer blue with slight teal undertone
    lakeBlue: '#2e6e8e',         // Main lake blue - more vibrant and vacation-like
    lakeBlueLight: '#4a92b4',    // Lighter with more energy
  },
  secondary: {
    // Warmer, more golden sunset tones
    sunsetOrange: '#ff7043',     // Softer, more coral-like orange
    sunsetOrangeLight: '#ff8a65', // Peachy light orange
    sunsetOrangeDark: '#f4511e',  // Rich sunset orange
  },
  accent: {
    // Warmer, more golden yellows - like sunshine
    campfireYellow: '#ffd54f',   // Warmer, more golden yellow
    campfireYellowLight: '#ffe082', // Soft sunshine yellow
    campfireYellowDark: '#ffb300',  // Rich golden hour yellow
  },
  natural: {
    // Warmer, more inviting earth tones
    woodBrown: '#8d6e63',        // Warmer, more reddish brown
    woodBrownLight: '#a1887f',   // Soft driftwood color
    woodBrownDark: '#6d4c41',    // Rich cabin wood
    forestGreen: '#558b2f',      // Brighter, more lively green
    forestGreenLight: '#689f38', // Fresh summer green
    forestGreenDark: '#33691e',  // Deep forest shade
    softSand: '#faf3e0',         // Warmer, creamier sand
    softSandLight: '#fffbf0',    // Almost white warm sand
    softSandDark: '#f3e5cf',     // Beach sand in shade
    morningMist: '#e3f2fd',      // Slightly bluer morning sky
    morningMistLight: '#f3f9ff', // Bright morning sky
    morningMistDark: '#d1e7f5',  // Soft sky blue
  },
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
};

export const gradients = {
  sunrise: `linear-gradient(135deg, ${colors.accent.campfireYellow} 0%, ${colors.secondary.sunsetOrange} 100%)`,
  lake: `linear-gradient(180deg, ${colors.natural.morningMist} 0%, ${colors.primary.lakeBlue} 100%)`,
  forest: `linear-gradient(135deg, ${colors.natural.forestGreen} 0%, ${colors.natural.forestGreenLight} 100%)`,
  sunset: `linear-gradient(90deg, ${colors.secondary.sunsetOrange} 0%, ${colors.accent.campfireYellow} 50%, ${colors.secondary.sunsetOrangeLight} 100%)`,
};