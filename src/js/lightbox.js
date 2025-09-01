export function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentImages = [];
  let currentIndex = 0;
  
  // Open lightbox
  window.addEventListener('openLightbox', (e) => {
    currentImages = e.detail.images;
    currentIndex = e.detail.index;
    showImage(currentIndex);
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-active');
    document.body.style.overflow = 'hidden';
  });
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('lightbox-active');
    document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigation
  function showImage(index) {
    if (index < 0 || index >= currentImages.length) return;
    
    const image = currentImages[index];
    // Use the original image directly
    lightboxImage.src = image.src;
    lightboxImage.alt = image.description;
    lightboxCaption.textContent = image.description;
    currentIndex = index;
    
    // Update navigation buttons
    prevBtn.style.display = index === 0 ? 'none' : 'flex';
    nextBtn.style.display = index === currentImages.length - 1 ? 'none' : 'flex';
  }
  
  prevBtn.addEventListener('click', () => {
    showImage(currentIndex - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    showImage(currentIndex + 1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showImage(currentIndex - 1);
        break;
      case 'ArrowRight':
        showImage(currentIndex + 1);
        break;
    }
  });
  
  // Touch gestures for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        showImage(currentIndex + 1);
      } else {
        // Swipe right - previous image
        showImage(currentIndex - 1);
      }
    }
  }
}