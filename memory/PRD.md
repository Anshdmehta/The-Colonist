# The Colonist — School of Game Design
## Product Requirements Document

**Date Created:** December 2025  
**Last Updated:** December 2025

---

## Original Problem Statement

Build a premium game art academy homepage for "The Colonist — School of Game Design" with modern digital art studio aesthetics, inspired by high-end portfolio sites and game development studios. The design should prioritize artwork, clarity, and professionalism with a minimal Apple-like UI.

---

## Design System

### Colors
- Background: `#0E0E11`
- Alternate section background: `#16161B`
- Accent color: `#F2C94C`
- Primary text: `#F5F5F7`
- Secondary text: `#B5B5C0`

### Typography
- Headings: Sora (Google Fonts)
- Body text: Inter (Google Fonts)
- Hero title: 64px
- Section titles: 36px
- Body text: 16px

---

## User Personas

1. **Prospective Students** - Individuals seeking professional game art training
2. **Parents/Guardians** - Decision-makers evaluating training programs
3. **Industry Partners** - Studios looking for talent and collaboration
4. **Alumni** - Former students showcasing their journey

---

## Core Requirements

### Homepage Structure (11 Sections)
1. Header - Fixed navigation with transparent to solid transition on scroll
2. Hero - Large artwork with headline and CTAs
3. Programs Interactive Section - Hover-based program showcase
4. Portfolio Showcase - 2-column grid of student work
5. Training Approach - 4 key focus areas in cards
6. Studio Opportunities - 3 opportunity types with background image
7. Career Pathways - 5 career roles in grid
8. Industry Connections - Logo strip of partner studios
9. Who We Are - Text + image about the academy
10. Final CTA - Call-to-action with background image
11. Footer - 3 columns with links, social icons, contact info

### Additional Pages (Placeholders)
- `/programs` - Programs detail page
- `/portfolio` - Full portfolio gallery
- `/contact` - Contact form and information
- `/agreement` - Universal agreement/terms

---

## What's Been Implemented

**Date:** December 2025

### ✅ Complete Homepage Structure
- All 11 sections implemented with exact design specifications
- Responsive layout using Tailwind CSS
- Shadcn UI components (Button, Card)
- Lucide React icons for social media

### ✅ Navigation & Routing
- React Router setup with 5 routes (Home, Programs, Portfolio, Contact, Agreement)
- Fixed header with scroll-based background transition
- Active link highlighting
- Smooth scroll behavior

### ✅ Interactive Programs Section
- Hover-based program switching (4 programs)
- Gold accent indicator for active program
- Smooth crossfade transitions for artwork
- Letter-spacing animation on hover
- Radial gradient lighting effect

### ✅ Design System Implementation
- Sora and Inter fonts imported from Google Fonts
- Exact color scheme applied throughout
- Consistent spacing and typography
- Dark theme with professional aesthetics

### ✅ Footer & Social Links
- 3-column footer layout
- Social media integration (Instagram, Facebook, LinkedIn, YouTube)
- Contact information (email, phone, location)
- External links to studio website and Google Maps

### ✅ Placeholder Pages
- Programs, Portfolio, Contact, Agreement pages created
- Header and Footer included on all pages
- Consistent styling across pages

---

## Architecture & Tech Stack

### Frontend
- React 19
- React Router v7
- Tailwind CSS
- Shadcn UI Components
- Lucide React Icons
- Google Fonts (Sora, Inter)

### File Structure
```
/app/frontend/src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ui/ (Shadcn components)
├── pages/
│   ├── Home.jsx
│   ├── Programs.jsx
│   ├── Portfolio.jsx
│   ├── Contact.jsx
│   └── Agreement.jsx
├── App.js
├── App.css
└── index.css
```

---

## Next Tasks

### P0 - Critical (User Action Required)
- [ ] Upload all image assets to `/public` folder:
  - TC_logo.png
  - White_mech.png
  - assets/programs/ (piston.png, lamp.png, armor.png, pistol.png, aston.png, pagani.png, female_mech.png, yellow_robot.png)
  - crossbow.png, rifle.png, aston_martin.png, i20.png, bren.png, Ogmech.png
  - Studio1.png, studio3.webp, devil.png
  - rockstar_games.png, ubisoft_games.png, lakshay_digital.png, amazon.png, reeboot_games.png, sumo_digital.png, mandali_games.png

### P1 - High Priority (Future Enhancements)
- [ ] Add micro-interactions and advanced animations
- [ ] Implement scroll-triggered animations (fade-in, slide-up)
- [ ] Add parallax effects to hero section
- [ ] Enhance image hover effects in portfolio
- [ ] Mobile menu implementation (hamburger menu)
- [ ] Add loading states for images

### P2 - Medium Priority (Content Pages)
- [ ] Build detailed Programs page with program information
- [ ] Create full Portfolio gallery with filtering/categories
- [ ] Develop Contact page with form and map integration
- [ ] Add Universal Agreement content

