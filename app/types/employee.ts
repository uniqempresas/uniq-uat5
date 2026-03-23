// ============================================
// ENUMS
// ============================================

export type EmployeeStatus = 'active' | 'inactive' | 'pending';

export type EmployeeRole = 'owner' | 'admin' | 'manager' | 'seller' | 'viewer';

export type ModulePermission = 'view' | 'create' | 'edit' | 'delete';

export type ModuleType = 'crm' | 'finance' | 'inventory' | 'sales' | 'store' | 'appointments' | 'settings';

// ============================================
// COLABORADOR
// ============================================

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: EmployeeRole;
  position?: string;
  avatar?: string;
  status: EmployeeStatus;
  lastAccess?: Date;
  modules: ModuleAccess[];
  createdAt: Date;
  updatedAt: Date;
  invitedAt?: Date;
  inviteExpiresAt?: Date;
}

// ============================================
// ACESSO POR MÓDULO
// ============================================

export interface ModuleAccess {
  module: ModuleType;
  permissions: ModulePermission[];
}

// ============================================
// PAPEL (ROLE)
// ============================================

export interface Role {
  id: string;
  name: EmployeeRole;
  label: string;
  description: string;
  defaultModules: ModuleType[];
  isSystem: boolean;
  icon: string;
  color: string;
}

// ============================================
// MÓDULO
// ============================================

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  icon: string;
  color: string;
}

// ============================================
// FORMULÁRIO
// ============================================

export interface EmployeeFormData {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  role: EmployeeRole;
  modules: ModuleAccess[];
  notifyByEmail: boolean;
  whatsappAccess: boolean;
}

export interface EmployeeFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
}

// ============================================
// FILTROS
// ============================================

export interface EmployeeFilters {
  search: string;
  status: EmployeeStatus | 'all';
  role: EmployeeRole | 'all';
  view: 'cards' | 'table';
}

// ============================================
// VIEW MODE (persistido)
// ============================================

export type ViewMode = 'cards' | 'table';

export const VIEW_MODE_STORAGE_KEY = 'uniq-employees-view-mode';
