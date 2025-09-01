import { client } from '../lib/sanity.js';
import { contentManager } from './content-manager.js';

class AdminPanel {
  constructor() {
    this.currentData = {};
    this.init();
  }

  async init() {
    await this.loadCurrentContent();
    this.populateForms();
  }

  async loadCurrentContent() {
    try {
      this.currentData = await contentManager.loadContent();
      console.log('Loaded current content:', this.currentData);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  populateForms() {
    this.populatePropertyForm();
    this.populateBookingForm();
    this.populateTestimonials();
  }

  populatePropertyForm() {
    const property = this.currentData.property;
    if (!property) return;

    document.getElementById('propertyName').value = property.name || '';
    document.getElementById('propertyTagline').value = property.tagline || '';
    document.getElementById('propertyPhone').value = property.contact?.phone || '';
    document.getElementById('propertyEmail').value = property.contact?.email || '';

    // Populate features
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    if (property.features) {
      property.features.forEach((feature, index) => {
        this.addFeatureToList(feature, index);
      });
    }

    // Populate amenities
    const amenitiesList = document.getElementById('amenitiesList');
    amenitiesList.innerHTML = '';
    if (property.amenities) {
      property.amenities.forEach((amenity, index) => {
        this.addAmenityToList(amenity, index);
      });
    }
  }

  addFeatureToList(feature = { icon: '', title: '', description: '' }, index) {
    const featuresList = document.getElementById('featuresList');
    const featureDiv = document.createElement('div');
    featureDiv.className = 'feature-item';
    featureDiv.innerHTML = `
      <input type="text" placeholder="🏠" value="${feature.icon}" data-field="icon" data-index="${index}">
      <input type="text" placeholder="Feature Title" value="${feature.title}" data-field="title" data-index="${index}">
      <input type="text" placeholder="Feature Description" value="${feature.description}" data-field="description" data-index="${index}">
      <button type="button" onclick="adminPanel.removeFeature(${index})" style="background: #dc3545; color: white; border: none; padding: 0.5rem; border-radius: 4px;">×</button>
    `;
    featuresList.appendChild(featureDiv);
  }

  addAmenityToList(amenity, index) {
    const amenitiesList = document.getElementById('amenitiesList');
    const amenityDiv = document.createElement('div');
    amenityDiv.className = 'amenity-item';
    amenityDiv.innerHTML = `
      <input type="checkbox" checked>
      <input type="text" value="${amenity}" data-amenity-index="${index}" placeholder="Amenity name">
      <button type="button" onclick="adminPanel.removeAmenity(${index})" style="background: #dc3545; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">×</button>
    `;
    amenitiesList.appendChild(amenityDiv);
  }

  populateBookingForm() {
    const bookingLinks = this.currentData.bookingLinks;
    const virtualTour = this.currentData.virtualTour;
    const socialMedia = this.currentData.socialMedia;

    if (bookingLinks) {
      document.getElementById('airbnbUrl').value = bookingLinks.airbnb || '';
      document.getElementById('vrboUrl').value = bookingLinks.vrbo || '';
    }

    if (virtualTour) {
      document.getElementById('matterportUrl').value = virtualTour.matterport || '';
      document.getElementById('youtubeUrl').value = virtualTour.youtube || '';
    }

    if (socialMedia) {
      document.getElementById('instagramUrl').value = socialMedia.instagram || '';
      document.getElementById('facebookUrl').value = socialMedia.facebook || '';
      document.getElementById('tiktokUrl').value = socialMedia.tiktok || '';
    }
  }

  populateTestimonials() {
    const testimonials = this.currentData.testimonials || [];
    const testimonialsList = document.getElementById('testimonialsList');
    testimonialsList.innerHTML = '';

    testimonials.forEach((testimonial, index) => {
      this.addTestimonialToList(testimonial, index);
    });
  }

  addTestimonialToList(testimonial = { guestName: '', location: '', review: '', rating: 5 }, index) {
    const testimonialsList = document.getElementById('testimonialsList');
    const testimonialDiv = document.createElement('div');
    testimonialDiv.style.cssText = 'border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 8px;';
    testimonialDiv.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
        <input type="text" placeholder="Guest Name" value="${testimonial.guestName}" data-testimonial-field="guestName" data-testimonial-index="${index}">
        <input type="text" placeholder="Location" value="${testimonial.location}" data-testimonial-field="location" data-testimonial-index="${index}">
      </div>
      <textarea placeholder="Review text..." data-testimonial-field="review" data-testimonial-index="${index}" style="width: 100%; margin-bottom: 1rem; padding: 0.5rem; border-radius: 4px; border: 1px solid #ddd;">${testimonial.review}</textarea>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <label>Rating:</label>
          <select data-testimonial-field="rating" data-testimonial-index="${index}" style="margin-left: 0.5rem; padding: 0.25rem;">
            ${[1,2,3,4,5].map(num => `<option value="${num}" ${testimonial.rating === num ? 'selected' : ''}>${num} Star${num > 1 ? 's' : ''}</option>`).join('')}
          </select>
        </div>
        <button type="button" onclick="adminPanel.removeTestimonial(${index})" style="background: #dc3545; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px;">Remove</button>
      </div>
    `;
    testimonialsList.appendChild(testimonialDiv);
  }

  removeFeature(index) {
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems[index]) {
      featureItems[index].remove();
      this.reindexFeatures();
    }
  }

  removeAmenity(index) {
    const amenityItems = document.querySelectorAll('.amenity-item');
    if (amenityItems[index]) {
      amenityItems[index].remove();
      this.reindexAmenities();
    }
  }

  removeTestimonial(index) {
    const testimonialItems = document.querySelectorAll('#testimonialsList > div');
    if (testimonialItems[index]) {
      testimonialItems[index].remove();
      this.reindexTestimonials();
    }
  }

  reindexFeatures() {
    document.querySelectorAll('.feature-item').forEach((item, index) => {
      item.querySelectorAll('input').forEach(input => {
        input.setAttribute('data-index', index);
      });
      const button = item.querySelector('button');
      button.setAttribute('onclick', `adminPanel.removeFeature(${index})`);
    });
  }

  reindexAmenities() {
    document.querySelectorAll('.amenity-item').forEach((item, index) => {
      const input = item.querySelector('input[type="text"]');
      input.setAttribute('data-amenity-index', index);
      const button = item.querySelector('button');
      button.setAttribute('onclick', `adminPanel.removeAmenity(${index})`);
    });
  }

  reindexTestimonials() {
    document.querySelectorAll('#testimonialsList > div').forEach((item, index) => {
      item.querySelectorAll('[data-testimonial-index]').forEach(input => {
        input.setAttribute('data-testimonial-index', index);
      });
      const button = item.querySelector('button');
      button.setAttribute('onclick', `adminPanel.removeTestimonial(${index})`);
    });
  }

  async saveAndDeploy() {
    this.showStatus('Saving changes...', 'info');

    try {
      // Collect form data
      const propertyData = this.collectPropertyData();
      const bookingData = this.collectBookingData();
      const testimonialsData = this.collectTestimonialsData();

      // Save to Sanity
      await this.saveToSanity(propertyData, bookingData, testimonialsData);

      // Trigger deployment (simplified - in real implementation you'd call Netlify API)
      this.showStatus('✅ Changes saved successfully! Site will update in a few minutes.', 'success');

    } catch (error) {
      console.error('Error saving:', error);
      this.showStatus('❌ Error saving changes. Please try again.', 'error');
    }
  }

  collectPropertyData() {
    const features = [];
    document.querySelectorAll('.feature-item').forEach(item => {
      const inputs = item.querySelectorAll('input');
      features.push({
        icon: inputs[0].value,
        title: inputs[1].value,
        description: inputs[2].value
      });
    });

    const amenities = [];
    document.querySelectorAll('.amenity-item input[type="text"]').forEach(input => {
      if (input.value.trim()) {
        amenities.push(input.value.trim());
      }
    });

    return {
      name: document.getElementById('propertyName').value,
      tagline: document.getElementById('propertyTagline').value,
      contact: {
        phone: document.getElementById('propertyPhone').value,
        email: document.getElementById('propertyEmail').value
      },
      features,
      amenities,
      address: this.currentData.property?.address // Keep existing address
    };
  }

  collectBookingData() {
    return {
      bookingLinks: {
        airbnb: document.getElementById('airbnbUrl').value,
        vrbo: document.getElementById('vrboUrl').value
      },
      virtualTour: {
        matterport: document.getElementById('matterportUrl').value,
        youtube: document.getElementById('youtubeUrl').value
      },
      socialMedia: {
        instagram: document.getElementById('instagramUrl').value,
        facebook: document.getElementById('facebookUrl').value,
        tiktok: document.getElementById('tiktokUrl').value
      }
    };
  }

  collectTestimonialsData() {
    const testimonials = [];
    document.querySelectorAll('#testimonialsList > div').forEach((item, index) => {
      const guestName = item.querySelector('[data-testimonial-field="guestName"]').value;
      const location = item.querySelector('[data-testimonial-field="location"]').value;
      const review = item.querySelector('[data-testimonial-field="review"]').value;
      const rating = parseInt(item.querySelector('[data-testimonial-field="rating"]').value);

      if (guestName && review) {
        testimonials.push({
          guestName,
          location,
          review,
          rating,
          order: index + 1
        });
      }
    });
    return testimonials;
  }

  async saveToSanity(propertyData, bookingData, testimonialsData) {
    // Update property
    await client.createOrReplace({
      _id: 'property-singleton',
      _type: 'property',
      ...propertyData
    });

    // Update booking links
    await client.createOrReplace({
      _id: 'booking-singleton',
      _type: 'bookingLinks',
      ...bookingData.bookingLinks
    });

    // Update virtual tour
    await client.createOrReplace({
      _id: 'virtualtour-singleton',
      _type: 'virtualTour',
      ...bookingData.virtualTour
    });

    // Update social media
    await client.createOrReplace({
      _id: 'social-singleton',
      _type: 'socialMedia',
      ...bookingData.socialMedia
    });

    // Update testimonials
    for (let i = 0; i < testimonialsData.length; i++) {
      await client.createOrReplace({
        _id: `testimonial-${i + 1}`,
        _type: 'testimonial',
        ...testimonialsData[i]
      });
    }
  }

  showStatus(message, type) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.className = `status ${type}`;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  }
}

// Global functions for HTML onclick handlers
window.login = function() {
  const password = document.getElementById('adminPassword').value;
  if (password === 'cottage2024') { // Simple password - you can change this
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
  } else {
    alert('Invalid password');
  }
};

window.switchTab = function(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

  // Show selected tab
  document.querySelector(`#${tabName}Tab`).classList.add('active');
  event.target.classList.add('active');
};

window.addFeature = function() {
  window.adminPanel.addFeatureToList({}, document.querySelectorAll('.feature-item').length);
};

window.addTestimonial = function() {
  window.adminPanel.addTestimonialToList({}, document.querySelectorAll('#testimonialsList > div').length);
};

window.saveAndDeploy = function() {
  window.adminPanel.saveAndDeploy();
};

// Initialize admin panel
window.adminPanel = new AdminPanel();