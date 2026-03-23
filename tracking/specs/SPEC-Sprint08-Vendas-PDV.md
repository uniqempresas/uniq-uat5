# 📋 SPEC TÉCNICO - Sprint 08: Vendas PDV (Ponto de Venda)

**Projeto:** UNIQ Empresas  
**Data:** 21/03/2026  
**Versão:** 1.0  
**Arquitetura:** Frontend First (Mock Data)  
**Stack:** React 19 + TypeScript + Next.js 14 + Tailwind CSS + shadcn/ui

---

## 1. Estrutura de Diretórios

### 1.1 Árvore Completa do Módulo PDV

```
📁 app/
├── 📁 pdv/
│   ├── page.tsx                    # Tela principal do PDV
│   ├── layout.tsx                  # Layout específico do PDV (sem sidebar)
│   ├── 📁 caixa/
│   │   └── page.tsx                # Controle de caixa
│   ├── 📁 relatorios/
│   │   └── page.tsx                # Relatórios de vendas
│   └── 📁 historico/
│       └── page.tsx                # Histórico de vendas
│
📁 components/
├── 📁 pdv/
│   ├── 📁 main/                    # Componentes da tela principal
│   │   ├── pdv-header.tsx          # Header com busca e atalhos
│   │   ├── product-grid.tsx        # Grid de produtos
│   │   ├── product-card.tsx        # Card individual de produto
│   │   ├── category-filter.tsx     # Filtro lateral de categorias
│   │   ├── search-bar.tsx          # Barra de busca com autocomplete
│   │   ├── recent-products.tsx     # Produtos recentes
│   │   └── keyboard-shortcuts.tsx  # Modal de atalhos (F1)
│   │
│   ├── 📁 cart/                    # Componentes do carrinho
│   │   ├── cart-panel.tsx          # Painel lateral do carrinho
│   │   ├── cart-item.tsx           # Item individual do carrinho
│   │   ├── cart-summary.tsx        # Resumo financeiro do carrinho
│   │   ├── quantity-control.tsx    # Controle de quantidade (+/-)
│   │   ├── discount-modal.tsx      # Modal de desconto (F7)
│   │   └── empty-cart.tsx          # Estado vazio do carrinho
│   │
│   ├── 📁 checkout/                # Componentes do checkout
│   │   ├── checkout-modal.tsx      # Modal principal de checkout
│   │   ├── payment-methods.tsx     # Seleção de formas de pagamento
│   │   ├── cash-payment.tsx        # Pagamento em dinheiro + troco
│   │   ├── card-payment.tsx        # Pagamento em cartão
│   │   ├── pix-payment.tsx         # Pagamento Pix
│   │   ├── mixed-payment.tsx       # Pagamento misto (F6)
│   │   ├── customer-search.tsx     # Busca de cliente
│   │   ├── sale-summary.tsx        # Resumo da venda
│   │   └── success-animation.tsx   # Animação de sucesso + confetti
│   │
│   ├── 📁 caixa/                   # Componentes de controle de caixa
│   │   ├── caixa-status.tsx        # Status atual do caixa
│   │   ├── abertura-form.tsx       # Formulário de abertura
│   │   ├── sangria-form.tsx        # Formulário de sangria
│   │   ├── suprimento-form.tsx     # Formulário de suprimento
│   │   ├── fechamento-form.tsx     # Formulário de fechamento
│   │   ├── historico-list.tsx      # Lista de movimentações
│   │   └── movimentacao-card.tsx   # Card de movimentação
│   │
│   ├── 📁 relatorios/              # Componentes de relatórios
│   │   ├── vendas-filter.tsx       # Filtros de período
│   │   ├── vendas-table.tsx        # Tabela de vendas
│   │   ├── resumo-cards.tsx        # Cards de métricas
│   │   ├── produtos-chart.tsx      # Gráfico de produtos mais vendidos
│   │   ├── pagamentos-chart.tsx    # Gráfico de formas de pagamento
│   │   ├── vendedores-table.tsx    # Performance por vendedor
│   │   └── cancelamentos-list.tsx  # Lista de cancelamentos
│   │
│   └── 📁 shared/                  # Componentes compartilhados
│       ├── product-skeleton.tsx    # Skeleton de produto
│       ├── receipt-preview.tsx     # Preview do cupom
│       └── shortcut-badge.tsx      # Badge de atalho de teclado
│
📁 hooks/
├── use-pdv.ts                      # Hook principal do PDV
├── use-cart-pdv.ts                 # Hook específico do carrinho PDV
├── use-keyboard-shortcuts.ts       # Hook de atalhos de teclado
├── use-caixa.ts                    # Hook de controle de caixa
├── use-search-products.ts          # Hook de busca de produtos
└── use-debounce.ts                 # Hook de debounce (já existe)
│
📁 contexts/
├── pdv-context.tsx                 # Contexto do PDV
├── cart-pdv-context.tsx            # Contexto do carrinho PDV
└── caixa-context.tsx               # Contexto de caixa
│
📁 types/
├── pdv.ts                          # Tipos específicos do PDV
├── caixa.ts                        # Tipos de caixa
├── venda.ts                        # Tipos de venda
└── payment.ts                      # Tipos de pagamento
│
📁 lib/
├── 📁 mocks/
│   ├── pdv-products.ts             # Mock de produtos PDV
│   ├── pdv-sales.ts                # Mock de vendas
│   ├── pdv-caixa.ts                # Mock de caixa
│   └── pdv-reports.ts              # Mock de relatórios
│   └── index.ts                    # Exportações
│
├── 📁 utils/
│   ├── formatters.ts               # Formatadores (já existe)
│   ├── calculations.ts             # Cálculos de vendas
│   └── validators.ts               # Validações
│
└── 📁 schemas/
    ├── venda-schema.ts             # Schema Zod de venda
    ├── caixa-schema.ts             # Schema Zod de caixa
    └── checkout-schema.ts          # Schema Zod de checkout
```

### 1.2 Padrão de Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Componentes | PascalCase + sufixo funcional | `ProductCard`, `CartPanel` |
| Hooks | camelCase + prefixo `use` | `usePDV`, `useCartPDV` |
| Contextos | PascalCase + sufixo `Context` | `PDVContext`, `CartContext` |
| Tipos | PascalCase + interface | `Product`, `CartItem` |
| Enums | PascalCase + sufixo | `PaymentMethod`, `SaleStatus` |
| Mocks | camelCase + prefixo `mock` | `mockProducts`, `mockSales` |
| Utilitários | camelCase + ação | `formatCurrency`, `calculateTotal` |
| Páginas | page.tsx dentro da pasta | `app/pdv/page.tsx` |

---

## 2. Tipos TypeScript

### 2.1 Tipos Principais (`types/pdv.ts`)

```typescript
// ============================================
// PRODUTO PDV
// ============================================

export interface PDVProduct {
  id: number;
  name: string;
  price: number;
  costPrice?: number;           // Preço de custo (para margem)
  image: string;
  stock: number;
  category: string;
  categoryId: number;
  barcode: string;
  sku: string;
  minStock?: number;            // Estoque mínimo para alerta
  isActive: boolean;
  description?: string;
}

// ============================================
// CARRINHO PDV
// ============================================

export interface CartItemPDV {
  id: string;                   // ID único do item no carrinho
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;       // Para mostrar desconto no item
  image: string;
  quantity: number;
  stock: number;                // Estoque disponível (para validação)
  subtotal: number;             // Preço × Quantidade
  discount?: number;            // Desconto específico do item
}

export interface CartPDV {
  items: CartItemPDV[];
  subtotal: number;
  discount: number;             // Desconto total
  tax?: number;                 // Taxa de serviço (opcional)
  total: number;
  itemCount: number;            // Contagem total de itens
  customerId?: number;          // Cliente vinculado
  sellerId?: number;            // Vendedor responsável
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
```

### 2.2 Tipos de Pagamento (`types/payment.ts`)

```typescript
// ============================================
// ENUMS DE PAGAMENTO
// ============================================

export enum PaymentMethodType {
  DINHEIRO = 'dinheiro',
  CARTAO_CREDITO = 'cartao_credito',
  CARTAO_DEBITO = 'cartao_debito',
  PIX = 'pix',
  BOLETO = 'boleto',
  VALE = 'vale',
  CREDITO_LOJA = 'credito_loja'
}

export enum CardBrand {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  ELO = 'elo',
  AMEX = 'amex',
  HIPERCARD = 'hipercard',
  DINERS = 'diners'
}

// ============================================
// PAGAMENTO
// ============================================

export interface Payment {
  id: string;
  method: PaymentMethodType;
  amount: number;               // Valor pago com este método
  brand?: CardBrand;           // Bandeira do cartão
  installments?: number;        // Parcelas (cartão)
  installmentValue?: number;    // Valor da parcela
  change?: number;              // Troco (dinheiro)
  receivedAmount?: number;      // Valor recebido (dinheiro)
  transactionId?: string;       // ID da transação (cartão/Pix)
  qrCode?: string;              // QR Code (Pix)
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  processedAt?: string;
}

export interface PaymentMethodConfig {
  id: PaymentMethodType;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  allowChange: boolean;         // Permite troco
  maxInstallments?: number;     // Máximo de parcelas
  requiresAuthorization?: boolean;
  fee?: number;                 // Taxa de operadora
}

// ============================================
// PAGAMENTO MISTO
// ============================================

export interface MixedPayment {
  payments: Payment[];
  totalPaid: number;
  remaining: number;            // Valor restante para pagar
  isComplete: boolean;
}
```

### 2.3 Tipos de Venda (`types/venda.ts`)

