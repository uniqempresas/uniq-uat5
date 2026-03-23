# SPEC - Sprint 05: Storefront UI 🎨

## Overview Técnico

**Data de Criação:** 20/03/2026  
**Versão:** 1.0  
**Autor:** @vibe-planner  
**Status:** 🟢 PRONTO PARA IMPLEMENTAÇÃO

### Stack Tecnológica
- **Framework:** Next.js 14.2.5 (App Router)
- **Linguagem:** TypeScript 5.4.5
- **UI Library:** React 18.3.1
- **Estilização:** Tailwind CSS 3.4.4
- **Componentes:** shadcn/ui v4.0.5
- **Ícones:** Lucide React 0.400.0
- **Animações:** Tailwind CSS Animate (nativo)

### Padrões de Desenvolvimento
- Componentes funcionais com hooks
- Estados locais com `useState`/`useReducer`
- Context API para estado global (carrinho, tema)
- Mock data completo para testes visuais
- Server Components por padrão, Client Components quando necessário

---

## Estrutura de Arquivos

```
app/
├── (store)/                          # Grupo de rotas da loja pública
│   ├── layout.tsx                    # Layout da loja (sem sidebar admin)
│   ├── page.tsx                      # Página inicial (grid de produtos)
│   ├── produto/
│   │   └── [slug]/
│   │       └── page.tsx              # Página de detalhe do produto
│   └── checkout/
│       └── page.tsx                  # Checkout completo
├── (dashboard)/
│   └── dashboard/
│       └── loja/
│           └── configuracoes/
│               └── page.tsx          # Painel de configuração da loja
components/
├── storefront/
│   ├── layout/
│   │   ├── store-header.tsx          # Header da loja
│   │   ├── store-footer.tsx          # Footer da loja
│   │   └── store-layout.tsx          # Wrapper da loja
│   ├── product/
│   │   ├── product-card.tsx          # Card de produto no grid
│   │   ├── product-grid.tsx          # Grid de produtos
│   │   ├── product-gallery.tsx       # Galeria de imagens
│   │   ├── product-info.tsx          # Info do produto
│   │   ├── product-filters.tsx       # Filtros laterais
│   │   └── category-filter.tsx       # Filtro de categorias
│   ├── cart/
│   │   ├── cart-drawer.tsx           # Slide-out do carrinho
│   │   ├── cart-item.tsx             # Item do carrinho
│   │   ├── cart-summary.tsx          # Resumo do carrinho
│   │   ├── cart-empty.tsx            # Estado vazio
│   │   └── quantity-selector.tsx     # Seletor de quantidade
│   └── checkout/
│       ├── checkout-steps.tsx        # Steps do checkout
│       ├── checkout-form.tsx         # Formulário de dados
│       ├── address-form.tsx          # Formulário de endereço
│       ├── payment-selector.tsx      # Seleção de pagamento
│       ├── order-summary.tsx         # Resumo do pedido
│       └── checkout-success.tsx      # Tela de sucesso
├── store-config/
│   ├── theme-selector.tsx            # Seleção de templates
│   ├── color-picker.tsx              # Customizador de cores
│   ├── banner-upload.tsx             # Upload de banner
│   ├── store-preview.tsx             # Preview ao vivo
│   └── seo-settings.tsx              # Configurações de SEO
└── ui/                               # Componentes shadcn existentes
contexts/
├── cart-context.tsx                  # Contexto do carrinho
└── store-context.tsx                 # Contexto da loja/tema
hooks/
├── use-cart.ts                       # Hook do carrinho
└── use-store.ts                      # Hook da loja
lib/
├── mocks/
│   ├── storefront.ts                 # Mock data completo
│   └── index.ts                      # Exportações
├── utils.ts                          # Utilitários (já existe)
└── utils/
    ├── formatters.ts                 # Formatadores (moeda, etc.)
    └── validators.ts                 # Validações (CEP, etc.)
types/
├── storefront.ts                     # Tipos da loja
├── cart.ts                           # Tipos do carrinho
└── checkout.ts                       # Tipos do checkout
```

---

## Tipos TypeScript

### types/storefront.ts

```typescript
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
```

### types/cart.ts

```typescript
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
```

### types/checkout.ts

```typescript
import { CartItem, CartSummary } from './cart';

// Dados do Cliente
export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

// Dados de Endereço
export interface AddressData {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

// Método de Pagamento
export interface PaymentMethod {
  id: 'credit_card' | 'pix' | 'boleto';
  name: string;
  icon: string;
  description: string;
  discount?: number;
  installments?: InstallmentOption[];
  finalValue?: number;
}

export interface InstallmentOption {
  times: number;
  value: number;
}

// Pedido
export interface Order {
  id: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  customer: CustomerData;
  shipping: {
    address: AddressData;
    method: string;
    cost: number;
    estimatedDelivery: string;
  };
  payment: {
    method: string;
    status: 'pending' | 'paid' | 'failed';
    paidAt?: string;
  };
  items: CartItem[];
  summary: CartSummary;
}

// Steps do Checkout
export type CheckoutStep = 'dados' | 'pagamento' | 'confirmacao';

export interface CheckoutState {
  currentStep: CheckoutStep;
  customer: CustomerData;
  address: AddressData;
  paymentMethod: string;
  isLoading: boolean;
}
```

---

## Mock Data Implementável

### lib/mocks/storefront.ts

