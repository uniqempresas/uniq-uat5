import { Product } from './storefront';

// Item do Carrinho
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  sku: string;
}

// Resumo do Carrinho
export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

// Contexto do Carrinho
export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  summary: CartSummary;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isInCart: (productId: number) => boolean;
}
