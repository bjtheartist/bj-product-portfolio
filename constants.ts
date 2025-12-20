
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Brand Identity System',
    category: 'UX/UI DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    description: 'Complete visual identity and design system for a modern fintech startup.'
  },
  {
    id: '2',
    title: 'Editorial Collection',
    category: 'PHOTOGRAPHY',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000',
    description: 'High-fashion editorial series exploring light, texture, and human emotion.'
  },
  {
    id: '3',
    title: 'Mobile App Redesign',
    category: 'PRODUCT DESIGN',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000',
    description: 'End-to-end redesign improving user engagement by 40% through intuitive UX.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'product-design',
    name: 'Product Design',
    description: 'End-to-end UX/UI design for web and mobile applications. From research to polished interfaces.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    price: '$2500'
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    description: 'Complete visual identity systems including logos, typography, and design guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1000',
    price: '$1800'
  },
  {
    id: 'photography',
    name: 'Creative Photography',
    description: 'Editorial, portrait, and commercial photography that tells your story visually.',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000',
    price: '$1200'
  }
];
