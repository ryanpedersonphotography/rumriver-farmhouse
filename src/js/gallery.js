import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

let allImages = [];
let displayedImages = 0;
const imagesPerLoad = 12;
let masonryInstance = null;
let showingAll = false;

// Image categories and titles for our stills
const imageData = [
  { id: 1, src: '/stills/breezy_4.jpeg', category: 'exterior', title: 'Aerial Lake View', description: 'Aerial view of the property and surrounding lake with islands' },
  { id: 2, src: '/stills/breezy_5.jpeg', category: 'exterior', title: 'Cottage Exterior', description: 'Beautiful cottage nestled among the trees' },
  { id: 3, src: '/stills/breezy_6.jpeg', category: 'exterior', title: 'Aerial Property View', description: 'Aerial view showing the cottage nestled in the wooded neighborhood' },
  { id: 4, src: '/stills/breezy_7.jpeg', category: 'exterior', title: 'Front View of Cottage', description: 'Modern two-story cottage with carport' },
  { id: 5, src: '/stills/breezy_8.jpeg', category: 'exterior', title: 'Side View of Cottage', description: 'Another angle showing the modern architecture' },
  { id: 6, src: '/stills/breezy_9.jpg', category: 'exterior', title: 'Back View with Patio', description: 'Rear view of cottage showing covered patio and yard' },
  { id: 7, src: '/stills/breezy_10.jpg', category: 'amenity', title: 'Outdoor Covered Patio', description: 'Covered patio area with outdoor seating' },
  { id: 8, src: '/stills/breezy_12.jpg', category: 'amenity', title: 'Backyard Fire Pit', description: 'Modern cottage exterior with fire pit area and Adirondack chairs' },
  { id: 9, src: '/stills/breezy_13.jpg', category: 'amenity', title: 'Fire Pit Circle', description: 'Cozy fire pit surrounded by comfortable Adirondack chairs' },
  { id: 10, src: '/stills/breezy_14.jpg', category: 'amenity', title: 'Another Fire Pit View', description: 'Additional seating area with Adirondack chairs around fire pit' },
  { id: 11, src: '/stills/breezy_15.jpg', category: 'living', title: 'Open Living & Dining', description: 'Open concept living room with dining area and stone fireplace' },
  { id: 12, src: '/stills/breezy_16.jpg', category: 'living', title: 'Lower Level Living Area', description: 'Cozy living space with stone fireplace and modern amenities' },
  { id: 13, src: '/stills/breezy_17.jpg', category: 'kitchen', title: 'Kitchen Galley', description: 'Well-equipped galley kitchen with sage green cabinets' },
  { id: 14, src: '/stills/breezy_18.jpg', category: 'living', title: 'Upper Level Living Room', description: 'Spacious living room with comfortable recliners and sectional' },
  { id: 15, src: '/stills/breezy_19.jpg', category: 'living', title: 'Additional Living Space', description: 'Another comfortable living area with sectional sofa' },
  { id: 16, src: '/stills/breezy_20.jpg', category: 'living', title: 'Upper Level TV Area', description: 'Cozy TV viewing area with recliners near staircase' },
  { id: 17, src: '/stills/breezy_21.jpg', category: 'exterior', title: 'Screened Porch', description: 'Covered screened porch with Adirondack chairs' },
  { id: 18, src: '/stills/breezy_22.jpg', category: 'bedroom', title: 'Bedroom with Orange Bedding', description: 'Bedroom with southwestern style orange bedding and metal bed frame' },
  { id: 19, src: '/stills/breezy_23.jpg', category: 'bedroom', title: 'Bedroom with Desk', description: 'Comfortable bedroom with queen bed and work desk' },
  { id: 20, src: '/stills/breezy_24.jpg', category: 'living', title: 'Entertainment Center', description: 'Smart TV with streaming services' },
  { id: 21, src: '/stills/breezy_25.jpg', category: 'living', title: 'Living Room with Patio Access', description: 'Living room with sectional sofa and sliding door to patio' },
  { id: 22, src: '/stills/breezy_26.jpg', category: 'bedroom', title: 'Bedroom with Star Decor', description: 'Cozy bedroom with star-themed bedding and desk area' },
  { id: 23, src: '/stills/breezy_27.jpg', category: 'amenity', title: 'BBQ Grill', description: 'Gas grill for outdoor cooking' },
  { id: 24, src: '/stills/breezy_28.jpg', category: 'exterior', title: 'Another Screened Porch View', description: 'Screened porch seating area with outdoor rug' },
  { id: 25, src: '/stills/breezy_29.jpg', category: 'living', title: 'Reading Nook', description: 'Quiet corner for reading' },
  { id: 26, src: '/stills/breezy_30.jpg', category: 'bathroom', title: 'Cabin-Themed Bathroom', description: 'Half bathroom with cabin sweet cabin decor' },
  { id: 27, src: '/stills/breezy_31.jpg', category: 'amenity', title: 'Game Room', description: 'Board games and entertainment' },
  { id: 28, src: '/stills/breezy_32.jpg', category: 'living', title: 'Main Living Room', description: 'Living room with stone fireplace and comfortable seating' },
  { id: 29, src: '/stills/breezy_33.jpg', category: 'living', title: 'Dining Room', description: 'Dining area with round table adjacent to living room' },
  { id: 30, src: '/stills/breezy_34.jpg', category: 'living', title: 'Fireplace', description: 'Cozy fireplace for cool evenings' },
  { id: 31, src: '/stills/breezy_35.jpg', category: 'kitchen', title: 'Pantry', description: 'Well-stocked pantry area' },
  { id: 32, src: '/stills/breezy_36.jpg', category: 'kitchen', title: 'Kitchen and Dining View', description: 'Full kitchen view showing dining area in background' },
  { id: 33, src: '/stills/breezy_37.jpg', category: 'amenity', title: 'Laundry Room', description: 'Washer and dryer available' },
  { id: 34, src: '/stills/breezy_38.jpg', category: 'living', title: 'Living Room Fireplace View', description: 'Living room with stone fireplace and wall-mounted TV' },
  { id: 35, src: '/stills/breezy_39.jpg', category: 'bathroom', title: 'Full Bathroom', description: 'Full bathroom with tub/shower combination' },
  { id: 36, src: '/stills/breezy_40.jpg', category: 'living', title: 'Window Views', description: 'Panoramic windows throughout' }
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