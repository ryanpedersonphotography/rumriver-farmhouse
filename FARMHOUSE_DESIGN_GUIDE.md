# Farmhouse Rental Design Guide

## Design Philosophy
Creating a warm, welcoming aesthetic that combines rustic charm with modern comfort. The design emphasizes natural materials, cozy textures, and a connection to rural living while maintaining contemporary usability.

## Color Palette

### Primary Colors
- **Warm Cream**: #FAF6F0 - Main background, light sections
- **Barn Red**: #8B3A3A - Primary accent, CTAs, highlights
- **Sage Green**: #87A96B - Secondary accent, natural elements
- **Charcoal**: #3A3A3A - Text, dark elements

### Secondary Colors
- **Wheat**: #F5DEB3 - Warm highlights, hover states
- **Sky Blue**: #87CEEB - Soft accents, trust elements
- **Antique White**: #FAEBD7 - Alternative backgrounds
- **Wood Brown**: #8B6F47 - Borders, dividers

### Neutral Colors
- **Off-White**: #FEFEFA - Pure white alternative
- **Stone Gray**: #8B8680 - Muted text, secondary info
- **Deep Brown**: #4A3C28 - Footer, dark sections

## Typography

### Font Families
- **Headings**: 'Playfair Display', Georgia, serif - Elegant, traditional
- **Body**: 'Lato', 'Open Sans', sans-serif - Clean, readable
- **Accents**: 'Amatic SC', cursive - Handwritten, personal touches

### Font Sizes
- H1: 3.5rem (56px) - Hero titles
- H2: 2.5rem (40px) - Section headers
- H3: 1.875rem (30px) - Sub-sections
- H4: 1.5rem (24px) - Card titles
- Body: 1.125rem (18px) - Main content
- Small: 0.875rem (14px) - Captions, meta

### Font Weights
- Light: 300 - Subtle text
- Regular: 400 - Body text
- Semi-Bold: 600 - Emphasis
- Bold: 700 - Headers

## Spacing System
- Base unit: 8px
- Micro: 4px
- Small: 8px
- Medium: 16px
- Large: 32px
- XLarge: 48px
- XXLarge: 64px

## Design Elements

### Buttons
- **Primary**: Barn red background, cream text, rounded corners (8px)
- **Secondary**: Transparent with barn red border, barn red text
- **Hover**: Slight darkening, subtle scale (1.02)
- **Active**: Scale down (0.98)
- **Transitions**: 0.3s ease for all properties

### Cards
- Background: Cream or white
- Border: 1px solid wheat
- Border-radius: 12px
- Shadow: 0 4px 6px rgba(74, 60, 40, 0.1)
- Hover shadow: 0 8px 12px rgba(74, 60, 40, 0.15)
- Padding: 24px

### Navigation
- Background: Semi-transparent cream with backdrop blur
- Border-bottom: 1px solid wheat
- Link color: Charcoal
- Active/Hover: Barn red with underline animation

### Patterns & Dividers
- Subtle wood grain texture overlays
- Dotted borders using wheat color
- Chevron patterns for section breaks
- Natural leaf or wheat motifs for decorative elements

## Animations

### Entrance Animations
- Fade up: 0.6s ease-out, 20px translate
- Fade in: 0.4s ease-out
- Scale in: 0.5s cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions
- Button hover: Scale 1.02, color shift
- Card hover: Lift with shadow, 0.3s
- Link hover: Underline slide-in from left
- Image hover: Subtle zoom 1.05

### Loading States
- Gentle pulse animation
- Wheat-colored skeleton screens

## Component Styles

### Hero Section
- Overlay: Dark gradient with 0.4 opacity
- Title: Playfair Display, cream color
- Subtitle: Lato, light weight
- CTA buttons with barn red primary

### Feature Cards
- Icon containers with sage green backgrounds
- Rounded corners (50% for circles)
- Hover: Gentle rotation of icons

### Gallery
- Grid with 8px gaps
- Images with slight border-radius (8px)
- Hover: Scale and shadow lift
- Lightbox with dark overlay

### Footer
- Deep brown background
- Cream text
- Wheat-colored links
- Social icons with hover rotation

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Accessibility
- Minimum contrast ratio: 4.5:1 for normal text
- Focus states: 2px barn red outline
- Keyboard navigation support
- ARIA labels for decorative elements