### P3 - Low Priority (Nice to Have)
- [ ] Add testimonials section
- [ ] Implement blog/news section
- [ ] Add video showcases
- [ ] Backend integration for contact form
- [ ] Analytics integration

---

## Success Metrics
- Fast page load times (< 2 seconds)
- Responsive across all devices (mobile, tablet, desktop)
- Professional, agency-quality design
- Clear conversion paths to consultation booking
- Easy navigation and content discovery

---

## Notes
- No backend implementation required at this stage
- All external links verified and implemented
- Design follows best practices (no dark gradients, professional color scheme)
- Ready for image assets to be uploaded by client

---

## Design Refinements - December 2025

### Visual Design Improvements Applied

**Global Styling**
- Enhanced typography: Headings now use font-weight 600, body text 400
- Improved line height for body text: 1.6 for better readability
- Updated text colors: Primary #F5F5F7, Secondary #B5B5C0
- Increased vertical spacing: 120px desktop, 80px mobile
- Removed heavy shadows in favor of subtle borders (#2A2A33)

**Header Refinements**
- Logo reduced to 32px height (previously 48px)
- Navigation link spacing increased to 48px
- Button sizing optimized: 44px height, 18px horizontal padding
- Improved font sizing: 14px for navigation and button text

**Hero Section**
- Repositioned to left-aligned layout
- Added max-width constraints: 900px title, 640px subtitle
- Prepared for right-side artwork display at `/hero/white-mech.png`
- Added radial gradient lighting effect behind artwork area
- Updated button styling: Primary (#F2C94C) and subtle border secondary
- Reduced spacing between elements for better visual balance

**Programs Interactive Section**
- Reduced program title font size from 32px to 28px
- Removed button-like appearance from program titles
- Active state now uses accent color #F2C94C (instead of white)
- Increased spacing between titles to 32px
- Simplified fade transitions (removed scale effect)
- Reduced radial gradient intensity for subtlety

**Portfolio Section**
- Removed heavy card backgrounds
- Images appear directly on page background
- Increased grid gap from 24px to 32px
- Maintained natural image proportions
- Subtle hover scale effect (1.03)
- Minimal approach with rounded corners only

**Card Components (Training, Studio, Career)**
- Converted from dark solid cards to bordered panels
- New styling: #16161B background with #2A2A33 border
- Border radius: 10px for consistency
- Added subtle hover lift effect (-3px translateY)
- Removed clickable appearance
- Increased internal padding to 32px
- Cards now feel informational rather than interactive

**Industry Connections**
- Logo height standardized to 32px
- Maintained 70% default opacity, 100% on hover
- Improved text styling for header

**Who We Are**
- Updated image path to `/studio/studio3.webp`
- Added max-width constraint: 680px for text
- Enhanced line height for better readability

**Final CTA**
- Centered button with max-width: 240px
- Maintained visual strength while keeping minimal aesthetic
- Improved spacing and typography

### Design Philosophy Achieved
- Premium digital studio aesthetic similar to Apple's minimal design
- Hierarchy through spacing, typography, and contrast (not shadows/glows)
- No glassmorphism or heavy effects
- Professional, clean, and sophisticated
- Agency-quality appearance throughout

---


---

## Hero Section Enhancement - December 2025

### Full-Screen Background Image Implementation

**Updated Hero Container**
- Changed to full-screen immersive design
- Background: Pure black (#000000)
- Robot image now serves as background layer instead of inline element

**Background Image Layer**
- Robot image positioned as `bg-cover bg-right bg-no-repeat`
- Applied filter effects: `brightness(0.9) contrast(1.05) blur(0.5px)`
- Robot face prominently displayed on right side of screen
- Desktop/tablet only (hidden on mobile)

**Gradient Overlay System**
- Primary gradient: `linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 35%, rgba(0,0,0,0) 70%)`
  - Creates smooth left-to-right fade for text readability
- Secondary gradient: `radial-gradient(circle at 25% 50%, rgba(0,0,0,0.35), transparent 45%)`
  - Adds subtle vignette effect for depth

**Text Protection Layer**
- Blurred gradient shield behind text area
- Gradient: `linear-gradient(to right, rgba(0,0,0,0.45), rgba(0,0,0,0.2), transparent)`
- Applied blur: 6px
- Prevents white robot areas from interfering with text readability

**Typography Enhancement**
- Text shadow added to heading: `0 2px 18px rgba(0,0,0,0.6)`
- Improved contrast against background
- Max-width: 700px for text container

**Responsive Behavior**
- **Desktop/Tablet (≥640px):** Full-screen background image with gradient overlays
- **Mobile (<640px):** 
  - Background image hidden
  - Robot displayed as inline `<img>` below CTA buttons
  - Image constrained: max-height 40vh, full width
  - Rounded corners for polish
  - Lazy loading enabled
  - Descriptive alt text: "Futuristic robotic face representing game art training"

**Visual Result**
- Cinematic, immersive hero section
- Professional game studio aesthetic
- Robot face with glowing blue eyes creates strong visual impact
- Text remains highly readable across all contexts
- Smooth blending between image and dark UI
- Fully responsive across all device sizes

---

