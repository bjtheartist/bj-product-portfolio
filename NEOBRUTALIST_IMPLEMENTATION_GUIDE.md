# Neobrutalist Design Implementation Guide

## What I Built For You

I've created a complete neobrutalist redesign of your portfolio hero section, inspired by [lorenzodaldosso.it](https://www.lorenzodaldosso.it/) but customized for your photography brand. Here's everything you need to know.

---

## Understanding React (Simple Explanation)

Think of building a website like building with LEGO blocks:

### Traditional HTML/CSS
Like gluing LEGO pieces together - once built, they're static and can't change.

### React
Like having **smart LEGO pieces** that can:
- Change color when you touch them
- Move around on their own
- Appear and disappear
- Remember things (like if a menu is open)

### Components
Each React file is a **"component"** - a reusable building block. Like a LEGO instruction booklet for one specific piece. You can use it once or a hundred times.

---

## What Each File Does

### 1. `HeroNeobrutalist.tsx` - The Star of the Show

This is your new hero section. It contains:

| Feature | What It Does |
|---------|--------------|
| **FloatingElement** | Creates bouncing shapes (circles, diamonds, stars) |
| **Marquee** | The scrolling text band showing your services |
| **ProgressIndicator** | The "01 ——— 04" section counter |
| **Main Hero** | Combines everything with your bold name |

**Key Concepts Explained:**

```
useState - Like a light switch that remembers if it's on or off
useEffect - Like setting an alarm that triggers when something happens
animation - Instructions for how things should move over time
```

### 2. `NavbarNeobrutalist.tsx` - Minimal Navigation

Creates the Lorenzo-style corner navigation:
- "Menu" button in top-left
- "Contact" link in top-right
- Full-screen dark overlay when menu opens

### 3. `AppNeobrutalist.tsx` - The Container

This wraps everything together:
- Sets up the cream background
- Adds the custom cursor (blue dot that follows your mouse)
- Loads all sections in order

### 4. `index.tsx` - The Switch

Contains a simple toggle to switch between designs:

```javascript
const USE_NEOBRUTALIST_DESIGN = true;  // New design
const USE_NEOBRUTALIST_DESIGN = false; // Original design
```

---

## The Design Elements Explained

### Color Palette

| Color | Hex Code | Where It's Used |
|-------|----------|-----------------|
| Warm Cream | `#FAF9F6` | Background |
| Near Black | `#1A1A1A` | Text, borders |
| Your Blue | `#3b82f6` | Accents, floating elements |
| Cyan | `#22d3ee` | Secondary accents |

### Typography

- **Bebas Neue** - Bold display font for headlines (your name, section titles)
- **Inter** - Clean body font for descriptions

### The "Lorenzo Touch"

The diamond symbol (◆) replaces the "O" in your name:
```
TEMS◆VISI◆N
```
This creates a memorable, branded look.

---

## How the Animations Work

### Floating Elements (Bouncing)

Imagine an element that:
1. Starts at position Y
2. Floats up 20 pixels over 3 seconds
3. Floats back down over 3 seconds
4. Repeats forever

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
```

### Depth Layers

Three invisible layers create depth:
- **Back Layer** (1): Large, faded shapes - move slow
- **Middle Layer** (2): Medium elements - normal speed
- **Front Layer** (3): Small, sharp shapes - move fast

### Marquee (Scrolling Text)

The services text scrolls continuously:
1. Text starts on the right
2. Moves left at constant speed
3. When it exits left, it reappears on right
4. Creates infinite loop illusion

---

## How to Deploy

### Option 1: Vercel (Recommended)

Your repo is already set up for Vercel. Just:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. It auto-detects Vite and deploys

### Option 2: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`

### Option 3: GitHub Pages

1. Run `npm run build`
2. Push the `dist` folder to a `gh-pages` branch

---

## How to Customize

### Change Your Name Display

In `HeroNeobrutalist.tsx`, find this section:
```jsx
<h1>
  TEMS
  <span className="text-[#3b82f6]">◆</span>
  VISI
  <span className="text-[#3b82f6]">◆</span>
  N
</h1>
```

Change "TEMS◆VISI◆N" to whatever you want.

### Change the Services in Marquee

Find the `services` array:
```javascript
const services = [
  'Portraits',
  'Sports',
  'Maternity',
  // Add or remove services here
];
```

### Change Floating Elements

Find the `floatingElements` array and modify:
- `shape`: circle, diamond, square, ring, star, photo
- `color`: Any hex color
- `size`: Size in pixels
- `position`: Where on screen (top/left as percentages)
- `layer`: 1 (back), 2 (middle), 3 (front)

### Change Colors

Search for these hex codes and replace:
- `#FAF9F6` - Background cream
- `#1A1A1A` - Text black
- `#3b82f6` - Accent blue

---

## Switching Between Designs

To go back to your original design:

1. Open `index.tsx`
2. Change line 15 from:
   ```javascript
   const USE_NEOBRUTALIST_DESIGN = true;
   ```
   to:
   ```javascript
   const USE_NEOBRUTALIST_DESIGN = false;
   ```
3. Save and rebuild

---

## Files Changed/Added

### New Files
- `components/HeroNeobrutalist.tsx` - New hero section
- `components/NavbarNeobrutalist.tsx` - New navigation
- `AppNeobrutalist.tsx` - New app container
- `DESIGN_TRANSFORMATION_GUIDE.md` - Design documentation
- `index.neobrutalist.html` - Alternative HTML entry
- `index.neobrutalist.tsx` - Alternative JS entry

### Modified Files
- `index.tsx` - Added design switcher
- `index.html` - Changed to light theme

---

## What "React" and "Next.js" Mean

### React
A JavaScript library for building user interfaces. It lets you create reusable components that update efficiently.

**Analogy**: If HTML is the skeleton and CSS is the skin, React is the nervous system that makes everything respond and move.

### Next.js
A framework built on top of React that adds:
- Server-side rendering (faster initial load)
- File-based routing (pages folder = URLs)
- API routes (backend in the same project)
- Image optimization

**Your Current Setup**: Uses React with Vite (simpler, faster development). Next.js would be an upgrade if you need server-side features later.

---

## Need Help?

The code is heavily commented to explain what each part does. Look for comments starting with:
- `// WHAT THIS DOES:` - Explains the purpose
- `// REACT CONCEPT:` - Explains React-specific ideas
- `// HOW TO:` - Instructions for customization

---

*Built with care for TemsVision Photography*
