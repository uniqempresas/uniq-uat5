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
  amount: number;
  brand?: CardBrand;
  installments?: number;
  installmentValue?: number;
  change?: number;
  receivedAmount?: number;
  transactionId?: string;
  qrCode?: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  processedAt?: string;
}

export interface PaymentMethodConfig {
  id: PaymentMethodType;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
  allowChange: boolean;
  maxInstallments?: number;
  requiresAuthorization?: boolean;
  fee?: number;
}

// ============================================
// PAGAMENTO MISTO
// ============================================

export interface MixedPayment {
  payments: Payment[];
  totalPaid: number;
  remaining: number;
  isComplete: boolean;
}
