// Property Image Slider - DEPRECATED
export function initPropertySlider() {
  // Slider functionality removed - using grid layout instead
  return;

  const slides = slider.querySelectorAll('.slide');
  const contentItems = slider.querySelectorAll('.content-item');
  const dots = slider.querySelectorAll('.dot');
  const prevBtn = slider.querySelector('.slider-nav.prev');
  const nextBtn = slider.querySelector('.slider-nav.next');
  
  let currentSlide = 0;
  let slideInterval;

  // Show specific slide
  function showSlide(index) {
    // Hide all slides and content
    slides.forEach(slide => slide.classList.remove('active'));
    contentItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide and content
    slides[index].classList.add('active');
    contentItems[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }

  // Next slide
  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  // Previous slide
  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // Auto-play functionality
  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
  }

  function stopAutoPlay() {
    clearInterval(slideInterval);
  }

  // Event listeners
  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoPlay();
      showSlide(index);
      startAutoPlay();
    });
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      // Swipe left - next slide
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
    if (touchEndX > touchStartX + 50) {
      // Swipe right - previous slide
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      stopAutoPlay();
      prevSlide();
      startAutoPlay();
    } else if (e.key === 'ArrowRight') {
      stopAutoPlay();
      nextSlide();
      startAutoPlay();
    }
  });

  // Pause autoplay on hover
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);

  // Start autoplay
  startAutoPlay();

  // Preload images for smooth transitions
  slides.forEach((slide, index) => {
    if (index > 0) {
      const img = slide.querySelector('img');
      if (img) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
      }
    }
  });
}