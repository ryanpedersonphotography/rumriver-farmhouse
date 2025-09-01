# Property Website Setup Instructions

This template is based on the Breezy Cottage vacation rental website and provides a complete system for creating new property websites quickly and efficiently.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Domain registered (optional for initial setup)

### 1. Clone and Setup Project
```bash
# Copy this template to new location
cp -r /path/to/property-blank /path/to/your-new-site
cd /path/to/your-new-site

# Initialize new git repository
rm -rf .git
git init
git add .
git commit -m "Initial commit from property template"

# Install dependencies
npm install
```

### 2. Configure Environment Variables
```bash
# Copy environment template
cp .env.template .env

# Edit .env with your actual values:
# VITE_SANITY_PROJECT_ID=your-project-id
# SANITY_API_TOKEN=your-token
# GA4_PROPERTY_ID=your-property-id
```

### 3. Add Your Property Images
```bash
# Add your property photos to public/stills/
# Recommended naming: property_01.jpg, property_02.jpg, etc.
# Supported formats: .jpg, .jpeg, .png, .webp

# Optional: Add hero video to public/videos/
# Name it: hero.mp4 (or similar)
```

### 4. Update Content
Edit these key areas in `index.html`:

#### Template Variables to Replace
Search and replace these placeholders throughout the HTML:

```html
{{PROPERTY_NAME}} → "Your Property Name"
{{PROPERTY_TAGLINE}} → "Your Property Tagline"
{{PROPERTY_DESCRIPTION}} → "Brief description for meta tags"
{{SITE_URL}} → "https://yourproperty.com"
{{HERO_IMAGE}} → "property_01.jpg"
{{PHONE_NUMBER}} → "+1 (555) 123-4567"
{{EMAIL_ADDRESS}} → "info@yourproperty.com"
{{STREET_ADDRESS}} → "123 Main St"
{{CITY}} → "Your City"
{{STATE}} → "ST"
{{ZIP_CODE}} → "12345"
{{COUNTRY}} → "US"
{{LATITUDE}} → 40.7128
{{LONGITUDE}} → -74.0060
{{GTM_ID}} → "GTM-XXXXXXX"
{{GA4_MEASUREMENT_ID}} → "G-XXXXXXXXXX"
```

### 5. Configure Gallery Images
Edit `src/data/gallery-images.json` with your actual images:

```json
[
  {
    "id": 1,
    "src": "/stills/property_01.jpg",
    "category": "exterior",
    "title": "Property Exterior",
    "description": "Beautiful property exterior view"
  },
  {
    "id": 2,
    "src": "/stills/property_02.jpg",
    "category": "living",
    "title": "Living Room",
    "description": "Spacious living room"
  }
]
```

**Categories available:**
- `exterior` - Outdoor views, building exterior
- `living` - Living rooms, common areas
- `bedroom` - Bedrooms
- `kitchen` - Kitchen and dining areas
- `bathroom` - Bathrooms
- `amenity` - Special amenities, outdoor spaces

## 🎨 Customization

### Colors and Theme
Edit `src/styles/utilities/variables.css`:

```css
:root {
  /* Primary Colors - Update these for your property */
  --navy: #1e3a5f;        /* Dark blue */
  --ocean: #2d5a87;       /* Medium blue */
  --sky: #4a7fb8;         /* Light blue */
  --powder: #7aa3d4;      /* Powder blue */
  --mist: #a8c5e6;        /* Very light blue */
  --frost: #ebf2fa;       /* Near white blue */
  
  /* Update these to match your property's style */
  --primary: var(--ocean);
  --secondary: var(--sky);
  --accent: var(--powder);
}
```

### Typography
The site uses:
- **Headings**: Playfair Display (elegant serif)
- **Body**: Inter (clean sans-serif)

To change fonts, update the Google Fonts import in `index.html` and the CSS variables.

### Shape Dividers
The template includes 40+ shape divider combinations. Current usage:
- Hero section: Wave divider transitioning to content
- Between sections: Various wave styles for visual flow

See `src/styles/components/shape-dividers-library.css` for all available options.

## 🗄️ Content Management

