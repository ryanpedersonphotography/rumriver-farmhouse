import { getAllContent } from '../lib/sanity-queries.js'
import { fallbackContent } from '../data/fallback-content.js'

class ContentManager {
  constructor() {
    this.content = null
    this.isLoaded = false
  }

  async loadContent() {
    if (this.isLoaded) return this.content

    try {
      console.log('Loading content from Sanity...')
      
      // Try to fetch from Sanity
      const sanityContent = await getAllContent()
      
      if (sanityContent && this.hasValidContent(sanityContent)) {
        console.log('Successfully loaded content from Sanity')
        this.content = sanityContent
      } else {
        console.log('Using fallback content')
        this.content = fallbackContent
      }
      
      this.isLoaded = true
      return this.content
      
    } catch (error) {
      console.warn('Error loading content, using fallback:', error)
      this.content = fallbackContent
      this.isLoaded = true
      return this.content
    }
  }

  hasValidContent(content) {
    // Check if we have at least the basic required content
    return content && 
           content.property && 
           content.property.name &&
           content.property.contact
  }

  async getProperty() {
    const content = await this.loadContent()
    return content.property
  }

  async getHero() {
    const content = await this.loadContent()
    return content.hero
  }

  async getGalleryImages() {
    const content = await this.loadContent()
    return content.galleryImages
  }

  async getBookingLinks() {
    const content = await this.loadContent()
    return content.bookingLinks
  }

  async getVirtualTour() {
    const content = await this.loadContent()
    return content.virtualTour
  }

  async getSocialMedia() {
    const content = await this.loadContent()
    return content.socialMedia
  }

  async getTestimonials() {
    const content = await this.loadContent()
    return content.testimonials
  }
}

// Export a singleton instance
export const contentManager = new ContentManager()