```typescript
import { CartItemPDV, Customer, Seller } from './pdv';
import { Payment } from './payment';

// ============================================
// STATUS DA VENDA
// ============================================

export enum SaleStatus {
  PENDENTE = 'pendente',
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
  CANCELADA = 'cancelada',
  REEMBOLSADA = 'reembolsada'
}

export enum SaleOrigin {
  PDV = 'pdv',
  ONLINE = 'online',
  WHATSAPP = 'whatsapp',
  TELEFONE = 'telefone'
}

// ============================================
// VENDA
// ============================================

export interface Sale {
  id: string;
  number: string;               // Número da venda (ex: 001024)
  status: SaleStatus;
  origin: SaleOrigin;
  
  // Dados temporais
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  
  // Itens
  items: CartItemPDV[];
  
  // Financeiro
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  
  // Pagamentos
  payments: Payment[];
  
  // Pessoas
  customer?: Customer;
  seller: Seller;
  
  // Caixa
  cashRegisterId: string;
  
  // Observações
  notes?: string;
  cancellationReason?: string;
  cancelledBy?: string;
  
  // Impressão
  receiptPrinted: boolean;
  receiptNumber?: string;
}

// ============================================
// RESUMO DE VENDA (para relatórios)
// ============================================

export interface SalesSummary {
  period: {
    from: string;
    to: string;
  };
  totalSales: number;
  totalAmount: number;
  totalDiscount: number;
  averageTicket: number;
  totalItems: number;
  byPaymentMethod: Record<string, number>;
  byStatus: Record<string, number>;
}

// ============================================
// PRODUTO MAIS VENDIDO
// ============================================

export interface TopSellingProduct {
  productId: number;
  name: string;
  category: string;
  quantity: number;
  totalAmount: number;
  percentage: number;
}

// ============================================
// PERFORMANCE DO VENDEDOR
// ============================================

export interface SellerPerformance {
  sellerId: number;
  sellerName: string;
  totalSales: number;
  totalAmount: number;
  averageTicket: number;
  totalItems: number;
  ranking: number;
}
```

### 2.4 Tipos de Caixa (`types/caixa.ts`)

```typescript
// ============================================
// STATUS DO CAIXA
// ============================================

export enum CaixaStatus {
  FECHADO = 'fechado',
  ABERTO = 'aberto',
  FECHANDO = 'fechando'
}

export enum MovimentacaoType {
  ABERTURA = 'abertura',
  SANGRIA = 'sangria',
  SUPRIMENTO = 'suprimento',
  VENDA = 'venda',
  ESTORNO = 'estorno',
  FECHAMENTO = 'fechamento'
}

// ============================================
// CAIXA
// ============================================

export interface Caixa {
  id: string;
  status: CaixaStatus;
  
  // Abertura
  openedAt?: string;
  openedBy?: string;
  openingAmount: number;
  
  // Fechamento
  closedAt?: string;
  closedBy?: string;
  closingAmount?: number;
  
  // Saldos
  currentBalance: number;       // Saldo atual
  expectedBalance: number;      // Saldo esperado
  difference?: number;          // Diferença (quebra de caixa)
  
  // Totais
  totalSales: number;
  totalCash: number;
  totalCard: number;
  totalPix: number;
  
  // Contadores
  salesCount: number;
  itemsCount: number;
  
  // Operador atual
  currentOperator?: string;
}

// ============================================
// MOVIMENTAÇÃO DE CAIXA
// ============================================

export interface CaixaMovimentacao {
  id: string;
  caixaId: string;
  type: MovimentacaoType;
  amount: number;               // Positivo ou negativo
  description: string;
  timestamp: string;
  operator: string;
  supervisorPassword?: string;  // Para sangrias
  saleId?: string;              // Se for venda
  paymentMethod?: string;
}

// ============================================
// FECHAMENTO DE CAIXA
// ============================================

export interface CaixaFechamento {
  caixaId: string;
  closedAt: string;
  closedBy: string;
  
  // Valores conferidos
  cashAmount: number;
  cardAmount: number;
  pixAmount: number;
  otherAmount: number;
  
  // Totais
  totalCounted: number;
  totalExpected: number;
  difference: number;
  
  // Resumo
  salesCount: number;
  totalSales: number;
  sangriasTotal: number;
  suprimentosTotal: number;
  
  // Observações
  observations?: string;
}

// ============================================
// FILTROS DE RELATÓRIO
// ============================================

export interface CaixaFilters {
  period: 'today' | 'yesterday' | 'week' | 'month' | 'custom';
  from?: string;
  to?: string;
  operator?: string;
  status?: CaixaStatus;
}
```

---

## 3. Mock Data Completo

### 3.1 Produtos (`lib/mocks/pdv-products.ts`)

```typescript
import { PDVProduct, Category, Customer, Seller } from '@/types/pdv';

export const mockPDVProducts: PDVProduct[] = [
  // ÓCULOS DE SOL
  {
    id: 1,
    name: 'Óculos Ray-Ban Aviador Classic',
    price: 899.90,
    costPrice: 450.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 15,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7891234567890',
    sku: 'RB-3025-001',
    minStock: 5,
    isActive: true,
    description: 'O clássico Aviador da Ray-Ban com proteção UV400'
  },
  {
    id: 2,
    name: 'Óculos Oakley Holbrook',
    price: 749.90,
    costPrice: 375.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
    stock: 8,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7899876543210',
    sku: 'OK-HB-002',
    minStock: 3,
    isActive: true,
    description: 'Design esportivo com tecnologia Prizm'
  },
  {
    id: 3,
    name: 'Óculos Polaroid Feminino',
    price: 299.90,
    costPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500&h=500&fit=crop',
    stock: 22,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7894561237890',
    sku: 'PLD-FEM-003',
    minStock: 5,
    isActive: true,
    description: 'Estilo moderno com lentes polarizadas'
  },
  {
    id: 4,
    name: 'Óculos Persol PO0649',
    price: 1299.00,
    costPrice: 650.00,
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=500&fit=crop',
    stock: 4,
    category: 'Óculos de Sol',
    categoryId: 1,
    barcode: '7897894561230',
    sku: 'PSL-649-004',
    minStock: 2,
    isActive: true,
    description: 'Ícone de estilo italiano desde 1961'
  },
  
  // ARMAÇÕES
  {
    id: 5,
    name: 'Armação Titanium Ultra Leve',
    price: 459.90,
    costPrice: 180.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 12,
    category: 'Armações',
    categoryId: 2,
    barcode: '7893216549870',
    sku: 'TIT-UL-005',
    minStock: 5,
    isActive: true,
    description: 'Armação em titânio hipoalergênico, apenas 8g'
  },
  {
    id: 6,
    name: 'Armação Acetato Vintage',
    price: 329.90,
    costPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop',
    stock: 18,
    category: 'Armações',
    categoryId: 2,
    barcode: '7896549873210',
    sku: 'ACE-VNT-006',
    minStock: 5,
    isActive: true,
    description: 'Estilo retrô com acetato de alta qualidade'
  },
  {
    id: 7,
    name: 'Armação Metal Flexível',
    price: 279.90,
    costPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 25,
    category: 'Armações',
    categoryId: 2,
    barcode: '7891472583690',
    sku: 'MTL-FLX-007',
    minStock: 8,
    isActive: true,
    description: 'Hastes flexíveis para maior durabilidade'
  },
  {
    id: 8,
    name: 'Armação Infantil Resistente',
    price: 199.90,
    costPrice: 80.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 3,
    category: 'Armações',
    categoryId: 2,
    barcode: '7893692581470',
    sku: 'INF-RES-008',
    minStock: 5,
    isActive: true,
    description: 'Silicone flexível e resistente a quebras'
  },
  
  // LENTES
  {
    id: 9,
    name: 'Lente Transitions Signature',
    price: 450.00,
    costPrice: 225.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 30,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7897418529630',
    sku: 'LNT-TRN-009',
    minStock: 10,
    isActive: true,
    description: 'Lentes que escurecem conforme a luz'
  },
  {
    id: 10,
    name: 'Lente Anti Reflexo Premium',
    price: 180.00,
    costPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 50,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7899638527410',
    sku: 'LNT-AR-010',
    minStock: 15,
    isActive: true,
    description: 'Tratamento anti reflexo de última geração'
  },
  {
    id: 11,
    name: 'Lente Blue Control',
    price: 280.00,
    costPrice: 140.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 20,
    category: 'Lentes',
    categoryId: 3,
    barcode: '7891597534560',
    sku: 'LNT-BC-011',
    minStock: 8,
    isActive: true,
    description: 'Proteção contra luz azul de telas'
  },
  
  // ACESSÓRIOS
  {
    id: 12,
    name: 'Estojo Rigido Premium',
    price: 89.90,
    costPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 40,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7893579514560',
    sku: 'EST-RGD-012',
    minStock: 10,
    isActive: true,
    description: 'Proteção máxima para seus óculos'
  },
  {
    id: 13,
    name: 'Kit Limpeza Completo',
    price: 39.90,
    costPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 100,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7898527419630',
    sku: 'KLT-LMP-013',
    minStock: 25,
    isActive: true,
    description: 'Spray, flanela e chave de ajuste'
  },
  {
    id: 14,
    name: 'Cordão de Silicone',
    price: 29.90,
    costPrice: 10.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 60,
    category: 'Acessórios',
    categoryId: 4,
    barcode: '7894567891230',
    sku: 'CRD-SLC-014',
    minStock: 15,
    isActive: true,
    description: 'Ideal para esportes e atividades'
  },
  
  // LENTES DE CONTATO
  {
    id: 15,
    name: 'Acuvue Oasys (caixa c/6)',
    price: 129.90,
    costPrice: 65.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 45,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7891237894560',
    sku: 'ACV-OAS-015',
    minStock: 12,
    isActive: true,
    description: 'Lentes mensais com Hydraclear Plus'
  },
  {
    id: 16,
    name: 'Biofinity (caixa c/6)',
    price: 149.90,
    costPrice: 75.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 30,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7894561237890',
    sku: 'BIO-FFN-016',
    minStock: 8,
    isActive: true,
    description: 'Lentes mensais de alta oxigenação'
  },
  {
    id: 17,
    name: 'Air Optix Colors',
    price: 179.90,
    costPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 20,
    category: 'Lentes de Contato',
    categoryId: 5,
    barcode: '7897891234560',
    sku: 'AOX-CLR-017',
    minStock: 6,
    isActive: true,
    description: 'Lentes coloridas mensais'
  },
  
  // INFANTIL
  {
    id: 18,
    name: 'Óculos de Sol Infantil Flex',
    price: 159.90,
    costPrice: 64.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    stock: 15,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7893217896540',
    sku: 'INF-SOL-018',
    minStock: 5,
    isActive: true,
    description: 'Proteção UV400 com armação flexível'
  },
  {
    id: 19,
    name: 'Armação Infantil Personagens',
    price: 249.90,
    costPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
    stock: 8,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7896543217890',
    sku: 'INF-PER-019',
    minStock: 3,
    isActive: true,
    description: 'Personagens infantis em acetato'
  },
  {
    id: 20,
    name: 'Lentes de Contato Infantil',
    price: 199.90,
    costPrice: 100.00,
    image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
    stock: 5,
    category: 'Infantil',
    categoryId: 6,
    barcode: '7899874563210',
    sku: 'INF-LNT-020',
    minStock: 2,
    isActive: true,
    description: 'Lentes esféricas especiais para crianças'
  }
];

// ============================================
// CATEGORIAS
// ============================================

export const mockPDVCategories: Category[] = [
  { id: 1, name: 'Óculos de Sol', slug: 'oculos-de-sol', count: 49, color: '#f59e0b', icon: 'sun', isActive: true },
  { id: 2, name: 'Armações', slug: 'armacoes', count: 85, color: '#3b82f6', icon: 'glasses', isActive: true },
  { id: 3, name: 'Lentes', slug: 'lentes', count: 32, color: '#10b981', icon: 'eye', isActive: true },
  { id: 4, name: 'Acessórios', slug: 'acessorios', count: 45, color: '#8b5cf6', icon: 'box', isActive: true },
  { id: 5, name: 'Lentes de Contato', slug: 'lentes-contato', count: 28, color: '#ec4899', icon: 'contact', isActive: true },
  { id: 6, name: 'Infantil', slug: 'infantil', count: 18, color: '#f97316', icon: 'baby', isActive: true },
];

// ============================================
// CLIENTES
// ============================================

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01001-000'
    },
    birthDate: '1985-03-15',
    createdAt: '2023-01-10T10:00:00',
    totalPurchases: 12,
    totalSpent: 5847.50,
    isActive: true
  },
  {
    id: 2,
    name: 'João Pedro Oliveira',
    email: 'joao.oliveira@email.com',
    phone: '(11) 91234-5678',
    cpf: '987.654.321-00',
    address: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apto 45',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    birthDate: '1990-07-22',
    createdAt: '2023-02-15T14:30:00',
    totalPurchases: 5,
    totalSpent: 2349.80,
    isActive: true
  },
  {
    id: 3,
    name: 'Ana Carolina Mendes',
    email: 'ana.mendes@email.com',
    phone: '(11) 99876-5432',
    cpf: '456.789.123-00',
    address: {
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-100'
    },
    createdAt: '2023-03-20T09:15:00',
    totalPurchases: 3,
    totalSpent: 1197.60,
    isActive: true
  },
  {
    id: 4,
    name: 'Carlos Eduardo Souza',
    email: 'carlos.souza@email.com',
    phone: '(11) 93456-7890',
    cpf: '789.123.456-00',
    address: {
      street: 'Rua Oscar Freire',
      number: '800',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    birthDate: '1988-11-30',
    createdAt: '2023-04-05T16:45:00',
    totalPurchases: 8,
    totalSpent: 4230.00,
    isActive: true
  },
  {
    id: 5,
    name: 'Fernanda Lima Costa',
    email: 'fernanda.costa@email.com',
    phone: '(11) 94567-8901',
    cpf: '321.654.987-00',
    createdAt: '2023-05-12T11:20:00',
    totalPurchases: 1,
    totalSpent: 459.90,
    isActive: true
  }
];

// ============================================
// VENDEDORES
// ============================================

export const mockSellers: Seller[] = [
  {
    id: 1,
    name: 'Ana Silva',
    email: 'ana.silva@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    role: 'admin',
    isActive: true,
    stats: {
      totalSales: 156,
      totalAmount: 45750.00,
      averageTicket: 293.27
    }
  },
  {
    id: 2,
    name: 'Pedro Santos',
    email: 'pedro.santos@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    role: 'seller',
    isActive: true,
    stats: {
      totalSales: 124,
      totalAmount: 32890.00,
      averageTicket: 265.24
    }
  },
  {
    id: 3,
    name: 'Maria Costa',
    email: 'maria.costa@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    role: 'seller',
    isActive: true,
    stats: {
      totalSales: 98,
      totalAmount: 26780.00,
      averageTicket: 273.27
    }
  },
  {
    id: 4,
    name: 'Lucas Oliveira',
    email: 'lucas.oliveira@uniq.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    role: 'operator',
    isActive: true
  }
];
```

