// Cohesive Animation System
const animationConfig = {
  threshold: 0.15,
  rootMargin: '-50px 0px',
  staggerDelay: 150,
  parallaxSpeed: 0.3,
  sections: {
    hero: { delay: 0, duration: 1000 },
    gallery: { delay: 200, duration: 800 },
    property: { delay: 100, duration: 800 },
    reviews: { delay: 150, duration: 900 },
    location: { delay: 100, duration: 800 },
    area: { delay: 200, duration: 800 },
    book: { delay: 100, duration: 1000 }
  }
};

// Initialize all animations
export function initScrollAnimations() {
  // Set up Intersection Observer for main sections
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const sectionType = getSectionType(section);
        
        // Animate section header
        const header = section.querySelector('.section-header[data-animate]');
        if (header) {
          setTimeout(() => {
            header.classList.add('animate-in');
          }, animationConfig.sections[sectionType]?.delay || 0);
        }
        
        // Animate section content with stagger
        animateSectionContent(section, sectionType);
        
        sectionObserver.unobserve(section);
      }
    });
  }, {
    threshold: animationConfig.threshold,
    rootMargin: animationConfig.rootMargin
  });
  
  // Observe all major sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Special handling for elements with data-animate
  setupDataAnimateElements();
  
  // Gallery items with wave effect
  setupGalleryAnimations();
  
  // Feature cards with alternating pattern
  setupFeatureCardAnimations();
  
  // Review cards with cascade effect
  setupReviewAnimations();
  
  // Guide items with bounce
  setupGuideAnimations();
  
  // Amenity preview items
  setupAmenityAnimations();
  
  // Location highlights
  setupLocationHighlights();
  
  // Booking cards
  setupBookingCards();
  
  // Wave separators
  setupWaveSeparators();
  
  // Hero parallax effect
  setupHeroParallax();
  
  // Scroll progress indicator
  // setupScrollProgress(); // Disabled - user doesn't want animated elements
}

// Get section type from ID or class
function getSectionType(section) {
  const id = section.id;
  if (id) return id;
  
  const classList = section.classList;
  if (classList.contains('hero')) return 'hero';
  if (classList.contains('gallery-section')) return 'gallery';
  if (classList.contains('property-details')) return 'property';
  if (classList.contains('reviews')) return 'reviews';
  if (classList.contains('location-section')) return 'location';
  if (classList.contains('area-guide-section')) return 'area';
  if (classList.contains('booking')) return 'book';
  
  return 'default';
}

// Animate section content based on type
function animateSectionContent(section, type) {
  const baseDelay = animationConfig.sections[type]?.delay || 100;
  
  switch(type) {
    case 'gallery':
      // Gallery items handled separately
      break;
    case 'property':
      animatePropertyFeatures(section, baseDelay);
      break;
    case 'reviews':
      animateReviewCards(section, baseDelay);
      break;
    case 'area':
      animateGuideItems(section, baseDelay);
      break;
    case 'book':
      animateBookingCards(section, baseDelay);
      break;
  }
}

// Setup individual animation types
function setupDataAnimateElements() {
  const elements = document.querySelectorAll('[data-animate]:not(.section-header)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: animationConfig.threshold,
    rootMargin: animationConfig.rootMargin
  });
  
  elements.forEach(el => observer.observe(el));
}

// Gallery with flying polaroid cards from alternating sides based on position
function setupGalleryAnimations() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Wait for masonry layout to complete before determining positions
  setTimeout(() => {
    const galleryContainer = document.querySelector('.gallery-grid');
    if (!galleryContainer) return;
    
    const containerCenter = galleryContainer.offsetLeft + galleryContainer.offsetWidth / 2;
    
    // Set data-animate attributes based on actual card position
    galleryItems.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const isFromLeft = itemCenter < containerCenter;
      const animateDirection = isFromLeft ? 'fly-left' : 'fly-right';
      item.setAttribute('data-animate', animateDirection);
    });
    
    // Now observe for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = Math.floor(index / 4) * 150 + (index % 4) * 75;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px'
    });
    
    galleryItems.forEach(item => observer.observe(item));
  }, 500); // Delay to ensure masonry is fully loaded
}

// Feature cards with wave pattern
function setupFeatureCardAnimations() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`;
  });
}

function animatePropertyFeatures(section, baseDelay) {
  const cards = section.querySelectorAll('.feature-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, baseDelay + (index * animationConfig.staggerDelay));
  });
}

// Review cards cascade
function setupReviewAnimations() {
  const reviews = document.querySelectorAll('.review-card');
  reviews.forEach((review, index) => {
    review.style.transitionDelay = `${index * 200}ms`;
  });
}

function animateReviewCards(section, baseDelay) {
  const cards = section.querySelectorAll('.review-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, baseDelay + (index * 200));
  });
}

// Guide items with bounce
function setupGuideAnimations() {
  const items = document.querySelectorAll('.guide-item');
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 150}ms`;
  });
}

function animateGuideItems(section, baseDelay) {
  const items = section.querySelectorAll('.guide-item');
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate-in');
    }, baseDelay + (index * 150));
  });
}

// Amenity preview items
function setupAmenityAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.preview-item');
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 50);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  const amenitySection = document.querySelector('.amenities-preview');
  if (amenitySection) {
    observer.observe(amenitySection);
  }
}

// Location highlights alternating
function setupLocationHighlights() {
  const highlights = document.querySelectorAll('.highlight-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-30px 0px'
  });
  
  highlights.forEach(highlight => observer.observe(highlight));
}

// Booking cards
function setupBookingCards() {
  const cards = document.querySelectorAll('.booking-card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 300}ms`;
  });
}

function animateBookingCards(section, baseDelay) {
  const cards = section.querySelectorAll('.booking-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate-in');
    }, baseDelay + (index * 300));
  });
}

// Wave separators
function setupWaveSeparators() {
  const separators = document.querySelectorAll('.wave-separator');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  separators.forEach(separator => observer.observe(separator));
}

// Hero parallax with fade out effect
function setupHeroParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  
  let ticking = false;
  let scrollY = 0;
  
  function updateParallax() {
    const heroHeight = window.innerHeight;
    const scrollPercent = Math.min(scrollY / heroHeight, 1);
    
    // Parallax movement
    const rate = scrollY * -animationConfig.parallaxSpeed;
    
    // Fade out effect - starts fading at 10% scroll, fully faded at 60%
    let opacity = 1;
    if (scrollPercent > 0.1) {
      opacity = Math.max(0, 1 - ((scrollPercent - 0.1) / 0.5));
    }
    
    heroContent.style.transform = `translateY(${rate}px)`;
    heroContent.style.opacity = opacity;
    ticking = false;
  }
  
  function handleScroll() {
    scrollY = window.pageYOffset;
    
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true });
}

// Scroll progress indicator
function setupScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--ocean) 0%, var(--sky) 50%, var(--ocean) 100%);
    transform-origin: 0 0;
    transform: scaleX(0);
    transition: transform 0.1s linear;
    z-index: 1000;
    width: 100%;
  `;
  document.body.appendChild(progress);
  
  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progressPercent = scrolled / documentHeight;
    
    progress.style.transform = `scaleX(${progressPercent})`;
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

// Counter animation for stats
export function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.round(current);
  }, 16);
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}