# Temsvision Website

A modern, visually stunning portfolio website inspired by the design aesthetic of [oshanehoward.com](https://www.oshanehoward.com/). Built with React, TypeScript, and Tailwind CSS.

## Features

- **Dark Theme with Gold Accents** - Sleek black background with amber/gold accent colors
- **Horizontal Scroll Portfolio** - Immersive project gallery with smooth horizontal scrolling
- **Animated Loading Screen** - Stylish preloader with animated counter
- **Full-Screen Menu Overlay** - Elegant navigation with smooth transitions
- **GSAP Animations** - Professional scroll-triggered animations throughout
- **Smooth Scrolling** - Lenis smooth scroll integration for desktop
- **Responsive Design** - Optimized for all screen sizes
- **Custom Cursor** - Interactive cursor with magnetic effects

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- GSAP (GreenSock Animation Platform)
- Lenis Smooth Scroll
- Vite

## Design Inspiration

This website draws inspiration from O'Shane Howard's portfolio, featuring:
- Minimalist, photography-focused layout
- Bracketed subtitle text style `[CREATIVE DIRECTOR & VISUAL STORYTELLER]`
- Menu toggle navigation
- "Scroll to explore" call-to-action
- Project categories displayed alongside titles
- Full-screen hero with background images

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── components/
│   ├── Hero.tsx          # Full-screen hero with rotating backgrounds
│   ├── Navbar.tsx        # Fixed header with menu toggle overlay
│   ├── Portfolio.tsx     # Horizontal scroll project gallery
│   ├── Services.tsx      # Services section with hover effects
│   ├── About.tsx         # About section with skills
│   ├── Contact.tsx       # Contact form and info
│   ├── Footer.tsx        # Site footer
│   ├── Preloader.tsx     # Loading animation
│   └── MagneticCursor.tsx # Custom cursor effects
├── context/
│   └── ThemeContext.tsx  # Theme management
├── constants.ts          # Site configuration and data
├── types.ts              # TypeScript types
├── App.tsx               # Main application component
└── index.html            # HTML entry point
```

## Customization

Edit `constants.ts` to update:
- Site name and tagline
- Project data
- Services
- Skills
- Social links
- Contact information

## License

MIT