```typescript
import { StoreConfig, Category, Product, CartItem, CartSummary, ThemeTemplate, PaymentMethod, Order } from '@/types/storefront';

// Configuração da loja
export const mockStoreConfig: StoreConfig = {
  id: 'store-001',
  name: 'Ótica Visão',
  slug: 'otica-visao',
  description: 'A melhor ótica da cidade. Óculos de sol, armações e lentes de qualidade.',
  logo: '/images/logo-otica.png',
  favicon: '/images/favicon.ico',
  banner: '/images/banner-otica.jpg',
  bannerMobile: '/images/banner-otica-mobile.jpg',
  phone: '(11) 99999-9999',
  whatsapp: '(11) 99999-9999',
  email: 'contato@oticavisao.com.br',
  address: {
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01001-000'
  },
  social: {
    instagram: '@oticavisao',
    facebook: '/oticavisao',
    whatsapp: '5511999999999'
  },
  theme: {
    template: 'modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    accentColor: '#86CB92',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937'
  },
  seo: {
    title: 'Ótica Visão - Óculos de Sol e Armações',
    description: 'Encontre os melhores óculos de sol e armações na Ótica Visão. Qualidade e preço justo.',
    image: '/images/seo-image.jpg'
  },
  settings: {
    currency: 'BRL',
    currencySymbol: 'R$',
    freeShippingThreshold: 299.90,
    shippingCost: 15.90,
    showStock: true,
    allowBackorder: false
  }
};

// Categorias de produtos
export const mockCategories: Category[] = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 15, image: '/images/cat-oculos-sol.jpg' },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 32, image: '/images/cat-armacoes.jpg' },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 8, image: '/images/cat-lentes.jpg' },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 24, image: '/images/cat-acessorios.jpg' },
  { id: 5, name: 'Infantil', slug: 'infantil', count: 12, image: '/images/cat-infantil.jpg' },
];

// Produtos
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    slug: 'oculos-de-sol-ray-ban-aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: '/images/oculos1.jpg',
    images: ['/images/oculos1.jpg', '/images/oculos1-2.jpg', '/images/oculos1-3.jpg'],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'O clássico Aviador da Ray-Ban com proteção UV400 e lentes polarizadas. Design atemporal que nunca sai de moda.',
    features: ['Proteção UV400', 'Lentes polarizadas', 'Armação de metal', 'Estojo incluso'],
    stock: 5,
    sku: 'RB3025-001',
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    isBestseller: true,
    tags: ['polarizado', 'clássico', 'unissex']
  },
  {
    id: 2,
    name: 'Armação Titanium Ultra Leve',
    slug: 'armacao-titanium-ultra-leve',
    price: 459.90,
    image: '/images/oculos2.jpg',
    images: ['/images/oculos2.jpg'],
    category: 'Armações',
    categoryId: 2,
    description: 'Armação em titânio de alta resistência e peso mínimo. Ideal para uso prolongado.',
    features: ['Titânio hipoalergênico', 'Peso: apenas 8g', 'Resistente à corrosão', 'Garantia de 2 anos'],
    stock: 12,
    sku: 'TIT-2024-001',
    rating: 4.5,
    reviewCount: 67,
    isNew: true,
    isBestseller: false,
    tags: ['leve', 'titânio', 'durável']
  },
  {
    id: 3,
    name: 'Óculos de Sol Oakley Holbrook',
    slug: 'oculos-de-sol-oakley-holbrook',
    price: 749.90,
    originalPrice: 899.90,
    image: '/images/oculos3.jpg',
    images: ['/images/oculos3.jpg', '/images/oculos3-2.jpg'],
    category: 'Óculos de Sol',
    categoryId: 1,
    description: 'Design esportivo com tecnologia Prizm que melhora contraste e visibilidade.',
    features: ['Tecnologia Prizm', 'Resistente a impactos', 'Ideal para esportes', 'Proteção UV400'],
    stock: 8,
    sku: 'OO9102-D6',
    rating: 4.9,
    reviewCount: 203,
    isNew: false,
    isBestseller: true,
    tags: ['esportivo', 'prizm', 'masculino']
  },
  {
    id: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    slug: 'lentes-de-contato-acuvue-oasys',
    price: 129.90,
    image: '/images/lentes1.jpg',
    images: ['/images/lentes1.jpg'],
    category: 'Lentes',
    categoryId: 3,
    description: 'Lentes de contato mensais com tecnologia Hydraclear Plus para máximo conforto.',
    features: ['Tecnologia Hydraclear Plus', 'Proteção UV', 'Caixa com 6 unidades', 'Uso mensal'],
    stock: 25,
    sku: 'ACV-OAS-6',
    rating: 4.7,
    reviewCount: 89,
    isNew: false,
    isBestseller: true,
    tags: ['contato', 'mensal', 'conforto']
  },
  {
    id: 5,
    name: 'Armação Vintage Redonda',
    slug: 'armacao-vintage-redonda',
    price: 299.90,
    image: '/images/oculos4.jpg',
    images: ['/images/oculos4.jpg'],
    category: 'Armações',
    categoryId: 2,
    description: 'Estilo retrô com armação redonda em acetato. Perfeito para quem busca um look diferenciado.',
    features: ['Acetato de alta qualidade', 'Design vintage', 'Dobradiças reforçadas', 'Várias cores disponíveis'],
    stock: 0,
    sku: 'VNT-001',
    rating: 4.3,
    reviewCount: 45,
    isNew: true,
    isBestseller: false,
    tags: ['vintage', 'feminino', 'retrô']
  },
  {
    id: 6,
    name: 'Óculos de Sol Polaroid Infantil',
    slug: 'oculos-de-sol-polaroid-infantil',
    price: 159.90,
    image: '/images/oculos5.jpg',
    images: ['/images/oculos5.jpg'],
    category: 'Infantil',
    categoryId: 5,
    description: 'Óculos de sol infantil com proteção UV400 e armação flexível e resistente.',
    features: ['Proteção UV400', 'Armação flexível', 'Resistente a quebras', 'Cordão incluso'],
    stock: 18,
    sku: 'PLD-K001',
    rating: 4.6,
    reviewCount: 34,
    isNew: true,
    isBestseller: false,
    tags: ['infantil', 'flexível', 'seguro']
  }
];

// Carrinho inicial
export const mockCartItems: CartItem[] = [
  {
    productId: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: '/images/oculos1.jpg',
    quantity: 1,
    sku: 'RB3025-001'
  },
  {
    productId: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    price: 129.90,
    image: '/images/lentes1.jpg',
    quantity: 2,
    sku: 'ACV-OAS-6'
  }
];

export const mockCartSummary: CartSummary = {
  subtotal: 1159.70,
  discount: 0,
  shipping: 0,
  total: 1159.70,
  itemCount: 3
};

// Templates de tema
export const mockThemeTemplates: ThemeTemplate[] = [
  {
    id: 'modern',
    name: 'Moderno',
    description: 'Design clean e minimalista com foco nos produtos',
    preview: '/themes/modern-preview.jpg',
    features: ['Grid responsivo', 'Cards grandes', 'Busca destacada']
  },
  {
    id: 'classic',
    name: 'Clássico',
    description: 'Layout tradicional de e-commerce com sidebar de filtros',
    preview: '/themes/classic-preview.jpg',
    features: ['Sidebar fixa', 'Filtros visíveis', 'Lista de categorias']
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    description: 'Máxima simplicidade com tipografia elegante',
    preview: '/themes/minimal-preview.jpg',
    features: ['Espaçamento amplo', 'Tipografia destacada', 'Sem distrações']
  }
];

// Métodos de pagamento
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: 'credit-card',
    description: 'Parcele em até 12x',
    installments: [
      { times: 1, value: 1159.70 },
      { times: 2, value: 579.85 },
      { times: 3, value: 386.57 },
      { times: 6, value: 193.28 },
      { times: 12, value: 96.64 }
    ]
  },
  {
    id: 'pix',
    name: 'Pix',
    icon: 'qr-code',
    description: '5% de desconto',
    discount: 5,
    finalValue: 1101.72
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: 'barcode',
    description: 'Vencimento em 3 dias úteis',
    discount: 0
  }
];

// Pedido de exemplo
export const mockOrder: Order = {
  id: 'ORD-2024-001',
  status: 'completed',
  createdAt: '2024-03-20T14:30:00Z',
  customer: {
    name: 'Maria Silva',
    email: 'maria@email.com',
    phone: '(11) 99999-9999'
  },
  shipping: {
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apto 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    method: 'Standard',
    cost: 0,
    estimatedDelivery: '23/03/2024'
  },
  payment: {
    method: 'pix',
    status: 'paid',
    paidAt: '2024-03-20T14:35:00Z'
  },
  items: mockCartItems,
  summary: {
    subtotal: 1159.70,
    discount: 57.99,
    shipping: 0,
    total: 1101.72
  }
};
```

