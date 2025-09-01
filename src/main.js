import './styles/main.css';
import { initNavigation } from './js/navigation.js';
import { initGallery } from './js/gallery.js';
import { initLightbox } from './js/lightbox.js';
import { initVideoLightbox } from './js/video-lightbox.js';
import { initPropertySlider } from './js/slider.js';
import { initScrollAnimations } from './js/animations.js';

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  // Skip Sanity content loading on main page for performance
  // Content is now statically built into HTML
  
  initNavigation();
  initGallery();
  initLightbox();
  initVideoLightbox();
  initPropertySlider();
  initScrollAnimations();
  
  // Initialize expandable location highlights
  document.querySelectorAll('.highlight-item.expandable').forEach(item => {
    const header = item.querySelector('.highlight-header');
    const btn = item.querySelector('.expand-btn');
    
    header.addEventListener('click', () => {
      item.classList.toggle('expanded');
      btn.textContent = item.classList.contains('expanded') ? '×' : '+';
    });
  });
  
  // Initialize amenities toggle
  const toggleBtn = document.getElementById('toggleAmenities');
  const allAmenities = document.getElementById('allAmenities');
  const btnText = toggleBtn?.querySelector('.btn-text');
  
  if (toggleBtn && allAmenities) {
    toggleBtn.addEventListener('click', () => {
      const isShowing = allAmenities.style.display === 'grid';
      
      if (isShowing) {
        allAmenities.style.display = 'none';
        btnText.textContent = 'Show all 50+ amenities';
        toggleBtn.classList.remove('active');
      } else {
        allAmenities.style.display = 'grid';
        btnText.textContent = 'Show less';
        toggleBtn.classList.add('active');
        
        // Smooth scroll to amenities
        allAmenities.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});