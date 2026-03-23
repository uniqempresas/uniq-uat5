import { Receivable, Payable, CashFlowData, FinanceSummary, UpcomingBill, Category, BankAccount } from '@/lib/types/finance';

// ============================================
// SUMMARY
// ============================================

export const mockFinanceSummary: FinanceSummary = {
  balance: 15420.50,
  toReceive: 8500.00,
  toPay: 3200.00,
  projected: 20720.50,
  previousMonthChange: 12.5,
  receivableCount: 5,
  payableCount: 8,
  monthlyFlow: 11780.00
};

// ============================================
// CASH FLOW (30 dias)
// ============================================

export const mockCashFlow: CashFlowData[] = [
  { date: '2026-03-01', income: 3000, expense: 1500, balance: 1500 },
  { date: '2026-03-02', income: 2500, expense: 800, balance: 1700 },
  { date: '2026-03-03', income: 1800, expense: 1200, balance: 600 },
  { date: '2026-03-04', income: 4200, expense: 900, balance: 3300 },
  { date: '2026-03-05', income: 1500, expense: 2000, balance: -500 },
  { date: '2026-03-06', income: 3800, expense: 1100, balance: 2700 },
  { date: '2026-03-07', income: 2200, expense: 1400, balance: 800 },
  { date: '2026-03-08', income: 2900, expense: 1800, balance: 1100 },
  { date: '2026-03-09', income: 3500, expense: 1200, balance: 2300 },
  { date: '2026-03-10', income: 1800, expense: 2100, balance: -300 },
  { date: '2026-03-11', income: 4100, expense: 1500, balance: 2600 },
  { date: '2026-03-12', income: 2300, expense: 900, balance: 1400 },
  { date: '2026-03-13', income: 3200, expense: 1100, balance: 2100 },
  { date: '2026-03-14', income: 2800, expense: 1300, balance: 1500 },
  { date: '2026-03-15', income: 4500, expense: 2000, balance: 2500 },
  { date: '2026-03-16', income: 1900, expense: 1000, balance: 900 },
  { date: '2026-03-17', income: 3600, expense: 1400, balance: 2200 },
  { date: '2026-03-18', income: 2700, expense: 1800, balance: 900 },
  { date: '2026-03-19', income: 4200, expense: 1200, balance: 3000 },
  { date: '2026-03-20', income: 3100, expense: 1600, balance: 1500 },
  { date: '2026-03-21', income: 2400, expense: 1100, balance: 1300 },
  { date: '2026-03-22', income: 3800, expense: 1400, balance: 2400 },
  { date: '2026-03-23', income: 2900, expense: 1300, balance: 1600 },
  { date: '2026-03-24', income: 4300, expense: 1900, balance: 2400 },
  { date: '2026-03-25', income: 2100, expense: 1200, balance: 900 },
  { date: '2026-03-26', income: 3400, expense: 1500, balance: 1900 },
  { date: '2026-03-27', income: 2600, expense: 1000, balance: 1600 },
  { date: '2026-03-28', income: 3900, expense: 1700, balance: 2200 },
  { date: '2026-03-29', income: 2200, expense: 1400, balance: 800 },
  { date: '2026-03-30', income: 4100, expense: 1600, balance: 2500 },
  { date: '2026-03-31', income: 3300, expense: 1300, balance: 2000 },
];

// ============================================
// RECEIVABLES
// ============================================

export const mockReceivables: Receivable[] = [
  {
    id: 1,
    description: 'Venda #1234',
    client: 'João Silva',
    amount: 1200.00,
    dueDate: '2026-03-20',
    status: 'pending',
    category: 'Vendas',
    type: 'income',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 2,
    description: 'Serviço de Consultoria',
    client: 'Maria Santos',
    amount: 800.00,
    dueDate: '2026-03-18',
    status: 'paid',
    paidDate: '2026-03-15',
    paymentMethod: 'pix',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 3,
    description: 'Projeto Website',
    client: 'Empresa ABC Ltda',
    amount: 5000.00,
    dueDate: '2026-03-10',
    status: 'overdue',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 4,
    description: 'Mensalidade - Março',
    client: 'Cliente Recorrente',
    amount: 350.00,
    dueDate: '2026-03-25',
    status: 'pending',
    category: 'Assinatura',
    type: 'income',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 5,
    description: 'Venda Produtos',
    client: 'Carlos Mendes',
    amount: 950.00,
    dueDate: '2026-03-22',
    status: 'scheduled',
    category: 'Vendas',
    type: 'income',
    createdAt: '2026-03-12T10:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 6,
    description: 'Serviço de Design',
    client: 'Ana Paula Design',
    amount: 2500.00,
    dueDate: '2026-03-28',
    status: 'pending',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  }
];

// ============================================
// PAYABLES
// ============================================

