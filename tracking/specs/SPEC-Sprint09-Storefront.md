# SPEC Técnico - Sprint 09: Storefront

**Projeto:** UNIQ Empresas  
**Data:** 21/03/2026  
**Tipo:** Technical Specification  
**Status:** 📋 Especificação Completa  

---

## 1. Visão Geral da Especificação

### 1.1 Escopo
Esta especificação define a implementação técnica completa da Storefront UI para o projeto UNIQ Empresas, incluindo:
- Interface pública da loja virtual (tema, produtos, carrinho)
- Fluxo de checkout visual (3 steps)
- Painel de configuração da loja (admin)

### 1.2 Estado Atual
- ✅ Estrutura de diretórios criada
- ✅ Tipos TypeScript definidos
- ✅ Mock data completo
- ✅ CartContext implementado
- ✅ Componentes base existentes
- 🔄 Necessita: Revisão, testes e refinamento

### 1.3 Stack Tecnológico Confirmado
```
Framework: Next.js 14 (App Router)
Linguagem: TypeScript 5.4
Estilização: Tailwind CSS 3.4
UI Components: shadcn/ui + Radix UI
Ícones: Lucide React
Formulários: React Hook Form 7.71 + Zod 4.3
Gerenciamento Estado: React Context (Cart)
```

---

## 2. Estrutura de Diretórios

### 2.1 Área Pública - `(store)`
```
app/(store)/
├── layout.tsx                    # Layout com CartProvider, Header, Footer
├── page.tsx                      # Home - Grid de produtos
├── checkout/
│   └── page.tsx                  # Checkout multi-step
└── produto/
    └── [slug]/
        ├── page.tsx              # Server Component - dados do produto
        └── product-client.tsx    # Client Component - interatividade
```

### 2.2 Área Admin - `dashboard`
```
app/dashboard/loja/
└── configuracoes/
    └── page.tsx                  # Painel de configuração da loja
```

### 2.3 Componentes Storefront
```
components/storefront/
├── layout/
│   ├── store-header.tsx          # Header com busca, carrinho, navegação
│   └── store-footer.tsx          # Footer com links e contato
├── product/
│   ├── product-card.tsx          # Card individual de produto
│   ├── product-grid.tsx          # Grid responsivo de produtos
│   └── product-filters.tsx       # Filtros laterais/Sidebar
├── cart/
│   └── cart-drawer.tsx           # Drawer lateral do carrinho
└── checkout/
    ├── checkout-steps.tsx        # Indicador de progresso
    ├── checkout-form.tsx         # Form dados pessoais
    ├── address-form.tsx          # Form endereço com CEP
    ├── payment-selector.tsx      # Seletor de pagamento
    └── checkout-success.tsx      # Tela de confirmação
```

### 2.4 Contextos e Hooks
```
contexts/
└── cart-context.tsx              # Contexto global do carrinho

hooks/
├── use-cart.ts                   # Hook para acessar CartContext
└── use-store-config.ts           # Hook para config da loja
```

### 2.5 Tipos e Mocks
```
types/
├── storefront.ts                 # StoreConfig, Product, Category, Theme
├── cart.ts                       # CartItem, CartSummary, CartContextType
└── checkout.ts                   # Customer, Address, PaymentMethod, Order

lib/
├── mocks/
│   └── storefront.ts             # mockStoreConfig, mockProducts, mockCategories
└── utils/
    └── formatters.ts             # formatPrice, formatPhone, formatCEP
```

---

## 3. Tipos TypeScript Completos

### 3.1 Storefront Types (`types/storefront.ts`)

```typescript
// ============================================
// CONFIGURAÇÃO DA LOJA
// ============================================

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

// ============================================
// CATEGORIA
// ============================================

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image?: string;
}

// ============================================
// PRODUTO
// ============================================

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

// ============================================
// TEMPLATE DE TEMA
// ============================================

export interface ThemeTemplate {
  id: 'modern' | 'classic' | 'minimal';
  name: string;
  description: string;
  preview: string;
  features: string[];
}

// ============================================
// FILTROS
// ============================================

export interface ProductFilters {
  categories: number[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
```

### 3.2 Cart Types (`types/cart.ts`)

```typescript
import { Product } from './storefront';

// ============================================
// ITEM DO CARRINHO
// ============================================

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  sku: string;
}

// ============================================
// RESUMO DO CARRINHO
// ============================================

export interface CartSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

// ============================================
// CONTEXTO DO CARRINHO
// ============================================

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

### 3.3 Checkout Types (`types/checkout.ts`)

```typescript
import { CartItem, CartSummary } from './cart';

// ============================================
// DADOS DO CLIENTE
// ============================================

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
}

// ============================================
// DADOS DE ENDEREÇO
// ============================================

export interface AddressData {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

// ============================================
// MÉTODO DE PAGAMENTO
// ============================================

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

// ============================================
// PEDIDO
// ============================================

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

// ============================================
// STEPS DO CHECKOUT
// ============================================

export type CheckoutStep = 'dados' | 'pagamento' | 'confirmacao';

export interface CheckoutState {
  currentStep: CheckoutStep;
  customer: CustomerData;
  address: AddressData;
  paymentMethod: string;
  isLoading: boolean;
}

// ============================================
// FORM SCHEMAS (Zod)
// ============================================

import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido')
});

export const addressSchema = z.object({
  zipCode: z.string().min(9, 'CEP inválido'),
  street: z.string().min(3, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'Estado inválido')
});

