
import React from 'react';
import { Service, Review, GalleryImage, TeamMember } from './types';

export const BRAND_NAME = "PROSTYLE";
export const PHONE_NUMBER = "9810619424";
export const ADDRESS = "123 Designer Row, Grooming District, NY";

export const COLORS = {
  primary: "#050505", // Obsidian
  accent1: "#D4AF37", // Gold
  accent2: "#8B735B", // Bronze
  neutral: "#F5F5F0", // Bone White
  background: "#050505", 
};

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Architectural Haircut',
    description: 'Precision scissor and clipper work tailored to your profile. Includes a stimulating wash and styling.',
    price: 800,
    category: 'Haircut',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Signature Beard Sculpt',
    description: 'Bespoke shaping and lining using a straight razor. Finished with premium oils and a hot towel.',
    price: 500,
    category: 'Grooming',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Obsidian Detox Facial',
    description: 'A deep-cleansing ritual designed for men. Removes impurities and hydrates the skin using volcanic minerals.',
    price: 1500,
    category: 'Grooming',
    duration: '45 min',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Mineral Hair Spa',
    description: 'Intense hydration and scalp rejuvenation. Perfect for strengthening follicles and ultimate relaxation.',
    price: 2000,
    category: 'Treatment',
    duration: '60 min',
    image: 'https://images.unsplash.com/photo-1512690118275-1aa3c2ad19f4?auto=format&fit=crop&q=80&w=800'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Victor Black',
    title: 'Master Barber',
    bio: 'Specializing in structural fades and traditional straight-razor mastery.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    specialties: ['Structural Fades', 'Razor Work']
  },
  {
    id: 't2',
    name: 'Leo Thorne',
    title: 'Grooming Lead',
    bio: 'Expert in beard architectural design and skin-fade perfection.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    specialties: ['Beard Design', 'Texture Specialist']
  }
];

export const GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200', title: 'The Lounge', category: 'Interior' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1622286330961-a29a63c6ee59?auto=format&fit=crop&q=80&w=1200', title: 'Gold Razor', category: 'Portfolio' },
];

export const REVIEWS: Review[] = [
  { id: '1', author: 'Marcus V.', rating: 5, content: 'The best architectural fade in the city. Truly a luxury experience.', date: '3d ago', avatar: 'https://i.pravatar.cc/150?u=mv' },
];
