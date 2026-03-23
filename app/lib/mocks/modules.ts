import { Module, ModuleType } from '@/types/employee';

export const mockModules: Module[] = [
  {
    id: 'crm',
    name: 'CRM',
    description: 'Gestão de clientes e relacionamento',
    icon: 'Users',
    color: 'emerald',
  },
  {
    id: 'finance',
    name: 'Financeiro',
    description: 'Contas a pagar, receber e fluxo de caixa',
    icon: 'Wallet',
    color: 'emerald',
  },
  {
    id: 'inventory',
    name: 'Estoque',
    description: 'Controle de estoque e inventário',
    icon: 'Package',
    color: 'emerald',
  },
  {
    id: 'sales',
    name: 'Vendas',
    description: 'Ponto de venda e pedidos',
    icon: 'ShoppingCart',
    color: 'emerald',
  },
  {
    id: 'store',
    name: 'Loja Virtual',
    description: 'Catálogo online e pedidos web',
    icon: 'Store',
    color: 'emerald',
  },
  {
    id: 'appointments',
    name: 'Agendamentos',
    description: 'Agenda de serviços e compromissos',
    icon: 'Calendar',
    color: 'emerald',
  },
  {
    id: 'settings',
    name: 'Configurações',
    description: 'Configurações da empresa e equipe',
    icon: 'Settings',
    color: 'amber',
  },
];

// ============================================
// MODULE COLORS
// ============================================

export const moduleColors: Record<ModuleType, string> = {
  crm: 'bg-emerald-500',
  finance: 'bg-emerald-500',
  inventory: 'bg-emerald-500',
  sales: 'bg-emerald-500',
  store: 'bg-emerald-500',
  appointments: 'bg-emerald-500',
  settings: 'bg-amber-500',
};

// ============================================
// MODULE LABELS
// ============================================

export const moduleLabels: Record<ModuleType, string> = {
  crm: 'CRM',
  finance: 'Financeiro',
  inventory: 'Estoque',
  sales: 'Vendas',
  store: 'Loja Virtual',
  appointments: 'Agendamentos',
  settings: 'Configurações',
};
