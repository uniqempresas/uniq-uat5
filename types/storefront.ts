// Configuração da Loja
export interface StoreConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  favicon?: string;
  banner?: string;
  bannerMobile?: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address: Address;
  social: SocialLinks;
  theme: ThemeSettings;
  seo: SEOSettings;
  settings: StoreSettings;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface ThemeSettings {
  template: 'modern' | 'classic' | 'minimal';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  image?: string;
}

export interface StoreSettings {
  currency: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  shippingCost: number;
  showStock: boolean;
  allowBackorder: boolean;
}

// Categoria
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: string;
}

// Produto
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categoryId: number;
  description: string;
  features: string[];
  stock: number;
  sku: string;
  rating?: number;
  reviewCount?: number;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
}

// Template de Tema
export interface ThemeTemplate {
  id: 'modern' | 'classic' | 'minimal';
  name: string;
  description: string;
  preview: string;
  features: string[];
}

// Filtros
export interface ProductFilters {
  categories: number[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