### Option 1: Sanity CMS (Recommended)
1. Create new Sanity project:
```bash
npm install -g @sanity/cli
sanity login
sanity init --coupon YOUR_COUPON
```

2. Copy schema files to your new Sanity project
3. Update `sanity.config.js` with your project ID
4. Deploy studio: `sanity deploy`
5. Access at `your-project.sanity.studio`

### Option 2: JSON Configuration
Edit files in `src/data/`:
- `config.json` - Basic site configuration
- `gallery-images.json` - Gallery images and metadata
- `fallback-content.js` - Default content when CMS is unavailable

### Option 3: Direct HTML Editing
All content can be edited directly in `index.html` for simpler sites.

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property (see documentation)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Update `{{GA4_MEASUREMENT_ID}}` in HTML
4. Configure enhanced ecommerce (optional)

### Analytics Backend
The included backend provides admin dashboard at `/analytics.html`:

1. Get GA4 service account key
2. Place in `analytics-backend/ga4-service-account.json`
3. Start backend: `cd analytics-backend && npm start`
4. Configure environment variables

## 🚀 Deployment

### Netlify (Recommended)
```bash
# Link to Netlify
netlify login
netlify init

# Deploy
npm run build
netlify deploy --prod
```

### Manual Setup
1. Build: `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure redirects for SPA routing (if needed)

### Domain Configuration
1. Purchase domain through NameCheap or preferred registrar
2. Add custom domain in Netlify
3. Update DNS records:
   - Type: A, Name: @, Value: 75.2.60.5
   - Type: CNAME, Name: www, Value: your-site.netlify.app

## 🎯 Features Included

### ✅ Complete Feature Set
- **Video Hero Background** with fallback image
- **Masonry Photo Gallery** with categories and lightbox
- **3D Virtual Tour** integration (Matterport)
- **Interactive Map** (Leaflet/OpenStreetMap)
- **Booking Integration** (Airbnb, VRBO links)
- **Shape Divider System** (40+ combinations)
- **Responsive Design** (mobile-first)
- **Performance Optimized** (lazy loading, WebP images)
- **SEO Ready** (structured data, meta tags)
- **Analytics Dashboard** (GA4 integration)
- **CMS Integration** (Sanity)

### 🎨 Design System
- **Colors**: Ocean-themed blue palette (customizable)
- **Typography**: Playfair Display + Inter
- **Spacing**: Consistent section padding system
- **Components**: Reusable card and section layouts
- **Animations**: Entrance animations only (no perpetual motion)

## 📁 Project Structure

```
your-site/
├── public/
│   ├── stills/           # Property photos
│   ├── videos/           # Hero videos
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── js/               # JavaScript modules
│   ├── styles/           # CSS components
│   ├── lib/              # Sanity integration
│   ├── data/             # JSON configuration
│   └── react/            # React components (optional)
├── sanity-schemas/       # Sanity CMS schemas
├── analytics-backend/    # GA4 analytics server
├── index.html            # Main HTML file
├── analytics.html        # Analytics dashboard
└── manage.html          # Content management
```

## 🛠️ Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run sanity       # Start Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio
```

## 🔧 Troubleshooting

### Images Not Loading
- Check file paths in `src/data/gallery-images.json`
- Ensure images are in `/public/stills/` directory
- Verify image file extensions match JSON config

### CMS Not Working
- Check Sanity project ID in `sanity.config.js`
- Verify API token in `.env` file
- Ensure CORS settings in Sanity dashboard

### Build Fails
- Run `npm install` to ensure dependencies
- Check Node version (requires 18+)
- Verify no TypeScript errors (run `npm run build`)

### Analytics Not Tracking
- Verify GA4 Measurement ID
- Check browser ad blockers
- Ensure proper domain configuration

## 📖 Additional Resources

- **Original Site**: https://breezylakeviewcottage.com
- **Sanity Documentation**: https://sanity.io/docs
- **Vite Documentation**: https://vitejs.dev
- **Netlify Documentation**: https://docs.netlify.com

## 🆘 Support

For issues with the template:
1. Check this documentation first
2. Review the original Breezy Cottage codebase
3. Consult the included documentation files

---

*Template created from Breezy Point Lakeview Cottage (September 2025)*