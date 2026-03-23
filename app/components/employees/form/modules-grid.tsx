'use client';

import { ModuleAccess, ModuleType, EmployeeRole, ModulePermission } from '@/types/employee';
import { ModuleCheckbox } from './module-checkbox';
import { mockModules } from '@/lib/mocks';
import { isModuleAvailableForRole } from '@/lib/utils/permissions';

interface ModulesGridProps {
  selectedModules: ModuleAccess[];
  onChange: (modules: ModuleAccess[]) => void;
  role: EmployeeRole;
}

const ROLE_DEFAULT_PERMISSIONS: Record<EmployeeRole, ModulePermission[]> = {
  owner: ['view', 'create', 'edit', 'delete'],
  admin: ['view', 'create', 'edit', 'delete'],
  manager: ['view', 'create', 'edit'],
  seller: ['view', 'create'],
  viewer: ['view'],
};

export function ModulesGrid({ selectedModules, onChange, role }: ModulesGridProps) {
  const handleToggle = (moduleId: ModuleType, checked: boolean) => {
    if (checked) {
      // Add module with default permissions based on role
      const roleDef = ROLE_DEFAULT_PERMISSIONS[role] || ['view'];
      onChange([...selectedModules, { module: moduleId, permissions: roleDef }]);
    } else {
      // Remove module
      onChange(selectedModules.filter((m) => m.module !== moduleId));
    }
  };

  const isSelected = (moduleId: ModuleType) =>
    selectedModules.some((m) => m.module === moduleId);

  return (
    <div className="mt-4 space-y-3">
      <label className="block text-sm font-medium text-[#1f2937]">
        Módulos acessíveis
      </label>
      <div className="grid grid-cols-2 gap-3">
        {mockModules.map((module) => {
          const locked = role === 'admin' && module.id !== 'settings'; // Admin has all modules
          const available = isModuleAvailableForRole(module.id, role);

          return (
            <ModuleCheckbox
              key={module.id}
              module={module}
              selected={isSelected(module.id)}
              onChange={(checked) => handleToggle(module.id, checked)}
              disabled={locked}
            />
          );
        })}
      </div>
    </div>
  );
}
