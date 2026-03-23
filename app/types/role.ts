// ============================================
// PAPÉIS PRÉ-DEFINIDOS
// ============================================

import { EmployeeRole, ModuleType, ModulePermission } from './employee';

export interface RoleDefinition {
  role: EmployeeRole;
  label: string;
  description: string;
  isRecommended?: boolean;
  modules: ModuleType[];
  permissions: ModulePermission[][];
}

// Papéis com permissões padrão
export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    role: 'admin',
    label: 'Administrador',
    description: 'Acesso completo a todos os módulos e configurações',
    isRecommended: true,
    modules: ['crm', 'finance', 'inventory', 'sales', 'store', 'appointments', 'settings'],
    permissions: [
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit', 'delete'],
      ['view', 'create', 'edit'],
    ],
  },
  {
    role: 'manager',
    label: 'Gerente',
    description: 'Gestão de equipe e operações do dia a dia',
    modules: ['crm', 'sales', 'inventory', 'finance', 'appointments'],
    permissions: [
      ['view', 'create', 'edit'],
      ['view', 'create', 'edit'],
      ['view', 'create', 'edit'],
      ['view', 'create', 'edit'],
      ['view', 'create', 'edit'],
    ],
  },
  {
    role: 'seller',
    label: 'Vendedor',
    description: 'Operações básicas de vendas e atendimento',
    modules: ['crm', 'sales'],
    permissions: [
      ['view', 'create', 'edit'],
      ['view', 'create'],
    ],
  },
  {
    role: 'viewer',
    label: 'Visualizador',
    description: 'Acesso apenas para visualização (somente leitura)',
    modules: ['crm', 'finance', 'inventory', 'sales', 'appointments'],
    permissions: [
      ['view'],
      ['view'],
      ['view'],
      ['view'],
      ['view'],
    ],
  },
];
