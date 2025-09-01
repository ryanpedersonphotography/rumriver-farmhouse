import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

let allImages = [];
let displayedImages = 0;
const imagesPerLoad = 12;
let masonryInstance = null;
let showingAll = false;

// Template: Replace with actual image data
// This will be populated by config or CMS
const imageData = [
  // Example data structure - replace with your actual images:
  // { id: 1, src: '/stills/property_1.jpg', category: 'exterior', title: 'Property Exterior', description: 'Beautiful property exterior view' },
  // { id: 2, src: '/stills/property_2.jpg', category: 'living', title: 'Living Room', description: 'Spacious living room with modern amenities' },
  // Add your property images here following the same structure
  
  // Template placeholders - remove these and add actual images:
  { id: 1, src: '/stills/hero-placeholder.jpg', category: 'exterior', title: 'Property View', description: 'Main property view' },
  { id: 2, src: '/stills/interior-placeholder.jpg', category: 'living', title: 'Interior Space', description: 'Interior living space' },
  { id: 3, src: '/stills/bedroom-placeholder.jpg', category: 'bedroom', title: 'Bedroom', description: 'Comfortable bedroom' },
  { id: 4, src: '/stills/kitchen-placeholder.jpg', category: 'kitchen', title: 'Kitchen', description: 'Fully equipped kitchen' },
  { id: 5, src: '/stills/bathroom-placeholder.jpg', category: 'bathroom', title: 'Bathroom', description: 'Clean bathroom facilities' },
  { id: 6, src: '/stills/amenity-placeholder.jpg', category: 'amenity', title: 'Amenities', description: 'Property amenities' }
];

// Alternative: Load from CMS or config file
// Example function to load from Sanity CMS:
async function loadImagesFromCMS() {
  try {
    // This would connect to your CMS
    // const { getGalleryImages } = await import('../lib/sanity-queries.js');
    // const images = await getGalleryImages();
    // return images;
    
    // For now, return the template data
    return imageData;
  } catch (error) {
    console.warn('Could not load images from CMS, using fallback data');
    return imageData;
  }
}

// Alternative: Load from JSON config file
async function loadImagesFromConfig() {
  try {
    const response = await fetch('/src/data/gallery-images.json');
    const images = await response.json();
    return images;
  } catch (error) {
    console.warn('Could not load images from config, using fallback data');
    return imageData;
  }
}

export async function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  // Load images from CMS or config file
  allImages = await loadImagesFromCMS(); // or loadImagesFromConfig()
  
  // Initial load first, then setup masonry with a small delay
  setTimeout(() => {
    loadImages('all', false, true);
  }, 100);
  
  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter and reload images
      displayedImages = 0;
      showingAll = false;
      
      // Destroy existing masonry instance
      if (masonryInstance) {
        masonryInstance.destroy();
        masonryInstance = null;
      }
      
      // Clear existing items
      while (galleryGrid.firstChild) {
        galleryGrid.removeChild(galleryGrid.firstChild);
      }
      
      // Add sizer element for masonry
      const sizer = document.createElement('div');
      sizer.className = 'gallery-sizer';
      galleryGrid.appendChild(sizer);
      
      // Load images (masonry will be initialized in loadImages function)
      loadImages(filter);
    });
  });
  
  // Load more functionality - now loads all remaining images
  loadMoreBtn.addEventListener('click', () => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    loadAllImages(activeFilter);
  });
}

function loadImages(filter, append = false, isInitial = false) {
  const galleryGrid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  // Filter images
  const filteredImages = filter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === filter);
  
  // Get next batch
  const start = append ? displayedImages : 0;
  const end = Math.min(start + imagesPerLoad, filteredImages.length);
  const imagesToLoad = filteredImages.slice(start, end);
  
  if (!append) {
    displayedImages = 0;
  }
  
  // Add sizer element if initial load
  if (isInitial || !append) {
    const sizer = document.createElement('div');
    sizer.className = 'gallery-sizer';
    galleryGrid.appendChild(sizer);
  }
  
  // Create and append image elements
  const fragment = document.createDocumentFragment();
  imagesToLoad.forEach((image, index) => {
    // Check if image already exists in gallery
    const existingItem = galleryGrid.querySelector(`[data-image-id="${image.id}"]`);
    if (!existingItem) {
      const item = createGalleryItem(image, start + index);
      fragment.appendChild(item);
    }
  });
  
  galleryGrid.appendChild(fragment);
  
  // Initialize or update masonry
  if (!masonryInstance) {
    // Wait for images to load before initializing Masonry
    imagesLoaded(galleryGrid, () => {
      // Initialize masonry after images are loaded
      masonryInstance = new Masonry(galleryGrid, {
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-sizer',
        percentPosition: false, // Use pixel positioning
        horizontalOrder: true,
        transitionDuration: 0,
        gutter: 20
      });
      
      // Force layout
      masonryInstance.layout();
      
      // Add visible class for animation
      const newItems = galleryGrid.querySelectorAll('.gallery-item:not(.visible)');
      newItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 50);
      });
    });
  } else {
    // Layout with masonry
    imagesLoaded(galleryGrid, () => {
      masonryInstance.reloadItems();
      masonryInstance.layout();
      
      // Add visible class for animation
      const newItems = galleryGrid.querySelectorAll('.gallery-item:not(.visible)');
      newItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 50);
      });
    });
  }
  
  // Update counter
  displayedImages = end;
  
  // Show/hide load more button
  if (displayedImages < filteredImages.length) {
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.textContent = 'View All';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

function loadAllImages(filter) {
  const galleryGrid = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  // Filter images
  const filteredImages = filter === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === filter);
  
  // Get remaining images to load
  const remainingImages = filteredImages.slice(displayedImages);
  
  // Create remaining image elements
  const fragment = document.createDocumentFragment();
  const addedItems = [];
  
  remainingImages.forEach((image, index) => {
    // Check if image already exists in gallery
    const existingItem = galleryGrid.querySelector(`[data-image-id="${image.id}"]`);
    if (!existingItem) {
      const item = createGalleryItem(image, displayedImages + index);
      fragment.appendChild(item);
      addedItems.push(item);
    }
  });
  
  if (addedItems.length === 0) {
    loadMoreBtn.style.display = 'none';
    return;
  }
  
  galleryGrid.appendChild(fragment);
  
  // Layout with masonry
  imagesLoaded(galleryGrid, () => {
    masonryInstance.appended(addedItems);
    masonryInstance.layout();
    
    // Add visible class for animation
    addedItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 30);
    });
  });
  
  // Update counter
  displayedImages = filteredImages.length;
  showingAll = true;
  
  // Hide button
  loadMoreBtn.style.display = 'none';
}

function createGalleryItem(image, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.index = index;
  item.dataset.imageId = image.id; // Add unique identifier (data-image-id in HTML)
  
  item.innerHTML = `
    <img src="${image.src}" alt="${image.description}" loading="lazy">
    <div class="gallery-overlay">
      <h3 class="gallery-title">${image.title}</h3>
    </div>
  `;
  
  item.addEventListener('click', () => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const filteredImages = activeFilter === 'all' 
      ? allImages 
      : allImages.filter(img => img.category === activeFilter);
    
    window.dispatchEvent(new CustomEvent('openLightbox', { 
      detail: { 
        index: filteredImages.findIndex(img => img.id === image.id),
        images: filteredImages
      } 
    }));
  });
  
  return item;
}