export const mockPayables: Payable[] = [
  {
    id: 1,
    description: 'Aluguel Escritório',
    supplier: 'Imobiliária Central',
    amount: 2500.00,
    dueDate: '2026-03-12',
    status: 'pending',
    category: 'Aluguel',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 2,
    description: 'Energia Elétrica',
    supplier: 'CEMIG',
    amount: 890.00,
    dueDate: '2026-03-15',
    status: 'pending',
    category: 'Serviços',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 3,
    description: 'Internet Empresarial',
    supplier: 'Vivo Empresas',
    amount: 299.00,
    dueDate: '2026-03-20',
    status: 'paid',
    paidDate: '2026-03-18',
    paymentMethod: 'credit_card',
    category: 'Serviços',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-18T10:00:00Z'
  },
  {
    id: 4,
    description: 'Material de Escritório',
    supplier: 'Papelaria XYZ',
    amount: 450.00,
    dueDate: '2026-03-10',
    status: 'overdue',
    category: 'Compras',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 5,
    description: 'Fornecedor Produtos',
    supplier: 'Distribuidora ABC',
    amount: 1500.00,
    dueDate: '2026-03-25',
    status: 'pending',
    category: 'Fornecedor',
    type: 'expense',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 6,
    description: 'Salário - Funcionário 1',
    supplier: 'Funcionário',
    amount: 3500.00,
    dueDate: '2026-03-05',
    status: 'paid',
    paidDate: '2026-03-05',
    paymentMethod: 'bank_transfer',
    category: 'Funcionários',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 7,
    description: 'Imposto - ISS',
    supplier: 'Prefeitura',
    amount: 450.00,
    dueDate: '2026-03-20',
    status: 'scheduled',
    category: 'Impostos',
    type: 'expense',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  }
];

// ============================================
// UPCOMING BILLS
// ============================================

export const mockUpcomingBills: UpcomingBill[] = [
  {
    id: 1,
    type: 'expense',
    description: 'Aluguel Escritório',
    category: 'Imóvel',
    amount: 2500.00,
    dueIn: '2 dias',
    isUrgent: true
  },
  {
    id: 2,
    type: 'income',
    description: 'Venda #1234',
    category: 'ABC Ltda',
    amount: 3400.00,
    dueIn: '3 dias',
    isUrgent: false
  },
  {
    id: 3,
    type: 'expense',
    description: 'Fornecedor Produtos',
    category: 'Compra de materiais',
    amount: 890.00,
    dueIn: '5 dias',
    isUrgent: false
  },
  {
    id: 4,
    type: 'expense',
    description: 'Internet Empresarial',
    category: 'Serviços',
    amount: 299.00,
    dueIn: '7 dias',
    isUrgent: false
  },
  {
    id: 5,
    type: 'income',
    description: 'Projeto Website',
    category: 'Empresa ABC Ltda',
    amount: 5000.00,
    dueIn: 'Atrasado',
    isUrgent: true
  }
];

// ============================================
// CATEGORIES
// ============================================

export const mockCategories: {
  income: Category[];
  expense: Category[];
} = {
  income: [
    { id: 1, name: 'Vendas', color: '#86cb92', icon: 'ShoppingBag', type: 'income' },
    { id: 2, name: 'Serviços', color: '#3b82f6', icon: 'Briefcase', type: 'income' },
    { id: 3, name: 'Consultoria', color: '#8b5cf6', icon: 'Users', type: 'income' },
    { id: 4, name: 'Assinatura', color: '#f59e0b', icon: 'RefreshCw', type: 'income' },
    { id: 5, name: 'Outros', color: '#627271', icon: 'MoreHorizontal', type: 'income' }
  ],
  expense: [
    { id: 1, name: 'Aluguel', color: '#ef4444', icon: 'Home', type: 'expense' },
    { id: 2, name: 'Fornecedor', color: '#f97316', icon: 'Package', type: 'expense' },
    { id: 3, name: 'Serviços', color: '#3b82f6', icon: 'Zap', type: 'expense' },
    { id: 4, name: 'Funcionários', color: '#8b5cf6', icon: 'Users', type: 'expense' },
    { id: 5, name: 'Impostos', color: '#dc2626', icon: 'FileText', type: 'expense' },
    { id: 6, name: 'Compras', color: '#ec4899', icon: 'ShoppingCart', type: 'expense' }
  ]
};

// ============================================
// BANK ACCOUNTS
// ============================================

export const mockBankAccounts: BankAccount[] = [
  { id: 1, name: 'Conta Corrente - Bradesco', balance: 15420.50, type: 'checking' },
  { id: 2, name: 'Conta Poupança - Bradesco', balance: 8500.00, type: 'savings' },
  { id: 3, name: 'Investimentos - XP', balance: 25000.00, type: 'investment' }
];