export const checkoutFormSchema = customerSchema.merge(addressSchema);

export type CustomerFormData = z.infer<typeof customerSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
```

---

## 4. Mock Data Completo

### 4.1 Configuração da Loja (`lib/mocks/storefront.ts`)

```typescript
import { StoreConfig, Category, Product, ThemeTemplate } from '@/types/storefront';
import { CartItem, CartSummary } from '@/types/cart';
import { PaymentMethod, Order } from '@/types/checkout';

// ============================================
// CONFIGURAÇÃO DA LOJA
// ============================================

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
    primaryColor: '#3e5653',
    secondaryColor: '#1f2937',
    accentColor: '#86cb92',
    backgroundColor: '#ffffff',
    textColor: '#1f2937'
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

// ============================================
// CATEGORIAS
// ============================================

export const mockCategories: Category[] = [
  { 
    id: 1, 
    name: 'Óculos de Sol', 
    slug: 'oculos-de-sol', 
    count: 15, 
    image: '/images/cat-oculos-sol.jpg' 
  },
  { 
    id: 2, 
    name: 'Armações', 
    slug: 'armacoes', 
    count: 32, 
    image: '/images/cat-armacoes.jpg' 
  },
  { 
    id: 3, 
    name: 'Lentes', 
    slug: 'lentes', 
    count: 8, 
    image: '/images/cat-lentes.jpg' 
  },
  { 
    id: 4, 
    name: 'Acessórios', 
    slug: 'acessorios', 
    count: 24, 
    image: '/images/cat-acessorios.jpg' 
  },
  { 
    id: 5, 
    name: 'Infantil', 
    slug: 'infantil', 
    count: 12, 
    image: '/images/cat-infantil.jpg' 
  },
];

// ============================================
// PRODUTOS (6 produtos completos)
// ============================================

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    slug: 'oculos-de-sol-ray-ban-aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&h=800&fit=crop'
    ],
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
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=800&fit=crop'],
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
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop'
    ],
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
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=800&h=800&fit=crop'],
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
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&h=800&fit=crop'],
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
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop'],
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

// ============================================
// CARRINHO INICIAL (para testes)
// ============================================

export const mockCartItems: CartItem[] = [
  {
    productId: 1,
    name: 'Óculos de Sol Ray-Ban Aviador',
    price: 899.90,
    originalPrice: 1199.90,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    quantity: 1,
    sku: 'RB3025-001'
  },
  {
    productId: 4,
    name: 'Lentes de Contato Acuvue Oasys',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
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

// ============================================
// TEMPLATES DE TEMA
// ============================================

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

// ============================================
// MÉTODOS DE PAGAMENTO
// ============================================

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

// ============================================
// PEDIDO DE EXEMPLO
// ============================================

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
    total: 1101.72,
    itemCount: 3
  }
};

// ============================================
// MOCK CEP API
// ============================================

export const mockAddressByCEP: Record<string, Partial<AddressData>> = {
  '01001-000': {
    street: 'Praça da Sé',
    neighborhood: 'Sé',
    city: 'São Paulo',
    state: 'SP'
  },
  '20040-010': {
    street: 'Avenida Rio Branco',
    neighborhood: 'Centro',
    city: 'Rio de Janeiro',
    state: 'RJ'
  },
  '30140-071': {
    street: 'Avenida Afonso Pena',
    neighborhood: 'Centro',
    city: 'Belo Horizonte',
    state: 'MG'
  }
};
```

---

## 5. Contextos e Hooks

### 5.1 CartContext (`contexts/cart-context.tsx`)

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

### 5.2 Hook useStoreConfig (`hooks/use-store-config.ts`)

```typescript
'use client';

import { useState, useCallback } from 'react';
import { StoreConfig, ThemeSettings } from '@/types/storefront';
import { mockStoreConfig } from '@/lib/mocks/storefront';

interface UseStoreConfigReturn {
  config: StoreConfig;
  updateTheme: (theme: Partial<ThemeSettings>) => void;
  updateSEO: (seo: Partial<StoreConfig['seo']>) => void;
  updateSettings: (settings: Partial<StoreConfig['settings']>) => void;
  isSaving: boolean;
  saveConfig: () => Promise<void>;
}

export function useStoreConfig(): UseStoreConfigReturn {
  const [config, setConfig] = useState<StoreConfig>(mockStoreConfig);
  const [isSaving, setIsSaving] = useState(false);

  const updateTheme = useCallback((theme: Partial<ThemeSettings>) => {
    setConfig(prev => ({
      ...prev,
      theme: { ...prev.theme, ...theme }
    }));
  }, []);

  const updateSEO = useCallback((seo: Partial<StoreConfig['seo']>) => {
    setConfig(prev => ({
      ...prev,
      seo: { ...prev.seo, ...seo }
    }));
  }, []);

  const updateSettings = useCallback((settings: Partial<StoreConfig['settings']>) => {
    setConfig(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  }, []);

  const saveConfig = useCallback(async () => {
    setIsSaving(true);
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  }, []);

  return {
    config,
    updateTheme,
    updateSEO,
    updateSettings,
    isSaving,
    saveConfig
  };
}
```

---

## 6. Componentes Detalhados (18 Componentes)

### 6.1 Layout Components

#### StoreHeader (`components/storefront/layout/store-header.tsx`)

```typescript
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, Phone } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleCartClick = () => onCartClick ? onCartClick() : openCart();
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4'
    }`}>
      {/* Implementation details */}
    </header>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `onCartClick` | `() => void` | Callback opcional ao clicar no carrinho |

**Estados Internos:**
- `isScrolled: boolean` - Controla sombra e padding ao scrollar
- `searchQuery: string` - Valor do campo de busca
- `isMobileMenuOpen: boolean` - Controla Sheet do menu mobile

**Funcionalidades:**
- Logo com link para home
- Campo de busca com ícone
- Badge com quantidade de itens
- Menu mobile (Sheet)
- Navegação de categorias (desktop)

---

#### StoreFooter (`components/storefront/layout/store-footer.tsx`)

```typescript
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { mockStoreConfig } from '@/lib/mocks/storefront';

