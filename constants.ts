
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Brand Identity System',
    category: 'UX/UI DESIGN',
    imageUrl: 'https://picsum.photos/seed/brand/800/1200',
    description: 'Complete visual identity and design system for a modern fintech startup.'
  },
  {
    id: '2',
    title: 'Editorial Collection',
    category: 'PHOTOGRAPHY',
    imageUrl: 'https://picsum.photos/seed/editorial/800/1200',
    description: 'High-fashion editorial series exploring light, texture, and human emotion.'
  },
  {
    id: '3',
    title: 'Mobile App Redesign',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://picsum.photos/seed/mobile/800/1200',
    description: 'End-to-end redesign improving user engagement by 40% through intuitive UX.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'End-to-end UX/UI design for web and mobile applications. From research to polished interfaces.',
    imageUrl: 'https://picsum.photos/seed/design/800/1200',
    price: '$2500'
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    description: 'Complete visual identity systems including logos, typography, and design guidelines.',
    imageUrl: 'https://picsum.photos/seed/identity/800/1200',
    price: '$1800'
  },
  {
    id: 'photography',
    name: 'Creative Photography',
    description: 'Editorial, portrait, and commercial photography that tells your story visually.',
    imageUrl: 'https://picsum.photos/seed/photo/800/1200',
    price: '$1200'
  }
];
