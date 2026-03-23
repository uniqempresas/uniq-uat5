import { Role, EmployeeRole } from '@/types/employee';

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'owner',
    label: 'Proprietário',
    description: 'Acesso completo a todos os recursos e configurações da empresa',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'store', 'appointments', 'settings'],
    isSystem: true,
    icon: 'Crown',
    color: 'purple',
  },
  {
    id: '2',
    name: 'admin',
    label: 'Administrador',
    description: 'Acesso completo a todos os módulos, exceto configurações críticas',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'store', 'appointments'],
    isSystem: true,
    icon: 'Shield',
    color: 'blue',
  },
  {
    id: '3',
    name: 'manager',
    label: 'Gerente',
    description: 'Gestão de equipe e operações do dia a dia',
    defaultModules: ['crm', 'sales', 'inventory'],
    isSystem: false,
    icon: 'Users',
    color: 'green',
  },
  {
    id: '4',
    name: 'seller',
    label: 'Vendedor',
    description: 'Operações básicas de vendas e atendimento',
    defaultModules: ['crm', 'sales'],
    isSystem: false,
    icon: 'ShoppingCart',
    color: 'amber',
  },
  {
    id: '5',
    name: 'viewer',
    label: 'Visualizador',
    description: 'Acesso apenas para visualização (somente leitura)',
    defaultModules: ['crm', 'finance', 'inventory', 'sales', 'appointments'],
    isSystem: true,
    icon: 'Eye',
    color: 'gray',
  },
];

// ============================================
// ROLE DEFINITIONS FOR FORMS
// ============================================

export const roleFormOptions = [
  {
    value: 'admin' as EmployeeRole,
    label: 'Administrador',
    description: 'Acesso completo a todos os módulos e configurações',
    isRecommended: true,
  },
  {
    value: 'manager' as EmployeeRole,
    label: 'Gerente',
    description: 'Gestão de equipe e operações do dia a dia',
  },
  {
    value: 'seller' as EmployeeRole,
    label: 'Vendedor',
    description: 'Operações básicas de vendas e atendimento',
  },
  {
    value: 'viewer' as EmployeeRole,
    label: 'Visualizador',
    description: 'Acesso apenas para visualização (somente leitura)',
  },
];
