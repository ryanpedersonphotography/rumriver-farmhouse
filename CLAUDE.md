# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Core development
npm run dev          # Start Vite dev server (http://localhost:3000)
npm run build        # Build for production
npm run preview      # Preview production build

# CMS Development
npm run sanity       # Start Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio

# Analytics Backend
cd analytics-backend
npm install
npm start            # Start analytics server (http://localhost:3001)
npm run dev          # Start with nodemon auto-reload
```

## Architecture Overview

This is a **vacation rental property website template** based on the Breezy Cottage site. The architecture uses a hybrid approach combining static HTML with optional CMS integration.

### Technology Stack
- **Build System**: Vite (ES modules, multi-page app)
- **Frontend**: Vanilla JavaScript + HTML/CSS (no framework)
- **CMS**: Sanity (optional, with fallback to JSON/static content)
- **Analytics**: Custom Node.js/Express backend with GA4 Data API
- **Styling**: CSS modules with utility classes and component-based architecture
- **Images**: Optimized workflow with WebP conversion and responsive images

### Core Components Architecture

**Entry Points:**
- `index.html` - Main property website
- `manage.html` - Content management interface  
- `analytics.html` - Analytics dashboard

**JavaScript Modules:**
- `src/main.js` - Main entry point, initializes all components
- `src/js/` - Component modules (gallery, lightbox, navigation, animations)
- `src/lib/` - Sanity integration and utilities

**Styling System:**
- `src/styles/main.css` - Main stylesheet importing all components
- `src/styles/components/` - Component-specific styles
- `src/styles/utilities/` - Variables, animations, utilities
- Modular CSS with consistent naming conventions

### Content Management System

**Three-tier approach:**
1. **Sanity CMS** (preferred) - Full content management via `sanity-schemas/`
2. **JSON Configuration** - Static files in `src/data/`
3. **Direct HTML** - Fallback for simple sites

**Key Data Files:**
- `src/data/config.json` - Site configuration
- `src/data/gallery-images.json` - Gallery metadata
- `src/data/fallback-content.js` - Default content when CMS unavailable

### Image Management

**Structure:**
- `public/stills/` - Original property photos
- `public/stills/optimized/` - WebP + responsive versions
- `public/videos/` - Hero videos and optimized versions

**Naming Convention:**
- Original: `property_01.jpg`, `property_02.jpg`
- Optimized: `property_01-{size}.webp` (sm, md, lg, xl)

### Analytics Backend

**Separate Express server** (`analytics-backend/`) that:
- Connects to Google Analytics 4 Data API
- Provides REST endpoints for dashboard
- Handles real-time and historical data
- No database required - direct GA4 API access

## Development Workflow

### Setting Up New Property Site

1. **Update Template Variables** in `index.html`:
   ```html
   {{PROPERTY_NAME}} → "Your Property Name"
   {{SITE_URL}} → "https://yourproperty.com"
   {{GA4_MEASUREMENT_ID}} → "G-XXXXXXXXXX"
   ```

2. **Add Property Images** to `public/stills/`

3. **Configure Gallery** in `src/data/gallery-images.json`:
   - Categories: `exterior`, `living`, `bedroom`, `kitchen`, `bathroom`, `amenity`

4. **Customize Colors** in `src/styles/utilities/variables.css`

### CMS Integration

**For Sanity Setup:**
1. Update `projectId` in `sanity.config.js`
2. Configure environment variables
3. Deploy schemas: `npm run sanity:deploy`

**Schema Structure:**
- `property.js` - Main property info
- `hero.js` - Hero section content
- `galleryImage.js` - Image metadata
- `bookingLinks.js` - Reservation platforms

### Deployment Process

1. **Build**: `npm run build` (outputs to `dist/`)
2. **Vite Multi-page Setup**: Handles `index.html`, `manage.html`, `analytics.html`
3. **Assets**: Automatically processed and optimized
4. **Recommended Platform**: Netlify with automatic deployments

## Key Features

### Gallery System
- **Masonry Layout**: Using `masonry-layout` library
- **Category Filtering**: Dynamic filtering with smooth transitions
- **Lightbox**: Custom lightbox with navigation and captions
- **Lazy Loading**: Performance optimization for large image sets

### Shape Divider System
- **40+ Combinations**: Wave, curve, and geometric patterns
- **CSS-Only**: No SVG dependencies
- **Configurable**: `src/data/shape-dividers-config.js`
- **Responsive**: Adapts to different screen sizes

### Animation System
- **Intersection Observer**: Entrance animations only (no perpetual motion)
- **Performance-focused**: CSS transforms with GPU acceleration
- **Configurable**: `src/js/animations.js`

### Video Integration
- **Hero Background**: MP4/WebM with fallback poster
- **Video Lightbox**: Custom player with controls
- **Performance**: Lazy loading and format optimization

## File Organization Principles

**Component Isolation**: Each feature has its own CSS and JS files
**Utility-First CSS**: Consistent spacing, colors, typography via CSS variables
**Static-First**: HTML content with optional CMS enhancement
**Performance**: Optimized images, lazy loading, minimal JavaScript

## Important Configuration Files

- `vite.config.js` - Build configuration, multi-page setup
- `sanity.config.js` - CMS configuration and schema setup
- `src/styles/utilities/variables.css` - Design system tokens
- `package.json` - Dependencies and scripts
- `.env` - Environment variables for Sanity and analytics

## Development Notes

- **No Build Minification**: Disabled for easier debugging
- **ES Modules**: Native module support, no bundler complexity
- **Mobile-First**: Responsive design with progressive enhancement
- **SEO Optimized**: Structured data, meta tags, sitemap
- **Analytics Ready**: GA4 + custom dashboard integration