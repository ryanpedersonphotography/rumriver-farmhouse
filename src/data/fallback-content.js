// Fallback content when Sanity is unavailable
export const fallbackContent = {
  property: {
    name: "Lorem Ipsum Vacation Rental",
    tagline: "Lorem ipsum dolor sit amet consectetur",
    address: {
      street: "123 Lorem Street",
      city: "Ipsum City",
      state: "XX",
      zip: "12345"
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "lorem@ipsum.com"
    },
    features: [
      {
        icon: "🏠",
        title: "Lorem Ipsum",
        description: "Lorem ipsum dolor<br>Consectetur adipiscing"
      },
      {
        icon: "🌊",
        title: "Dolor Sit", 
        description: "Amet consectetur<br>Adipiscing elit"
      },
      {
        icon: "🔥",
        title: "Consectetur",
        description: "Elit sed do<br>Eiusmod tempor"
      },
      {
        icon: "🍳",
        title: "Tempor Incididunt",
        description: "Ut labore et<br>Dolore magna"
      }
    ],
    amenities: [
      "Lorem Ipsum",
      "Dolor Sit Amet", 
      "Consectetur Adipiscing",
      "Elit Sed Do",
      "Eiusmod Tempor",
      "Incididunt Ut",
      "Labore Et Dolore",
      "Magna Aliqua",
      "Ut Enim Ad",
      "Minim Veniam",
      "Quis Nostrud",
      "Exercitation"
    ]
  },
  hero: {
    type: "video",
    videoSource: "/videos/site_video_no_audio.mp4",
    fallbackImage: "/stills/hero-placeholder.jpg"
  },
  galleryImages: [], // Will be populated by existing gallery.js
  bookingLinks: {
    airbnb: "https://airbnb.com/h/lorem-ipsum-rental",
    vrbo: "https://vrbo.com/lorem-ipsum"
  },
  virtualTour: {
    matterport: "https://my.matterport.com/show/?m=LoremIpsum123",
    youtube: "https://youtu.be/LoremIpsum123"
  },
  socialMedia: {
    instagram: "https://instagram.com/loremipsum",
    facebook: "https://facebook.com/loremipsum", 
    tiktok: "https://www.tiktok.com/@loremipsum"
  },
  testimonials: [
    {
      guestName: "Lorem & Ipsum",
      location: "Dolor City, XX",
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 5,
      order: 1
    },
    {
      guestName: "The Consectetur Family",
      location: "Adipiscing, XX", 
      review: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 5,
      order: 2
    },
    {
      guestName: "Sed D.",
      location: "Tempor City, XX",
      review: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      rating: 5,
      order: 3
    }
  ]
}