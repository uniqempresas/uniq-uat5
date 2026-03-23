'use client';

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import { CartContextType, CartItem, CartSummary } from '@/types/cart';
import { Product } from '@/types/storefront';
import { toast } from '@/hooks/use-toast';

const FREE_SHIPPING_THRESHOLD = 299.90;
const SHIPPING_COST = 15.90;

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

function calculateSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  
  return {
    subtotal,
    discount: 0,
    shipping,
    total: subtotal + shipping,
    itemCount
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      const existingItem = state.items.find(item => item.productId === product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems, isOpen: true };
      }
      
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: 1,
        sku: product.sku
      };
      
      return { ...state, items: [...state.items, newItem], isOpen: true };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    
    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  
  const summary = useMemo(() => calculateSummary(state.items), [state.items]);
  
  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: 'Produto adicionado!',
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  }, []);
  
  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast({
      title: 'Produto removido',
      description: 'Item removido do carrinho.',
    });
  }, []);
  
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);
  
  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);
  
  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);
  
  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);
  
  const isInCart = useCallback((productId: number) => {
    return state.items.some(item => item.productId === productId);
  }, [state.items]);
  
  const value: CartContextType = {
    items: state.items,
    isOpen: state.isOpen,
    summary,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    isInCart
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
