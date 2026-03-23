// types/marketplace.ts - Marketplace Types for UNIQ

// ============================================================================
// Seller (Lojista/Vendedor)
// ============================================================================

export interface SellerLocation {
  city: string;
  state: string;
}

export interface Seller {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  banner: string | null;
  description: string;
  location: SellerLocation;
  rating: number;
  reviewCount: number;
  productCount: number;
  salesCount: number;
  isVerified: boolean;
  isPremium: boolean;
  isNew: boolean; // joined < 30 days
  createdAt: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  cnpj?: string;
  businessHours?: string;
  categories?: string[]; // categorias principais
}

export interface SellerCreateInput {
  name: string;
  description: string;
  phone?: string;
  whatsapp?: string;
  businessHours?: string;
}

export interface SellerUpdateInput extends Partial<SellerCreateInput> {
  logo?: string | null;
  banner?: string | null;
}

// ============================================================================
// Product (Produto)
// ============================================================================

export type ProductStatus = 'active' | 'paused' | 'out_of_stock' | 'draft';

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number; // preço original (para desconto)
  images: string[];
  category: string;
  categoryId?: string;
  stock: number;
  status: ProductStatus;
  salesCount: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  tags?: string[];
  hasFreeShipping?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreateInput {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  categoryId?: string;
  stock: number;
  sku?: string;
  tags?: string[];
  hasFreeShipping?: boolean;
  status?: ProductStatus;
  sellerId?: string;
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {
  status?: ProductStatus;
}

// ============================================================================
// Order (Pedido)
// ============================================================================

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderCustomer {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  options?: Record<string, string>; // opções do produto
}

export interface Order {
  id: string;
  orderNumber: string;
  sellerId: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// Review (Avaliação)
// ============================================================================

export interface ReviewReply {
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  sellerId: string;
  productId?: string;
  productName?: string;
  customerId?: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
  reply?: ReviewReply;
  isVerifiedPurchase: boolean;
  createdAt: string;
}

export interface ReviewCreateInput {
  sellerId: string;
  productId?: string;
  rating: number;
  title?: string;
  content: string;
  photos?: string[];
}

export interface ReviewReplyInput {
  reviewId: string;
  content: string;
}

// ============================================================================
// Metrics (Métricas do Dashboard)
// ============================================================================

export interface SellerMetrics {
  salesMonth: number;
  salesMonthChange: number; // % variação
  revenueToday: number;
  ordersPending: number;
  ordersNewToday: number;
  productsActive: number;
  productsTotal: number;
}

// ============================================================================
// Filters (Filtros)
// ============================================================================

export type SellerSortOption = 
  | 'relevance' 
  | 'rating_desc' 
  | 'products_desc' 
  | 'sales_desc' 
  | 'newest';

export type ProductSortOption =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'sales_desc';

export interface SellerFilters {
  search?: string;
  category?: string;
  location?: string;
  minRating?: number;
  sort?: SellerSortOption;
  page?: number;
  limit?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  sort?: ProductSortOption;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface OrderFilters {
  search?: string;
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// ============================================================================
// Review Distribution (Distribuição de Avaliações)
// ============================================================================

export interface ReviewDistribution {
  5: number; // count of 5-star reviews
  4: number;
  3: number;
  2: number;
  1: number;
  average: number;
  total: number;
}

// ============================================================================
// Categories (Categorias)
// ============================================================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  count?: number;
}

// Predefined categories for the region
export const MARKETPLACE_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Eletrônicos', slug: 'eletronicos', icon: 'Laptop' },
  { id: 'cat-2', name: 'Roupas e Acessórios', slug: 'roupas', icon: 'Shirt' },
  { id: 'cat-3', name: 'Alimentos e Bebidas', slug: 'alimentos', icon: 'Coffee' },
  { id: 'cat-4', name: 'Beleza e Cosméticos', slug: 'beleza', icon: 'Sparkles' },
  { id: 'cat-5', name: 'Móveis e Decoração', slug: 'moveis', icon: 'Sofa' },
  { id: 'cat-6', name: 'Esportes e Lazer', slug: 'esportes', icon: 'Dumbbell' },
  { id: 'cat-7', name: 'Serviços', slug: 'servicos', icon: 'Briefcase' },
  { id: 'cat-8', name: 'Outros', slug: 'outros', icon: 'Package' },
];

// Predefined locations for the region
export const MARKETPLACE_LOCATIONS = [
  { value: '', label: 'Todas as regiões' },
  { value: 'Suzano', label: 'Suzano, SP' },
  { value: 'Mogi das Cruzes', label: 'Mogi das Cruzes, SP' },
  { value: 'Itaquaquecetuba', label: 'Itaquaquecetuba, SP' },
  { value: 'Poá', label: 'Poá, SP' },
  { value: 'Ferraz de Vasconcelos', label: 'Ferraz de Vasconcelos, SP' },
  { value: 'Santa Isabel', label: 'Santa Isabel, SP' },
];
