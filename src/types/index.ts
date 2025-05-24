export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  sizes?: string[];
  colors?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface SiteConfig {
  storeName: string;
  logo: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  }
}

export interface AdminUser {
  username: string;
  isLoggedIn: boolean;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  notes?: string;
}