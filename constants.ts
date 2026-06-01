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
    year: '2026',
    problem: 'Faith communities needed a mobile-first digital space that felt warm and inviting rather than corporate. Existing church tools often felt outdated or overly complex, creating barriers to connection for people seeking spiritual community.',
    tools: [
      { name: 'Firebase', reason: 'Chosen for its real-time database capabilities, authentication, and hosting—perfect for community features like event RSVPs and member directories.' },
      { name: 'Sanity CMS', reason: 'Headless CMS enabling non-technical ministry staff to update sermons, events, and content without developer involvement.' },
      { name: 'React', reason: 'Enabled a smooth mobile application experience that feels modern and welcoming to younger demographics.' },
      { name: 'Tailwind CSS', reason: 'Allowed rapid iteration on visual design to achieve the warm, purposeful aesthetic the community needed.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Makarios is currently in beta (pre-launch). The mobile app experience removes barriers to entry while maintaining the warmth essential to ministry. Final testing and community onboarding are underway.',
      metrics: ['Mobile application in beta', 'Clean, accessible design', 'Content managed by staff', 'Community onboarding in progress']
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
    category: 'FULL-STACK',
    imageUrl: '/projects/recipevault.png',
    description: 'A practical recipe journal for everyday meals: find recipes, plan the week, and turn dinner into a grocery list without fuss.',
    tags: ['Full-Stack', 'React', 'Vite', 'Food Tech'],
    liveUrl: 'https://recipevault-pearl.vercel.app',
    githubUrl: 'https://github.com/bjtheartist/recipevault',
    year: '2026',
    problem: 'Home cooks needed a calmer way to save recipes, plan meals, and connect those plans to groceries. The goal was to make everyday meal planning feel useful without turning it into another chore.',
    tools: [
      { name: 'React', reason: 'Built the interactive recipe, meal-planning, and collection views as reusable UI flows.' },
      { name: 'Vite', reason: 'Kept the app fast to develop and quick to load.' },
      { name: 'TypeScript', reason: 'Added structure around recipes, plans, grocery items, and user interactions.' },
      { name: 'Vercel', reason: 'Provided quick deployment and a reliable public preview for iteration.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'RecipeVault has a polished core experience for browsing, planning, and turning meals into grocery actions. The product direction is focused on practical everyday use rather than generic recipe browsing.',
      metrics: ['Recipe browse flow live', 'Meal planning surface built', 'Grocery workflow prototyped', 'Mobile-friendly layout']
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
    imageUrl: '/projects/perfect-perfections.png',
    description: 'Soul food catering brand based in Chicago. Warm, appetite-forward storefront with online inquiries, menu showcase, and a brand voice that feels like the food.',
    tags: ['Web Design', 'Brand', 'Hospitality', 'React'],
    liveUrl: 'https://perfect-perfections.vercel.app',
    year: '2026',
    problem: 'A growing soul food catering business needed an online home that felt as warm and personal as the food itself — distinct from generic restaurant templates, and built to turn visitors into bookings.',
    tools: [
      { name: 'React', reason: 'Smooth, modern single-page experience that loads fast and feels editorial — appropriate for a food-led brand.' },
      { name: 'Tailwind CSS', reason: 'Rapid design iteration on the warm, appetite-led visual identity.' },
      { name: 'Vite', reason: 'Fast build tooling for a marketing-grade site.' },
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Mockup live — establishes the visual direction and inquiry flow.',
      metrics: ['Live mockup deployed', 'Menu showcase ready', 'Inquiry flow in place'],
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
