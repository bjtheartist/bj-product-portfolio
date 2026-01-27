
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ChiStartupHub',
    category: 'FULL-STACK',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=1200&fit=crop',
    description: 'The launchpad for Chicago founders. A comprehensive ecosystem directory featuring 90+ investors, 18+ co-working spaces, and 22+ founder communities.',
    tags: ['Full-Stack', 'React', 'Civic Tech', 'Directory'],
    liveUrl: 'https://www.chistartuphub.com'
  },
  {
    id: '2',
    title: 'CommuniData',
    category: 'DATA VIZ',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop',
    description: 'A civic data platform transforming Chicago Data Portal information into actionable neighborhood insights with interactive maps and a Trust Layer.',
    tags: ['Data Viz', 'Full-Stack', 'React', 'Python'],
    liveUrl: ''
  },
  {
    id: '3',
    title: 'Makarios',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop',
    description: 'A faith-based community platform designed to help make disciples of all nations. Clean, purposeful design focused on connection and spiritual growth.',
    tags: ['Web Design', 'Frontend', 'Ministry'],
    githubUrl: 'https://github.com/bjtheartist/Makarios'
  },
  {
    id: '4',
    title: 'Kivara Flow',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=1200&fit=crop',
    description: 'A design and development workflow tool built to streamline creative processes. From concept to code, helping teams ship products faster.',
    tags: ['Product Design', 'TypeScript', 'Workflow'],
    githubUrl: 'https://github.com/bjtheartist/kivara-flow'
  },
  {
    id: '5',
    title: 'TemsVision',
    category: 'WEB DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=1200&fit=crop',
    description: 'A photography portfolio website featuring elegant gallery displays, booking system, and a neobrutalist aesthetic that showcases visual storytelling.',
    tags: ['Web Design', 'React', 'Photography', 'Vite'],
    liveUrl: 'https://temsvision-website.vercel.app/'
  },
  {
    id: '6',
    title: 'Sahara Tax Pro',
    category: 'FULL-STACK',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=1200&fit=crop',
    description: 'Boutique tax preparation platform offering personalized tax guidance with IRS compliant filing, 24h response time, and dedicated client support.',
    tags: ['Full-Stack', 'Next.js', 'FinTech'],
    liveUrl: 'https://saharataxpro.com/'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'End-to-end UX/UI design for web and mobile applications. From research to polished interfaces that users love.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=1200&fit=crop',
    price: 'Starting at $2,500'
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web applications built with modern technologies. React, TypeScript, Node.js, and more.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1200&fit=crop',
    price: 'Starting at $3,500'
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Transform complex data into clear, actionable insights. Interactive dashboards and compelling visual stories.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1200&fit=crop',
    price: 'Starting at $1,800'
  }
];
