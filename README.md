# TemsVision Photography Portfolio

A modern, responsive photography portfolio website for **Temilade Amire Quadri** (TemsVision), featuring a sophisticated design inspired by O'Shane Howard's portfolio aesthetic.

![TemsVision Logo](public/temsvision-logo-white-blue.png)

## Live Preview

🌐 **Preview URL:** [View Live Site](https://5174-ic928yhej5y14mx9kxqv8-2f3ea003.sg1.manus.computer)

## Project Status

**✅ Functionally Complete & Ready for Content Population**

All core features have been implemented. The site is ready for Temi's actual photography to be added, after which it can be deployed to production.

## Features

### Design & UX
- 🌓 **Light/Dark Mode** - Smooth theme toggle with persistent preference
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- 🎨 **TemsVision Blue Palette** - Custom color scheme from the official logo
- ✨ **Smooth Animations** - Elegant loading screen and scroll transitions
- 🖼️ **Gallery Wall Portfolio** - Four photography categories (Portraits, Sports, Love Stories, B&W)

### Technical
- ⚡ **Vite + React + TypeScript** - Modern, fast development stack
- 🎯 **TailwindCSS** - Utility-first styling
- 🔒 **Security Audit** - Built-in dependency vulnerability scanning
- 📧 **Contact Form** - Ready for email integration (Resend API configured)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/bjtheartist/temsvision-website.git

# Navigate to project directory
cd temsvision-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Run Security Audit

```bash
npm run audit
```

## Project Structure

```
temsvision-website/
├── public/
│   ├── temsvision-logo.png
│   ├── temsvision-logo-white-blue.png
│   └── temsvision-logo-transparent.png
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Portfolio.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Preloader.tsx
│   └── ThemeToggle.tsx
├── context/
│   └── ThemeContext.tsx
├── constants.ts
├── types.ts
├── App.tsx
└── index.html
```

## Photography Categories

| Category | Description |
|----------|-------------|
| **Portraits** | Individual, group, headshots, creative concepts |
| **Sports** | Action shots, team photos, athletic portraits |
| **Love Stories** | Engagement, wedding, couples photography |
| **B&W** | Timeless black and white photography |

## About TemsVision

> "My name is Temilade Amire Quadri, and I am a professional photographer. I was born in New Jersey, raised in Nigeria, and currently live in Kalamazoo, Michigan. I started TemsVision during the 2020 Covid lockdown as a creative outlet, and it has since grown into a full-fledged business."

The name **TemsVision** is a fusion of Yoruba heritage and passion:
- **Temilade** (teh-meh-la-day) = "The crown is mine"
- **Temi** (Tee-meeh) = "Mine"
- **TemsVision** = "My Vision"

## Development History

See [CHANGELOG.md](CHANGELOG.md) for detailed development history and version notes.

### Recent Updates (v1.0.0)
- Complete redesign with O'Shane Howard inspired aesthetic
- Implemented light/dark mode with TemsVision blue color palette
- Created custom logo version (white outline + blue aperture)
- Restored authentic bio and voice
- Mobile-first optimization
- Performance tuning and security audit

## Next Steps

- [ ] Add actual photography from Pixieset portfolio
- [ ] Deploy to Vercel
- [ ] Connect contact form to email service
- [ ] Add SEO meta tags and Open Graph images
- [ ] Create sitemap for search engines

## Connect

- 📸 **Instagram:** [@tems.vision](https://www.instagram.com/temsvision/)
- 📘 **Facebook:** [TemsVision](https://www.facebook.com/temsvision)
- 💼 **LinkedIn:** [Temilade Quadri](https://www.linkedin.com/in/temilade-quadri-bbb980a8/)
- 📍 **Location:** Kalamazoo, Michigan

## License

© 2026 TemsVision. All rights reserved.

---

*Built with ❤️ for TemsVision Photography*
