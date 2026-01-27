import { Project, Service } from './types';

// Color palette for product design portfolio
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
  name: 'BJTHEARTIST',
  tagline: 'PRODUCT DESIGNER, FULL-STACK DEVELOPER & DATA VISUALIZER',
  location: 'Chicago, Illinois',
  email: 'hello@bjtheartist.com',
  instagram: '@bjtheartist',
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
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=1200&fit=crop',
    description: 'The launchpad for Chicago founders. A comprehensive ecosystem directory featuring 90+ investors, 18+ co-working spaces, and 22+ founder communities.',
    tags: ['Full-Stack', 'React', 'Civic Tech', 'Directory'],
    liveUrl: 'https://www.chistartuphub.com',
    year: '2024',
    problem: 'Chicago founders struggled to navigate the fragmented startup ecosystem. Information about investors, co-working spaces, and founder communities was scattered across dozens of websites, making it difficult for new entrepreneurs to find the resources they needed to launch and grow their ventures.',
    tools: [
      { name: 'React', reason: 'Chosen for its component-based architecture, enabling rapid development of reusable UI elements for the directory listings and search functionality.' },
      { name: 'TypeScript', reason: 'Added type safety to prevent runtime errors and improve code maintainability as the directory scaled.' },
      { name: 'Tailwind CSS', reason: 'Enabled rapid prototyping and consistent styling without writing custom CSS, accelerating the design-to-code workflow.' },
      { name: 'Vercel', reason: 'Provided seamless deployment with automatic previews for each PR, making iteration fast and reliable.' }
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
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop',
    description: 'A civic data platform transforming Chicago Data Portal information into actionable neighborhood insights with interactive maps and a Trust Layer.',
    tags: ['Data Viz', 'Full-Stack', 'React', 'Python'],
    githubUrl: 'https://github.com/Dunosis/CommuniData',
    year: '2024',
    problem: 'Chicago\'s open data portal contains valuable civic information, but it\'s inaccessible to average residents. Raw datasets require technical expertise to interpret, leaving community members unable to leverage data for neighborhood advocacy and decision-making.',
    tools: [
      { name: 'React', reason: 'Provided the interactive foundation for building dynamic data visualizations and responsive map interfaces.' },
      { name: 'Python', reason: 'Used for data processing pipelines to clean, transform, and aggregate raw civic datasets into meaningful insights.' },
      { name: 'D3.js', reason: 'Enabled custom, interactive data visualizations that go beyond standard charting libraries.' },
      { name: 'Mapbox', reason: 'Delivered high-performance mapping with custom styling to visualize geographic data patterns across neighborhoods.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'CommuniData is currently in development. The Trust Layer concept—showing data provenance and reliability—addresses a key gap in civic tech. Early prototypes demonstrate the potential to make complex data accessible to non-technical users.',
      metrics: ['Interactive map explorer built', 'Report wizard prototyped', 'Trust Layer concept validated']
    }
  },
  {
    id: '3',
    title: 'Makarios',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop',
    description: 'A faith-based community platform designed to help make disciples of all nations. Clean, purposeful design focused on connection and spiritual growth.',
    tags: ['Web Design', 'Frontend', 'Ministry', 'Community'],
    githubUrl: 'https://github.com/bjtheartist/Makarios',
    year: '2024',
    problem: 'Faith communities needed a digital space that felt warm and inviting rather than corporate. Existing church websites often felt outdated or overly complex, creating barriers to connection for newcomers seeking spiritual community.',
    tools: [
      { name: 'React', reason: 'Enabled a smooth, app-like experience that feels modern and welcoming to younger demographics.' },
      { name: 'Tailwind CSS', reason: 'Allowed rapid iteration on visual design to achieve the warm, purposeful aesthetic the community needed.' },
      { name: 'Framer Motion', reason: 'Added subtle animations that create a sense of peace and intentionality without being distracting.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'Makarios successfully bridges the gap between traditional faith community values and modern digital expectations. The clean design removes barriers to entry while maintaining the warmth essential to ministry.',
      metrics: ['Clean, accessible design', 'Mobile-first approach', 'Positive community feedback']
    }
  },
  {
    id: '4',
    title: 'Kivara Flow',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1200&fit=crop',
    description: 'A design and development workflow tool built to streamline creative processes. From concept to code, helping teams ship products faster.',
    tags: ['Product Design', 'TypeScript', 'Workflow', 'SaaS'],
    githubUrl: 'https://github.com/bjtheartist/kivara-flow',
    year: '2024',
    problem: 'Creative teams waste significant time context-switching between design tools, project management apps, and development environments. The lack of a unified workflow creates friction that slows down the concept-to-code pipeline.',
    tools: [
      { name: 'TypeScript', reason: 'Essential for building a reliable tool that developers will trust. Type safety prevents bugs that could disrupt creative workflows.' },
      { name: 'React', reason: 'Provided the flexibility to build a complex, interactive interface with multiple panels and real-time updates.' },
      { name: 'Zustand', reason: 'Lightweight state management that keeps the app performant even with complex workflow states.' }
    ],
    effectiveness: {
      status: 'in-progress',
      description: 'Kivara Flow is in active development. The core concept of unifying design and development workflows addresses a real pain point, but the challenge lies in integrating with existing tools without adding complexity.',
      metrics: ['Core workflow engine built', 'Integration architecture designed', 'User testing planned']
    }
  },
  {
    id: '5',
    title: 'TemsVision',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=1200&fit=crop',
    description: 'A photography portfolio website featuring elegant gallery displays, booking system, and a neobrutalist aesthetic that showcases visual storytelling.',
    tags: ['Web Design', 'React', 'Photography', 'Vite'],
    liveUrl: 'https://temsvision-website.vercel.app/',
    githubUrl: 'https://github.com/bjtheartist/temsvision-website',
    year: '2024',
    problem: 'Photographers often struggle with portfolio websites that either look generic or require expensive subscriptions. TemsVision needed a distinctive online presence that would stand out in a crowded market while making it easy for clients to book sessions.',
    tools: [
      { name: 'React', reason: 'Enabled smooth gallery interactions and lazy loading for optimal performance with high-resolution images.' },
      { name: 'Vite', reason: 'Provided fast development builds and optimized production bundles for quick page loads.' },
      { name: 'Tailwind CSS', reason: 'Made it easy to achieve the neobrutalist aesthetic with bold typography and intentional spacing.' },
      { name: 'GSAP', reason: 'Added premium scroll-based animations that elevate the portfolio above template-based competitors.' }
    ],
    effectiveness: {
      status: 'effective',
      description: 'TemsVision successfully differentiates itself from template-based photography portfolios. The neobrutalist design creates a memorable brand impression, and the integrated booking flow reduces friction for potential clients.',
      metrics: ['Live and deployed', 'Distinctive visual identity', 'Integrated booking system', 'Fast load times despite image-heavy content']
    }
  },
  {
    id: '6',
    title: 'Sahara Tax Pro',
    category: 'FULL-STACK',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1200&fit=crop',
    description: 'Boutique tax preparation platform offering personalized tax guidance with IRS compliant filing, 24h response time, and dedicated client support.',
    tags: ['Full-Stack', 'Next.js', 'FinTech', 'Business'],
    liveUrl: 'https://saharataxpro.com/',
    year: '2024',
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

export const SKILLS = [
  'Product Design',
  'UX/UI Design',
  'React',
  'TypeScript',
  'Next.js',
  'Node.js',
  'Python',
  'Data Visualization',
  'D3.js',
  'Tailwind CSS',
  'Figma',
  'Full-Stack Development'
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/billy-ndizeye/',
  github: 'https://github.com/bjtheartist',
  instagram: 'https://www.instagram.com/bjtheartist/',
  twitter: 'https://twitter.com/bjtheartist',
};

export const ABOUT_BIO = {
  intro: "I'm Billy Ndizeye, a product designer and full-stack developer based in Chicago.",
  background: "I blend design thinking with technical expertise to create digital products that solve real problems. From civic tech platforms to business applications, I focus on building tools that make a difference.",
  story: "BJTHEARTIST represents my approach to work—treating every project as a creative endeavor that deserves craft and intention. Whether designing interfaces or writing code, I bring an artist's eye for detail.",
  philosophy: "Good design is invisible. The best products feel intuitive because someone cared enough to think through every interaction.",
  approach: "I start with understanding the problem deeply, then iterate rapidly toward solutions that are both beautiful and functional. I believe in shipping early and refining based on real feedback.",
  nameMeaning: {
    bj: "Billy's initials",
    theartist: "The craft and intention behind every project",
    bjtheartist: "Where technical skill meets creative vision"
  }
};