### 3.2 Vendas e Caixa (`lib/mocks/pdv-sales.ts`)

```typescript
import { Sale, SalesSummary, TopSellingProduct, SellerPerformance } from '@/types/venda';
import { Caixa, CaixaMovimentacao } from '@/types/caixa';
import { PaymentMethodType } from '@/types/payment';
import { mockSellers, mockCustomers, mockPDVProducts } from './pdv-products';

// ============================================
// VENDAS MOCK
// ============================================

export const mockSales: Sale[] = [
  {
    id: 'sale-001',
    number: '001024',
    status: 'concluida',
    origin: 'pdv',
    createdAt: '2026-03-21T09:30:00',
    updatedAt: '2026-03-21T09:35:00',
    completedAt: '2026-03-21T09:35:00',
    items: [
      {
        id: 'item-001',
        productId: 1,
        name: 'Óculos Ray-Ban Aviador Classic',
        price: 899.90,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        quantity: 1,
        stock: 15,
        subtotal: 899.90
      }
    ],
    subtotal: 899.90,
    discount: 0,
    tax: 0,
    total: 899.90,
    payments: [
      {
        id: 'pay-001',
        method: PaymentMethodType.CARTAO_CREDITO,
        amount: 899.90,
        brand: 'visa',
        installments: 3,
        installmentValue: 299.97,
        status: 'approved'
      }
    ],
    customer: mockCustomers[0],
    seller: mockSellers[0],
    cashRegisterId: 'cx-001',
    receiptPrinted: true,
    receiptNumber: 'CF001024'
  },
  {
    id: 'sale-002',
    number: '001023',
    status: 'concluida',
    origin: 'pdv',
    createdAt: '2026-03-21T10:15:00',
    updatedAt: '2026-03-21T10:20:00',
    completedAt: '2026-03-21T10:20:00',
    items: [
      {
        id: 'item-002',
        productId: 5,
        name: 'Armação Titanium Ultra Leve',
        price: 459.90,
        image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500&h=500&fit=crop',
        quantity: 1,
        stock: 12,
        subtotal: 459.90
      },
      {
        id: 'item-003',
        productId: 9,
        name: 'Lente Transitions Signature',
        price: 450.00,
        image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
        quantity: 1,
        stock: 30,
        subtotal: 450.00
      }
    ],
    subtotal: 909.90,
    discount: 45.00,
    tax: 0,
    total: 864.90,
    payments: [
      {
        id: 'pay-002',
        method: PaymentMethodType.PIX,
        amount: 864.90,
        status: 'approved',
        processedAt: '2026-03-21T10:20:00'
      }
    ],
    customer: mockCustomers[1],
    seller: mockSellers[0],
    cashRegisterId: 'cx-001',
    notes: 'Cliente fidelidade - desconto 5%',
    receiptPrinted: true,
    receiptNumber: 'CF001023'
  },
  {
    id: 'sale-003',
    number: '001022',
    status: 'concluida',
    origin: 'pdv',
    createdAt: '2026-03-21T11:45:00',
    updatedAt: '2026-03-21T11:50:00',
    completedAt: '2026-03-21T11:50:00',
    items: [
      {
        id: 'item-004',
        productId: 15,
        name: 'Acuvue Oasys (caixa c/6)',
        price: 129.90,
        image: 'https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?w=500&h=500&fit=crop',
        quantity: 2,
        stock: 45,
        subtotal: 259.80
      },
      {
        id: 'item-005',
        productId: 13,
        name: 'Kit Limpeza Completo',
        price: 39.90,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        quantity: 1,
        stock: 100,
        subtotal: 39.90
      }
    ],
    subtotal: 299.70,
    discount: 0,
    tax: 0,
    total: 299.70,
    payments: [
      {
        id: 'pay-003',
        method: PaymentMethodType.DINHEIRO,
        amount: 299.70,
        receivedAmount: 350.00,
        change: 50.30,
        status: 'approved'
      }
    ],
    seller: mockSellers[1],
    cashRegisterId: 'cx-001',
    receiptPrinted: true,
    receiptNumber: 'CF001022'
  },
  {
    id: 'sale-004',
    number: '001021',
    status: 'cancelada',
    origin: 'pdv',
    createdAt: '2026-03-21T14:20:00',
    updatedAt: '2026-03-21T14:25:00',
    cancelledAt: '2026-03-21T14:25:00',
    items: [
      {
        id: 'item-006',
        productId: 2,
        name: 'Óculos Oakley Holbrook',
        price: 749.90,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop',
        quantity: 1,
        stock: 8,
        subtotal: 749.90
      }
    ],
    subtotal: 749.90,
    discount: 0,
    tax: 0,
    total: 749.90,
    payments: [],
    customer: mockCustomers[3],
    seller: mockSellers[0],
    cashRegisterId: 'cx-001',
    cancellationReason: 'Arrependimento do cliente',
    cancelledBy: 'Ana Silva',
    receiptPrinted: false
  }
];

// ============================================
// CAIXA MOCK
// ============================================

export const mockCaixa: Caixa = {
  id: 'cx-001',
  status: 'aberto',
  openedAt: '2026-03-21T08:00:00',
  openedBy: 'Ana Silva',
  openingAmount: 200.00,
  currentBalance: 1847.50,
  expectedBalance: 1847.50,
  difference: 0,
  totalSales: 2064.50,
  totalCash: 299.70,
  totalCard: 899.90,
  totalPix: 864.90,
  salesCount: 3,
  itemsCount: 5,
  currentOperator: 'Ana Silva'
};

export const mockCaixaMovimentacoes: CaixaMovimentacao[] = [
  {
    id: 'mov-001',
    caixaId: 'cx-001',
    type: 'abertura',
    amount: 200.00,
    description: 'Abertura de caixa - Início do expediente',
    timestamp: '2026-03-21T08:00:00',
    operator: 'Ana Silva'
  },
  {
    id: 'mov-002',
    caixaId: 'cx-001',
    type: 'venda',
    amount: 899.90,
    description: 'Venda #001024 - Cartão Crédito',
    timestamp: '2026-03-21T09:35:00',
    operator: 'Ana Silva',
    saleId: 'sale-001',
    paymentMethod: 'cartao_credito'
  },
  {
    id: 'mov-003',
    caixaId: 'cx-001',
    type: 'venda',
    amount: 864.90,
    description: 'Venda #001023 - Pix',
    timestamp: '2026-03-21T10:20:00',
    operator: 'Ana Silva',
    saleId: 'sale-002',
    paymentMethod: 'pix'
  },
  {
    id: 'mov-004',
    caixaId: 'cx-001',
    type: 'sangria',
    amount: -50.00,
    description: 'Retirada para almoço do operador',
    timestamp: '2026-03-21T12:30:00',
    operator: 'Ana Silva',
    supervisorPassword: '****'
  },
  {
    id: 'mov-005',
    caixaId: 'cx-001',
    type: 'suprimento',
    amount: 100.00,
    description: 'Troco adicional para caixa',
    timestamp: '2026-03-21T13:00:00',
    operator: 'Ana Silva'
  },
  {
    id: 'mov-006',
    caixaId: 'cx-001',
    type: 'venda',
    amount: 299.70,
    description: 'Venda #001022 - Dinheiro',
    timestamp: '2026-03-21T11:50:00',
    operator: 'Pedro Santos',
    saleId: 'sale-003',
    paymentMethod: 'dinheiro'
  },
  {
    id: 'mov-007',
    caixaId: 'cx-001',
    type: 'estorno',
    amount: -749.90,
    description: 'Cancelamento Venda #001021',
    timestamp: '2026-03-21T14:25:00',
    operator: 'Ana Silva',
    saleId: 'sale-004'
  }
];

// ============================================
// RELATÓRIOS MOCK
// ============================================

export const mockSalesSummary: SalesSummary = {
  period: {
    from: '2026-03-21T00:00:00',
    to: '2026-03-21T23:59:59'
  },
  totalSales: 4,
  totalAmount: 2814.40,
  totalDiscount: 45.00,
  averageTicket: 703.60,
  totalItems: 6,
  byPaymentMethod: {
    dinheiro: 299.70,
    cartao_credito: 899.90,
    pix: 864.90,
    cartao_debito: 0
  },
  byStatus: {
    concluida: 3,
    cancelada: 1,
    pendente: 0
  }
};

export const mockTopSellingProducts: TopSellingProduct[] = [
  {
    productId: 15,
    name: 'Acuvue Oasys (caixa c/6)',
    category: 'Lentes de Contato',
    quantity: 2,
    totalAmount: 259.80,
    percentage: 25
  },
  {
    productId: 1,
    name: 'Óculos Ray-Ban Aviador Classic',
    category: 'Óculos de Sol',
    quantity: 1,
    totalAmount: 899.90,
    percentage: 22
  },
  {
    productId: 5,
    name: 'Armação Titanium Ultra Leve',
    category: 'Armações',
    quantity: 1,
    totalAmount: 459.90,
    percentage: 18
  },
  {
    productId: 9,
    name: 'Lente Transitions Signature',
    category: 'Lentes',
    quantity: 1,
    totalAmount: 450.00,
    percentage: 17
  },
  {
    productId: 13,
    name: 'Kit Limpeza Completo',
    category: 'Acessórios',
    quantity: 1,
    totalAmount: 39.90,
    percentage: 3
  }
];

export const mockSellersPerformance: SellerPerformance[] = [
  {
    sellerId: 1,
    sellerName: 'Ana Silva',
    totalSales: 2,
    totalAmount: 1764.80,
    averageTicket: 882.40,
    totalItems: 3,
    ranking: 1
  },
  {
    sellerId: 2,
    sellerName: 'Pedro Santos',
    totalSales: 1,
    totalAmount: 299.70,
    averageTicket: 299.70,
    totalItems: 2,
    ranking: 2
  }
];
```

