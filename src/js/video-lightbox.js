export function initVideoLightbox() {
  // Create video lightbox element
  const videoLightbox = document.createElement('div');
  videoLightbox.id = 'video-lightbox';
  videoLightbox.className = 'video-lightbox';
  videoLightbox.innerHTML = `
    <button class="video-lightbox-close" aria-label="Close video">&times;</button>
    <div class="video-lightbox-content">
      <div class="video-wrapper">
        <iframe 
          id="lightbox-video"
          src="" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
  
  document.body.appendChild(videoLightbox);
  
  const lightboxVideo = document.getElementById('lightbox-video');
  const closeBtn = videoLightbox.querySelector('.video-lightbox-close');
  
  // Add click handler to video section
  const videoSection = document.querySelector('.section--pearl iframe');
  const videoContainer = videoSection?.parentElement;
  
  if (videoContainer) {
    // Add a play button overlay
    const playOverlay = document.createElement('div');
    playOverlay.className = 'video-play-overlay';
    playOverlay.innerHTML = `
      <div class="play-button">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="rgba(255, 255, 255, 0.9)" />
          <path d="M 35,25 L 35,75 L 75,50 Z" fill="var(--ocean)" />
        </svg>
      </div>
    `;
    
    videoContainer.style.position = 'relative';
    videoContainer.appendChild(playOverlay);
    
    // Click handler for opening lightbox
    playOverlay.addEventListener('click', () => {
      const videoSrc = videoSection.src;
      // Add autoplay parameter
      const autoplaySrc = videoSrc.includes('?') 
        ? videoSrc + '&autoplay=1' 
        : videoSrc + '?autoplay=1';
      
      lightboxVideo.src = autoplaySrc;
      videoLightbox.classList.add('active');
      document.body.classList.add('video-lightbox-active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close lightbox function
  function closeVideoLightbox() {
    videoLightbox.classList.remove('active');
    document.body.classList.remove('video-lightbox-active');
    document.body.style.overflow = '';
    // Stop video by clearing src
    lightboxVideo.src = '';
  }
  
  // Close button handler
  closeBtn.addEventListener('click', closeVideoLightbox);
  
  // Click outside to close
  videoLightbox.addEventListener('click', (e) => {
    if (e.target === videoLightbox) {
      closeVideoLightbox();
    }
  });
  
  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoLightbox.classList.contains('active')) {
      closeVideoLightbox();
    }
  });
}