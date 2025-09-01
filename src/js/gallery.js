import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

let allImages = [];
let displayedImages = 0;
const imagesPerLoad = 12;
let masonryInstance = null;
let showingAll = false;

// Image categories and titles for our stills (reversed order)
const imageData = [
  { id: 1, src: '/stills/rum-river-farmhouse-25.jpg', category: 'amenity', title: 'Property Amenities', description: 'Everything you need for a perfect stay' },
  { id: 2, src: '/stills/rum-river-farmhouse-24.jpg', category: 'living', title: 'Interior Details', description: 'Farmhouse style interior design' },
  { id: 3, src: '/stills/rum-river-farmhouse-23.jpg', category: 'exterior', title: 'Landscape', description: 'Beautiful natural landscaping' },
  { id: 4, src: '/stills/rum-river-farmhouse-22.jpg', category: 'amenity', title: 'Farmhouse Features', description: 'Special touches throughout' },
  { id: 5, src: '/stills/rum-river-farmhouse-21.jpg', category: 'kitchen', title: 'Dining & Kitchen', description: 'Open concept kitchen and dining' },
  { id: 6, src: '/stills/rum-river-farmhouse-20.jpg', category: 'living', title: 'Gathering Space', description: 'Perfect for family and friends' },
  { id: 7, src: '/stills/rum-river-farmhouse-19.jpg', category: 'exterior', title: 'Outdoor Views', description: 'Natural beauty surrounding the farmhouse' },
  { id: 8, src: '/stills/rum-river-farmhouse-18.jpg', category: 'bathroom', title: 'Guest Bath', description: 'Additional bathroom facilities' },
  { id: 9, src: '/stills/rum-river-farmhouse-17.jpg', category: 'bedroom', title: 'Cozy Bedroom', description: 'Another comfortable sleeping space' },
  { id: 10, src: '/stills/rum-river-farmhouse-16.jpg', category: 'living', title: 'Common Area', description: 'Welcoming common spaces' },
  { id: 11, src: '/stills/rum-river-farmhouse-15.jpg', category: 'amenity', title: 'Special Features', description: 'Unique farmhouse amenities' },
  { id: 12, src: '/stills/rum-river-farmhouse-14.jpg', category: 'exterior', title: 'Property View', description: 'Scenic views of the surrounding property' },
  { id: 13, src: '/stills/rum-river-farmhouse-13.jpg', category: 'living', title: 'Living Space', description: 'Open and airy living area' },
  { id: 14, src: '/stills/rum-river-farmhouse-12.jpg', category: 'bedroom', title: 'Bedroom', description: 'Peaceful bedroom retreat' },
  { id: 15, src: '/stills/rum-river-farmhouse-11.jpg', category: 'kitchen', title: 'Kitchen Details', description: 'Thoughtfully designed kitchen features' },
  { id: 16, src: '/stills/rum-river-farmhouse-10.jpg', category: 'living', title: 'Family Room', description: 'Comfortable family gathering space' },
  { id: 17, src: '/stills/rum-river-farmhouse-09.jpg', category: 'amenity', title: 'Outdoor Space', description: 'Relaxing outdoor seating area' },
  { id: 18, src: '/stills/rum-river-farmhouse-08.jpg', category: 'exterior', title: 'Backyard View', description: 'Beautiful backyard with natural surroundings' },
  { id: 19, src: '/stills/rum-river-farmhouse-07.jpg', category: 'living', title: 'Dining Area', description: 'Spacious dining area perfect for gatherings' },
  { id: 20, src: '/stills/rum-river-farmhouse-06.jpg', category: 'bathroom', title: 'Bathroom', description: 'Clean and modern bathroom facilities' },
  { id: 21, src: '/stills/rum-river-farmhouse-05.jpg', category: 'bedroom', title: 'Guest Bedroom', description: 'Inviting guest bedroom with warm decor' },
  { id: 22, src: '/stills/rum-river-farmhouse-04.jpg', category: 'bedroom', title: 'Master Bedroom', description: 'Comfortable master bedroom with rustic touches' },
  { id: 23, src: '/stills/rum-river-farmhouse-03.jpg', category: 'kitchen', title: 'Kitchen', description: 'Modern farmhouse kitchen with quality appliances' },
  { id: 24, src: '/stills/rum-river-farmhouse-02.jpg', category: 'living', title: 'Living Room', description: 'Cozy living space with farmhouse charm' },
  { id: 25, src: '/stills/rum-river-farmhouse-01.jpg', category: 'exterior', title: 'Farmhouse Exterior', description: 'Charming farmhouse with welcoming front entrance' }
];