---

## 4. Componentes Detalhados

### 4.1 Tela Principal - Componentes (`components/pdv/main/`)

#### **PDVHeader** (`pdv-header.tsx`)

```typescript
interface PDVHeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onOpenShortcuts: () => void;
  onOpenCaixa: () => void;
  onOpenRelatorios: () => void;
  caixaStatus: 'aberto' | 'fechado';
  operatorName: string;
  cartItemCount: number;
  onToggleCart: () => void;
}

// Estados internos:
// - isSearchFocused: boolean

// JSX Estruturado:
// <header className="bg-uniq-primary text-white">
//   <div className="flex items-center justify-between p-4">
//     <Logo />
//     <SearchBar /> // F2 atalho
//     <div className="flex items-center gap-4">
//       <ShortcutButton onClick={onOpenShortcuts} />
//       <CaixaStatusBadge status={caixaStatus} />
//       <OperatorInfo name={operatorName} />
//       <CartButton count={cartItemCount} onClick={onToggleCart} />
//     </div>
//   </div>
//   <ShortcutBar /> // F1-F12 visíveis
// </header>
```

#### **SearchBar** (`search-bar.tsx`)

```typescript
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (product: PDVProduct) => void;
  products: PDVProduct[];
  placeholder?: string;
  autoFocus?: boolean;
}

// Estados internos:
// - isOpen: boolean (dropdown aberto)
// - filteredProducts: PDVProduct[]
// - highlightedIndex: number
// - isLoading: boolean

// Efeitos:
// - useEffect: debounce 300ms na busca
// - useEffect: navegação por teclado (setas)
// - useEffect: autofocus no mount

// Handlers:
// - handleInputChange: atualiza valor e filtra
// - handleKeyDown: Enter, Escape, ArrowUp/Down
// - handleSelect: seleciona produto e limpa
// - handleFocus: abre dropdown
// - handleBlur: fecha dropdown com delay

// JSX Estruturado:
// <div className="relative w-full max-w-2xl">
//   <SearchIcon />
//   <Input 
//     value={value}
//     onChange={handleInputChange}
//     onKeyDown={handleKeyDown}
//     onFocus={handleFocus}
//     placeholder="Buscar por nome, código ou barras (F2)..."
//   />
//   <BarcodeIcon />
//   
//   {isOpen && (
//     <Command className="absolute top-full mt-1">
//       <CommandList>
//         {filteredProducts.map((product, index) => (
//           <CommandItem 
//             key={product.id}
//             onSelect={() => handleSelect(product)}
//             className={index === highlightedIndex ? 'bg-accent' : ''}
//           >
//             <ProductImage src={product.image} />
//             <div>
//               <HighlightText text={product.name} highlight={value} />
//               <span>{formatCurrency(product.price)}</span>
//             </div>
//             <StockBadge stock={product.stock} />
//           </CommandItem>
//         ))}
//       </CommandList>
//     </Command>
//   )}
// </div>
```

#### **ProductGrid** (`product-grid.tsx`)

```typescript
interface ProductGridProps {
  products: PDVProduct[];
  onAddToCart: (product: PDVProduct) => void;
  loading?: boolean;
  columns?: 2 | 3 | 4 | 5;
  selectedCategory: number | null;
}

// Estados internos:
// - visibleProducts: PDVProduct[] (com filtro)
// - isAnimating: Record<number, boolean> (feedback de clique)

// Efeitos:
// - useEffect: filtra produtos quando selectedCategory muda
// - useEffect: animação de feedback ao adicionar

// Handlers:
// - handleAddToCart: produto => void
// - handleProductClick: produto => void (abre modal ou adiciona direto)

// JSX Estruturado:
// <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//   {loading ? (
//     <ProductSkeleton count={10} />
//   ) : products.length === 0 ? (
//     <EmptyProducts />
//   ) : (
//     products.map(product => (
//       <ProductCard 
//         key={product.id}
//         product={product}
//         onAdd={() => handleAddToCart(product)}
//         isAnimating={isAnimating[product.id]}
//       />
//     ))
//   )}
// </div>
```

#### **ProductCard** (`product-card.tsx`)

```typescript
interface ProductCardProps {
  product: PDVProduct;
  onAdd: () => void;
  isAnimating?: boolean;
}

// Estados internos:
// - isHovered: boolean
// - imageLoaded: boolean

// Handlers:
// - handleClick: chama onAdd
// - handleKeyDown: Enter para adicionar

// JSX Estruturado:
// <Card 
//   className={cn(
//     "cursor-pointer transition-all duration-200",
//     isAnimating && "scale-95 ring-2 ring-uniq-accent",
//     isHovered && "shadow-lg"
//   )}
//   onClick={handleClick}
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
// >
//   <CardHeader className="p-0 relative">
//     <ProductImage 
//       src={product.image} 
//       alt={product.name}
//       className="aspect-square object-cover rounded-t-lg"
//     />
//     {product.stock <= 5 && (
//       <StockBadge 
//         stock={product.stock} 
//         variant={product.stock === 0 ? 'danger' : 'warning'}
//       />
//     )}
//     {isHovered && (
//       <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//         <PlusIcon className="w-12 h-12 text-white" />
//       </div>
//     )}
//   </CardHeader>
//   <CardContent className="p-3">
//     <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
//     <div className="flex items-center justify-between mt-2">
//       <span className="font-bold text-uniq-primary">
//         {formatCurrency(product.price)}
//       </span>
//       <span className="text-xs text-muted-foreground">
//         {product.stock} disp.
//       </span>
//     </div>
//   </CardContent>
// </Card>
```

#### **CategoryFilter** (`category-filter.tsx`)

