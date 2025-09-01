import React from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { GallerySection } from './sections/GallerySection';
import { StatisticsSection } from './sections/StatisticsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { CTASection } from './sections/CTASection';
import { FloatingActionButton } from './components/ui/AnimatedButton';

// Add global styles
import './styles/globals.css';

function App() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <GallerySection />
        <StatisticsSection />
        <TestimonialsSection />
        <CTASection />
        
        <FloatingActionButton 
          icon="↑" 
          onClick={scrollToTop}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;