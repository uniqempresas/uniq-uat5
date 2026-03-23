// ============================================
// STATUS E ENUMS
// ============================================

export type SupplierStatus = 'active' | 'inactive' | 'pending';
export type DocumentType = 'cnpj' | 'cpf';
export type BankAccountType = 'checking' | 'savings';
export type PixType = 'cnpj' | 'cpf' | 'email' | 'phone' | 'random';

// ============================================
// ENTIDADES PRINCIPAIS
// ============================================

export interface Supplier {
  id: string;
  name: string;
  legalName: string;
  document: string;
  documentType: DocumentType;
  category: string;
  rating: number;
  ratingCount: number;
  status: SupplierStatus;
  email?: string;
  phone?: string;
  address: Address;
  contacts: Contact[];
  bankAccounts: BankAccount[];
  paymentTerms?: string;
  notes?: string;
  logo?: string | null;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string | null;
  averageTicket: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Contact {
  id: string;
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  isPrimary: boolean;
}

export interface BankAccount {
  id: string;
  bank: string;
  bankName: string;
  agency: string;
  account: string;
  accountType: BankAccountType;
  pixKey?: string;
  pixType?: PixType;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

// ============================================
// TIPOS DE FORMULÁRIO
// ============================================

export interface SupplierFormData {
  name: string;
  legalName: string;
  document: string;
  documentType: DocumentType;
  category: string;
  rating: number;
  status: SupplierStatus;
  email?: string;
  phone?: string;
  address: Address;
  contacts: Contact[];
  bankAccounts: BankAccount[];
  paymentTerms?: string;
  notes?: string;
  logo?: string | null;
}

// ============================================
// TIPOS DE FILTROS
// ============================================

export interface SupplierFilters {
  search: string;
  category: string | null;
  status: SupplierStatus | 'all';
}

// ============================================
// PROPS DOS COMPONENTES
// ============================================

export interface SupplierCardProps {
  supplier: Supplier;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface SupplierGridProps {
  suppliers: Supplier[];
  loading?: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export interface SupplierFiltersProps {
  filters: SupplierFilters;
  onChange: (filters: SupplierFilters) => void;
  categories: Category[];
  statusCounts: {
    all: number;
    active: number;
    inactive: number;
    pending: number;
  };
}

export interface SupplierFormProps {
  initialData?: Supplier;
  onSubmit: (data: SupplierFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface SupplierDetailsDrawerProps {
  supplier: Supplier | null;
  open: boolean;
  onClose: () => void;
  onEdit: (id: string) => void;
}

export interface SupplierRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface ContactListProps {
  contacts: Contact[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onEdit: (contact: Contact) => void;
  onSetPrimary: (id: string) => void;
}

export interface BankAccountListProps {
  accounts: BankAccount[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onEdit: (account: BankAccount) => void;
  onSetPrimary: (id: string) => void;
}

export interface CEPSearchProps {
  value: string;
  onChange: (value: string) => void;
  onAddressFound: (address: Address) => void;
  onError: (error: string) => void;
}

export interface SupplierStatsProps {
  supplier: Supplier;
}

export interface PurchaseHistoryProps {
  supplierId: string;
}

// ============================================
// CEP
// ============================================

export interface CEPResult {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
}