```typescript
interface CategoryFilterProps {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

// Estados internos:
// - isCollapsed: boolean (mobile)

// JSX Estruturado:
// <div className="w-64 bg-white border-r h-full">
//   <div className="p-4 border-b">
//     <h2 className="font-semibold">Categorias</h2>
//   </div>
//   <ScrollArea className="h-[calc(100vh-200px)]">
//     <div className="p-2 space-y-1">
//       <CategoryButton
//         active={selectedId === null}
//         onClick={() => onSelect(null)}
//         icon="LayoutGrid"
//         label="Todas"
//         count={categories.reduce((acc, c) => acc + c.count, 0)}
//       />
//       <Separator />
//       {categories.map(category => (
//         <CategoryButton
//           key={category.id}
//           active={selectedId === category.id}
//           onClick={() => onSelect(category.id)}
//           icon={category.icon}
//           label={category.name}
//           count={category.count}
//           color={category.color}
//         />
//       ))}
//     </div>
//   </ScrollArea>
// </div>
```

### 4.2 Carrinho - Componentes (`components/pdv/cart/`)

#### **CartPanel** (`cart-panel.tsx`)

```typescript
interface CartPanelProps {
  items: CartItemPDV[];
  summary: CartPDV;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
  onCheckout: () => void;
  onApplyDiscount: () => void;
}

// Estados internos:
// - itemToRemove: string | null (para confirmação)
// - isClearing: boolean

// Handlers:
// - handleQuantityChange: (id, qty) => void
// - handleRemove: (id) => void
// - handleClear: () => void (com confirmação)
// - handleCheckout: () => void

// JSX Estruturado:
// <Sheet open={isOpen} onOpenChange={onClose}>
//   <SheetContent side="right" className="w-full sm:max-w-lg">
//     <SheetHeader>
//       <SheetTitle className="flex items-center justify-between">
//         <span>Carrinho ({summary.itemCount} itens)</span>
//         {items.length > 0 && (
//           <Button variant="ghost" size="sm" onClick={handleClear}>
//             <TrashIcon className="w-4 h-4 mr-2" />
//             Limpar (F8)
//           </Button>
//         )}
//       </SheetTitle>
//     </SheetHeader>
//     
//     <ScrollArea className="flex-1 my-4 h-[calc(100vh-350px)]">
//       {items.length === 0 ? (
//         <EmptyCart />
//       ) : (
//         <div className="space-y-3">
//           {items.map(item => (
//             <CartItem 
//               key={item.id}
//               item={item}
//               onUpdateQuantity={handleQuantityChange}
//               onRemove={handleRemove}
//             />
//           ))}
//         </div>
//       )}
//     </ScrollArea>
//     
//     {items.length > 0 && (
//       <CartSummary 
//         summary={summary}
//         onApplyDiscount={onApplyDiscount}
//         onCheckout={handleCheckout}
//       />
//     )}
//   </SheetContent>
// </Sheet>
```

#### **CartItem** (`cart-item.tsx`)

```typescript
interface CartItemProps {
  item: CartItemPDV;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

// Estados internos:
// - isHovered: boolean

// JSX Estruturado:
// <div 
//   className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
//   onMouseEnter={() => setIsHovered(true)}
//   onMouseLeave={() => setIsHovered(false)}
// >
//   <ProductImage src={item.image} className="w-16 h-16 rounded" />
//   
//   <div className="flex-1 min-w-0">
//     <h4 className="font-medium text-sm truncate">{item.name}</h4>
//     <p className="text-sm text-muted-foreground">
//       {formatCurrency(item.price)} un.
//     </p>
//   </div>
//   
//   <QuantityControl
//     value={item.quantity}
//     min={1}
//     max={item.stock}
//     onChange={onUpdateQuantity}
//   />
//   
//   <div className="text-right min-w-[80px]">
//     <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
//   </div>
//   
//   <Button
//     variant="ghost"
//     size="icon"
//     className={cn(
//       "opacity-0 group-hover:opacity-100 transition-opacity",
//       "text-destructive hover:text-destructive"
//     )}
//     onClick={onRemove}
//   >
//     <XIcon className="w-4 h-4" />
//   </Button>
// </div>
```

#### **QuantityControl** (`quantity-control.tsx`)

```typescript
interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

// Estados internos:
// - inputValue: string (para edição manual)

// Handlers:
// - handleDecrement: () => void
// - handleIncrement: () => void
// - handleInputChange: (e) => void
// - handleInputBlur: () => void

// JSX Estruturado:
// <div className="flex items-center gap-1">
//   <Button
//     variant="outline"
//     size="icon"
//     className="h-8 w-8"
//     onClick={handleDecrement}
//     disabled={value <= min}
//   >
//     <MinusIcon className="w-4 h-4" />
//   </Button>
//   
//   <Input
//     type="number"
//     value={inputValue}
//     onChange={handleInputChange}
//     onBlur={handleInputBlur}
//     className="h-8 w-14 text-center"
//     min={min}
//     max={max}
//   />
//   
//   <Button
//     variant="outline"
//     size="icon"
//     className="h-8 w-8"
//     onClick={handleIncrement}
//     disabled={value >= max}
//   >
//     <PlusIcon className="w-4 h-4" />
//   </Button>
// </div>
```

#### **CartSummary** (`cart-summary.tsx`)

```typescript
interface CartSummaryProps {
  summary: CartPDV;
  onApplyDiscount: () => void;
  onCheckout: () => void;
}

// JSX Estruturado:
// <div className="border-t pt-4 space-y-3">
//   <div className="space-y-2 text-sm">
//     <div className="flex justify-between">
//       <span>Subtotal</span>
//       <span>{formatCurrency(summary.subtotal)}</span>
//     </div>
//     
//     {summary.discount > 0 && (
//       <div className="flex justify-between text-green-600">
//         <span>Desconto</span>
//         <span>-{formatCurrency(summary.discount)}</span>
//       </div>
//     )}
//     
//     <Separator />
//     
//     <div className="flex justify-between text-lg font-bold">
//       <span>TOTAL</span>
//       <span className="text-uniq-accent">{formatCurrency(summary.total)}</span>
//     </div>
//   </div>
//   
//   <div className="grid grid-cols-2 gap-2">
//     <Button variant="outline" onClick={onApplyDiscount}>
//       <TagIcon className="w-4 h-4 mr-2" />
//       Desconto (F7)
//     </Button>
//     <Button onClick={onCheckout} className="bg-uniq-accent hover:bg-uniq-accent/90">
//       <ShoppingCartIcon className="w-4 h-4 mr-2" />
//       Finalizar (F12)
//     </Button>
//   </div>
// </div>
```

### 4.3 Checkout - Componentes (`components/pdv/checkout/`)

#### **CheckoutModal** (`checkout-modal.tsx`)

```typescript
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartPDV;
  onComplete: (sale: Partial<Sale>) => void;
}

// Estados internos:
// - step: 'summary' | 'payment' | 'customer' | 'confirm'
// - selectedPayments: Payment[]
// - selectedCustomer: Customer | null
// - isProcessing: boolean
// - showSuccess: boolean

// Efeitos:
// - useEffect: calcula total pago quando payments mudam
// - useEffect: bloqueia scroll do body quando aberto

// Handlers:
// - handlePaymentSelect: (method) => void
// - handleCustomerSelect: (customer) => void
// - handleComplete: () => void

// JSX Estruturado:
// <Dialog open={isOpen} onOpenChange={onClose}>
//   <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//     <DialogHeader>
//       <DialogTitle>Checkout - Finalizar Venda</DialogTitle>
//     </DialogHeader>
//     
//     {showSuccess ? (
//       <SuccessAnimation onNewSale={handleNewSale} />
//     ) : (
//       <div className="grid grid-cols-2 gap-6">
//         {/* Coluna Esquerda - Resumo */}
//         <div className="space-y-4">
//           <SaleSummary cart={cart} />
//           <CustomerSearch 
//             value={selectedCustomer}
//             onChange={handleCustomerSelect}
//           />
//         </div>
//         
//         {/* Coluna Direita - Pagamento */}
//         <div className="space-y-4">
//           <PaymentMethods
//             selected={selectedPayments}
//             onChange={handlePaymentSelect}
//             total={cart.total}
//           />
//           
//           {selectedPayments.map(payment => (
//             <PaymentDetails 
//               key={payment.id}
//               payment={payment}
//               onUpdate={handlePaymentUpdate}
//             />
//           ))}
//         </div>
//       </div>
//     )}
//     
//     <DialogFooter>
//       {!showSuccess && (
//         <>
//           <Button variant="outline" onClick={onClose}>
//             Cancelar
//           </Button>
//           <Button 
//             onClick={handleComplete}
//             disabled={!canComplete || isProcessing}
//             className="bg-uniq-accent"
//           >
//             {isProcessing ? <Spinner /> : 'Finalizar Venda'}
//           </Button>
//         </>
//       )}
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
```

#### **PaymentMethods** (`payment-methods.tsx`)

```typescript
interface PaymentMethodsProps {
  selected: Payment[];
  onChange: (payments: Payment[]) => void;
  total: number;
}

// Estados internos:
// - activeMethod: PaymentMethodType | null

// Handlers:
// - handleSelect: (method) => void
// - handleRemove: (paymentId) => void

// JSX Estruturado:
// <div className="grid grid-cols-2 gap-3">
//   {paymentMethodsConfig.map(method => {
//     const isSelected = selected.some(p => p.method === method.id);
//     const totalPaid = selected
//       .filter(p => p.method === method.id)
//       .reduce((acc, p) => acc + p.amount, 0);
//     
//     return (
//       <Button
//         key={method.id}
//         variant={isSelected ? 'default' : 'outline'}
//         className={cn(
//           "h-24 flex flex-col items-center justify-center gap-2",
//           isSelected && "bg-uniq-primary border-uniq-primary"
//         )}
//         onClick={() => handleSelect(method.id)}
//       >
//         <Icon name={method.icon} className="w-8 h-8" />
//         <span className="text-sm font-medium">{method.name}</span>
//         {isSelected && totalPaid > 0 && (
//           <span className="text-xs">
//             {formatCurrency(totalPaid)}
//           </span>
//         )}
//       </Button>
//     );
//   })}
// </div>
```