export function StoreFooter() {
  const currentYear = new Date().getFullYear();
  const { name, address, phone, email, social } = mockStoreConfig;
  
  return (
    <footer className="bg-muted py-12 mt-auto">
      {/* 4 colunas: Logo/Redes, Links, Contato, Horário */}
    </footer>
  );
}
```

**Funcionalidades:**
- 4 colunas responsivas
- Links sociais (Instagram, Facebook, WhatsApp)
- Endereço formatado
- Copyright dinâmico

---

### 6.2 Product Components

#### ProductCard (`components/storefront/product/product-card.tsx`)

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
    <Card className="group relative overflow-hidden border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Badges, Image, Content, Button */}
    </Card>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `product` | `Product` | Dados do produto a ser exibido |

**Features Visuais:**
- Badges: Novo, Mais Vendido, Desconto %, Esgotado
- Hover: scale 1.02 + shadow-lg
- Imagem: scale 1.05 no hover
- Botão muda texto se item já está no carrinho

---

#### ProductGrid (`components/storefront/product/product-grid.tsx`)

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
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-square" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nenhum produto encontrado</p>
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

**Props:**
| Prop | Type | Default | Descrição |
|------|------|---------|-----------|
| `products` | `Product[]` | required | Lista de produtos |
| `isLoading` | `boolean` | `false` | Estado de carregamento |

**Responsividade:**
- Mobile: 1 coluna
- Tablet (sm): 2 colunas
- Desktop (lg): 3 colunas
- Large (xl): 4 colunas

---

#### ProductFilters (`components/storefront/product/product-filters.tsx`)

```typescript
'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Category } from '@/types/storefront';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: number[];
  onToggleCategory: (categoryId: number) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Categorias com Checkbox */}
      {/* Slider de preço */}
    </div>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `categories` | `Category[]` | Lista de categorias disponíveis |
| `selectedCategories` | `number[]` | IDs das categorias selecionadas |
| `onToggleCategory` | `(id: number) => void` | Callback ao toggle categoria |
| `priceRange` | `[number, number]` | Faixa de preço selecionada |
| `onPriceChange` | `(range) => void` | Callback ao mudar preço |

---

### 6.3 Cart Components

#### CartDrawer (`components/storefront/cart/cart-drawer.tsx`)

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/formatters';
import { mockStoreConfig } from '@/lib/mocks/storefront';

export function CartDrawer() {
  const { items, isOpen, closeCart, summary, updateQuantity, removeItem } = useCart();
  const { settings } = mockStoreConfig;
  
  const remainingForFreeShipping = Math.max(0, settings.freeShippingThreshold - summary.subtotal);
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Carrinho ({summary.itemCount})
          </SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <CartEmptyState />
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              {/* Lista de itens */}
            </ScrollArea>
            
            <div className="border-t pt-4 space-y-4">
              {/* Resumo e botão checkout */}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartEmptyState() {
  const { closeCart } = useCart();
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
      <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h3>
      <p className="text-muted-foreground mb-6">Adicione produtos para começar</p>
      <Button onClick={closeCart}>Continuar Comprando</Button>
    </div>
  );
}
```

**Funcionalidades:**
- Abre automaticamente ao adicionar item
- Lista de itens com controles de quantidade
- Botão remover com confirmação toast
- Resumo com cálculo de frete grátis
- Botão "Finalizar Compra" → /checkout

---

### 6.4 Checkout Components

#### CheckoutSteps (`components/storefront/checkout/checkout-steps.tsx`)

```typescript
'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { CheckoutStep } from '@/types/checkout';

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}

const steps: { id: CheckoutStep; label: string; description: string }[] = [
  { id: 'dados', label: 'Dados', description: 'Informações pessoais' },
  { id: 'pagamento', label: 'Pagamento', description: 'Escolha da forma' },
  { id: 'confirmacao', label: 'Confirmação', description: 'Pedido finalizado' }
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);
  
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                  isCurrent ? 'border-primary text-primary' : 'border-muted-foreground'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                </div>
                <span className="mt-2 text-sm font-medium hidden sm:block">{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 sm:mx-4 ${
                  index < currentIndex ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `currentStep` | `CheckoutStep` | Step atual ('dados', 'pagamento', 'confirmacao') |

---

#### CheckoutForm (`components/storefront/checkout/checkout-form.tsx`)

```typescript
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerSchema, CustomerFormData } from '@/types/checkout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CheckoutFormProps {
  onSubmit: (data: CustomerFormData) => void;
  defaultValues?: Partial<CustomerFormData>;
}

export function CheckoutForm({ onSubmit, defaultValues }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome completo *</Label>
        <Input id="name" {...register('name')} />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="email">E-mail *</Label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="phone">Telefone/Celular *</Label>
        <Input id="phone" {...register('phone')} placeholder="(11) 99999-9999" />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
      </div>
      
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Continuar
      </Button>
    </form>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `onSubmit` | `(data: CustomerFormData) => void` | Callback com dados validados |
| `defaultValues` | `Partial<CustomerFormData>` | Valores iniciais do form |

---

#### AddressForm (`components/storefront/checkout/address-form.tsx`)

```typescript
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema, AddressFormData } from '@/types/checkout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { mockAddressByCEP } from '@/lib/mocks/storefront';

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  defaultValues?: Partial<AddressFormData>;
}

