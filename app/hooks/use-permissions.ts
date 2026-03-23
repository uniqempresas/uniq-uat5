'use client';

import { useState, useCallback, useMemo } from 'react';
import { Employee, ModuleAccess, ModuleType, EmployeeRole } from '@/types/employee';
import { PermissionRow } from '@/types/permission';
import { ROLE_DEFINITIONS } from '@/types/role';
import { mockModules } from '@/lib/mocks';

interface UsePermissionsReturn {
  permissions: PermissionRow[];
  hasChanges: boolean;
  originalPermissions: PermissionRow[];
  updatePermission: (module: ModuleType, permission: string, value: boolean) => void;
  selectAll: () => void;
  clearAll: () => void;
  restoreDefault: (role: EmployeeRole) => void;
  savePermissions: (employeeId: string) => Promise<void>;
  loading: boolean;
  resetPermissions: () => void;
}

export function usePermissions(employee: Employee): UsePermissionsReturn {
  // Convert employee modules to PermissionRow format
  const createPermissionRows = useCallback((modules: ModuleAccess[]): PermissionRow[] => {
    return mockModules.map((module) => {
      const access = modules.find(m => m.module === module.id);
      return {
        module: module.id,
        permissions: {
          view: access?.permissions.includes('view') ?? false,
          create: access?.permissions.includes('create') ?? false,
          edit: access?.permissions.includes('edit') ?? false,
          delete: access?.permissions.includes('delete') ?? false,
        },
      };
    });
  }, []);

  const [originalPermissions, setOriginalPermissions] = useState<PermissionRow[]>(() =>
    createPermissionRows(employee.modules)
  );
  
  const [permissions, setPermissions] = useState<PermissionRow[]>(() =>
    createPermissionRows(employee.modules)
  );
  
  const [loading, setLoading] = useState(false);

  // Check if there are changes
  const hasChanges = useMemo(() => {
    return JSON.stringify(permissions) !== JSON.stringify(originalPermissions);
  }, [permissions, originalPermissions]);

  const updatePermission = useCallback(
    (module: ModuleType, permission: string, value: boolean) => {
      setPermissions((prev) =>
        prev.map((row) => {
          if (row.module === module) {
            // If disabling 'view', disable all other permissions
            if (permission === 'view' && !value) {
              return {
                ...row,
                permissions: {
                  view: false,
                  create: false,
                  edit: false,
                  delete: false,
                },
              };
            }
            return {
              ...row,
              permissions: {
                ...row.permissions,
                [permission]: value,
              },
            };
          }
          return row;
        })
      );
    },
    []
  );

  const selectAll = useCallback(() => {
    setPermissions((prev) =>
      prev.map((row) => ({
        ...row,
        permissions: {
          view: true,
          create: true,
          edit: true,
          delete: row.module !== 'settings', // Settings cannot have delete
        },
      }))
    );
  }, []);

  const clearAll = useCallback(() => {
    setPermissions((prev) =>
      prev.map((row) => ({
        ...row,
        permissions: {
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
      }))
    );
  }, []);

  const restoreDefault = useCallback((role: EmployeeRole) => {
    const roleDef = ROLE_DEFINITIONS.find((r) => r.role === role);
    if (!roleDef) return;

    const defaultModules: ModuleAccess[] = roleDef.modules.map((module, index) => ({
      module,
      permissions: roleDef.permissions[index] || ['view'],
    }));

    setPermissions(createPermissionRows(defaultModules));
  }, [createPermissionRows]);

  const savePermissions = useCallback(async (employeeId: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Convert PermissionRow back to ModuleAccess format
    const updatedModules: ModuleAccess[] = permissions
      .filter(row => row.permissions.view) // Only include modules with view permission
      .map(row => ({
        module: row.module,
        permissions: Object.entries(row.permissions)
          .filter(([, enabled]) => enabled)
          .map(([perm]) => perm as 'view' | 'create' | 'edit' | 'delete'),
      }));

    // Update original to current (without actually updating the employee - that's handled by useEmployees)
    setOriginalPermissions(permissions);
    setLoading(false);
  }, [permissions]);

  const resetPermissions = useCallback(() => {
    setPermissions(originalPermissions);
  }, [originalPermissions]);

  return {
    permissions,
    hasChanges,
    originalPermissions,
    updatePermission,
    selectAll,
    clearAll,
    restoreDefault,
    savePermissions,
    loading,
    resetPermissions,
  };
}
