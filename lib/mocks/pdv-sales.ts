import { Sale, SalesSummary, TopSellingProduct, SellerPerformance } from '@/types/venda';
import { Caixa, CaixaMovimentacao } from '@/types/caixa';
import { PaymentMethodType, CardBrand } from '@/types/payment';
import { CaixaStatus, MovimentacaoType } from '@/types/caixa';
import { SaleStatus, SaleOrigin } from '@/types/venda';
import { mockSellers, mockCustomers } from './pdv-products';

// ============================================
// VENDAS MOCK
// ============================================

export const mockSales: Sale[] = [
  {
    id: 'sale-001',
    number: '001024',
    status: SaleStatus.CONCLUIDA,
    origin: SaleOrigin.PDV,
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
        brand: CardBrand.VISA,
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
    status: SaleStatus.CONCLUIDA,
    origin: SaleOrigin.PDV,
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
    status: SaleStatus.CONCLUIDA,
    origin: SaleOrigin.PDV,
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
    status: SaleStatus.CANCELADA,
    origin: SaleOrigin.PDV,
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
  status: CaixaStatus.ABERTO,
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
    type: MovimentacaoType.ABERTURA,
    amount: 200.00,
    description: 'Abertura de caixa - Início do expediente',
    timestamp: '2026-03-21T08:00:00',
    operator: 'Ana Silva'
  },
  {
    id: 'mov-002',
    caixaId: 'cx-001',
    type: MovimentacaoType.VENDA,
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
    type: MovimentacaoType.VENDA,
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
    type: MovimentacaoType.SANGRIA,
    amount: -50.00,
    description: 'Retirada para almoço do operador',
    timestamp: '2026-03-21T12:30:00',
    operator: 'Ana Silva',
    supervisorPassword: '****'
  },
  {
    id: 'mov-005',
    caixaId: 'cx-001',
    type: MovimentacaoType.SUPRIMENTO,
    amount: 100.00,
    description: 'Troco adicional para caixa',
    timestamp: '2026-03-21T13:00:00',
    operator: 'Ana Silva'
  },
  {
    id: 'mov-006',
    caixaId: 'cx-001',
    type: MovimentacaoType.VENDA,
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
    type: MovimentacaoType.ESTORNO,
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
