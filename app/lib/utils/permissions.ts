import { Employee, ModuleAccess, ModuleType, ModulePermission, EmployeeRole } from '@/types/employee';
import { ROLE_DEFINITIONS } from '@/types/role';

/**
 * Verifica se employee tem permissão específica
 */
export function hasPermission(
  employee: Employee,
  module: ModuleType,
  permission: ModulePermission
): boolean {
  const moduleAccess = employee.modules.find(m => m.module === module);
  return moduleAccess?.permissions.includes(permission) ?? false;
}

/**
 * Verifica se employee pode acessar módulo
 */
export function canAccessModule(
  employee: Employee,
  module: ModuleType
): boolean {
  const moduleAccess = employee.modules.find(m => m.module === module);
  return moduleAccess !== undefined && moduleAccess.permissions.length > 0;
}

/**
 * Conta módulos acessíveis
 */
export function countAccessibleModules(employee: Employee): number {
  return employee.modules.filter(m => m.permissions.length > 0).length;
}

/**
 * Obtém permissões padrão para um papel
 */
export function getDefaultPermissionsForRole(
  role: EmployeeRole
): ModuleAccess[] {
  const roleDef = ROLE_DEFINITIONS.find(r => r.role === role);
  if (!roleDef) return [];

  return roleDef.modules.map((module, index) => ({
    module,
    permissions: roleDef.permissions[index] || ['view'],
  }));
}

/**
 * Verifica se um módulo está disponível para um papel
 */
export function isModuleAvailableForRole(
  module: ModuleType,
  role: EmployeeRole
): boolean {
  const roleDef = ROLE_DEFINITIONS.find(r => r.role === role);
  return roleDef?.modules.includes(module) ?? false;
}

/**
 * Conta permissões ativas de um módulo
 */
export function countModulePermissions(access: ModuleAccess): number {
  return access.permissions.length;
}
