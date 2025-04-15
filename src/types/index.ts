
export type UserRole = 'homeowner' | 'professional' | 'supplier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  roles: UserRole[];
  activeRole: UserRole;
  location?: {
    state: string;
    city: string;
    area: string;
  };
  avatar?: string;
}

export interface Professional {
  id: string;
  userId: string;
  specialty: string;
  experience: number;
  portfolio: PortfolioItem[];
  certifications: Certification[];
  rating: number;
  verified: boolean;
  trustScore: number;
  hourlyRate: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: string;
}

export interface Certification {
  id: string;
  title: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  documentUrl?: string;
}

export interface MaterialSupplier {
  id: string;
  userId: string;
  businessName: string;
  businessAddress: string;
  products: Product[];
  rating: number;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  discountedPrice?: number;
  inStock: boolean;
  stockQuantity: number;
  images: string[];
  rating: number;
}

export interface Booking {
  id: string;
  homeownerId: string;
  professionalId?: string;
  supplierId?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  serviceDate: string;
  description: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}
