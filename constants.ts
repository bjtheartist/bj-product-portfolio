import { Project, Service } from './types';

export const SITE_CONFIG = {
  name: 'TemsVision',
  tagline: 'PHOTOGRAPHER, CREATIVE DIRECTOR & VISUAL STORYTELLER',
  location: 'Kalamazoo, Michigan',
  email: 'hello@temsvision.com',
  instagram: '@TEMS.VISION',
  fullName: 'Temilade Amire Quadri',
};

export const PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Golden Hour Portraits',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-1.jpg',
    description: 'Vibrant portrait sessions capturing personality and style during the magical golden hour.',
    tags: ['Portraits', 'Fashion', 'Golden Hour'],
    problem: '',
    solution: '',
    tools: ['Canon', 'Natural Light', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '1',
    title: 'Soccer Action Series',
    category: 'SPORTS',
    imageUrl: '/project-sports-1.jpg',
    description: 'Dynamic sports photography capturing athletes in motion with dramatic skies.',
    tags: ['Sports', 'Action', 'Athletes'],
    problem: '',
    solution: '',
    tools: ['High-Speed Photography', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '2',
    title: 'Engagement Sessions',
    category: 'LOVE STORIES',
    imageUrl: '/project-love-1.jpg',
    description: 'Intimate moments captured with artistic film-style processing.',
    tags: ['Couples', 'Engagement', 'Romance'],
    problem: '',
    solution: '',
    tools: ['Film Emulation', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '3',
    title: 'Timeless Monochrome',
    category: 'B & W',
    imageUrl: '/project-bw-1.jpg',
    description: 'Classic black and white portraits emphasizing emotion and form.',
    tags: ['Black & White', 'Fine Art', 'Portraits'],
    problem: '',
    solution: '',
    tools: ['Black & White Processing', 'Adobe Lightroom'],
    year: '2024'
  },
  {
    id: '4',
    title: 'Cultural Fashion',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-2.jpg',
    description: 'Celebrating African fashion and culture through vibrant portrait photography.',
    tags: ['Fashion', 'Culture', 'Style'],
    problem: '',
    solution: '',
    tools: ['Studio Lighting', 'Adobe Photoshop'],
    year: '2024'
  },
  {
    id: '5',
    title: 'Group Dynamics',
    category: 'PORTRAITS',
    imageUrl: '/project-portraits-3.jpg',
    description: 'Group portraits capturing connections and relationships.',
    tags: ['Groups', 'Friends', 'Connections'],
    problem: '',
    solution: '',
    tools: ['Natural Light', 'Adobe Lightroom'],
    year: '2024'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'portraits',
    name: 'Portrait Sessions',
    description: 'Individual and group portrait sessions that capture your unique personality and style. From headshots to creative concepts.',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    features: ['Individual Portraits', 'Group Sessions', 'Headshots', 'Creative Concepts', 'Golden Hour']
  },
  {
    id: 'sports',
    name: 'Sports Photography',
    description: 'Dynamic action shots that freeze the intensity and emotion of athletic performance.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices-of-the-game?w=800&q=80',
    features: ['Action Shots', 'Team Photos', 'Athletic Portraits', 'Event Coverage']
  },
  {
    id: 'weddings',
    name: 'Love Stories',
    description: 'Engagement sessions, weddings, and couples photography that tells your unique love story.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    features: ['Engagement Sessions', 'Wedding Photography', 'Couples Portraits', 'Anniversary Sessions']
  },
  {
    id: 'events',
    name: 'Events & Special Occasions',
    description: 'Birthday parties, graduations, family gatherings, and milestone celebrations captured beautifully.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    features: ['Birthday Sessions', 'Graduation Photos', 'Family Sessions', 'Boudoir']
  }
];

export const SKILLS = [
  'Portrait Photography',
  'Sports Photography',
  'Wedding Photography',
  'Event Photography',
  'Adobe Lightroom',
  'Adobe Photoshop',
  'Natural Light',
  'Studio Lighting',
  'Film Emulation',
  'Black & White',
  'Golden Hour',
  'Action Shots'
];

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/temilade-quadri-bbb980a8/',
  github: '',
  instagram: 'https://www.instagram.com/temsvision/',
  facebook: 'https://www.facebook.com/temsvision',
  pinterest: 'https://www.pinterest.com/homefeed/'
};

export const ABOUT_BIO = {
  intro: "Hi, I am Temilade Amire Quadri.",
  background: "I am a Nigerian American photographer born in New Jersey but raised in Nigeria. I currently live in Kalamazoo Michigan, U.S.",
  story: "Photography for me started as a hobby. I started during the first Covid-19 pandemic lockdown in Michigan and this has evolved into a business called TemsVision. The name TemsVision came from my name Temilade pronounced (teh-meh-la-day) which in the Yoruba language of Western Nigeria means 'The crown is mine' and Temi pronounced (Tee-meeh) meaning 'Mine'. TemsVision basically means 'My Vision'.",
  philosophy: "A vision without action is only a thought so contact me and let's make those ideas and imaginations a reality.",
  approach: "I am no professional photographer because the learning curve in photography or life in general doesn't stop. I love challenges and those 'seemingly' impossible tasks, so I urge you to bring them on.",
  nameMeaning: {
    temilade: "The crown is mine",
    temi: "Mine",
    temsvision: "My Vision"
  }
};
