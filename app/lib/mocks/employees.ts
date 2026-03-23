import { Employee, EmployeeStatus, EmployeeRole, ModuleAccess } from '@/types/employee';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    email: 'carlos@empresa.com',
    phone: '(11) 98765-4321',
    role: 'owner',
    position: 'Proprietário',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    lastAccess: new Date(Date.now() - 1000 * 60 * 30),
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'finance', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'inventory', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'sales', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'store', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'appointments', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'settings', permissions: ['view', 'create', 'edit', 'delete'] },
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@empresa.com',
    phone: '(11) 98765-1234',
    role: 'admin',
    position: 'Gerente Administrativa',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 2),
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'finance', permissions: ['view', 'create', 'edit', 'delete'] },
      { module: 'inventory', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create', 'edit'] },
      { module: 'appointments', permissions: ['view', 'create', 'edit'] },
    ],
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: '3',
    name: 'João Santos',
    email: 'joao@empresa.com',
    role: 'manager',
    position: 'Gerente de Vendas',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=joao',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create', 'edit'] },
      { module: 'inventory', permissions: ['view'] },
    ],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-07-01'),
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@empresa.com',
    role: 'seller',
    position: 'Vendedora',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    lastAccess: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    modules: [
      { module: 'crm', permissions: ['view', 'create', 'edit'] },
      { module: 'sales', permissions: ['view', 'create'] },
    ],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-08-15'),
  },
  {
    id: '5',
    name: 'Pedro Lima',
    email: 'pedro@empresa.com',
    role: 'viewer',
    position: 'Contador',
    status: 'pending',
    lastAccess: undefined,
    modules: [
      { module: 'finance', permissions: ['view'] },
      { module: 'sales', permissions: ['view'] },
    ],
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-01'),
    invitedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    inviteExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
  },
];

// ============================================
// STATUS COLORS
// ============================================

export const statusColors = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    dot: 'bg-green-500',
    label: 'Ativo',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-400',
    label: 'Inativo',
  },
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'Pendente',
  },
};

// ============================================
// ROLE COLORS
// ============================================

export const roleColors = {
  owner: {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    label: 'Proprietário',
  },
  admin: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    label: 'Administrador',
  },
  manager: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    label: 'Gerente',
  },
  seller: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
    label: 'Vendedor',
  },
  viewer: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    label: 'Visualizador',
  },
};

// ============================================
// LIMITS
// ============================================

export const MAX_EMPLOYEES = 20;
export const INVITE_EXPIRY_DAYS = 7;
