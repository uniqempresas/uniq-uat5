// ============================================
// PRODUTO PDV
// ============================================

export interface PDVProduct {
  id: number;
  name: string;
  price: number;
  costPrice?: number;
  image: string;
  stock: number;
  category: string;
  categoryId: number;
  barcode: string;
  sku: string;
  minStock?: number;
  isActive: boolean;
  description?: string;
}

// ============================================
// CARRINHO PDV
// ============================================

export interface CartItemPDV {
  id: string;
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  subtotal: number;
  discount?: number;
}

export interface CartPDV {
  items: CartItemPDV[];
  subtotal: number;
  discount: number;
  tax?: number;
  total: number;
  itemCount: number;
  customerId?: number;
  sellerId?: number;
}

// ============================================
// CLIENTE
// ============================================

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  birthDate?: string;
  createdAt: string;
  totalPurchases?: number;
  totalSpent?: number;
  isActive: boolean;
}

// ============================================
// VENDEDOR
// ============================================

export interface Seller {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'seller' | 'operator';
  isActive: boolean;
  stats?: {
    totalSales: number;
    totalAmount: number;
    averageTicket: number;
  };
}

// ============================================
// CATEGORIA
// ============================================

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  color?: string;
  icon?: string;
  isActive: boolean;
}
