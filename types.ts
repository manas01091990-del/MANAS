
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ServiceCategory;
  duration: string;
  image: string;
}

export type ServiceCategory = 'Haircut' | 'Coloring' | 'Styling' | 'Treatment' | 'Grooming';

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
}

export interface BookingDetails {
  serviceId: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  notes?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
}
