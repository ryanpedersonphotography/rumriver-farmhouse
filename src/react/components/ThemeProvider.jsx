import React, { createContext, useContext } from 'react';
import { colors, gradients } from '../theme/colors';
import { typography, googleFontsUrl } from '../theme/typography';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors,
    gradients,
    typography,
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
      '4xl': '6rem',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      lake: '0 10px 30px -10px rgba(30, 58, 95, 0.3)',
      warm: '0 10px 30px -10px rgba(139, 111, 71, 0.2)',
    },
    transitions: {
      fast: '150ms ease-in-out',
      base: '300ms ease-in-out',
      slow: '500ms ease-in-out',
      slower: '700ms ease-in-out',
      spring: '700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  };

  // Inject Google Fonts
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = googleFontsUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Create CSS variables for easy access
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Set color CSS variables
    Object.entries(colors).forEach(([category, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([name, value]) => {
          if (typeof value === 'string') {
            root.style.setProperty(`--color-${category}-${name}`, value);
          }
        });
      }
    });

    // Set font CSS variables
    Object.entries(typography.fonts).forEach(([name, value]) => {
      root.style.setProperty(`--font-${name}`, value);
    });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ fontFamily: typography.fonts.body }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};