### lib/mocks/index.ts

```typescript
export * from './storefront';
```

---

## Componentes Detalhados

### 1. Contexto do Carrinho

#### contexts/cart-context.tsx

```typescript
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
```

### 2. Header da Loja

#### components/storefront/layout/store-header.tsx

```typescript
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/contexts/cart-context';
import { mockStoreConfig, mockCategories } from '@/lib/mocks/storefront';

interface StoreHeaderProps {
  onCartClick?: () => void;
}

export function StoreHeader({ onCartClick }: StoreHeaderProps) {
  const { summary, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      openCart();
    }
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-uniq-primary">
              {mockStoreConfig.name}
            </h1>
          </Link>
          
          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-uniq-muted" />
              <Input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Phone - Desktop */}
            <a
              href={`tel:${mockStoreConfig.phone}`}
              className="hidden lg:flex items-center gap-2 text-sm text-uniq-muted hover:text-uniq-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{mockStoreConfig.phone}</span>
            </a>
            
            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {summary.itemCount > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {summary.itemCount}
                </Badge>
              )}
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <div className="flex flex-col gap-6">
                  <h2 className="text-xl font-bold text-uniq-primary">
                    {mockStoreConfig.name}
                  </h2>
                  
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-uniq-muted" />
                    <Input
                      type="text"
                      placeholder="Buscar produtos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10"
                    />
                  </div>
                  
                  {/* Categories */}
                  <nav className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-uniq-muted uppercase">
                      Categorias
                    </h3>
                    {mockCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categoria/${category.slug}`}
                        className="py-2 text-uniq-text hover:text-uniq-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                        <span className="ml-2 text-xs text-uniq-muted">
                          ({category.count})
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 mt-4 pt-4 border-t border-uniq-border">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categoria/${category.slug}`}
              className="text-sm text-uniq-text hover:text-uniq-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

### 3. Card de Produto

#### components/storefront/product/product-card.tsx

```typescript
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/storefront';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <Card className="group relative overflow-hidden border-uniq-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge variant="info" className="text-xs">
            Novo
          </Badge>
        )}
        {product.isBestseller && (
          <Badge variant="accent" className="text-xs">
            Mais Vendido
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive" className="text-xs">
            -{discount}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="secondary" className="text-xs">
            Esgotado
          </Badge>
        )}
      </div>
      
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-uniq-platinum">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-uniq-text line-clamp-2 mb-2 group-hover:text-uniq-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-uniq-text">{product.rating}</span>
            <span className="text-xs text-uniq-muted">
              ({product.reviewCount})
            </span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-uniq-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-uniq-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
          variant={isInCart(product.id) ? 'secondary' : 'default'}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0
            ? 'Esgotado'
            : isInCart(product.id)
            ? 'Adicionar Mais'
            : 'Adicionar'}
        </Button>
      </div>
    </Card>
  );
}
```

