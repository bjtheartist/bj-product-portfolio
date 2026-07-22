import { Project, Service, ServiceTier } from './types';

// Color palette
export const COLORS = {
  primary: {
    darkNavy: '#0a0a0a',
    blue: '#3b82f6',
    cyan: '#22d3ee',
    skyBlue: '#7dd3fc',
    lightCyan: '#a5f3fc',
  },
  accent: 'blue',
};

export const SITE_CONFIG = {
  name: 'KIVARA STUDIOS',
  tagline: 'MODERN WEBSITES FOR BUSINESSES WHO DON\'T HAVE MONTHS TO WAIT',
  location: 'Chicago, Illinois',
  email: 'hello@kivarastudios.dev',
  instagram: '@kivarastudios',
  fullName: 'Billy Ndizeye',
};

// Hero background images
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop',
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ChiStartupHub',
    category: 'FULL-STACK',
    imageUrl: '/projects/chistartuphub.png',
    description: 'The launchpad for Chicago founders. A comprehensive ecosystem directory featuring 90+ investors, 18+ co-working spaces, and 22+ founder communities.',
    tags: ['Full-Stack', 'React', 'Supabase', 'Next.js'],
    liveUrl: 'https://www.chistartuphub.com',
    year: '2025',
    problem: 'Chicago founders struggled to navigate the fragmented startup ecosystem. Information about investors, co-working spaces, and founder communities was scattered across dozens of websites, making it difficult for new entrepreneurs to find the resources they needed to launch and grow their ventures.',
    tools: [
      { name: 'Supabase', reason: 'Chosen as the backend-as-a-service for its PostgreSQL database, real-time subscriptions, and built-in authentication—enabling rapid development without managing infrastructure.' },
      { name: 'React', reason: 'My go-to frontend framework for its component-based architecture, enabling rapid development of reusable UI elements for the directory listings and search functionality.' },
      { name: 'Next.js', reason: 'Provided server-side rendering for SEO optimization crucial for discoverability, plus API routes for backend logic.' },
      { name: 'Node.js', reason: 'Used for server-side operations and API integrations with external data sources.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'ChiStartupHub successfully consolidated Chicago\'s startup ecosystem into a single, searchable platform. The directory has become a go-to resource for founders entering the Chicago market.',
      metrics: ['90+ investors catalogued', '18+ co-working spaces listed', '22+ founder communities connected', 'Used by new founders weekly']
    }
  },
  {
    id: '2',
    title: 'CommuniData',
    category: 'DATA VIZ',
    imageUrl: '/projects/communidata.png',
    description: 'A civic data platform transforming Chicago Data Portal information into actionable neighborhood insights with interactive maps and a Trust Layer.',
    tags: ['Data Viz', 'Django', 'React', 'Redis'],
    githubUrl: 'https://github.com/Dunosis/CommuniData',
    year: '2026',
    problem: 'Chicago\'s open data portal contains valuable civic information, but it\'s inaccessible to average residents. Raw datasets require technical expertise to interpret, leaving community members unable to leverage data for neighborhood advocacy and decision-making.',
    tools: [
      { name: 'Django', reason: 'Python-based backend framework chosen for its robust ORM, admin interface, and excellent data processing capabilities for handling large civic datasets.' },
      { name: 'Vite', reason: 'Modern build tool providing fast development server and optimized production builds for the React frontend.' },
      { name: 'Redis', reason: 'In-memory data store used for caching frequently accessed datasets and improving response times for data queries.' },
      { name: 'Celery', reason: 'Distributed task queue for handling background data processing jobs—syncing with Chicago Data Portal, generating reports, and updating derived metrics.' },
      { name: 'PostgreSQL', reason: 'Robust relational database for storing structured civic data with powerful geospatial extensions for neighborhood-level analysis.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'CommuniData is currently in development. The Trust Layer concept—showing data provenance and reliability—addresses a key gap in civic tech. Early prototypes demonstrate the potential to make complex data accessible to non-technical users.',
      metrics: ['Interactive map explorer built', 'Report wizard prototyped', 'Trust Layer concept validated', '6,263 live data points synced']
    }
  },
  {
    id: '12',
    title: 'Southeast Chicago Chamber of Commerce',
    category: 'WEB DESIGN',
    imageUrl: '/projects/southeast-chamber.png',
    description: 'A civic business website for the Southeast Chicago Chamber of Commerce and SSA #50, built around neighborhood pride, local commerce, membership, events, and community resources.',
    tags: ['Web Design', 'Civic', 'Membership', 'Community'],
    liveUrl: 'https://southeastchgochamber.org/',
    year: '2026',
    problem: 'The Chamber needed a public-facing site that could represent both local business advocacy and the cultural identity of Chicago’s Southeast Side. The experience had to make membership, events, SSA #50 information, and community engagement easy to find without flattening the neighborhood’s personality.',
    tools: [
      { name: 'WordPress', reason: 'Gives the Chamber a familiar content management system for events, pages, membership information, and ongoing community updates.' },
      { name: 'Brand System', reason: 'Used to keep the Chamber mark, neighborhood imagery, and civic messaging consistent across key public pages.' },
      { name: 'Responsive Design', reason: 'Ensures business owners, residents, and partners can access Chamber information cleanly from mobile and desktop.' },
      { name: 'Information Architecture', reason: 'Organized navigation around the Chamber’s core jobs: explore, learn about SSA #50, get involved, attend events, and become a member.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'The site gives the Chamber a clearer civic front door, pairing a strong neighborhood identity with practical pathways for membership, events, and local business engagement.',
      metrics: ['Membership CTA prominent', 'SSA #50 information surfaced', 'Events and meetings navigation clear', 'Neighborhood identity leads the experience']
    }
  },
  {
    id: '3',
    title: 'Makarios',
    category: 'MOBILE APP',
    imageUrl: '/projects/makarios.png',
    description: 'A faith-based mobile application designed to help make disciples of all nations. Clean, purposeful product design focused on connection and spiritual growth.',
    tags: ['Mobile App', 'Firebase', 'Sanity CMS', 'React'],
    githubUrl: 'https://github.com/bjtheartist/Makarios',
    liveUrl: 'https://apps.apple.com/us/app/makarios-bible-app/id6758817857',
    year: '2026',
    problem: 'Faith communities needed a mobile-first digital space that felt warm and inviting rather than corporate. Existing church tools often felt outdated or overly complex, creating barriers to connection for people seeking spiritual community.',
    tools: [
      { name: 'Firebase', reason: 'Chosen for its real-time database capabilities, authentication, and hosting—perfect for community features like event RSVPs and member directories.' },
      { name: 'Sanity CMS', reason: 'Headless CMS enabling non-technical ministry staff to update sermons, events, and content without developer involvement.' },
      { name: 'React', reason: 'Enabled a smooth mobile application experience that feels modern and welcoming to younger demographics.' },
      { name: 'Tailwind CSS', reason: 'Allowed rapid iteration on visual design to achieve the warm, purposeful aesthetic the community needed.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live in the App Store as Makarios Bible App. The mobile experience removes barriers to entry while maintaining the warmth essential to ministry, with content managed by non-technical staff.',
      metrics: ['Live in the App Store', 'Clean, accessible design', 'Content managed by staff', 'v3 roadmap in development']
    }
  },
  {
    id: '4',
    title: 'Funke Roberts',
    category: 'WEB DESIGN',
    imageUrl: '/projects/funke-roberts.png',
    description: 'Image consulting brand with a digital storefront. WordPress site featuring personal branding services, client stories, and an integrated e-commerce shop for skincare products.',
    tags: ['WordPress', 'WooCommerce', 'Brand Design', 'E-Commerce'],
    liveUrl: 'https://funkeroberts.com',
    year: '2026',
    problem: 'An image consultant with a powerful personal brand needed a digital presence that matched her authority. Her message—"Stop Being Invisible... Make Your Image Speak"—needed a site that felt premium, conveyed trust, and seamlessly integrated service bookings with product sales.',
    tools: [
      { name: 'WordPress', reason: 'Chosen for its flexibility in combining content marketing, service pages, and e-commerce under one roof—giving the client full content ownership.' },
      { name: 'WooCommerce', reason: 'Integrated digital store for skincare products, enabling direct-to-consumer sales alongside consulting services.' },
      { name: 'Elementor', reason: 'Visual page builder that empowers the client to update content, testimonials, and product listings without developer involvement.' },
      { name: 'Custom Branding', reason: 'Designed warm, authoritative visual identity with earthy tones that reflect the client\'s personal brand and target audience.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Funke Roberts\' site successfully positions her as a premium image consultant. The integrated shop creates an additional revenue stream beyond 1-on-1 consulting, and the brand design conveys the authority her clients expect.',
      metrics: ['Live and serving clients', 'Integrated e-commerce shop', 'Client stories showcase', 'WhatsApp booking integration']
    }
  },
  {
    id: '5',
    title: 'TemsVision',
    category: 'WEB DESIGN',
    imageUrl: '/projects/temsvision.png',
    description: 'A photography portfolio website featuring elegant gallery displays, booking system, and a neobrutalist aesthetic that showcases visual storytelling.',
    tags: ['Web Design', 'Sanity CMS', 'React', 'Vite'],
    liveUrl: 'https://temsvision-website.vercel.app/',
    githubUrl: 'https://github.com/bjtheartist/temsvision-website',
    year: '2025',
    problem: 'Photographers often struggle with portfolio websites that either look generic or require expensive subscriptions. TemsVision needed a distinctive online presence that would stand out in a crowded market while making it easy for clients to book sessions.',
    tools: [
      { name: 'Sanity CMS', reason: 'Headless CMS enabling the photographer to manage galleries, add new photos, and update content without touching code.' },
      { name: 'React', reason: 'Enabled smooth gallery interactions and lazy loading for optimal performance with high-resolution images.' },
      { name: 'Vite', reason: 'Provided fast development builds and optimized production bundles for quick page loads.' },
      { name: 'GSAP', reason: 'Added premium scroll-based animations that elevate the portfolio above template-based competitors.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'TemsVision successfully differentiates itself from template-based photography portfolios. The neobrutalist design creates a memorable brand impression, and the integrated booking flow reduces friction for potential clients.',
      metrics: ['Live and deployed', 'Distinctive visual identity', 'Content-managed galleries', 'Fast load times despite image-heavy content']
    }
  },
  {
    id: '6',
    title: 'RecipeVault',
    category: 'iOS APP',
    imageUrl: '/projects/recipevault-app.jpg',
    description: 'An end-to-end meal-prep-to-cooking platform for iOS with 1,000+ recipes and a bold neobrutalist identity. Plan the week, cook from today\'s menu, and turn meals into a grocery list — save recipes from anywhere on your phone.',
    tags: ['iOS', 'React Native', 'Product Design', 'Food'],
    liveUrl: 'https://apps.apple.com/us/app/id6774791172',
    githubUrl: 'https://github.com/bjtheartist/recipevault',
    year: '2026',
    problem: 'Home cooks needed a calmer way to save recipes, plan meals, and connect those plans to groceries. Recipe apps either drown you in browsing or turn dinner into a chore — RecipeVault covers the full loop from meal prep to cooking, with the day\'s menu as the interface.',
    tools: [
      { name: 'React Native', reason: 'Native iOS experience with the meal-first "Today" flow, recipe capture, and grocery workflows.' },
      { name: 'Expo', reason: 'Fast iteration and clean App Store build pipeline.' },
      { name: 'Neobrutalist Design', reason: 'Black-and-white identity with hard offset shadows — a recipe app that looks like nothing else in the category.' },
      { name: 'Neon Postgres', reason: 'Account sync and recipe storage behind a serverless API.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live in the App Store — 1,000+ recipes, two-week meal planning, recipe capture from any app, and smart grocery lists behind a distinctive neobrutalist identity.',
      metrics: ['Live in the App Store', '1,000+ recipes', 'Meal prep to cooking, end to end', 'Smart grocery lists']
    }
  },
  {
    id: '7',
    title: 'Sahara Tax Pro',
    category: 'FULL-STACK',
    imageUrl: '/projects/sahara-tax-pro.png',
    description: 'Boutique tax preparation platform offering personalized tax guidance with IRS compliant filing, 24h response time, and dedicated client support.',
    tags: ['Full-Stack', 'Next.js', 'React', 'FinTech'],
    liveUrl: 'https://saharataxpro.com/',
    year: '2025',
    problem: 'Small tax preparation businesses struggle to compete with large firms like H&R Block and TurboTax. They needed a professional online presence that conveys trust and expertise while making it easy for clients to book consultations and submit documents securely.',
    tools: [
      { name: 'Next.js', reason: 'Provided SEO optimization crucial for local business discovery, plus fast page loads that build trust with potential clients.' },
      { name: 'React', reason: 'Enabled interactive form experiences for consultation booking and document submission.' },
      { name: 'Tailwind CSS', reason: 'Allowed rapid development of a professional, trustworthy design that competes with larger firms.' },
      { name: 'Vercel', reason: 'Ensured reliable hosting with excellent uptime—critical for a business handling sensitive financial information.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Sahara Tax Pro successfully positions a boutique tax firm to compete with larger competitors. The professional design builds trust, and the streamlined booking process converts website visitors into consultations.',
      metrics: ['Live and serving clients', 'IRS compliant workflows', '24h response time commitment', 'Professional brand presence']
    }
  },
  {
    id: '9',
    title: 'Perfect Perfections',
    category: 'WEB DESIGN',
    imageUrl: '/projects/perfect-perfections.jpg',
    description: 'Soul food catering brand based in Chicago. Warm, appetite-forward storefront with menu showcase, online ordering, and a brand voice that feels like the food.',
    tags: ['Web Design', 'Brand', 'Hospitality', 'Square'],
    liveUrl: 'https://www.perfectperfectionscatering.com',
    year: '2026',
    problem: 'A growing soul food catering business needed an online home that felt as warm and personal as the food itself — distinct from generic restaurant templates, and built to turn visitors into orders and event bookings.',
    tools: [
      { name: 'React', reason: 'Smooth, modern single-page experience that loads fast and feels editorial — appropriate for a food-led brand.' },
      { name: 'Square', reason: 'Ordering and payments run through Square, so catering requests turn into real transactions without a separate POS workflow.' },
      { name: 'Tailwind CSS', reason: 'Rapid design iteration on the warm, appetite-led visual identity.' },
      { name: 'Vite', reason: 'Fast build tooling for a marketing-grade site.' },
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live at perfectperfectionscatering.com on its own domain, taking real catering inquiries with Square handling ordering and payments.',
      metrics: ['Live on the business domain', 'Square ordering & payments integrated', 'Menu showcase live', 'Catering inquiry flow in place'],
    },
  },
  {
    id: '10',
    title: 'Chicago Incentive Explorer',
    category: 'FULL-STACK',
    imageUrl: '/projects/seccc.png',
    description: 'An interactive incentive map for the Southeast Chicago Chamber of Commerce. Pre-qualification survey, zone eligibility checker, and program discovery across 12 city, state, and federal programs.',
    tags: ['Full-Stack', 'Civic Tech', 'Next.js', 'Maps'],
    liveUrl: 'https://seccc-incentive-explorer.vercel.app',
    year: '2026',
    problem: 'Small business owners in southeast Chicago were leaving money on the table — the city offers a dozen overlapping incentive programs across multiple agencies, but no single tool surfaced what they qualified for. The Chamber needed a public-facing map and survey that would route people to the right programs in minutes.',
    tools: [
      { name: 'Next.js', reason: 'App Router for fast page loads and SEO on a public civic tool, plus API routes for the eligibility engine.' },
      { name: 'Mapbox', reason: 'Interactive map of incentive zones with neighborhood-level lookup.' },
      { name: 'Tailwind CSS', reason: 'Built the survey, results, and program detail views quickly while keeping the interface restrained.' },
      { name: 'Vercel', reason: 'Reliable hosting for a tool the Chamber sends prospective business owners to.' },
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live and in active use by the Chamber. Surfaces 12 programs through a single survey + map flow that previously required visiting 4+ agency websites.',
      metrics: ['12 incentive programs surfaced', 'Pre-qualification survey live', 'Zone eligibility map deployed', 'Reduces program-discovery time from hours to minutes'],
    },
  },
  {
    id: '11',
    title: 'Just AFC',
    category: 'WEB DESIGN',
    imageUrl: '/projects/justafc.png',
    description: 'Premier adult foster care facility website in Lansing, MI. Warm, professional design with patient referral system, service listings, and tour scheduling.',
    tags: ['Web Design', 'React', 'Healthcare', 'Brand Design'],
    liveUrl: 'https://justafc.com',
    year: '2025',
    problem: 'A new adult foster care home needed a professional web presence that conveyed warmth, trust, and medical competence to families searching for care options for their loved ones in the Lansing area.',
    tools: [
      { name: 'React', reason: 'Modern frontend for a smooth, trustworthy user experience that families expect from a care provider.' },
      { name: 'Tailwind CSS', reason: 'Rapid development of the clean, warm design with green brand accents that convey health and comfort.' },
      { name: 'Vite', reason: 'Fast development builds and optimized production bundles for quick page loads.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Just AFC\'s site positions them as a premier care provider in Lansing. The professional design with patient referral workflow and tour scheduling converts visitors into facility tours.',
      metrics: ['Live and serving clients', 'Patient referral system', 'Tour scheduling integrated', 'Services clearly presented']
    }
  },
  {
    id: '13',
    title: 'Watson & Watson Dental',
    category: 'WEB DESIGN',
    imageUrl: '/projects/watson-dental.jpeg',
    description: 'Full rebuild for a South Side Chicago family dental practice serving patients since 1962. A calm, trust-first design with appointment requests, reviews, and a patient-centered care philosophy front and center.',
    tags: ['Web Design', 'WordPress', 'Healthcare', 'Brand Refresh'],
    liveUrl: 'https://www.watsonandwatsondental.com',
    year: '2026',
    problem: 'A family dental practice with sixty years of history and a 4.9 public rating had a website that undersold both. Patients researching the practice found a dated site that didn\'t reflect the calm, personal care the office is known for — and gave them no easy path to book.',
    tools: [
      { name: 'WordPress', reason: 'Gives the practice full content ownership — staff can update hours, services, and announcements without a developer.' },
      { name: 'Custom Theme', reason: 'Hand-built multipage theme (home, services, care, doctor, reviews, visit) instead of a template — designed around how patients actually choose a dentist.' },
      { name: 'Brand Refresh', reason: 'Calm blue identity with editorial serif headlines that convey six decades of steady, family-run care.' },
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live at watsonandwatsondental.com. The rebuild turns a dated brochure site into a booking-first patient experience — call and appointment paths above the fold, six decades of trust signals surfaced site-wide.',
      metrics: ['Live on the practice domain', 'Booking-first patient flow', '4.9 rating surfaced site-wide', 'Multipage: services, care, doctor, reviews, visit'],
    },
  },
  {
    id: '14',
    title: 'The Strong Beginner',
    category: 'iOS APP',
    imageUrl: '/projects/strong-beginner-app.jpg',
    description: 'An end-to-end workout and training platform for iOS, built by a NASM-certified trainer. 20+ training plans, hundreds of exercises, a "Build your plan" onboarding, daily sessions, and streaks — paired with an interactive 16-chapter guide on the web.',
    tags: ['iOS', 'React Native', 'Fitness', 'Product Design'],
    liveUrl: 'https://apps.apple.com/us/app/id6775282180',
    year: '2026',
    problem: 'Beginner lifters drown in contradictory fitness content and intimidating tracker apps built for advanced athletes. The Strong Beginner packages a certified trainer\'s actual client methodology into a calm daily practice: today\'s session, three moves, begin.',
    tools: [
      { name: 'React Native', reason: 'Native iOS platform with plan builder onboarding, session flow, streaks, a 20+ plan program library, and hundreds of exercises.' },
      { name: 'RevenueCat', reason: 'Subscription and lifetime purchase handling for the App Store build.' },
      { name: 'Editorial Design', reason: 'The companion web guide reads like a magazine, not a PDF — 16 chapters, exercise library, interactive tools.' },
    ],
    effectiveness: {
      status: 'effective',
      description: 'Live in the App Store with the interactive web guide as a companion. Methodology used daily with real personal-training clients.',
      metrics: ['Live in the App Store', '20+ training plans', 'Hundreds of exercises', 'Used in live client training'],
    },
  },
  {
    id: '15',
    title: 'Jeremiah Collier',
    category: 'WEB DESIGN',
    imageUrl: '/projects/jeremiah-collier.png',
    description: 'A digital stage for a South Side jazz drummer who has played with Stanley Clarke and at the Kennedy Center. A dark, editorial one-pager built around the energy of him behind the kit — plus a press kit page for bookers and media.',
    tags: ['Web Design', 'Music', 'CMS', 'Brand'],
    liveUrl: 'https://jeremiah-collier.vercel.app',
    year: '2026',
    problem: 'A world-class Chicago drummer had a coming-soon page where his story should be. Bookers, festivals, and press had nowhere to see the credits, watch him play, or start an inquiry — and any site he got had to stay effortless for a working musician to keep current.',
    tools: [
      { name: 'Custom HTML/CSS', reason: 'The "Backstage Noir" design system — oversized display type, ink-and-paper movements, cobalt accents — built by hand so the site performs like a poster and loads like a static page.' },
      { name: 'Contentful', reason: 'A four-type content model (shows, videos, press quotes, settings) so he updates the site from a clean editor and a publish triggers the rebuild — no developer needed for day-to-day.' },
      { name: 'Node build pipeline', reason: 'A zero-dependency build script renders the CMS content to pure static pages on Vercel, keeping his infrastructure cost at exactly the price of his domain.' },
      { name: 'Instagram + audio', reason: 'His feed auto-syncs into the site, and a first-visit soundscape choice can play a groove from his own recorded sessions — click-to-play, never autoplay.' },
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Live and delivered to the artist, with the owner-handoff session scheduled: domain, Instagram, and CMS accounts all land under his own name so he walks away owning the whole thing.',
      metrics: ['One-pager + electronic press kit', 'Real performance footage with Stanley Clarke', 'CMS handoff designed around a $22/yr running cost', 'Owner independence as the deliverable'],
    },
  },
  {
    id: '16',
    title: 'Elevation of Excellence',
    category: 'WEB DESIGN',
    imageUrl: '/projects/elevation-of-excellence.png',
    description: 'A parent-first website for a Chicago nonprofit that takes scholars on HBCU college tours wrapped in a seven-week family workshop series. Warm editorial serif, deep green and cream, and a register-your-scholar path that works.',
    tags: ['Web Design', 'Nonprofit', 'Education', 'Chicago'],
    liveUrl: 'https://elevation-of-excellence.vercel.app',
    year: '2026',
    problem: 'The organization\'s site had a register button that led nowhere — while the founder was personally covering thousands of dollars in unsold tour seats every year. The story parents needed (what\'s included, cost help, safety, the workshops that make it different) had no home.',
    tools: [
      { name: 'Custom HTML/CSS', reason: 'Six hand-built pages on a shared design system — editorial serif headlines, green-and-cream warmth — so the site feels like the organization: trusted, family-first, Chicago-proud.' },
      { name: 'Concept-led process', reason: 'Five distinct visual directions presented at kickoff; the founder chose the one built around a parent and scholar reading a campus brochure together, and the full site grew from that exact frame.' },
      { name: 'Feedback-to-live loop', reason: 'The founder\'s revision list — mission language, workshop details, what\'s included, volunteer signup, donation letters — shipped to the live site within a day of her sending it.' },
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'The full rendering is live and shaped by two working sessions with the founder. Registration, volunteer, and donation paths now exist end-to-end; real tour photography and pricing land next.',
      metrics: ['6 pages, built from the founder\'s chosen concept', 'Register + volunteer + donate paths that didn\'t exist before', 'Client feedback round applied within a day', 'Seven-week family workshop made the centerpiece'],
    },
  },
  {
    id: '17',
    title: 'Genesis Print & Copy',
    category: 'WEB DESIGN',
    imageUrl: '/projects/genesis-print.png',
    description: 'A loud, confident CMYK front door for a South Side print shop with roughly twenty years on Stony Island. Process-color energy, shop-by-purpose navigation, and an instant-quote path — designed to hand off into the shop\'s existing ordering system.',
    tags: ['Web Design', 'E-Commerce', 'Brand', 'Chicago'],
    liveUrl: 'https://genesis-print-cyan.vercel.app',
    year: '2026',
    problem: 'Twenty years of real print craft was hidden behind a stock storefront template — and the quote button sent customers to a login wall. The rebuild had to stand out without touching the ordering machine the business already runs on.',
    tools: [
      { name: 'Custom HTML/CSS', reason: 'A five-page hybrid front door in a bold CMYK visual language — registration-mark motifs, process-color type, product tickers — chosen from six explored directions.' },
      { name: 'Hybrid architecture', reason: 'The custom site owns the first impression and the story; when a customer is ready to configure and pay, it hands them into the shop\'s existing PressCentric ordering system. No checkout rebuild, no downtime.' },
      { name: 'Live demo configurator', reason: 'A homepage quote configurator shows how instant pricing could feel, clearly badged as a demo with final pricing confirmed in the ordering portal.' },
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'The full five-page rendering is live as the centerpiece of the owner\'s decision between a quick reskin and the hybrid rebuild — showing, not describing, what the shop\'s next site can be.',
      metrics: ['5-page hybrid front door', 'Keeps the existing ordering system intact', '6 visual directions explored, CMYK New Wave chosen', 'Real shop details throughout — no placeholder content'],
    },
  },
  {
    id: '18',
    title: 'Kivara Flow',
    category: 'PRODUCT DESIGN',
    imageUrl: '/projects/kivara-flow.png',
    description: 'One workspace from concept to code — a project-management tool for creative teams that unifies design, tracking, and development workflows.',
    tags: ['Product Design', 'Convex', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/bjtheartist/kivara-flow',
    year: '2025',
    problem: 'Creative teams waste significant time context-switching between design tools, project management apps, and development environments. The lack of a unified workflow creates friction that slows down the concept-to-code pipeline.',
    tools: [
      { name: 'Convex', reason: 'Real-time backend database for reactive data sync—essential for collaborative workflows.' },
      { name: 'React', reason: 'Flexibility for complex, interactive interface with multiple panels and real-time updates.' },
      { name: 'TypeScript', reason: 'Essential for building a reliable tool developers will trust. Type safety prevents bugs.' },
      { name: 'Tailwind CSS', reason: 'Rapid UI development with consistent styling across the multi-panel interface.' },
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'In active development. The core concept of unifying design and development workflows addresses a real pain point.',
      metrics: ['Workflow engine built', 'Project tracking live', 'Client portal integrated'],
    },
  },
  {
    id: '19',
    title: 'PT CRM',
    category: 'FULL-STACK',
    imageUrl: '/projects/pt-crm.png',
    description: 'A single-tenant CRM built for one personal-training business and dogfooded daily. Floor mode, client lifecycle, every rep logged — clients, packages, sessions, assessments, workouts, and reminders in one fast PWA.',
    tags: ['Full-Stack', 'Next.js', 'Product Design', 'Fitness'],
    year: '2026',
    problem: 'Off-the-shelf CRMs are built for sales teams, not a trainer on a gym floor between sessions. Logging a workout had to be as fast as coaching one, and the product had to prove — with data — that it was actually helping the business, not just storing records.',
    tools: [
      { name: 'Next.js 16 + React 19', reason: 'App Router with Turbopack for a fast, installable PWA the trainer lives in all day — floor mode is designed for one-thumb use between sets.' },
      { name: 'Drizzle + Neon Postgres', reason: 'Typed schema over serverless Postgres for the whole client lifecycle: packages, sessions, assessments, workouts, reminders.' },
      { name: 'Voice dictation + AI cleanup', reason: 'Workouts are dictated out loud and cleaned into structured sets invisibly, with a local parser fallback so logging never depends on an API being up.' },
      { name: 'R&D data room', reason: 'A built-in measurement layer — hypotheses, metrics dictionary, weekly reports on a six-week dogfooding cycle — so the product answers for what it does for the business.' },
    ],
    effectiveness: {
      status: 'effective',
      description: 'In daily production use running a real personal-training practice: session recaps go out automatically, new clients get a first-session resource handoff, and the data room tracks whether the product is earning its keep.',
      metrics: ['Dogfooded daily in a live training business', 'Voice-dictated workout logging', 'Automated session recaps + first-session handoff', 'Six-week measurement cycles built into the product'],
    },
  }
];

export const SERVICES: Service[] = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'End-to-end UX/UI design for web and mobile applications. From research to polished interfaces that users love.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop',
    price: 'Starting at $2,500',
    features: ['User Research', 'Wireframing', 'UI Design', 'Prototyping', 'Design Systems']
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web applications built with modern technologies. React, TypeScript, Node.js, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1200&fit=crop',
    price: 'Starting at $3,500',
    features: ['React/Next.js', 'TypeScript', 'API Development', 'Database Design', 'Deployment']
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Transform complex data into clear, actionable insights. Interactive dashboards and compelling visual stories.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop',
    price: 'Starting at $1,800',
    features: ['Dashboard Design', 'D3.js Charts', 'Data Analysis', 'Interactive Maps', 'Report Generation']
  }
];

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: 'launch-sprint',
    name: 'Launch Sprint',
    price: '$2,500',
    timeline: '72 hours',
    description: 'For businesses that need to get online fast. A clean, high-converting one-page site built in a weekend.',
    features: [
      'Custom one-page website',
      'Mobile responsive',
      'Contact form integration',
      'Basic SEO setup',
      'Deployed on Vercel',
      '1 round of revisions',
    ],
  },
  {
    id: 'site-rebuild',
    name: 'Site Rebuild',
    price: '$5,000',
    timeline: '2 weeks',
    description: 'Your current site isn\'t converting. We rebuild it from scratch with speed, structure, and lead generation baked in.',
    features: [
      'Full multi-page website',
      'Speed optimization (90+ Lighthouse)',
      'Lead capture forms',
      'CMS integration',
      'Analytics setup',
      'SEO optimization',
      '2 rounds of revisions',
    ],
    highlighted: true,
  },
  {
    id: 'growth-engine',
    name: 'Growth Engine',
    price: '$8,000+',
    timeline: '4 weeks',
    description: 'A full digital presence built to generate leads, rank on Google, and grow with your business.',
    features: [
      'Everything in Site Rebuild',
      'Custom brand design',
      'Blog/content system',
      'Email automation setup',
      'Monthly performance reports',
      'Priority support (48h)',
      '3 rounds of revisions',
    ],
  },
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/billy-ndizeye/',
  github: 'https://github.com/bjtheartist',
  instagram: 'https://www.instagram.com/kivarastudios/',
  twitter: 'https://twitter.com/kivarastudios',
};