export function initGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  
  allImages = [...imageData];
  
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
        columnWidth: 220,
        percentPosition: false, // Use pixel positioning
        horizontalOrder: true, // Keep items in order for 4-across layout
        transitionDuration: 0,
        gutter: 20, // Tighter gutter for 4-across
        fitWidth: false, // Full width to fit 4 across
        originLeft: true,
        originTop: true
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
  
  // All polaroids are the same size now
  item.className = 'gallery-item';
  item.dataset.index = index;
  item.dataset.imageId = image.id; // Add unique identifier (data-image-id in HTML)
  
  // Random rotation for the polaroid card (-3 to 3 degrees)
  const cardRotation = (Math.random() * 6 - 3).toFixed(2);
  
  // Store initial transform values for hover animation
  const initialRotation = parseFloat(cardRotation);
  const initialTranslateY = 0;
  const initialScale = 1;
  
  // Apply initial transform
  item.style.transform = `rotate(${cardRotation}deg) translateY(${initialTranslateY}px) scale(${initialScale})`;
  item.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
  
  // More consistent pushpin position (45% to 55% from left) 
  const pinPosition = 45 + Math.random() * 10;
  item.style.setProperty('--pin-position', `${pinPosition}%`);
  
  // Slight random rotation for pushpin (-15 to 15 degrees)
  const pinRotation = (Math.random() * 30 - 15).toFixed(0);
  item.style.setProperty('--pin-rotation', `${pinRotation}deg`);
  
  item.innerHTML = `
    <img src="${image.src}" alt="${image.description}" loading="lazy">
    <h3 class="gallery-title">${image.title}</h3>
  `;
  
  // Apply random text styling after element is created
  const titleElement = item.querySelector('.gallery-title');
  if (titleElement) {
    // Random text rotation (-2 to 2 degrees)
    const textRotation = (Math.random() * 4 - 2).toFixed(2);
    // Random text skew (-2 to 2 degrees)
    const textSkew = (Math.random() * 4 - 2).toFixed(2);
    // Random font size (0.88rem to 1.02rem)
    const fontSize = (0.88 + Math.random() * 0.14).toFixed(2);
    // Random font weight (500, 600, 700, or 800)
    const fontWeights = [500, 600, 700, 800];
    const fontWeight = fontWeights[Math.floor(Math.random() * fontWeights.length)];
    // Random letter spacing (0.2px to 0.8px)
    const letterSpacing = (0.2 + Math.random() * 0.6).toFixed(1);
    // Random italic (30% chance)
    const fontStyle = Math.random() < 0.3 ? 'italic' : 'normal';
    
    titleElement.style.transform = `rotate(${textRotation}deg) skew(${textSkew}deg)`;
    titleElement.style.fontSize = `${fontSize}rem`;
    titleElement.style.fontWeight = fontWeight;
    titleElement.style.letterSpacing = `${letterSpacing}px`;
    titleElement.style.fontStyle = fontStyle;
  }
  
  // Add hover animations
  item.addEventListener('mouseenter', () => {
    item.style.transform = `rotate(${initialRotation}deg) translateY(-20px) scale(1.08)`;
    item.style.boxShadow = `
      inset 0 0 4px rgba(0, 0, 0, 0.06),
      0 10px 20px rgba(0, 0, 0, 0.25),
      0 15px 30px rgba(0, 0, 0, 0.2)
    `;
    item.style.zIndex = '100';
    
    // Slight brightness increase on image
    const img = item.querySelector('img');
    if (img) {
      img.style.filter = 'brightness(1.02)';
    }
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = `rotate(${initialRotation}deg) translateY(${initialTranslateY}px) scale(${initialScale})`;
    item.style.boxShadow = `
      inset 0 0 4px rgba(0, 0, 0, 0.06),
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 4px 8px rgba(0, 0, 0, 0.1),
      0 8px 16px rgba(0, 0, 0, 0.1),
      0 16px 32px rgba(0, 0, 0, 0.05)
    `;
    item.style.zIndex = '1';
    
    // Reset image brightness
    const img = item.querySelector('img');
    if (img) {
      img.style.filter = 'brightness(1)';
    }
  });
  
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