### 4. Grid de Produtos

#### components/storefront/product/product-grid.tsx

```typescript
'use client';

import React from 'react';
import { ProductCard } from './product-card';
import { Product } from '@/types/storefront';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-uniq-muted">Nenhum produto encontrado</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 5. Carrinho Drawer

#### components/storefront/cart/cart-drawer.tsx

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/formatters';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

export function CartDrawer() {
  const {
    items,
    isOpen,
    summary,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart();
  
  const handleQuantityChange = (productId: number, delta: number) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      const newQuantity = item.quantity + delta;
      if (newQuantity > 0) {
        updateQuantity(productId, newQuantity);
      }
    }
  };
  
  const handleRemove = (productId: number, productName: string) => {
    removeItem(productId);
    toast({
      title: 'Item removido',
      description: `${productName} foi removido do carrinho.`,
      action: {
        label: 'Desfazer',
        onClick: () => {
          // Implementar undo se necessário
        }
      }
    });
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Meu Carrinho
            {summary.itemCount > 0 && (
              <span className="text-sm font-normal text-uniq-muted">
                ({summary.itemCount} {summary.itemCount === 1 ? 'item' : 'itens'})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 rounded-full bg-uniq-platinum flex items-center justify-center mb-4">
              <ShoppingCart className="w-12 h-12 text-uniq-muted" />
            </div>
            <h3 className="text-lg font-semibold text-uniq-text mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-sm text-uniq-muted mb-6">
              Adicione produtos para começar
            </p>
            <Button onClick={closeCart} variant="outline">
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-3 bg-uniq-platinum/50 rounded-lg"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-uniq-text line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-uniq-muted mt-1">
                        SKU: {item.sku}
                      </p>
                      <p className="text-sm font-semibold text-uniq-primary mt-2">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-uniq-muted hover:text-red-500"
                        onClick={() => handleRemove(item.productId, item.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.productId, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item.productId, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator className="my-4" />
            
            {/* Summary */}
            <SheetFooter className="flex-col gap-4">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-uniq-muted">Subtotal</span>
                  <span className="font-medium">{formatPrice(summary.subtotal)}</span>
                </div>
                
                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-uniq-muted">Desconto</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(summary.discount)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span className="text-uniq-muted">Frete</span>
                  <span className="font-medium">
                    {summary.shipping === 0 ? (
                      <span className="text-green-600">Grátis</span>
                    ) : (
                      formatPrice(summary.shipping)
                    )}
                  </span>
                </div>
                
                {summary.subtotal < 299.90 && (
                  <p className="text-xs text-uniq-muted text-center">
                    Faltam {formatPrice(299.90 - summary.subtotal)} para frete grátis
                  </p>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-uniq-primary">{formatPrice(summary.total)}</span>
                </div>
              </div>
              
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout" onClick={closeCart}>
                  Finalizar Compra
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full"
                onClick={closeCart}
              >
                Continuar Comprando
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
```

### 6. Checkout Steps

#### components/storefront/checkout/checkout-steps.tsx

```typescript
'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CheckoutStep = 'dados' | 'pagamento' | 'confirmacao';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: 'dados', label: 'Dados', description: 'Informações pessoais' },
  { id: 'pagamento', label: 'Pagamento', description: 'Escolha a forma' },
  { id: 'confirmacao', label: 'Confirmação', description: 'Pedido finalizado' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isUpcoming = index > currentIndex;
          
          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                    {
                      'bg-uniq-primary text-white': isCompleted || isCurrent,
                      'bg-uniq-platinum text-uniq-muted': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn('text-sm font-medium', {
                      'text-uniq-text': isCompleted || isCurrent,
                      'text-uniq-muted': isUpcoming,
                    })}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-uniq-muted hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 transition-colors',
                    {
                      'bg-uniq-primary': index < currentIndex,
                      'bg-uniq-border': index >= currentIndex,
                    }
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
```

### 7. Formulário de Dados Pessoais

#### components/storefront/checkout/checkout-form.tsx

```typescript
'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomerData } from '@/types/checkout';

interface CheckoutFormProps {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
  errors?: Partial<Record<keyof CustomerData, string>>;
}

export function CheckoutForm({ data, onChange, errors }: CheckoutFormProps) {
  const handleChange = (field: keyof CustomerData, value: string) => {
    onChange({ ...data, [field]: value });
  };
  
  // Máscara de telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo *</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Digite seu nome completo"
          error={!!errors?.name}
        />
        {errors?.name && (
          <p className="text-sm text-red-500">{errors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">E-mail *</Label>
        <Input
          id="email"
          type="email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="seu@email.com"
          error={!!errors?.email}
        />
        {errors?.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Telefone/Celular *</Label>
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
          placeholder="(11) 99999-9999"
          error={!!errors?.phone}
        />
        {errors?.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
    </div>
  );
}
```

### 8. Formulário de Endereço

#### components/storefront/checkout/address-form.tsx

