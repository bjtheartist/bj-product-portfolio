---
name: design-component
description: Create new React components following the BJTHEARTIST portfolio design patterns. Use when building new sections, UI elements, or interactive components for this portfolio.
---

# Design Component Guidelines

## When to Use This Skill
Use this when creating new React components for the portfolio, such as new sections, cards, buttons, or interactive elements.

## Component Structure

All components follow this pattern:

```tsx
import React from 'react';

const ComponentName: React.FC = () => {
  return (
    <section className="py-40 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Content here */}
      </div>
    </section>
  );
};

export default ComponentName;
```

## Design System

### Colors
- **Background**: `bg-black`, `bg-[#050505]`, `bg-zinc-900/30`
- **Primary accent**: `text-orange-600`, `bg-orange-600`
- **Text primary**: `text-white`
- **Text secondary**: `text-zinc-400`, `text-zinc-500`
- **Borders**: `border-white/5`, `border-white/10`

### Typography
- **Headings**: `font-black uppercase tracking-tighter`
- **Large titles**: `text-7xl md:text-9xl leading-[0.85]`
- **Section labels**: `text-[10px] font-black tracking-[0.3em] uppercase`
- **Body text**: `text-lg font-medium leading-relaxed`
- **Italic descriptions**: Add `italic` for editorial feel

### Spacing
- **Section padding**: `py-40 px-6 md:px-12`
- **Content max-width**: `max-w-7xl mx-auto`
- **Grid gaps**: `gap-12`, `gap-20`

### Interactive States
- **Hover text**: `hover:text-orange-600 transition-colors`
- **Image hover**: `grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100`
- **Button hover**: `group-hover:scale-110 group-active:scale-95`

### Common Patterns

**Section Header with Label:**
```tsx
<div className="space-y-4">
  <div className="flex items-center gap-4 text-orange-600">
    <span className="w-12 h-px bg-current"></span>
    <span className="text-[10px] font-black tracking-[0.4em] uppercase">Section Label</span>
  </div>
  <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none">
    Title Here
  </h2>
</div>
```

**Card with Hover Effect:**
```tsx
<div className="group cursor-pointer">
  <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-zinc-900 rounded-lg">
    <img
      src={imageUrl}
      alt={title}
      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
    />
  </div>
  <h3 className="text-3xl font-black tracking-tighter uppercase group-hover:text-orange-600 transition-colors">
    {title}
  </h3>
</div>
```

**CTA Button:**
```tsx
<button className="flex items-center gap-4 font-black text-sm group w-fit">
  <span className="tracking-[0.2em] uppercase">Button Text</span>
  <span className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  </span>
</button>
```

## File Location
Place new components in `/components/` and export as default.

## Data Management
- Define data types in `types.ts`
- Store static data in `constants.ts`
- Import data into components as needed
