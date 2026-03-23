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
  currentBalance: number;
  expectedBalance: number;
  difference?: number;
  
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
  amount: number;
  description: string;
  timestamp: string;
  operator: string;
  supervisorPassword?: string;
  saleId?: string;
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
