// ============================================
// TIPOS DE PERMISSÃO
// ============================================

import { ModuleType, ModulePermission } from './employee';

export interface Permission {
  module: ModuleType;
  permission: ModulePermission;
  enabled: boolean;
}

export interface PermissionRow {
  module: ModuleType;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

export interface PermissionMatrix {
  permissions: PermissionRow[];
  isOwner: boolean;
  isLocked: boolean;
}

// ============================================
// AÇÕES RÁPIDAS
// ============================================

export type PermissionAction = 'selectAll' | 'clearAll' | 'restoreDefault';

// ============================================
// CORES E LABELS
// ============================================

export const PERMISSION_COLORS = {
  view: { bg: 'bg-blue-500', label: 'Ver' },
  create: { bg: 'bg-green-500', label: 'Criar' },
  edit: { bg: 'bg-green-500', label: 'Editar' },
  delete: { bg: 'bg-red-500', label: 'Excluir' },
};

export const PERMISSION_ICONS = {
  view: 'Eye',
  create: 'Plus',
  edit: 'Pencil',
  delete: 'Trash2',
};