#### **CashPayment** (`cash-payment.tsx`)

```typescript
interface CashPaymentProps {
  total: number;
  onChange: (payment: Payment) => void;
}

// Estados internos:
// - received: number
// - change: number

// Efeitos:
// - useEffect: recalcula troco quando received muda

// Handlers:
// - handleReceivedChange: (value) => void
// - handlePresetClick: (value) => void

// JSX Estruturado:
// <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
//   <h4 className="font-medium">Pagamento em Dinheiro</h4>
//   
//   <div className="space-y-2">
//     <Label>Valor Recebido</Label>
//     <Input
//       type="number"
//       value={received}
//       onChange={(e) => handleReceivedChange(Number(e.target.value))}
//       placeholder="0,00"
//     />
//   </div>
//   
//   <div className="flex gap-2">
//     {[10, 20, 50, 100, 200].map(value => (
//       <Button
//         key={value}
//         variant="outline"
//         size="sm"
//         onClick={() => handlePresetClick(value)}
//       >
//         +{formatCurrency(value)}
//       </Button>
//     ))}
//   </div>
//   
//   {received > 0 && (
//     <div className="pt-4 border-t">
//       <div className="flex justify-between text-sm">
//         <span>Total da compra:</span>
//         <span>{formatCurrency(total)}</span>
//       </div>
//       <div className="flex justify-between text-lg font-bold">
//         <span>Troco:</span>
//         <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
//           {formatCurrency(change)}
//         </span>
//       </div>
//       {change < 0 && (
//         <p className="text-sm text-red-600 mt-2">
//           Valor insuficiente!
//         </p>
//       )}
//     </div>
//   )}
// </div>
```

#### **CustomerSearch** (`customer-search.tsx`)

```typescript
interface CustomerSearchProps {
  value: Customer | null;
  onChange: (customer: Customer | null) => void;
  customers?: Customer[];
}

// Estados internos:
// - searchTerm: string
// - isOpen: boolean
// - filteredCustomers: Customer[]

// Handlers:
// - handleSearch: (term) => void
// - handleSelect: (customer) => void
// - handleClear: () => void

// JSX Estruturado:
// <div className="space-y-2">
//   <Label>Cliente</Label>
//   
//   {value ? (
//     <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//       <Avatar>
//         <AvatarFallback>{value.name.charAt(0)}</AvatarFallback>
//       </Avatar>
//       <div className="flex-1">
//         <p className="font-medium">{value.name}</p>
//         <p className="text-sm text-muted-foreground">{value.phone}</p>
//       </div>
//       <Button variant="ghost" size="sm" onClick={handleClear}>
//         <XIcon className="w-4 h-4" />
//       </Button>
//     </div>
//   ) : (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild>
//         <Input
//           placeholder="Buscar por nome, telefone ou CPF (F3)..."
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </PopoverTrigger>
//       <PopoverContent className="w-80 p-0">
//         <Command>
//           <CommandList>
//             {filteredCustomers.map(customer => (
//               <CommandItem
//                 key={customer.id}
//                 onSelect={() => handleSelect(customer)}
//               >
//                 <UserIcon className="w-4 h-4 mr-2" />
//                 <div>
//                   <p>{customer.name}</p>
//                   <p className="text-xs text-muted-foreground">
//                     {customer.phone}
//                   </p>
//                 </div>
//               </CommandItem>
//             ))}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   )}
//   
//   {!value && (
//     <Button variant="link" size="sm" onClick={() => onChange(null)}>
//       Cliente não identificado
//     </Button>
//   )}
// </div>
```

#### **SuccessAnimation** (`success-animation.tsx`)

```typescript
interface SuccessAnimationProps {
  sale: Sale;
  onNewSale: () => void;
  onPrint: () => void;
}

// Estados internos:
// - showConfetti: boolean
// - showReceipt: boolean

// Efeitos:
// - useEffect: dispara confetti no mount
// - useEffect: timer para mostrar botões

// JSX Estruturado:
// <div className="flex flex-col items-center justify-center py-12 space-y-6">
//   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
//     <CheckIcon className="w-12 h-12 text-green-600" />
//   </div>
//   
//   <div className="text-center space-y-2">
//     <h3 className="text-2xl font-bold text-green-600">Venda Concluída!</h3>
//     <p className="text-muted-foreground">
//       Venda #{sale.number} finalizada com sucesso.
//     </p>
//     <p className="text-3xl font-bold">
//       {formatCurrency(sale.total)}
//     </p>
//   </div>
//   
//   <div className="flex gap-3">
//     <Button variant="outline" onClick={onPrint}>
//       <PrinterIcon className="w-4 h-4 mr-2" />
//       Imprimir Cupom
//     </Button>
//     <Button onClick={onNewSale} className="bg-uniq-accent">
//       <PlusIcon className="w-4 h-4 mr-2" />
//       Nova Venda
//     </Button>
//   </div>
//   
//   {showReceipt && <ReceiptPreview sale={sale} />}
// </div>
```

### 4.4 Caixa - Componentes (`components/pdv/caixa/`)

#### **CaixaStatus** (`caixa-status.tsx`)

```typescript
interface CaixaStatusProps {
  caixa: Caixa;
  onOpenCaixa: () => void;
  onSangria: () => void;
  onSuprimento: () => void;
  onFechar: () => void;
}

// JSX Estruturado:
// <Card className={cn(
//   "border-l-4",
//   caixa.status === 'aberto' ? 'border-l-green-500' : 'border-l-red-500'
// )}>
//   <CardHeader>
//     <div className="flex items-center justify-between">
//       <div>
//         <CardTitle className="flex items-center gap-2">
//           {caixa.status === 'aberto' ? (
//             <>
//               <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
//               Caixa Aberto
//             </>
//           ) : (
//             <>
//               <span className="w-3 h-3 bg-red-500 rounded-full" />
//               Caixa Fechado
//             </>
//           )}
//         </CardTitle>
//         <CardDescription>
//           Operador: {caixa.currentOperator}
//         </CardDescription>
//       </div>
//       <div className="text-right">
//         <p className="text-2xl font-bold">
//           {formatCurrency(caixa.currentBalance)}
//         </p>
//         <p className="text-sm text-muted-foreground">Saldo atual</p>
//       </div>
//     </div>
//   </CardHeader>
//   
//   {caixa.status === 'aberto' && (
//     <CardFooter className="flex gap-2">
//       <Button variant="outline" onClick={onSangria}>
//         <ArrowDownIcon className="w-4 h-4 mr-2" />
//         Sangria
//       </Button>
//       <Button variant="outline" onClick={onSuprimento}>
//         <ArrowUpIcon className="w-4 h-4 mr-2" />
//         Suprimento
//       </Button>
//       <Button variant="destructive" onClick={onFechar}>
//         <LockIcon className="w-4 h-4 mr-2" />
//         Fechar Caixa
//       </Button>
//     </CardFooter>
//   )}
// </Card>
```

#### **AberturaForm** (`abertura-form.tsx`)

```typescript
interface AberturaFormProps {
  onSubmit: (data: AberturaFormData) => void;
  onCancel: () => void;
  defaultOperator?: string;
}

interface AberturaFormData {
  openingAmount: number;
  operatorName: string;
  observations?: string;
}

// Estados internos (React Hook Form):
// - register, handleSubmit, formState: { errors }

// JSX Estruturado:
// <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//   <div>
//     <Label>Valor de Abertura</Label>
//     <Input
//       type="number"
//       step="0.01"
//       {...register('openingAmount', { required: true, min: 0 })}
//     />
//     {errors.openingAmount && <ErrorMessage>Valor obrigatório</ErrorMessage>}
//   </div>
//   
//   <div>
//     <Label>Operador</Label>
//     <Input {...register('operatorName', { required: true })} />
//   </div>
//   
//   <div>
//     <Label>Observações</Label>
//     <Textarea {...register('observations')} />
//   </div>
//   
//   <div className="flex gap-2">
//     <Button type="button" variant="outline" onClick={onCancel}>
//       Cancelar
//     </Button>
//     <Button type="submit" className="bg-uniq-accent">
//       Abrir Caixa
//     </Button>
//   </div>
// </form>
```

### 4.5 Relatórios - Componentes (`components/pdv/relatorios/`)

#### **VendasFilter** (`vendas-filter.tsx`)

```typescript
interface VendasFilterProps {
  filters: CaixaFilters;
  onChange: (filters: CaixaFilters) => void;
}

const presets = [
  { label: 'Hoje', value: 'today' },
  { label: 'Ontem', value: 'yesterday' },
  { label: 'Últimos 7 dias', value: 'week' },
  { label: 'Este mês', value: 'month' },
  { label: 'Customizado', value: 'custom' }
];

// Estados internos:
// - selectedPreset: string

// JSX Estruturado:
// <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg">
//   <div className="flex gap-2">
//     {presets.map(preset => (
//       <Button
//         key={preset.value}
//         variant={selectedPreset === preset.value ? 'default' : 'outline'}
//         size="sm"
//         onClick={() => handlePresetSelect(preset.value)}
//       >
//         {preset.label}
//       </Button>
//     ))}
//   </div>
//   
//   {filters.period === 'custom' && (
//     <div className="flex items-center gap-2">
//       <DatePicker
//         value={filters.from}
//         onChange={(date) => handleDateChange('from', date)}
//       />
//       <span>até</span>
//       <DatePicker
//         value={filters.to}
//         onChange={(date) => handleDateChange('to', date)}
//       />
//     </div>
//   )}
// </div>
```

#### **ResumoCards** (`resumo-cards.tsx`)

