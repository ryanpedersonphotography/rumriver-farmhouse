// Fallback content when Sanity is unavailable
export const fallbackContent = {
  property: {
    name: "Breezy Point Lakeview Cottage",
    tagline: "Experience the serenity of lakeside living",
    address: {
      street: "30539 N Lakeview Dr",
      city: "Breezy Point",
      state: "MN",
      zip: "56472"
    },
    contact: {
      phone: "+1 (612) 801-0546",
      email: "breezylakeviewcottage@gmail.com"
    },
    features: [
      {
        icon: "🏠",
        title: "Spacious Living",
        description: "4 bedrooms, 2 bathrooms<br>Sleeps up to 8 guests"
      },
      {
        icon: "🌊",
        title: "Waterfront Access", 
        description: "Private beach & dock<br>Stunning lake views"
      },
      {
        icon: "🔥",
        title: "Cozy Comfort",
        description: "Fireplace & fire pit<br>Perfect for gatherings"
      },
      {
        icon: "🍳",
        title: "Full Kitchen",
        description: "Modern appliances<br>Everything for meal prep"
      }
    ],
    amenities: [
      "High-Speed WiFi",
      "Smart TV with Streaming", 
      "Washer & Dryer",
      "Air Conditioning",
      "Outdoor Grill",
      "Kayaks & Paddleboards",
      "Board Games",
      "Coffee Maker",
      "Parking for 4 Cars",
      "Pet-Friendly",
      "Beach Towels",
      "First Aid Kit"
    ]
  },
  hero: {
    type: "video",
    videoSource: "/videos/site_video_no_audio.mp4",
    fallbackImage: "/stills/breezy_4.jpeg"
  },
  galleryImages: [], // Will be populated by existing gallery.js
  bookingLinks: {
    airbnb: "https://airbnb.com/h/lakeview-cottage-breezy-point",
    vrbo: "https://t.vrbo.io/S09ELUREbVb"
  },
  virtualTour: {
    matterport: "https://my.matterport.com/show/?m=TWdSds3vn6p",
    youtube: "https://youtu.be/tjoNyDYm1do"
  },
  socialMedia: {
    instagram: "https://instagram.com/breezylakeviewcottage",
    facebook: "https://facebook.com/breezylakeviewcottage", 
    tiktok: "https://www.tiktok.com/@breezylakeviewcottage"
  },
  testimonials: [
    {
      guestName: "Sarah & Mike",
      location: "Minneapolis, MN",
      review: "Perfect getaway! The cottage exceeded our expectations with its stunning lake views and cozy atmosphere. We'll definitely be back!",
      rating: 5,
      order: 1
    },
    {
      guestName: "The Johnson Family",
      location: "Chicago, IL", 
      review: "Amazing family vacation spot. The kids loved the kayaks and the adults enjoyed the peaceful mornings on the dock.",
      rating: 5,
      order: 2
    },
    {
      guestName: "Emily R.",
      location: "Des Moines, IA",
      review: "Clean, comfortable, and beautifully decorated. The kitchen had everything we needed and the fire pit nights were magical.",
      rating: 5,
      order: 3
    }
  ]
}