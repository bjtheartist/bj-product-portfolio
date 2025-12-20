---
name: portfolio-deploy
description: Deploy the BJTHEARTIST portfolio to Vercel. Use when preparing for deployment, troubleshooting build issues, or setting up CI/CD for this Vite + React project.
---

# Portfolio Deployment to Vercel

## When to Use This Skill
Use this when deploying to Vercel, fixing build errors, or setting up continuous deployment.

## Project Build Configuration

This is a **Vite + React + TypeScript** project.

### Build Commands
```bash
npm install     # Install dependencies
npm run dev     # Local development (port 3000)
npm run build   # Production build (outputs to /dist)
npm run preview # Preview production build
```

### Vite Config Highlights
- Output directory: `dist/` (Vite default)
- Dev server: `localhost:3000`
- Environment variables: Uses `GEMINI_API_KEY` if needed

## Deployment Methods

### Method 1: Vercel CLI (Quick)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your repository
4. Vercel auto-detects Vite settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"

## Vercel Configuration

Create `vercel.json` in project root if needed:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

The `rewrites` rule handles client-side routing (SPA behavior).

## Environment Variables

If using the Gemini API:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `GEMINI_API_KEY` = your_api_key
3. Redeploy for changes to take effect

## Common Build Issues

### Issue: CDN scripts not loading in build
The current `index.html` loads GSAP, Lenis, and Tailwind from CDN. This works but consider:
- CDN scripts load at runtime (not bundled)
- Ensure CDN URLs are accessible

### Issue: TypeScript errors blocking build
Run `npm run build` locally first to catch errors before deploying.

### Issue: 404 on page refresh
Add the `rewrites` rule in `vercel.json` (shown above).

## Post-Deployment Checklist
- [ ] Verify all images load (using Unsplash CDN)
- [ ] Test animations work (GSAP from CDN)
- [ ] Check smooth scroll (Lenis from CDN)
- [ ] Test on mobile devices
- [ ] Verify custom cursor works
- [ ] Check all navigation links

## Custom Domain Setup
1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `bjtheartist.com`)
3. Update DNS records as instructed
4. SSL is automatic