export function AddressForm({ onSubmit, defaultValues }: AddressFormProps) {
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues
  });
  
  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      setIsLoadingCep(true);
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const address = mockAddressByCEP[cep.replace(/(\d{5})(\d{3})/, '$1-$2')];
      if (address) {
        setValue('street', address.street || '');
        setValue('neighborhood', address.neighborhood || '');
        setValue('city', address.city || '');
        setValue('state', address.state || '');
      }
      
      setIsLoadingCep(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <Label htmlFor="zipCode">CEP *</Label>
          <div className="relative">
            <Input id="zipCode" {...register('zipCode')} onBlur={handleCepBlur} />
            {isLoadingCep && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" />}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Label htmlFor="street">Rua *</Label>
          <Input id="street" {...register('street')} />
        </div>
        <div>
          <Label htmlFor="number">Número *</Label>
          <Input id="number" {...register('number')} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="complement">Complemento</Label>
        <Input id="complement" {...register('complement')} />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="neighborhood">Bairro *</Label>
          <Input id="neighborhood" {...register('neighborhood')} />
        </div>
        <div>
          <Label htmlFor="city">Cidade *</Label>
          <Input id="city" {...register('city')} />
        </div>
        <div>
          <Label htmlFor="state">Estado *</Label>
          <Input id="state" {...register('state')} maxLength={2} />
        </div>
      </div>
      
      <Button type="submit" className="w-full">Continuar para Pagamento</Button>
    </form>
  );
}
```

---

#### PaymentSelector (`components/storefront/checkout/payment-selector.tsx`)

```typescript
'use client';

import React from 'react';
import { CreditCard, QrCode, Barcode, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaymentMethod } from '@/types/checkout';
import { formatPrice } from '@/lib/utils/formatters';

interface PaymentSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
  total: number;
  selectedInstallment?: number;
  onInstallmentChange?: (times: number) => void;
}

const iconMap = {
  'credit-card': CreditCard,
  'qr-code': QrCode,
  'barcode': Barcode
};