```typescript
'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AddressData } from '@/types/checkout';

interface AddressFormProps {
  data: AddressData;
  onChange: (data: AddressData) => void;
  errors?: Partial<Record<keyof AddressData, string>>;
}

// Mock de busca de CEP (simulação)
const mockFetchAddress = async (cep: string): Promise<Partial<AddressData> | null> => {
  // Simula delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock para CEP específico
  if (cep === '01001-000') {
    return {
      street: 'Praça da Sé',
      neighborhood: 'Sé',
      city: 'São Paulo',
      state: 'SP'
    };
  }
  
  // Mock genérico
  if (cep.length === 9) {
    return {
      street: 'Rua Exemplo',
      neighborhood: 'Bairro Teste',
      city: 'São Paulo',
      state: 'SP'
    };
  }
  
  return null;
};

export function AddressForm({ data, onChange, errors }: AddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };
  
  useEffect(() => {
    const fetchAddress = async () => {
      const cep = data.zipCode.replace(/\D/g, '');
      if (cep.length === 8) {
        setIsLoading(true);
        try {
          const address = await mockFetchAddress(data.zipCode);
          if (address) {
            onChange({
              ...data,
              ...address
            });
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchAddress();
  }, [data.zipCode]);
  
  const handleChange = (field: keyof AddressData, value: string) => {
    if (field === 'zipCode') {
      value = formatCEP(value);
    }
    onChange({ ...data, [field]: value });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="zipCode">CEP *</Label>
        <Input
          id="zipCode"
          value={data.zipCode}
          onChange={(e) => handleChange('zipCode', e.target.value)}
          placeholder="00000-000"
          maxLength={9}
          error={!!errors?.zipCode}
          disabled={isLoading}
        />
        {isLoading && (
          <p className="text-sm text-uniq-muted">Buscando endereço...</p>
        )}
        {errors?.zipCode && (
          <p className="text-sm text-red-500">{errors.zipCode}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="street">Rua *</Label>
        <Input
          id="street"
          value={data.street}
          onChange={(e) => handleChange('street', e.target.value)}
          placeholder="Nome da rua"
          error={!!errors?.street}
        />
        {errors?.street && (
          <p className="text-sm text-red-500">{errors.street}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Número *</Label>
          <Input
            id="number"
            value={data.number}
            onChange={(e) => handleChange('number', e.target.value)}
            placeholder="123"
            error={!!errors?.number}
          />
          {errors?.number && (
            <p className="text-sm text-red-500">{errors.number}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            value={data.complement || ''}
            onChange={(e) => handleChange('complement', e.target.value)}
            placeholder="Apto 45"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro *</Label>
        <Input
          id="neighborhood"
          value={data.neighborhood}
          onChange={(e) => handleChange('neighborhood', e.target.value)}
          placeholder="Nome do bairro"
          error={!!errors?.neighborhood}
        />
        {errors?.neighborhood && (
          <p className="text-sm text-red-500">{errors.neighborhood}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Cidade"
            error={!!errors?.city}
          />
          {errors?.city && (
            <p className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">Estado *</Label>
          <Input
            id="state"
            value={data.state}
            onChange={(e) => handleChange('state', e.target.value.toUpperCase())}
            placeholder="SP"
            maxLength={2}
            error={!!errors?.state}
          />
          {errors?.state && (
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

### 9. Seleção de Pagamento

#### components/storefront/checkout/payment-selector.tsx

```typescript
'use client';

import React, { useState } from 'react';
import { CreditCard, QrCode, Barcode, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PaymentMethod } from '@/types/checkout';
import { formatPrice } from '@/lib/utils/formatters';
import { mockPaymentMethods } from '@/lib/mocks/storefront';

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  total: number;
}

const iconMap = {
  'credit-card': CreditCard,
  'qr-code': QrCode,
  'barcode': Barcode,
};

