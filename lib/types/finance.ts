// ============================================
// TIPOS BÁSICOS
// ============================================

export type TransactionStatus = 'pending' | 'paid' | 'overdue' | 'scheduled';
export type TransactionType = 'income' | 'expense';
export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer' | 'boleto';

// ============================================
// INTERFACES PRINCIPAIS
// ============================================

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  dueDate: string; // ISO date string
  status: TransactionStatus;
  category: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Receivable extends Transaction {
  type: 'income';
  client: string;
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  discount?: number;
  interest?: number;
}

export interface Payable extends Transaction {
  type: 'expense';
  supplier: string;
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  receiptUrl?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string; // Lucide icon name
  type: TransactionType;
}

export interface BankAccount {
  id: number;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment';
}

export interface CashFlowData {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface UpcomingBill {
  id: number;
  type: TransactionType;
  description: string;
  category: string;
  amount: number;
  dueIn: string;
  isUrgent: boolean;
}

export interface FinanceSummary {
  balance: number;
  toReceive: number;
  toPay: number;
  projected: number;
  previousMonthChange: number;
  receivableCount: number;
  payableCount: number;
  monthlyFlow: number;
}

// ============================================
// PROPS DE COMPONENTES
// ============================================

export interface FinanceCardProps {
  title: string;
  value: number;
  currency?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  subtitle?: string;
  alert?: string;
  isLoading?: boolean;
}

export interface StatusBadgeProps {
  status: TransactionStatus;
  label?: string;
  className?: string;
}

export interface CategoryBadgeProps {
  category: string;
  type: TransactionType;
  className?: string;
}

export interface TransactionTableProps<T extends Transaction> {
  data: T[];
  type: TransactionType;
  isLoading?: boolean;
  onReceive?: (id: number) => void;
  onPay?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export interface TransactionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  type: TransactionType;
}

export interface FilterState {
  period: string;
  status: TransactionStatus | 'all';
  category: string;
  search: string;
}

export interface ReceivableFormData {
  description: string;
  client: string;
  amount: number;
  dueDate: string;
  category: string;
  notes?: string;
}

export interface PayableFormData {
  description: string;
  supplier: string;
  amount: number;
  dueDate: string;
  category: string;
  notes?: string;
}

export interface ReceivePaymentData {
  id: number;
  paidDate: string;
  paymentMethod: PaymentMethod;
  accountId?: number;
  discount?: number;
  interest?: number;
}

export interface MakePaymentData {
  id: number;
  paidDate: string;
  paymentMethod: PaymentMethod;
  accountId?: number;
}
