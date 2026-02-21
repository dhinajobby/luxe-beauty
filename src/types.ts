import { LucideIcon } from 'lucide-react';

export type Page = 'home' | 'shade-matcher' | 'shade-result' | 'tutorials' | 'booking' | 'virtual-try-on';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  affiliateLink: string;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  category: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  specialties: string[];
}
