export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Apparel' | 'Accessories' | 'Drinkware' | 'Stationery' | 'Collectibles';
  collection: '1998 Retro' | 'Chrome Dino' | 'Gemini' | 'Campus Essentials' | 'Heritage Classics' | 'New Drops';
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  gallery: string[];
  description: string;
  story?: string;
  details: string[];
  materials?: string;
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  sizes?: string[];
  badge?: string;
  isBestseller?: boolean;
  isNewDrop?: boolean;
  isLimited?: boolean;
  inStock: boolean;
  stockCount?: number;
  tags: string[];
  productUrl?: string;
}

export interface CartItem {
  id: string; // unique item id including variant
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize?: string;
  addedAt: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface GA4Event {
  id: string;
  timestamp: string;
  eventName: string;
  params: Record<string, any>;
  description?: string;
}

export type ViewMode = 'home' | 'plp' | 'pdp' | 'campaign' | 'wishlist' | 'checkout';

export interface FilterState {
  category: string | null;
  collection: string | null;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sizes: string[];
  inStockOnly: boolean;
  sortBy: 'featured' | 'bestselling' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}
