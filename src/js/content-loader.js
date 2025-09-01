import { contentManager } from './content-manager.js'

// Content loading and DOM updating functions
export class ContentLoader {
  static async loadPropertyDetails() {
    const property = await contentManager.getProperty()
    if (!property) return

    // Update property name in header
    const propertyNameEl = document.querySelector('.property-name')
    if (propertyNameEl && property.name) {
      propertyNameEl.textContent = property.name
    }

    // Update tagline
    const taglineEl = document.querySelector('.property-tagline')
    if (taglineEl && property.tagline) {
      taglineEl.textContent = property.tagline
    }

    // Update contact info
    if (property.contact) {
      const phoneEl = document.querySelector('.contact-phone')
      const emailEl = document.querySelector('.contact-email')
      
      if (phoneEl && property.contact.phone) {
        phoneEl.textContent = property.contact.phone
        phoneEl.href = `tel:${property.contact.phone}`
      }
      
      if (emailEl && property.contact.email) {
        emailEl.textContent = property.contact.email
        emailEl.href = `mailto:${property.contact.email}`
      }
    }

    // Update features
    if (property.features) {
      this.updateFeatures(property.features)
    }

    // Update amenities
    if (property.amenities) {
      this.updateAmenities(property.amenities)
    }
  }

  static updateFeatures(features) {
    const featuresContainer = document.querySelector('.property-features')
    if (!featuresContainer) return

    featuresContainer.innerHTML = features.map(feature => `
      <div class="feature-card">
        <div class="feature-icon">${feature.icon}</div>
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-description">${feature.description}</p>
      </div>
    `).join('')
  }

  static updateAmenities(amenities) {
    const amenitiesContainer = document.querySelector('.amenities-list')
    if (!amenitiesContainer) return

    amenitiesContainer.innerHTML = amenities.map(amenity => `
      <li class="amenity-item">
        <span class="amenity-check">✓</span>
        ${amenity}
      </li>
    `).join('')
  }

  static async loadBookingLinks() {
    const bookingLinks = await contentManager.getBookingLinks()
    if (!bookingLinks) return

    const airbnbBtn = document.querySelector('.airbnb-link')
    const vrboBtn = document.querySelector('.vrbo-link')

    if (airbnbBtn && bookingLinks.airbnb) {
      airbnbBtn.href = bookingLinks.airbnb
    }

    if (vrboBtn && bookingLinks.vrbo) {
      vrboBtn.href = bookingLinks.vrbo
    }
  }

  static async loadVirtualTour() {
    const virtualTour = await contentManager.getVirtualTour()
    if (!virtualTour) return

    // Update Matterport iframe
    const matterportFrame = document.querySelector('.matterport-iframe')
    if (matterportFrame && virtualTour.matterport) {
      matterportFrame.src = virtualTour.matterport
    }

    // Update YouTube video link
    const youtubeLink = document.querySelector('.youtube-video-link')
    if (youtubeLink && virtualTour.youtube) {
      youtubeLink.href = virtualTour.youtube
    }
  }

  static async loadSocialMedia() {
    const socialMedia = await contentManager.getSocialMedia()
    if (!socialMedia) return

    const instagramLink = document.querySelector('.social-instagram')
    const facebookLink = document.querySelector('.social-facebook')
    const tiktokLink = document.querySelector('.social-tiktok')

    if (instagramLink && socialMedia.instagram) {
      instagramLink.href = socialMedia.instagram
    }

    if (facebookLink && socialMedia.facebook) {
      facebookLink.href = socialMedia.facebook
    }

    if (tiktokLink && socialMedia.tiktok) {
      tiktokLink.href = socialMedia.tiktok
    }
  }

  static async loadTestimonials() {
    const testimonials = await contentManager.getTestimonials()
    if (!testimonials || testimonials.length === 0) return

    const testimonialsContainer = document.querySelector('.testimonials-scroll')
    if (!testimonialsContainer) return

    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="stars">
          ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
        </div>
        <p class="testimonial-text">"${testimonial.review}"</p>
        <div class="testimonial-author">
          <strong>${testimonial.guestName}</strong>
          ${testimonial.location ? ` - ${testimonial.location}` : ''}
        </div>
      </div>
    `).join('')
  }

  // Load all content
  static async loadAllContent() {
    console.log('Loading all content from Sanity...')
    
    try {
      await Promise.all([
        this.loadPropertyDetails(),
        this.loadBookingLinks(),
        this.loadVirtualTour(),
        this.loadSocialMedia(),
        this.loadTestimonials()
      ])
      
      console.log('All content loaded successfully')
    } catch (error) {
      console.warn('Error loading some content:', error)
    }
  }
}