```typescript
interface ResumoCardsProps {
  summary: SalesSummary;
}

// JSX Estruturado:
// <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//   <Card>
//     <CardHeader className="pb-2">
//       <CardDescription>Total em Vendas</CardDescription>
//       <CardTitle className="text-3xl text-uniq-accent">
//         {formatCurrency(summary.totalAmount)}
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       <p className="text-sm text-muted-foreground">
//         {summary.totalSales} vendas
//       </p>
//     </CardContent>
//   </Card>
//   
//   <Card>
//     <CardHeader className="pb-2">
//       <CardDescription>Ticket Médio</CardDescription>
//       <CardTitle className="text-3xl">
//         {formatCurrency(summary.averageTicket)}
//       </CardTitle>
//     </CardHeader>
//   </Card>
//   
//   <Card>
//     <CardHeader className="pb-2">
//       <CardDescription>Itens Vendidos</CardDescription>
//       <CardTitle className="text-3xl">
//         {summary.totalItems}
//       </CardTitle>
//     </CardHeader>
//   </Card>
//   
//   <Card>
//     <CardHeader className="pb-2">
//       <CardDescription>Descontos</CardDescription>
//       <CardTitle className="text-3xl text-red-500">
//         {formatCurrency(summary.totalDiscount)}
//       </CardTitle>
//     </CardHeader>
//   </Card>
// </div>
```

#### **ProdutosChart** (`produtos-chart.tsx`)

```typescript
interface ProdutosChartProps {
  data: TopSellingProduct[];
}

// JSX Estruturado:
// <Card>
//   <CardHeader>
//     <CardTitle>Produtos Mais Vendidos</CardTitle>
//   </CardHeader>
//   <CardContent>
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
//         <YAxis />
//         <Tooltip 
//           formatter={(value: number) => formatCurrency(value)}
//         />
//         <Bar dataKey="totalAmount" fill="#3e5653" radius={[4, 4, 0, 0]}>
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Bar>
//       </BarChart>
//     </ResponsiveContainer>
//   </CardContent>
// </Card>
```

---

## 5. Hooks Customizados

### 5.1 Hook Principal do PDV (`hooks/use-pdv.ts`)

```typescript
import { useState, useCallback, useMemo, useEffect } from 'react';
import { PDVProduct, CartItemPDV, CartPDV, Customer } from '@/types/pdv';
import { Payment, PaymentMethodType } from '@/types/payment';
import { Sale, SaleStatus } from '@/types/venda';
import { Caixa } from '@/types/caixa';
import { toast } from '@/hooks/use-toast';
import { mockPDVProducts, mockCustomers } from '@/lib/mocks/pdv-products';
import { mockCaixa } from '@/lib/mocks/pdv-sales';
import { v4 as uuidv4 } from 'uuid';

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
  completeSale: () => Promise<void>;
  
  // Caixa
  caixa: Caixa;
  
  // UI
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  recentProducts: PDVProduct[];
}

export function usePDV(): UsePDVReturn {
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
        variant: 'destructive'
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
            variant: 'destructive'
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
        id: uuidv4(),
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
  }, []);

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
  }, []);

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
  }, []);

  // Finalizar venda
  const completeSale = useCallback(async () => {
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sale: Partial<Sale> = {
      number: `001${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      status: SaleStatus.CONCLUIDA,
      origin: 'pdv',
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
  }, [cartItems, cart, selectedPayments, selectedCustomer, caixa, clearCart]);

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

// Helper para formatar moeda
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
```

### 5.2 Hook de Atalhos de Teclado (`hooks/use-keyboard-shortcuts.ts`)

```typescript
import { useEffect, useCallback } from 'react';

export interface KeyboardShortcuts {
  'F1': () => void;  // Ajuda
  'F2': () => void;  // Buscar
  'F3': () => void;  // Cliente
  'F4': () => void;  // Desconto
  'F5': () => void;  // Atualizar
  'F6': () => void;  // Pagamento misto
  'F7': () => void;  // Desconto rápido
  'F8': () => void;  // Limpar carrinho
  'F9': () => void;  // Caixa
  'F10': () => void; // Relatórios
  'F11': () => void; // Tela cheia
  'F12': () => void; // Finalizar
}

export function useKeyboardShortcuts(shortcuts: Partial<KeyboardShortcuts>) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Verificar se é um atalho F1-F12
    if (!event.key.startsWith('F')) return;
    
    // Não interceptar se estiver em um input/textarea (exceto F2)
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    
    if (isInput && event.key !== 'F2') return;
    
    const handler = shortcuts[event.key as keyof KeyboardShortcuts];
    
    if (handler) {
      event.preventDefault();
      handler();
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
```

---

## 6. Contextos

### 6.1 Contexto do PDV (`contexts/pdv-context.tsx`)

```typescript
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UsePDVReturn, usePDV } from '@/hooks/use-pdv';

const PDVContext = createContext<UsePDVReturn | undefined>(undefined);

export function PDVProvider({ children }: { children: ReactNode }) {
  const pdv = usePDV();
  
  return (
    <PDVContext.Provider value={pdv}>
      {children}
    </PDVContext.Provider>
  );
}

export function usePDVContext() {
  const context = useContext(PDVContext);
  if (context === undefined) {
    throw new Error('usePDVContext must be used within a PDVProvider');
  }
  return context;
}
```

---

## 7. Dependências

### 7.1 Dependências Já Instaladas (verificar package.json)

As seguintes dependências já estão instaladas no projeto:

```json
{
  "@hookform/resolvers": "^5.2.2",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.400.0",
  "react-hook-form": "^7.71.2",
  "recharts": "^3.8.0",
  "zod": "^4.3.6"
}
```

### 7.2 Novas Dependências para Instalar

```bash
# Navegação por comandos (para autocomplete)
npm install cmdk

# Formatação de números/moeda em inputs
npm install react-number-format

# Animação de confetti para sucesso
npm install canvas-confetti
npm install @types/canvas-confetti --save-dev

# UUID para gerar IDs únicos
npm install uuid
npm install @types/uuid --save-dev
```

### 7.3 Instalação Completa

```bash
npm install cmdk react-number-format canvas-confetti uuid
npm install @types/canvas-confetti @types/uuid --save-dev
```

---

## 8. Schemas de Validação (Zod)

### 8.1 Schema de Checkout (`lib/schemas/checkout-schema.ts`)

```typescript
import { z } from 'zod';
import { PaymentMethodType } from '@/types/payment';

export const paymentSchema = z.object({
  method: z.nativeEnum(PaymentMethodType),
  amount: z.number().positive('Valor deve ser positivo'),
  brand: z.string().optional(),
  installments: z.number().min(1).max(12).optional(),
  receivedAmount: z.number().optional(),
  change: z.number().optional()
});

export const checkoutSchema = z.object({
  payments: z.array(paymentSchema).min(1, 'Selecione pelo menos uma forma de pagamento'),
  customerId: z.number().optional(),
  notes: z.string().optional()
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
```

### 8.2 Schema de Caixa (`lib/schemas/caixa-schema.ts`)

```typescript
import { z } from 'zod';

export const aberturaSchema = z.object({
  openingAmount: z.number().min(0, 'Valor não pode ser negativo'),
  operatorName: z.string().min(1, 'Nome do operador é obrigatório'),
  observations: z.string().optional()
});

export const sangriaSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  reason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres'),
  supervisorPassword: z.string().min(1, 'Senha do supervisor é obrigatória')
});

export const suprimentoSchema = z.object({
  amount: z.number().positive('Valor deve ser positivo'),
  reason: z.string().min(5, 'Motivo deve ter pelo menos 5 caracteres')
});

export const fechamentoSchema = z.object({
  cashAmount: z.number().min(0),
  cardAmount: z.number().min(0),
  pixAmount: z.number().min(0),
  observations: z.string().optional(),
  supervisorPassword: z.string().min(1, 'Senha do supervisor é obrigatória')
});

