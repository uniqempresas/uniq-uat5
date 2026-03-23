'use client';

import { useState, useCallback, useMemo } from 'react';
import { PDVProduct, CartItemPDV, CartPDV, Customer } from '@/types/pdv';
import { Payment } from '@/types/payment';
import { Sale, SaleStatus, SaleOrigin } from '@/types/venda';
import { Caixa } from '@/types/caixa';
import { useToast } from '@/hooks/use-toast';
import { mockPDVProducts, mockCustomers } from '@/lib/mocks/pdv-products';
import { mockCaixa } from '@/lib/mocks/pdv-sales';

export interface UsePDVReturn {
  // Produtos
  products: PDVProduct[];
  filteredProducts: PDVProduct[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  
  // Carrinho
  cart: CartPDV;
  addToCart: (product: PDVProduct) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyDiscount: (amount: number) => void;
  
  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedPayments: Payment[];
  setSelectedPayments: (payments: Payment[]) => void;
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  completeSale: () => Promise<Partial<Sale> | undefined>;
  
  // Caixa
  caixa: Caixa;
  
  // UI
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  recentProducts: PDVProduct[];
}

// Helper para formatar moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

// Helper para gerar UUID simples
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function usePDV(): UsePDVReturn {
  const { toast } = useToast();
  
  // Estados
  const [products] = useState<PDVProduct[]>(mockPDVProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItemPDV[]>([]);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<Payment[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [caixa] = useState<Caixa>(mockCaixa);
  const [recentProducts, setRecentProducts] = useState<PDVProduct[]>([]);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.categoryId === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.barcode.includes(term) ||
        p.sku.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchTerm]);

  // Calcular resumo do carrinho
  const cart = useMemo<CartPDV>(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    return {
      items: cartItems,
      subtotal,
      discount: cartDiscount,
      tax: 0,
      total: Math.max(0, subtotal - cartDiscount),
      itemCount,
      customerId: selectedCustomer?.id
    };
  }, [cartItems, cartDiscount, selectedCustomer]);

  // Adicionar ao carrinho
  const addToCart = useCallback((product: PDVProduct) => {
    if (product.stock <= 0) {
      toast({
        title: 'Produto sem estoque',
        description: `${product.name} não está disponível.`,
        variant: 'error'
      });
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          toast({
            title: 'Estoque insuficiente',
            description: `Apenas ${product.stock} unidades disponíveis.`,
            variant: 'error'
          });
          return prev;
        }
        
        return prev.map(item =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
              }
            : item
        );
      }
      
      const newItem: CartItemPDV = {
        id: generateId(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stock,
        subtotal: product.price
      };
      
      return [...prev, newItem];
    });
    
    // Adicionar aos produtos recentes
    setRecentProducts(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
    
    setIsCartOpen(true);
    
    toast({
      title: 'Produto adicionado',
      description: `${product.name} foi adicionado ao carrinho.`
    });
  }, [toast]);

  // Atualizar quantidade
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      return;
    }
    
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const validQuantity = Math.min(quantity, item.stock);
          return {
            ...item,
            quantity: validQuantity,
            subtotal: validQuantity * item.price
          };
        }
        return item;
      })
    );
  }, []);

  // Remover do carrinho
  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Item removido',
      description: 'O item foi removido do carrinho.'
    });
  }, [toast]);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartDiscount(0);
    setSelectedCustomer(null);
    setSelectedPayments([]);
  }, []);

  // Aplicar desconto
  const applyDiscount = useCallback((amount: number) => {
    setCartDiscount(amount);
    toast({
      title: 'Desconto aplicado',
      description: `Desconto de ${formatCurrency(amount)} aplicado.`
    });
  }, [toast]);

  // Finalizar venda
  const completeSale = useCallback(async () => {
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sale: Partial<Sale> = {
      number: `001${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: SaleStatus.CONCLUIDA,
      origin: SaleOrigin.PDV,
      createdAt: new Date().toISOString(),
      items: cartItems,
      subtotal: cart.subtotal,
      discount: cart.discount,
      tax: 0,
      total: cart.total,
      payments: selectedPayments,
      customer: selectedCustomer || undefined,
      seller: { id: 1, name: 'Ana Silva', email: '', role: 'admin', isActive: true },
      cashRegisterId: caixa.id,
      receiptPrinted: false
    };
    
    toast({
      title: 'Venda concluída!',
      description: `Venda #${sale.number} finalizada com sucesso.`
    });
    
    // Limpar carrinho após venda
    clearCart();
    setIsCheckoutOpen(false);
    
    return sale;
  }, [cartItems, cart, selectedPayments, selectedCustomer, caixa, clearCart, toast]);

  return {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    selectedPayments,
    setSelectedPayments,
    selectedCustomer,
    setSelectedCustomer,
    completeSale,
    caixa,
    isCartOpen,
    setIsCartOpen,
    recentProducts
  };
}
