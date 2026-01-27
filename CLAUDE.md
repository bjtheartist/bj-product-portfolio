# CLAUDE.md - Billy Ndizeye Portfolio

## Overview

This is Billy Ndizeye's personal portfolio website built with React 19, TypeScript, and Vite 6. The design follows a **neobrutalist aesthetic** with warm cream backgrounds, bold typography, and intentional design tension.

**Live URL:** https://billy-ndizeye-portfolio.vercel.app
**Canonical Domain:** kavara.studio

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.0.0 |
| Language | TypeScript 5.6.3 |
| Build | Vite 6.0.11 |
| Styling | Tailwind CSS (CDN) |
| Animation | GSAP 3.12.7 |
| Deployment | Vercel |

---

## Quick Commands

```bash
npm run dev      # Start development server (usually http://localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # ESLint check
npx vercel       # Deploy to Vercel
```

---

## Project Structure

```
ACTIVE-BJ-Portfolio/
├── App.tsx                    # Main app container with lazy loading
├── index.tsx                  # React entry point
├── index.html                 # HTML template with meta tags
├── components/
│   ├── HeroNeobrutalist.tsx   # Hero section with floating shapes
│   ├── NavbarNeobrutalist.tsx # Fixed navigation bar
│   ├── BioSection.tsx         # Two-column bio with headshot
│   ├── PortfolioGrid.tsx      # Flip-card project grid
│   ├── SkillsSection.tsx      # Design/Build/Ship categories
│   ├── ContactSection.tsx     # Contact form and links
│   ├── Footer.tsx             # Minimal footer
│   ├── FloatingShapes.tsx     # Animated geometric shapes
│   └── ThemeToggle.tsx        # Dark/light/color theme toggle
├── context/
│   └── ThemeContext.tsx       # Theme state management
├── styles/
│   └── tokens.ts              # Centralized design tokens
├── hooks/
│   └── useScrollAnimation.ts  # GSAP scroll animations
├── public/
│   ├── headshot.jpg           # Bio headshot (add this)
│   └── gallery/               # Project images (add these)
└── vercel.json                # Deployment config
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | #FAF9F6 | Primary background |
| `charcoal` | #1A1A1A | Primary text, borders |
| `red` | #dc2626 | Accent color, CTAs |
| `blue` | #3b82f6 | Cursor, selection |

### Typography

- **Display Font:** Bebas Neue (Google Fonts)
- **Body Font:** Inter / System UI
- **Hero Size:** `clamp(4rem, 15vw, 12rem)`

### Design Principles

1. **Neobrutalist Aesthetic:** Bold borders (2-3px), intentional asymmetry, raw geometric shapes
2. **Red Offset Shadows:** Cards use 8px offset shadows in red (#dc2626)
3. **Cream Background:** Warm, inviting base (#FAF9F6)
4. **Bebas Neue Headlines:** All major headings use this display font
5. **Subtle Grid Patterns:** Low-opacity grid overlays for texture

---

## Key Components

### App.tsx
Main container wrapping all sections. Uses React lazy loading for below-the-fold content:
- `BioSection`, `PortfolioGrid`, `SkillsSection`, `ContactSection`, `Footer` are lazy-loaded
- Custom cursor follows mouse with blue glow
- Global styles set smooth scrolling and custom scrollbar

### BioSection.tsx
Two-column layout with headshot and bio text.
- Left: Headshot with neobrutalist frame (red offset shadow)
- Right: Bio paragraphs, headline, quick stats
- Fallback placeholder if headshot.jpg is missing

### PortfolioGrid.tsx
Bento-style project grid with flip cards.
- Projects defined in `PROJECTS` array
- Each card flips on hover to show context
- Sizes: `large` (spans 2 cols), `small` (1 col)

### ThemeContext.tsx
Three theme modes: `dark` | `light` | `color`
- Persists to localStorage as `temsvision-theme`
- Respects system preference on first load
- `cycleTheme()` rotates through all three

### styles/tokens.ts
Centralized design tokens exported as typed constants:
- `colors`, `typography`, `animation`, `spacing`
- `borders`, `shadows`, `breakpoints`, `zIndex`

---

## Development Notes

### Adding a New Project

Edit `components/PortfolioGrid.tsx`, add to `PROJECTS` array:

```tsx
{
  id: 'project-slug',
  title: 'Project Name',
  skills: ['Skill 1', 'Skill 2'],
  description: 'Short description',
  context: 'Longer context shown on flip...',
  size: 'large' | 'small',
}
```

### Adding Headshot

Place image at `public/headshot.jpg`. The BioSection will automatically display it with the neobrutalist frame.

### Scroll Animations

Use the `useScrollAnimation` hook for GSAP ScrollTrigger effects:

```tsx
import useScrollAnimation from '../hooks/useScrollAnimation';

const ref = useScrollAnimation({
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
});
```

### Theme Colors by Mode

| Element | Dark | Light | Color |
|---------|------|-------|-------|
| Background | #000 | #fff | #1e40af |
| Text | #fff | #000 | #fff |
| Meta theme-color | #000000 | #ffffff | #1e40af |

---

## Assets Needed

- [ ] `public/headshot.jpg` - Bio section headshot
- [ ] `public/gallery/communidata.jpg` - CommuniData project image
- [ ] `public/gallery/capital-access.jpg` - Capital Access project image
- [ ] `public/og-image.jpg` - Open Graph preview (1200x630)
- [ ] `public/favicon.ico` - Favicon

---

## Deployment

The site deploys to Vercel automatically. Manual deploy:

```bash
npx vercel --prod
```

Vercel settings (in `vercel.json`):
- Framework: Vite
- Build command: `npm run build`
- Output: `dist/`

---

## Architecture Decisions

1. **Tailwind via CDN:** Faster iteration, no build config. For production scale, consider installing as dependency.

2. **Lazy Loading:** Components below the fold are lazy-loaded to improve initial paint.

3. **GSAP for Animation:** Chosen for scroll-triggered animations and timeline control.

4. **Three Theme Modes:** Dark/light standard, plus "color" mode for accent-heavy variant.

5. **Design Tokens File:** Centralized in `styles/tokens.ts` for consistency across components.

---

## Common Tasks

### Run Development Server
```bash
npm run dev
```
Server starts at http://localhost:5173 (or next available port).

### Build for Production
```bash
npm run build
```
Output goes to `dist/` directory.

### Deploy to Vercel
```bash
npx vercel --prod
```

### Update Project Data
Edit `components/PortfolioGrid.tsx` → `PROJECTS` array.

### Update Bio Content
Edit `components/BioSection.tsx` → bio paragraphs and headline.

---

## Owner

**Billy Ndizeye**
Product Designer & Builder
Chicago, Illinois

- Portfolio: kavara.studio
- GitHub: github.com/billyndizeye
- LinkedIn: linkedin.com/in/billyndizeye
