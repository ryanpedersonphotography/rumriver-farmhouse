/* ==========================================================================
   Dynamic Video Centering
   Centers video within hero section based on aspect ratios
   ========================================================================== */

export function initVideoCenter() {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  
  if (!hero || !video) return;
  
  function centerVideo() {
    const heroAspect = hero.offsetWidth / hero.offsetHeight;
    const videoAspect = video.videoWidth / video.videoHeight;
    
    // Debug logging
    console.log('Video centering debug:', {
      heroSize: `${hero.offsetWidth}x${hero.offsetHeight}`,
      videoNaturalSize: `${video.videoWidth}x${video.videoHeight}`,
      heroAspect: heroAspect.toFixed(2),
      videoAspect: videoAspect.toFixed(2),
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    if (videoAspect > heroAspect) {
      // Video is wider relative to hero - scale by height and center horizontally
      video.style.width = 'auto';
      video.style.height = '100%';
      
      // Wait for layout to update, then calculate offset
      setTimeout(() => {
        const offsetX = (video.offsetWidth - hero.offsetWidth) / 2;
        video.style.transform = `translateX(-${offsetX}px)`;
        console.log('Mode: Height fill, X offset:', offsetX);
      }, 0);
    } else {
      // Video is taller relative to hero - scale by width and center vertically
      video.style.width = '100%';
      video.style.height = 'auto';
      
      // Wait for layout to update, then calculate offsets
      setTimeout(() => {
        const offsetY = (video.offsetHeight - hero.offsetHeight) / 2;
        
        // Also check if we need horizontal centering (common in portrait mode)
        if (video.offsetWidth > hero.offsetWidth) {
          const offsetX = (video.offsetWidth - hero.offsetWidth) / 2;
          video.style.transform = `translate(-${offsetX}px, -${offsetY}px)`;
          console.log('Mode: Width fill + both offsets, X:', offsetX, 'Y:', offsetY);
        } else {
          video.style.transform = `translateY(-${offsetY}px)`;
          console.log('Mode: Width fill, Y offset:', offsetY);
        }
      }, 0);
    }
  }
  
  // Run when video metadata is loaded
  video.addEventListener('loadedmetadata', centerVideo);
  
  // Re-center on window resize with debounce for performance
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(centerVideo, 100);
  });
  
  // Also run immediately if video is already loaded
  if (video.readyState >= 1) {
    centerVideo();
  }
}