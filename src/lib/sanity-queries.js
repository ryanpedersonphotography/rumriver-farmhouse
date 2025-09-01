import { client } from './sanity.js'

// Fetch property information
export async function getProperty() {
  const query = `*[_type == "property"][0]{
    name,
    tagline,
    address,
    contact,
    features,
    amenities
  }`
  
  try {
    const property = await client.fetch(query)
    return property
  } catch (error) {
    console.warn('Failed to fetch property data from Sanity:', error)
    return null
  }
}

// Fetch hero section data
export async function getHero() {
  const query = `*[_type == "hero"][0]{
    type,
    videoSource,
    "heroImage": heroImage.asset->url,
    "fallbackImage": fallbackImage.asset->url
  }`
  
  try {
    const hero = await client.fetch(query)
    return hero
  } catch (error) {
    console.warn('Failed to fetch hero data from Sanity:', error)
    return null
  }
}

// Fetch gallery images
export async function getGalleryImages() {
  const query = `*[_type == "galleryImage"] | order(order asc){
    title,
    "imageUrl": image.asset->url,
    "imageMetadata": image.asset->metadata,
    alt,
    category,
    order
  }`
  
  try {
    const images = await client.fetch(query)
    return images
  } catch (error) {
    console.warn('Failed to fetch gallery images from Sanity:', error)
    return []
  }
}

// Fetch booking links
export async function getBookingLinks() {
  const query = `*[_type == "bookingLinks"][0]{
    airbnb,
    vrbo
  }`
  
  try {
    const bookingLinks = await client.fetch(query)
    return bookingLinks
  } catch (error) {
    console.warn('Failed to fetch booking links from Sanity:', error)
    return null
  }
}

// Fetch virtual tour data
export async function getVirtualTour() {
  const query = `*[_type == "virtualTour"][0]{
    matterport,
    youtube
  }`
  
  try {
    const virtualTour = await client.fetch(query)
    return virtualTour
  } catch (error) {
    console.warn('Failed to fetch virtual tour data from Sanity:', error)
    return null
  }
}

// Fetch social media links
export async function getSocialMedia() {
  const query = `*[_type == "socialMedia"][0]{
    instagram,
    facebook,
    tiktok
  }`
  
  try {
    const socialMedia = await client.fetch(query)
    return socialMedia
  } catch (error) {
    console.warn('Failed to fetch social media data from Sanity:', error)
    return null
  }
}

// Fetch testimonials
export async function getTestimonials() {
  const query = `*[_type == "testimonial"] | order(order asc){
    guestName,
    location,
    review,
    rating,
    order
  }`
  
  try {
    const testimonials = await client.fetch(query)
    return testimonials
  } catch (error) {
    console.warn('Failed to fetch testimonials from Sanity:', error)
    return []
  }
}

// Fetch all content for the site
export async function getAllContent() {
  try {
    const [
      property,
      hero,
      galleryImages,
      bookingLinks,
      virtualTour,
      socialMedia,
      testimonials
    ] = await Promise.all([
      getProperty(),
      getHero(),
      getGalleryImages(),
      getBookingLinks(),
      getVirtualTour(),
      getSocialMedia(),
      getTestimonials()
    ])

    return {
      property,
      hero,
      galleryImages,
      bookingLinks,
      virtualTour,
      socialMedia,
      testimonials
    }
  } catch (error) {
    console.warn('Failed to fetch content from Sanity:', error)
    return null
  }
}