export function PaymentSelector({ selectedMethod, onSelect, total }: PaymentSelectorProps) {
  const [installments, setInstallments] = useState(1);
  
  return (
    <RadioGroup value={selectedMethod} onValueChange={onSelect} className="space-y-3">
      {mockPaymentMethods.map((method) => {
        const Icon = iconMap[method.icon as keyof typeof iconMap] || CreditCard;
        const isSelected = selectedMethod === method.id;
        
        // Calcular valor final com desconto
        const finalValue = method.discount
          ? total * (1 - method.discount / 100)
          : total;
        
        return (
          <div key={method.id}>
            <Card
              className={`p-4 cursor-pointer transition-all ${
                isSelected
                  ? 'border-uniq-primary ring-2 ring-uniq-primary/20'
                  : 'hover:border-uniq-border'
              }`}
              onClick={() => onSelect(method.id)}
            >
              <div className="flex items-start gap-4">
                <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-uniq-platinum flex items-center justify-center">
                      <Icon className="w-5 h-5 text-uniq-primary" />
                    </div>
                    <div>
                      <Label
                        htmlFor={method.id}
                        className="font-semibold cursor-pointer"
                      >
                        {method.name}
                      </Label>
                      <p className="text-sm text-uniq-muted">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Opções específicas por método */}
                  {isSelected && method.id === 'credit_card' && method.installments && (
                    <div className="mt-4 pl-13">
                      <p className="text-sm font-medium mb-2">Parcelamento:</p>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full p-2 border border-uniq-border rounded-lg text-sm"
                      >
                        {method.installments.map((inst) => (
                          <option key={inst.times} value={inst.times}>
                            {inst.times}x de {formatPrice(inst.value)}
                            {inst.times === 1 ? ' (à vista)' : ' sem juros'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  {isSelected && method.discount && method.discount > 0 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-700">
                        Desconto de {method.discount}% aplicado!
                      </p>
                      <p className="text-lg font-bold text-green-700">
                        {formatPrice(finalValue)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </RadioGroup>
  );
}
```

### 10. Página de Checkout

#### app/(store)/checkout/page.tsx

```typescript
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckoutSteps } from '@/components/storefront/checkout/checkout-steps';
import { CheckoutForm } from '@/components/storefront/checkout/checkout-form';
import { AddressForm } from '@/components/storefront/checkout/address-form';
import { PaymentSelector } from '@/components/storefront/checkout/payment-selector';
import { OrderSummary } from '@/components/storefront/checkout/order-summary';
import { CheckoutSuccess } from '@/components/storefront/checkout/checkout-success';
import { useCart } from '@/contexts/cart-context';
import { CustomerData, AddressData, CheckoutStep } from '@/types/checkout';
import { toast } from '@/hooks/use-toast';
import { formatPrice } from '@/lib/utils/formatters';

const INITIAL_CUSTOMER_DATA: CustomerData = {
  name: '',
  email: '',
  phone: '',
};

const INITIAL_ADDRESS_DATA: AddressData = {
  zipCode: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, clearCart } = useCart();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('dados');
  const [customerData, setCustomerData] = useState<CustomerData>(INITIAL_CUSTOMER_DATA);
  const [addressData, setAddressData] = useState<AddressData>(INITIAL_ADDRESS_DATA);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Validação de dados
  const validateCustomerData = (): boolean => {
    if (!customerData.name.trim()) {
      toast({ title: 'Erro', description: 'Nome é obrigatório', variant: 'destructive' });
      return false;
    }
    if (!customerData.email.trim() || !customerData.email.includes('@')) {
      toast({ title: 'Erro', description: 'E-mail válido é obrigatório', variant: 'destructive' });
      return false;
    }
    if (!customerData.phone.trim()) {
      toast({ title: 'Erro', description: 'Telefone é obrigatório', variant: 'destructive' });
      return false;
    }
    return true;
  };
  
  const validateAddressData = (): boolean => {
    if (!addressData.zipCode.trim()) {
      toast({ title: 'Erro', description: 'CEP é obrigatório', variant: 'destructive' });
      return false;
    }
    if (!addressData.street.trim()) {
      toast({ title: 'Erro', description: 'Rua é obrigatória', variant: 'destructive' });
      return false;
    }
    if (!addressData.number.trim()) {
      toast({ title: 'Erro', description: 'Número é obrigatório', variant: 'destructive' });
      return false;
    }
    if (!addressData.neighborhood.trim()) {
      toast({ title: 'Erro', description: 'Bairro é obrigatório', variant: 'destructive' });
      return false;
    }
    return true;
  };
  
  const handleNext = () => {
    if (currentStep === 'dados') {
      if (!validateCustomerData() || !validateAddressData()) return;
      setCurrentStep('pagamento');
    } else if (currentStep === 'pagamento') {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'pagamento') {
      setCurrentStep('dados');
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrderId = `ORD-${Date.now()}`;
    setOrderId(newOrderId);
    setIsComplete(true);
    setCurrentStep('confirmacao');
    clearCart();
    
    toast({
      title: 'Pedido realizado!',
      description: `Seu pedido ${newOrderId} foi confirmado.`,
    });
    
    setIsSubmitting(false);
  };
  
  // Redireciona se carrinho vazio
  if (items.length === 0 && !isComplete) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-uniq-text mb-4">
          Carrinho vazio
        </h1>
        <p className="text-uniq-muted mb-6">
          Adicione produtos para finalizar a compra
        </p>
        <Button onClick={() => router.push('/')}>Continuar Comprando</Button>
      </div>
    );
  }
  
  // Tela de sucesso
  if (isComplete) {
    return (
      <CheckoutSuccess
        orderId={orderId}
        customer={customerData}
        address={addressData}
        paymentMethod={paymentMethod}
        total={summary.total}
      />
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Formulários */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 'dados' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                </CardHeader>
                <CardContent>
                  <CheckoutForm
                    data={customerData}
                    onChange={setCustomerData}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Endereço de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <AddressForm
                    data={addressData}
                    onChange={setAddressData}
                  />
                </CardContent>
              </Card>
            </>
          )}
          
          {currentStep === 'pagamento' && (
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentSelector
                  selectedMethod={paymentMethod}
                  onSelect={setPaymentMethod}
                  total={summary.total}
                />
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Resumo */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Lista de itens */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-uniq-muted">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Totais */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-uniq-muted">Subtotal</span>
                  <span>{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-uniq-muted">Frete</span>
                  <span>
                    {summary.shipping === 0 ? 'Grátis' : formatPrice(summary.shipping)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-uniq-primary">{formatPrice(summary.total)}</span>
                </div>
              </div>
              
              {/* Botões */}
              <div className="space-y-2 pt-4">
                {currentStep === 'pagamento' && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleBack}
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Processando...'
                    : currentStep === 'dados'
                    ? 'Continuar'
                    : 'Finalizar Pedido'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

---

## Páginas

### 1. Layout da Loja

#### app/(store)/layout.tsx

```typescript
import { CartProvider } from '@/contexts/cart-context';
import { StoreHeader } from '@/components/storefront/layout/store-header';
import { StoreFooter } from '@/components/storefront/layout/store-footer';
import { CartDrawer } from '@/components/storefront/cart/cart-drawer';

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <StoreHeader />
        <main className="flex-1 pt-[140px]">
          {children}
        </main>
        <StoreFooter />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
```

### 2. Página Inicial da Loja

#### app/(store)/page.tsx

```typescript
'use client';

import React, { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/storefront/product/product-grid';
import { ProductFilters } from '@/components/storefront/product/product-filters';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { mockProducts, mockCategories, mockStoreConfig } from '@/lib/mocks/storefront';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filtra produtos
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Filtro de busca
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filtro de categoria
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
        return false;
      }
      
      // Filtro de preço
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [searchQuery, selectedCategories, priceRange]);
  
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
  };
  
  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000;
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner */}
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-uniq-primary to-uniq-accent">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {mockStoreConfig.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {mockStoreConfig.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-uniq-muted" />
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ProductFilters
                  categories={mockCategories}
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                />
              </div>
            </SheetContent>
          </Sheet>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </div>
      
      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Busca: {searchQuery}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            </Badge>
          )}
          {selectedCategories.map((catId) => {
            const category = mockCategories.find((c) => c.id === catId);
            return (
              <Badge key={catId} variant="secondary" className="flex items-center gap-1">
                {category?.name}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => toggleCategory(catId)}
                />
              </Badge>
            );
          })}
        </div>
      )}
      
      {/* Content */}
      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters
            categories={mockCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </aside>
        
        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-uniq-muted">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado
            {filteredProducts.length !== 1 ? 's' : ''}
          </div>
          <ProductGrid products={filteredProducts} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
```

### 3. Página de Produto

#### app/(store)/produto/[slug]/page.tsx

```typescript
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCart, Check, Star, ChevronLeft, Minus, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { mockProducts } from '@/lib/mocks/storefront';
import { formatPrice } from '@/lib/utils/formatters';
import { toast } from '@/hooks/use-toast';

export default function ProductPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Busca produto pelo slug
  const product = mockProducts.find((p) => p.slug === params.slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-uniq-text">Produto não encontrado</h1>
        <Link href="/" className="text-uniq-primary hover:underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </div>
    );
  }
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: 'Adicionado ao carrinho!',
      description: `${quantity}x ${product.name}`,
    });
  };
  
  // Produtos relacionados (mesma categoria)
  const relatedProducts = mockProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-uniq-muted mb-6">
        <Link href="/" className="hover:text-uniq-primary">Início</Link>
        <span>/</span>
        <span className="text-uniq-text">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-uniq-platinum">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4 text-sm">
                -{discount}%
              </Badge>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-uniq-primary'
                      : 'border-transparent hover:border-uniq-border'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {product.isNew && <Badge variant="info">Novo</Badge>}
            {product.isBestseller && <Badge variant="accent">Mais Vendido</Badge>}
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="warning">Apenas {product.stock} unidades</Badge>
            )}
          </div>
          
          {/* Title */}
          <div>
            <p className="text-sm text-uniq-muted mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-uniq-text">{product.name}</h1>
          </div>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-uniq-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-uniq-text font-medium">{product.rating}</span>
              <span className="text-uniq-muted">({product.reviewCount} avaliações)</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-uniq-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-uniq-muted line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Stock */}
          <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? (
              <>
                <Check className="w-4 h-4 inline mr-1" />
                Em estoque
              </>
            ) : (
              'Esgotado'
            )}
          </p>
          
          {/* Quantity & Add to Cart */}
          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-uniq-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-uniq-platinum transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-uniq-platinum transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
              
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          )}
          
          {/* Features */}
          <Separator />
          <div>
            <h3 className="font-semibold mb-3">Características</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-uniq-muted">
                  <Check className="w-4 h-4 text-uniq-accent" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* SKU */}
          <p className="text-sm text-uniq-muted">SKU: {product.sku}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="descricao">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="descricao">Descrição</TabsTrigger>
            <TabsTrigger value="especificacoes">Especificações</TabsTrigger>
            <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="descricao" className="mt-6">
            <p className="text-uniq-text leading-relaxed">{product.description}</p>
          </TabsContent>
          
          <TabsContent value="especificacoes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-uniq-platinum/50 rounded-lg">
                <span className="text-uniq-muted">Categoria</span>
                <p className="font-medium">{product.category}</p>
              </div>
              <div className="p-4 bg-uniq-platinum/50 rounded-lg">
                <span className="text-uniq-muted">SKU</span>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div className="p-4 bg-uniq-platinum/50 rounded-lg">
                <span className="text-uniq-muted">Tags</span>
                <p className="font-medium">{product.tags.join(', ')}</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="avaliacoes" className="mt-6">
            <div className="text-center py-12">
              <p className="text-uniq-muted">Avaliações em breve</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-uniq-text mb-6">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/produto/${product.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all">
                  <div className="relative aspect-square overflow-hidden bg-uniq-platinum">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-uniq-text line-clamp-2 group-hover:text-uniq-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-uniq-primary font-bold mt-2">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## Hooks

### hooks/use-cart.ts

```typescript
'use client';

export { useCart } from '@/contexts/cart-context';
```

### lib/utils/formatters.ts

```typescript
export function formatPrice(price: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price);
}

export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '');
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
}

export function formatCEP(cep: string): string {
  const numbers = cep.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
}
```

---

## Componentes shadcn/ui Adicionais Necessários

Para implementar todos os componentes acima, os seguintes componentes shadcn/ui precisam ser instalados:

```bash
# Componentes já existentes (verificar)
# - button, card, badge, input, separator, skeleton
# - dialog, select, tabs, toast, textarea, checkbox
# - switch, tooltip, dropdown-menu, scroll-area, sheet

# Componentes a instalar:
npx shadcn add accordion      # Filtros colapsáveis
npx shadcn add slider         # Filtro de preço
npx shadcn add radio-group    # Seleção de pagamento
npx shadcn add label          # Labels de formulário
```

---

## Estados e Interações

### Diagrama de Estados do Carrinho

```
┌─────────────┐
│   Fechado   │
└──────┬──────┘
       │ Click no ícone do carrinho
       ▼
┌─────────────┐
│    Aberto   │◄──────────────────────────┐
└──────┬──────┘                           │
       │                                  │
       ├── Add Item ──► Atualiza lista    │
       ├── Remove Item ──► Atualiza lista │
       ├── Update Qty ──► Atualiza lista  │
       │                                  │
       │ Click no overlay ou X            │
       ▼                                  │
┌─────────────┐     Click no ícone       │
│   Fechado   │──────────────────────────┘
└─────────────┘
```

### Diagrama de Estados do Checkout

```
┌─────────┐     Validar dados      ┌─────────────┐
│  Dados  │───────────────────────►│  Pagamento  │
│ Pessoais│                        │             │
└────┬────┘                        └──────┬──────┘
     │                                     │
     │                                     │ Submit
     │                                     ▼
     │                            ┌─────────────────┐
     └───────────────────────────►│   Confirmação   │
                                  │    (Sucesso)    │
                                  └─────────────────┘
```

### Fluxo de Interações

1. **Adicionar ao Carrinho:**
   - Usuário clica "Adicionar" no card de produto
   - `addItem()` é chamado no contexto
   - Toast de confirmação aparece
   - Badge do carrinho atualiza
   - Carrinho abre automaticamente (opcional)

2. **Gerenciar Carrinho:**
   - Quantidade: Botões +/- ou input direto
   - Remover: Ícone de lixeira com confirmação
   - Atualizações em tempo real do resumo

3. **Checkout:**
   - Validação em tempo real dos campos
   - Busca automática de endereço por CEP
   - Cálculo dinâmico de descontos
   - Confirmação com animação

---

## Dependências

### NPM Packages (já instalados)
```json
{
  "next": "^14.2.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "^5.4.5",
  "tailwindcss": "^3.4.4",
  "lucide-react": "^0.400.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0"
}
```

### shadcn/ui Components a Instalar
```bash
npx shadcn add accordion slider radio-group label
```

---

## Critérios de Aceitação Técnicos

### Checklist de Implementação

#### Tema da Loja Pública
- [x] **StoreHeader:** Logo, busca, carrinho com badge, menu responsivo
- [x] **ProductGrid:** Grid responsivo (1/2/3/4 colunas), lazy loading
- [x] **ProductCard:** Imagem, nome, preço, badge, botão add
- [x] **ProductPage:** Galeria, info, tabs, produtos relacionados
- [x] **ProductFilters:** Categorias, preço, mobile drawer
- [x] **StoreFooter:** Links, contato, redes sociais

#### Carrinho
- [x] **CartContext:** Estado global com useReducer
- [x] **CartDrawer:** Slide-out Sheet com animação
- [x] **CartItem:** Imagem, nome, quantidade, remover
- [x] **QuantitySelector:** +/- com validação de estoque
- [x] **CartSummary:** Subtotal, frete, desconto, total
- [x] **EmptyState:** Ilustração e CTA

#### Checkout
- [x] **CheckoutSteps:** Visual steps (dados → pagamento → confirmação)
- [x] **CheckoutForm:** Nome, email, telefone com validação
- [x] **AddressForm:** CEP, endereço com busca automática
- [x] **PaymentSelector:** Cartão, Pix, Boleto
- [x] **OrderSummary:** Lista itens, totais
- [x] **CheckoutSuccess:** Confirmação, número pedido

#### Painel de Configuração
- [ ] **ThemeSelector:** 3 templates com preview
- [ ] **ColorPicker:** Cores primária, secundária, destaque
- [ ] **BannerUpload:** Drag & drop, preview
- [ ] **StorePreview:** Iframe com preview ao vivo
- [ ] **SEOSettings:** Title, description, OG image

### Testes Visuais

#### Estados de Loading
- [x] ProductGrid: 8 skeleton cards
- [x] ProductPage: Skeleton galeria e info
- [x] Checkout: Spinner no botão de submit
- [x] CartDrawer: Loading state implícito

#### Estados de Erro
- [x] Produto não encontrado: Mensagem e CTA
- [x] Carrinho vazio: Ilustração e botão
- [x] Validação de formulários: Mensagens inline
- [x] CEP inválido: Feedback visual

#### Estados Vazios
- [x] Grid sem produtos: "Nenhum produto encontrado"
- [x] Carrinho vazio: Ilustração amigável
- [x] Filtros sem resultado: Mensagem + botão limpar

### Responsividade

| Breakpoint | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|------------|-----------------|---------------------|-------------------|
| Grid | 1 coluna | 2 colunas | 3-4 colunas |
| Filtros | Drawer | Drawer | Sidebar |
| Carrinho | Full-screen | Drawer | Drawer |
| Header | Hamburger | Simplificado | Completo |
| Checkout | 1 coluna | 2 colunas | 2 colunas |

### Performance
- [x] Imagens otimizadas com Next.js Image
- [x] Lazy loading no grid
- [x] Memoização com useMemo/useCallback
- [x] Debounce na busca (se implementado)

---

## Notas de Implementação

### Próximos Passos

1. **Instalar componentes shadcn faltantes:**
   ```bash
   npx shadcn add accordion slider radio-group label
   ```

2. **Criar estrutura de pastas:**
   ```bash
   mkdir -p contexts hooks/lib lib/mocks lib/utils types
   mkdir -p components/storefront/{layout,product,cart,checkout}
   mkdir -p app/\(store\)/{produto/\[slug\],checkout}
   ```

3. **Implementar na ordem:**
   - Types → Mocks → Contexts → Hooks
   - Componentes de layout (Header, Footer)
   - Componentes de produto (Card, Grid, Filters)
   - Carrinho (Drawer, Item, Summary)
   - Checkout (Steps, Forms, Success)
   - Páginas

4. **Testar visualmente:**
   - Verificar todos os estados (loading, empty, error)
   - Testar responsividade
   - Validar interações

---

## Referências

- **PRD:** `tracking/plans/PRD_Sprint_05_Storefront_UI_🎨.md`
- **Design System:** Componentes shadcn/ui existentes
- **Mock Data:** `lib/mocks/storefront.ts`
- **Context API:** React Docs
- **Next.js App Router:** Next.js Docs

---

**Documento gerado em:** 20/03/2026  
**Planner:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Próxima Fase:** FASE 03 - Implementation (@vibe-implementer)  
**Status:** 🟢 PRONTO PARA IMPLEMENTAÇÃO

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação técnica (SPEC). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-implementer para desenvolvimento
> 3. Implementar seguindo a SPEC acima