export type AberturaFormData = z.infer<typeof aberturaSchema>;
export type SangriaFormData = z.infer<typeof sangriaSchema>;
export type SuprimentoFormData = z.infer<typeof suprimentoSchema>;
export type FechamentoFormData = z.infer<typeof fechamentoSchema>;
```

---

## 9. Checklist de Implementação

### 9.1 Fase 1: Setup e Fundação (Dias 1-2)

- [ ] **1.1** Instalar dependências adicionais
  ```bash
  npm install cmdk react-number-format canvas-confetti uuid
  npm install @types/canvas-confetti @types/uuid --save-dev
  ```

- [ ] **1.2** Criar estrutura de diretórios
  ```
  mkdir -p app/pdv/caixa app/pdv/relatorios app/pdv/historico
  mkdir -p components/pdv/main components/pdv/cart components/pdv/checkout
  mkdir -p components/pdv/caixa components/pdv/relatorios components/pdv/shared
  mkdir -p hooks contexts types/lib/schemas types/lib/mocks
  ```

- [ ] **1.3** Criar tipos TypeScript
  - [ ] `types/pdv.ts` - Produtos, Carrinho, Clientes
  - [ ] `types/payment.ts` - Pagamentos
  - [ ] `types/venda.ts` - Vendas
  - [ ] `types/caixa.ts` - Caixa

- [ ] **1.4** Criar mocks completos
  - [ ] `lib/mocks/pdv-products.ts` - 20+ produtos
  - [ ] `lib/mocks/pdv-sales.ts` - Vendas, caixa, relatórios
  - [ ] `lib/mocks/index.ts` - Exportações

- [ ] **1.5** Criar schemas Zod
  - [ ] `lib/schemas/checkout-schema.ts`
  - [ ] `lib/schemas/caixa-schema.ts`

- [ ] **1.6** Criar hooks base
  - [ ] `hooks/use-pdv.ts` - Hook principal
  - [ ] `hooks/use-keyboard-shortcuts.ts`

- [ ] **1.7** Criar contexto
  - [ ] `contexts/pdv-context.tsx`

### 9.2 Fase 2: Tela Principal do PDV (Dias 3-4)

- [ ] **2.1** Componentes da tela principal
  - [ ] `components/pdv/main/pdv-header.tsx`
  - [ ] `components/pdv/main/search-bar.tsx`
  - [ ] `components/pdv/main/category-filter.tsx`
  - [ ] `components/pdv/main/product-grid.tsx`
  - [ ] `components/pdv/main/product-card.tsx`
  - [ ] `components/pdv/main/recent-products.tsx`
  - [ ] `components/pdv/main/keyboard-shortcuts.tsx`

- [ ] **2.2** Componentes do carrinho
  - [ ] `components/pdv/cart/cart-panel.tsx`
  - [ ] `components/pdv/cart/cart-item.tsx`
  - [ ] `components/pdv/cart/cart-summary.tsx`
  - [ ] `components/pdv/cart/quantity-control.tsx`
  - [ ] `components/pdv/cart/empty-cart.tsx`
  - [ ] `components/pdv/cart/discount-modal.tsx`

- [ ] **2.3** Página principal
  - [ ] `app/pdv/page.tsx`
  - [ ] `app/pdv/layout.tsx` (layout sem sidebar)

- [ ] **2.4** Testes visuais
  - [ ] Busca de produtos funciona
  - [ ] Filtro por categoria funciona
  - [ ] Adicionar ao carrinho funciona
  - [ ] Alterar quantidades funciona
  - [ ] Remover itens funciona
  - [ ] Limpar carrinho funciona
  - [ ] Atalhos F1-F12 funcionam

### 9.3 Fase 3: Checkout (Dias 5-6)

- [ ] **3.1** Componentes de checkout
  - [ ] `components/pdv/checkout/checkout-modal.tsx`
  - [ ] `components/pdv/checkout/payment-methods.tsx`
  - [ ] `components/pdv/checkout/cash-payment.tsx`
  - [ ] `components/pdv/checkout/card-payment.tsx`
  - [ ] `components/pdv/checkout/pix-payment.tsx`
  - [ ] `components/pdv/checkout/mixed-payment.tsx`
  - [ ] `components/pdv/checkout/customer-search.tsx`
  - [ ] `components/pdv/checkout/sale-summary.tsx`
  - [ ] `components/pdv/checkout/success-animation.tsx`

- [ ] **3.2** Componentes compartilhados
  - [ ] `components/pdv/shared/receipt-preview.tsx`
  - [ ] `components/pdv/shared/shortcut-badge.tsx`

- [ ] **3.3** Testes visuais
  - [ ] Modal de checkout abre
  - [ ] Seleção de forma de pagamento funciona
  - [ ] Cálculo de troco (dinheiro) funciona
  - [ ] Busca de cliente funciona
  - [ ] Finalização com animação funciona
  - [ ] Carrinho é limpo após venda

### 9.4 Fase 4: Controle de Caixa (Dia 7)

- [ ] **4.1** Componentes de caixa
  - [ ] `components/pdv/caixa/caixa-status.tsx`
  - [ ] `components/pdv/caixa/abertura-form.tsx`
  - [ ] `components/pdv/caixa/sangria-form.tsx`
  - [ ] `components/pdv/caixa/suprimento-form.tsx`
  - [ ] `components/pdv/caixa/fechamento-form.tsx`
  - [ ] `components/pdv/caixa/historico-list.tsx`
  - [ ] `components/pdv/caixa/movimentacao-card.tsx`

- [ ] **4.2** Página de caixa
  - [ ] `app/pdv/caixa/page.tsx`

- [ ] **4.3** Testes visuais
  - [ ] Status do caixa visível
  - [ ] Formulário de abertura funciona
  - [ ] Formulário de sangria funciona
  - [ ] Formulário de suprimento funciona
  - [ ] Formulário de fechamento funciona
  - [ ] Histórico de movimentações visível

### 9.5 Fase 5: Relatórios (Dia 8)

- [ ] **5.1** Componentes de relatórios
  - [ ] `components/pdv/relatorios/vendas-filter.tsx`
  - [ ] `components/pdv/relatorios/vendas-table.tsx`
  - [ ] `components/pdv/relatorios/resumo-cards.tsx`
  - [ ] `components/pdv/relatorios/produtos-chart.tsx`
  - [ ] `components/pdv/relatorios/pagamentos-chart.tsx`
  - [ ] `components/pdv/relatorios/vendedores-table.tsx`
  - [ ] `components/pdv/relatorios/cancelamentos-list.tsx`

- [ ] **5.2** Página de relatórios
  - [ ] `app/pdv/relatorios/page.tsx`

- [ ] **5.3** Testes visuais
  - [ ] Filtros de período funcionam
  - [ ] Cards de resumo exibem corretamente
  - [ ] Tabela de vendas paginada
  - [ ] Gráficos renderizam
  - [ ] Performance por vendedor visível

### 9.6 Fase 6: Polimento e Testes (Dia 9-10)

- [ ] **6.1** Estados de UI
  - [ ] Loading states em todos os componentes
  - [ ] Empty states em todos os componentes
  - [ ] Error states implementados
  - [ ] Skeletons para loading

- [ ] **6.2** Acessibilidade
  - [ ] Navegação por teclado completa
  - [ ] ARIA labels em botões
  - [ ] Contraste de cores verificado
  - [ ] Focus visible implementado

- [ ] **6.3** Responsividade
  - [ ] Teste em desktop (>1024px)
  - [ ] Teste em tablet (768-1024px)
  - [ ] Teste em mobile (<768px)

- [ ] **6.4** Performance
  - [ ] Debounce na busca funcionando
  - [ ] Lazy loading de imagens
  - [ ] Memoização de cálculos

- [ ] **6.5** Testes finais
  - [ ] Fluxo completo de venda
  - [ ] Todos os atalhos F1-F12
  - [ ] Todos os formulários
  - [ ] Todos os gráficos

---

## 10. Notas Técnicas Importantes

### 10.1 Padrões de Código

1. **Nomenclatura de Componentes**: Sempre usar PascalCase para componentes React
2. **Nomenclatura de Hooks**: Sempre prefixar com `use` e usar camelCase
3. **Nomenclatura de Props**: Usar interface com sufixo `Props`
4. **Estilização**: Usar `cn()` do `lib/utils` para classes condicionais
5. **Cores UNIQ**: 
   - Primary: `#3e5653`
   - Accent: `#86cb92`
   - Usar `uniq-primary` e `uniq-accent` do tailwind.config

### 10.2 Performance

1. **useMemo**: Usar para cálculos pesados (total do carrinho, filtros)
2. **useCallback**: Usar para funções passadas como props
3. **React.memo**: Considerar para componentes que recebem muitas props
4. **Debounce**: 300ms para busca de produtos
5. **Virtualização**: Se grid tiver mais de 100 produtos, usar virtualização

### 10.3 Acessibilidade

1. **Atalhos**: F1-F12 devem funcionar mesmo com modais abertos
2. **Focus**: Após abrir modal, focar no primeiro campo
3. **Escape**: Fechar modais com tecla Escape
4. **ARIA**: Usar `aria-label` em botões sem texto
5. **Contraste**: Garantir 4.5:1 para textos

### 10.4 Estados de UI

1. **Loading**: Skeletons para cards e tabelas
2. **Empty**: Mensagens amigáveis com ícones
3. **Error**: Toasts para erros, não console
4. **Success**: Confetti para vendas concluídas
5. **Validation**: Mensagens próximas aos campos

---

## 11. Exemplos de Uso

### 11.1 Exemplo: Página Principal do PDV

```typescript
// app/pdv/page.tsx
'use client';

import { PDVProvider } from '@/contexts/pdv-context';
import { PDVHeader } from '@/components/pdv/main/pdv-header';
import { ProductGrid } from '@/components/pdv/main/product-grid';
import { CategoryFilter } from '@/components/pdv/main/category-filter';
import { CartPanel } from '@/components/pdv/cart/cart-panel';
import { CheckoutModal } from '@/components/pdv/checkout/checkout-modal';
import { KeyboardShortcuts } from '@/components/pdv/main/keyboard-shortcuts';
import { usePDVContext } from '@/contexts/pdv-context';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

function PDVContent() {
  const {
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
    isCartOpen,
    setIsCartOpen,
    completeSale,
    caixa,
    recentProducts
  } = usePDVContext();

  // Configurar atalhos de teclado
  useKeyboardShortcuts({
    'F2': () => document.getElementById('search-input')?.focus(),
    'F7': () => setIsDiscountModalOpen(true),
    'F8': () => clearCart(),
    'F9': () => router.push('/pdv/caixa'),
    'F10': () => router.push('/pdv/relatorios'),
    'F12': () => cart.items.length > 0 && setIsCheckoutOpen(true)
  });

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <PDVHeader
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        cartItemCount={cart.itemCount}
        onToggleCart={() => setIsCartOpen(true)}
        caixaStatus={caixa.status}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <CategoryFilter
          categories={mockCategories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            recentProducts={recentProducts}
          />
        </main>
      </div>
      
      <CartPanel
        items={cart.items}
        summary={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        onApplyDiscount={() => setIsDiscountModalOpen(true)}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onComplete={completeSale}
      />
    </div>
  );
}

export default function PDVPage() {
  return (
    <PDVProvider>
      <PDVContent />
    </PDVProvider>
  );
}
```

---

## 12. Referências

### 12.1 Links Úteis

- **PRD Original**: `tracking/plans/PRD-Sprint08-Vendas-PDV.md`
- **Design System**: `tailwind.config.ts`
- **Componentes UI**: `components/ui/`
- **Mocks Existentes**: `lib/mocks/`

### 12.2 Convenções do Projeto

- Estilos: Tailwind CSS
- Cores: `uniq-primary` (#3e5653), `uniq-accent` (#86cb92)
- Ícones: Lucide React
- Formulários: React Hook Form + Zod
- Gráficos: Recharts

---

**Documento gerado em:** 21/03/2026  
**Planner:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Status:** 🟢 PRONTO PARA IMPLEMENTAÇÃO

---

> ⚠️ **IMPORTANTE:** Este é um documento de especificação técnica (SPEC). Não contém código implementado. A implementação será realizada na FASE 03 por @vibe-implementer.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-implementer para desenvolvimento
> 3. Implementar seguindo este SPEC
> 4. Testar conforme checklist

> 📋 **CHECKLIST DE ENTREGA:**
> - [x] Estrutura de diretórios definida
> - [x] 20+ componentes especificados com interfaces
> - [x] Tipos TypeScript completos
> - [x] Mock data completo (20+ produtos)
> - [x] Hooks customizados definidos
> - [x] Contextos necessários especificados
> - [x] Dependências listadas
> - [x] Checklist de implementação detalhado