export function PaymentSelector({
  methods,
  selectedMethod,
  onSelect,
  total,
  selectedInstallment = 1,
  onInstallmentChange
}: PaymentSelectorProps) {
  const selectedPayment = methods.find(m => m.id === selectedMethod);
  
  const calculateFinalValue = () => {
    if (selectedPayment?.discount) {
      return total * (1 - selectedPayment.discount / 100);
    }
    return total;
  };
  
  return (
    <div className="space-y-4">
      <RadioGroup value={selectedMethod} onValueChange={onSelect}>
        {methods.map((method) => {
          const Icon = iconMap[method.icon as keyof typeof iconMap];
          const isSelected = selectedMethod === method.id;
          
          return (
            <div key={method.id}>
              <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
              <Label htmlFor={method.id}>
                <Card className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-primary ring-1 ring-primary' : ''
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{method.name}</h3>
                        {isSelected && <Check className="w-5 h-5 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      
                      {method.discount && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          -{method.discount}% de desconto
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {isSelected && method.id === 'credit_card' && method.installments && (
                    <div className="mt-4 pt-4 border-t">
                      <Label>Parcelamento</Label>
                      <Select value={String(selectedInstallment)} onValueChange={(v) => onInstallmentChange?.(Number(v))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {method.installments.map((inst) => (
                            <SelectItem key={inst.times} value={String(inst.times)}>
                              {inst.times}x de {formatPrice(inst.value)}
                              {inst.times === 1 && ' (à vista)'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </Card>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      
      <div className="bg-muted p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total a pagar:</span>
          <span className="text-xl font-bold">{formatPrice(calculateFinalValue())}</span>
        </div>
      </div>
    </div>
  );
}
```

**Props:**
| Prop | Type | Descrição |
|------|------|-----------|
| `methods` | `PaymentMethod[]` | Métodos disponíveis |
| `selectedMethod` | `string` | ID do método selecionado |
| `onSelect` | `(id: string) => void` | Callback ao selecionar |
| `total` | `number` | Valor total do pedido |
| `selectedInstallment` | `number` | Parcelas selecionadas |
| `onInstallmentChange` | `(times: number) => void` | Callback ao mudar parcelas |

---

#### CheckoutSuccess (`components/storefront/checkout/checkout-success.tsx`)

```typescript
'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Clock, CreditCard, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Order } from '@/types/checkout';
import { formatPrice } from '@/lib/utils/formatters';

interface CheckoutSuccessProps {
  order: Order;
}

export function CheckoutSuccess({ order }: CheckoutSuccessProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Pedido Confirmado!</h1>
        <p className="text-muted-foreground">
          Obrigado, {order.customer.name}! Seu pedido foi recebido.
        </p>
      </div>
      
      <Card className="p-6 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b">
          <div>
            <p className="text-sm text-muted-foreground">Número do pedido</p>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total pago</p>
            <p className="text-xl font-bold">{formatPrice(order.summary.total)}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Endereço de entrega</p>
              <p className="text-sm text-muted-foreground">
                {order.shipping.address.street}, {order.shipping.address.number}
                {order.shipping.address.complement && ` - ${order.shipping.address.complement}`}
                <br />
                {order.shipping.address.neighborhood}, {order.shipping.address.city} - {order.shipping.address.state}
                <br />
                CEP: {order.shipping.address.zipCode}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Forma de pagamento</p>
              <p className="text-sm text-muted-foreground capitalize">
                {order.payment.method === 'credit_card' && 'Cartão de Crédito'}
                {order.payment.method === 'pix' && 'Pix'}
                {order.payment.method === 'boleto' && 'Boleto Bancário'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium">Previsão de entrega</p>
              <p className="text-sm text-muted-foreground">{order.shipping.estimatedDelivery}</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex gap-4 mt-8">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/">Continuar Comprando</Link>
        </Button>
        <Button className="flex-1">Acompanhar Pedido</Button>
      </div>
    </div>
  );
}
```

---

### 6.5 Config Components (Admin)

#### ThemeSelector (`components/storefront/config/theme-selector.tsx`)

```typescript
'use client';

import React from 'react';
import { Check, Layout } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ThemeTemplate } from '@/types/storefront';

interface ThemeSelectorProps {
  templates: ThemeTemplate[];
  selectedTemplate: string;
  onSelect: (templateId: string) => void;
}

export function ThemeSelector({ templates, selectedTemplate, onSelect }: ThemeSelectorProps) {
  return (
    <RadioGroup value={selectedTemplate} onValueChange={onSelect}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div key={template.id}>
            <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
            <Label htmlFor={template.id} className="cursor-pointer">
              <Card className={`p-4 h-full transition-all hover:border-primary ${
                selectedTemplate === template.id ? 'border-primary ring-1 ring-primary' : ''
              }`}>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Layout className="w-12 h-12 text-muted-foreground" />
                </div>
                
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                </div>
                
                <ul className="mt-4 space-y-1">
                  {template.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  );
}
```

---

#### ColorCustomizer (`components/storefront/config/color-customizer.tsx`)

```typescript
'use client';

import React from 'react';
import { ThemeSettings } from '@/types/storefront';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorCustomizerProps {
  theme: ThemeSettings;
  onChange: (colors: Partial<ThemeSettings>) => void;
}

const colorFields: { key: keyof ThemeSettings; label: string }[] = [
  { key: 'primaryColor', label: 'Cor Primária' },
  { key: 'secondaryColor', label: 'Cor Secundária' },
  { key: 'accentColor', label: 'Cor de Destaque' },
  { key: 'backgroundColor', label: 'Cor de Fundo' },
  { key: 'textColor', label: 'Cor do Texto' }
];

export function ColorCustomizer({ theme, onChange }: ColorCustomizerProps) {
  const handleColorChange = (key: keyof ThemeSettings, value: string) => {
    onChange({ [key]: value });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {colorFields.map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <Label>{label}</Label>
            <div className="flex gap-2">
              <input
                type="color"
                value={theme[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border"
              />
              <Input
                value={theme[key]}
                onChange={(e) => handleColorChange(key, e.target.value)}
                className="flex-1 font-mono uppercase"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Preview ao vivo */}
      <div className="border rounded-lg p-6 space-y-4" style={{ backgroundColor: theme.backgroundColor }}>
        <h3 className="font-semibold" style={{ color: theme.textColor }}>Preview do Tema</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded" style={{ backgroundColor: theme.primaryColor, color: '#fff' }}>
            Botão Primário
          </button>
          <button className="px-4 py-2 rounded" style={{ backgroundColor: theme.accentColor, color: '#fff' }}>
            Destaque
          </button>
        </div>
        <p style={{ color: theme.textColor }}>Texto de exemplo no tema configurado</p>
      </div>
    </div>
  );
}
```

---

#### BannerUpload (`components/storefront/config/banner-upload.tsx`)

```typescript
'use client';

import React, { useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';

interface BannerUploadProps {
  bannerUrl?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function BannerUpload({ bannerUrl, onUpload, onRemove }: BannerUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1
  });
  
  if (bannerUrl) {
    return (
      <div className="relative">
        <img src={bannerUrl} alt="Banner" className="w-full h-48 object-cover rounded-lg" />
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2"
          onClick={onRemove}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }
  
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}
    >
      <input {...getInputProps()} />
      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">
        {isDragActive ? 'Solte a imagem aqui' : 'Arraste uma imagem ou clique para selecionar'}
      </p>
      <p className="text-xs text-muted-foreground mt-2">PNG, JPG até 5MB</p>
    </div>
  );
}
```

---

#### SEOPreview (`components/storefront/config/seo-preview.tsx`)

```typescript
'use client';

import React from 'react';
import { SEOSettings } from '@/types/storefront';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SEOPreviewProps {
  seo: SEOSettings;
  onChange: (seo: Partial<SEOSettings>) => void;
}

export function SEOPreview({ seo, onChange }: SEOPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="title">Título da Página</Label>
          <span className={`text-xs ${seo.title.length > 60 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {seo.title.length}/60
          </span>
        </div>
        <Input
          id="title"
          value={seo.title}
          onChange={(e) => onChange({ title: e.target.value })}
          maxLength={60}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="description">Descrição</Label>
          <span className={`text-xs ${seo.description.length > 160 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {seo.description.length}/160
          </span>
        </div>
        <Textarea
          id="description"
          value={seo.description}
          onChange={(e) => onChange({ description: e.target.value })}
          maxLength={160}
          rows={3}
        />
      </div>
      
      {/* Preview Google */}
      <div className="bg-white border rounded-lg p-4">
        <p className="text-xs text-muted-foreground mb-2">Preview no Google:</p>
        <div className="space-y-1">
          <p className="text-[#1a0dab] text-xl hover:underline cursor-pointer truncate">
            {seo.title || 'Título da página'}
          </p>
          <p className="text-[#006621] text-sm">
            www.sualoja.com.br
          </p>
          <p className="text-[#545454] text-sm line-clamp-2">
            {seo.description || 'Descrição da página que aparecerá nos resultados de busca...'}
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Fluxo de Checkout Completo

### 7.1 Estados do Checkout

```typescript
// Estado global do checkout
interface CheckoutState {
  currentStep: 'dados' | 'pagamento' | 'confirmacao';
  customer: CustomerFormData | null;
  address: AddressFormData | null;
  paymentMethod: string;
  selectedInstallment: number;
  isProcessing: boolean;
  order: Order | null;
}

// Estado inicial
const initialCheckoutState: CheckoutState = {
  currentStep: 'dados',
  customer: null,
  address: null,
  paymentMethod: 'credit_card',
  selectedInstallment: 1,
  isProcessing: false,
  order: null
};
```

### 7.2 Fluxo de Navegação entre Steps

```
┌─────────────────────────────────────────────────────────────┐
│  Step 1: DADOS                                              │
│  ├─ Form dados pessoais (nome, email, telefone)             │
│  ├─ Form endereço (CEP com busca automática)                │
│  └─ Validação Zod → Avança para Step 2                      │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 2: PAGAMENTO                                          │
│  ├─ Seletor de método (Cartão/Pix/Boleto)                   │
│  ├─ Parcelamento (se cartão)                                │
│  ├─ Cálculo de desconto (se Pix)                            │
│  ├─ Resumo do pedido (sticky)                               │
│  └─ Validação → Processa → Avança para Step 3              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  Step 3: CONFIRMAÇÃO                                        │
│  ├─ Animação de sucesso                                     │
│  ├─ Detalhes do pedido                                      │
│  ├─ Número do pedido                                        │
│  ├─ Botões de ação                                          │
│  └─ Limpa carrinho                                          │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Validações por Step

```typescript
// Step 1 - Dados Pessoais
const customerValidation = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Formato: (11) 99999-9999')
});

// Step 1 - Endereço
const addressValidation = z.object({
  zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido'),
  street: z.string().min(3, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'UF inválida')
});

// Step 2 - Pagamento
const paymentValidation = z.object({
  paymentMethod: z.enum(['credit_card', 'pix', 'boleto']),
  installment: z.number().min(1).optional()
});
```

---

## 8. Páginas

### 8.1 Layout da Loja (`app/(store)/layout.tsx`)

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

### 8.2 Home (`app/(store)/page.tsx`)

```typescript
import { ProductGrid } from '@/components/storefront/product/product-grid';
import { ProductFilters } from '@/components/storefront/product/product-filters';
import { mockProducts, mockCategories } from '@/lib/mocks/storefront';

export default function StoreHomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar de filtros */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <ProductFilters 
            categories={mockCategories}
            selectedCategories={[]}
            onToggleCategory={() => {}}
            priceRange={[0, 2000]}
            onPriceChange={() => {}}
          />
        </aside>
        
        {/* Grid de produtos */}
        <div className="flex-1">
          <ProductGrid products={mockProducts} />
        </div>
      </div>
    </div>
  );
}
```

### 8.3 Checkout (`app/(store)/checkout/page.tsx`)

```typescript
'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/cart-context';
import { CheckoutSteps } from '@/components/storefront/checkout/checkout-steps';
import { CheckoutForm } from '@/components/storefront/checkout/checkout-form';
import { AddressForm } from '@/components/storefront/checkout/address-form';
import { PaymentSelector } from '@/components/storefront/checkout/payment-selector';
import { CheckoutSuccess } from '@/components/storefront/checkout/checkout-success';
import { mockPaymentMethods, mockOrder } from '@/lib/mocks/storefront';
import { CheckoutStep, CustomerFormData, AddressFormData } from '@/types/checkout';

export default function CheckoutPage() {
  const { items, summary, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('dados');
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);
  const [addressData, setAddressData] = useState<AddressFormData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [installment, setInstallment] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  
  const handleCustomerSubmit = (data: CustomerFormData) => {
    setCustomerData(data);
  };
  
  const handleAddressSubmit = (data: AddressFormData) => {
    setAddressData(data);
    setCurrentStep('pagamento');
  };
  
  const handlePaymentSubmit = () => {
    // Processar pagamento (mock)
    setIsComplete(true);
    clearCart();
  };
  
  if (items.length === 0 && !isComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Carrinho vazio</h1>
        <p className="text-muted-foreground">Adicione produtos para continuar</p>
      </div>
    );
  }
  
  if (isComplete) {
    return <CheckoutSuccess order={mockOrder} />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="max-w-4xl mx-auto">
        {currentStep === 'dados' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
              <CheckoutForm onSubmit={handleCustomerSubmit} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
              <AddressForm onSubmit={handleAddressSubmit} />
            </div>
          </div>
        )}
        
        {currentStep === 'pagamento' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Forma de Pagamento</h2>
              <PaymentSelector
                methods={mockPaymentMethods}
                selectedMethod={paymentMethod}
                onSelect={setPaymentMethod}
                total={summary.total}
                selectedInstallment={installment}
                onInstallmentChange={setInstallment}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              {/* Order summary */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 8.4 Configuração da Loja (`app/dashboard/loja/configuracoes/page.tsx`)

```typescript
'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useStoreConfig } from '@/hooks/use-store-config';
import { ThemeSelector } from '@/components/storefront/config/theme-selector';
import { ColorCustomizer } from '@/components/storefront/config/color-customizer';
import { BannerUpload } from '@/components/storefront/config/banner-upload';
import { SEOPreview } from '@/components/storefront/config/seo-preview';
import { mockThemeTemplates } from '@/lib/mocks/storefront';
import { Save, Eye } from 'lucide-react';

export default function StoreConfigPage() {
  const { config, updateTheme, updateSEO, isSaving, saveConfig } = useStoreConfig();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Configuração da Loja</h1>
          <p className="text-muted-foreground">Personalize a aparência da sua loja virtual</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank">
              <Eye className="w-4 h-4 mr-2" />
              Ver Loja
            </a>
          </Button>
          <Button onClick={saveConfig} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="tema" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tema">Tema</TabsTrigger>
          <TabsTrigger value="cores">Cores</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tema" className="space-y-6">
          <h2 className="text-lg font-semibold">Escolha um template</h2>
          <ThemeSelector
            templates={mockThemeTemplates}
            selectedTemplate={config.theme.template}
            onSelect={(template) => updateTheme({ template: template as any })}
          />
        </TabsContent>
        
        <TabsContent value="cores" className="space-y-6">
          <h2 className="text-lg font-semibold">Personalize as cores</h2>
          <ColorCustomizer theme={config.theme} onChange={updateTheme} />
        </TabsContent>
        
        <TabsContent value="banner" className="space-y-6">
          <h2 className="text-lg font-semibold">Banner da loja</h2>
          <BannerUpload
            bannerUrl={config.banner}
            onUpload={() => {}}
            onRemove={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <h2 className="text-lg font-semibold">Configurações de SEO</h2>
          <SEOPreview seo={config.seo} onChange={updateSEO} />
        </TabsContent>
      </Tabs>
      
      {/* Preview ao vivo */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Preview ao vivo</h2>
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src="/"
            className="w-full h-[600px]"
            title="Preview da loja"
          />
        </div>
      </div>
    </div>
  );
}
```

---

## 9. Utils e Formatters

### 9.1 Formatters (`lib/utils/formatters.ts`)

```typescript
/**
 * Formata valor em moeda brasileira
 */
export function formatPrice(price: number, currency = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Formata telefone brasileiro
 * (11) 99999-9999 ou (11) 9999-9999
 */
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

/**
 * Formata CEP brasileiro
 * 00000-000
 */
export function formatCEP(cep: string): string {
  const numbers = cep.replace(/\D/g, '');
  return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
}

/**
 * Calcula porcentagem de desconto
 */
export function calculateDiscount(originalPrice: number, price: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Formata data para exibição brasileira
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

/**
 * Limita texto com ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Gera slug a partir de texto
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
```

---

## 10. Dependências

### 10.1 Dependências Já Instaladas ✅

```json
{
  "@hookform/resolvers": "^5.2.2",
  "@radix-ui/react-*": "vários",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.400.0",
  "next": "^14.2.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-dropzone": "^15.0.0",
  "react-hook-form": "^7.71.2",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^4.3.6"
}
```

### 10.2 Componentes shadcn/ui Instalados ✅

- ✅ button
- ✅ card
- ✅ input
- ✅ label
- ✅ sheet
- ✅ tabs
- ✅ badge
- ✅ slider
- ✅ checkbox
- ✅ radio-group
- ✅ separator
- ✅ scroll-area
- ✅ select
- ✅ dialog
- ✅ toast
- ✅ skeleton
- ✅ accordion
- ✅ tooltip
- ✅ popover
- ✅ dropdown-menu
- ✅ avatar
- ✅ switch
- ✅ table
- ✅ textarea
- ✅ form

### 10.3 Nenhuma Nova Dependência Necessária

Todas as dependências necessárias já estão instaladas no projeto.

---

## 11. Estados de Loading e Error

### 11.1 ProductGrid - Loading State

```tsx
// Skeleton loading para grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="space-y-4">
      <Skeleton className="aspect-square" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  ))}
</div>
```

### 11.2 ProductGrid - Empty State

```tsx
<div className="text-center py-12">
  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
  <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
  <p className="text-muted-foreground">Tente ajustar seus filtros ou buscar por outro termo</p>
  <Button className="mt-4" onClick={clearFilters}>
    Limpar Filtros
  </Button>
</div>
```

### 11.3 Cart - Empty State

```tsx
<div className="flex-1 flex flex-col items-center justify-center text-center py-12">
  <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h3>
  <p className="text-muted-foreground mb-6">Adicione produtos para começar</p>
  <Button onClick={closeCart}>Continuar Comprando</Button>
</div>
```

### 11.4 Checkout - Error States

```tsx
// Erro de validação
{errors.name && (
  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
)}

// Erro de API
{apiError && (
  <Alert variant="destructive" className="mb-4">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{apiError}</AlertDescription>
  </Alert>
)}
```

---

## 12. Checklist de Implementação

### 12.1 Componentes de Layout
- [ ] `StoreHeader` - Header com busca, carrinho, navegação
- [ ] `StoreFooter` - Footer com links e informações

### 12.2 Componentes de Produto
- [ ] `ProductCard` - Card individual com badges e hover
- [ ] `ProductGrid` - Grid responsivo com skeleton
- [ ] `ProductFilters` - Filtros laterais/mobile

### 12.3 Componentes de Carrinho
- [ ] `CartDrawer` - Drawer lateral com itens
- [ ] `CartItem` - Item individual do carrinho
- [ ] `CartEmptyState` - Estado vazio

### 12.4 Componentes de Checkout
- [ ] `CheckoutSteps` - Indicador de progresso
- [ ] `CheckoutForm` - Dados pessoais
- [ ] `AddressForm` - Endereço com busca CEP
- [ ] `PaymentSelector` - Seletor de pagamento
- [ ] `CheckoutSuccess` - Tela de confirmação

### 12.5 Componentes de Config
- [ ] `ThemeSelector` - Seleção de template
- [ ] `ColorCustomizer` - Customizador de cores
- [ ] `BannerUpload` - Upload de banner
- [ ] `SEOPreview` - Configurações de SEO

### 12.6 Páginas
- [ ] `(store)/layout.tsx` - Layout da loja
- [ ] `(store)/page.tsx` - Home com grid
- [ ] `(store)/produto/[slug]/page.tsx` - Detalhes do produto
- [ ] `(store)/checkout/page.tsx` - Checkout multi-step
- [ ] `dashboard/loja/configuracoes/page.tsx` - Configuração

### 12.7 Context e Hooks
- [ ] `CartContext` - Contexto do carrinho
- [ ] `useCart` - Hook do carrinho
- [ ] `useStoreConfig` - Hook de configuração

### 12.8 Types e Mocks
- [ ] `types/storefront.ts` - Tipos da loja
- [ ] `types/cart.ts` - Tipos do carrinho
- [ ] `types/checkout.ts` - Tipos do checkout
- [ ] `lib/mocks/storefront.ts` - Mock data
- [ ] `lib/utils/formatters.ts` - Formatters

---

## 13. Notas para o Implementador

### 13.1 Convenções de Código
1. **Componentes**: PascalCase (ProductCard)
2. **Hooks**: camelCase com prefixo "use" (useCart)
3. **Types/Interfaces**: PascalCase (CartItem)
4. **Mocks**: camelCase com prefixo "mock" (mockProducts)
5. **Funções utilitárias**: camelCase (formatPrice)

### 13.2 Performance
- Usar `useMemo` para cálculos de resumo
- Usar `useCallback` para funções passadas como props
- Implementar lazy loading para imagens abaixo da fold
- Usar `React.memo` para componentes de lista

### 13.3 Acessibilidade
- Todos os botões de ícone devem ter `aria-label`
- Formulários devem ter labels associados
- Cores devem ter contraste mínimo 4.5:1
- Navegação por teclado deve funcionar

### 13.4 Responsividade
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Testar em: 320px, 375px, 768px, 1024px, 1440px

### 13.5 Mock Data
- Todos os dados estão em `lib/mocks/storefront.ts`
- Imagens usando Unsplash para consistência
- CEPs mockados: 01001-000, 20040-010, 30140-071

---

## 14. Fluxo de Dados

```
┌──────────────────────────────────────────────────────────────┐
│                      DADOS MOCK                              │
│  lib/mocks/storefront.ts                                     │
│  ├─ mockStoreConfig                                          │
│  ├─ mockCategories                                           │
│  ├─ mockProducts                                             │
│  ├─ mockPaymentMethods                                       │
│  └─ mockOrder                                                │
└──────────────────────┬───────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   TIPOS     │ │  CONTEXTOS  │ │  PÁGINAS    │
│             │ │             │ │             │
│ storefront  │ │ CartContext │ │ (store)/    │
│ cart        │ │             │ │ dashboard/  │
│ checkout    │ │             │ │             │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       └───────────────┴───────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                    COMPONENTES                               │
│  ├─ StoreHeader, StoreFooter                                 │
│  ├─ ProductCard, ProductGrid, ProductFilters                 │
│  ├─ CartDrawer                                               │
│  ├─ CheckoutSteps, CheckoutForm, AddressForm                 │
│  ├─ PaymentSelector, CheckoutSuccess                         │
│  └─ ThemeSelector, ColorCustomizer, etc                      │
└──────────────────────────────────────────────────────────────┘
```

---

**Documento criado por:** Vibe Planner  
**Data:** 21/03/2026  
**Versão:** 1.0  
**Status:** ✅ Pronto para implementação

---

## Resumo para Implementação

### O que já existe:
1. ✅ Tipos TypeScript completos
2. ✅ Mock data com 6 produtos
3. ✅ CartContext com todos os métodos
4. ✅ Formatters (price, phone, CEP)
5. ✅ Componentes shadcn/ui instalados

### O que precisa ser criado/atualizado:
1. 📝 Páginas: checkout, configurações
2. 📝 Componentes: ProductFilters, config components
3. 📝 Hooks: useStoreConfig
4. 📝 Integração: Formulários com react-hook-form + zod

### Ordem de implementação sugerida:
1. Hooks (useStoreConfig)
2. Componentes de config (admin)
3. Página de checkout
4. ProductFilters
5. Testes e refinamentos
