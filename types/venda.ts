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
  number: string;
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
