'use client';

import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Employee } from '@/types/employee';
import { usePermissions } from '@/hooks/use-permissions';
import { PermissionHeader } from './permission-header';
import { PermissionMatrix } from './permission-matrix';
import { PermissionActions } from './permission-actions';
import { Loader2, Save } from 'lucide-react';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onSave: (permissions: Employee['modules']) => void;
  loading?: boolean;
}

export function PermissionModal({
  isOpen,
  onClose,
  employee,
  onSave,
  loading,
}: PermissionModalProps) {
  const {
    permissions,
    hasChanges,
    updatePermission,
    selectAll,
    clearAll,
    restoreDefault,
  } = usePermissions(employee);

  const handleSave = () => {
    // Convert PermissionRow back to ModuleAccess format
    const updatedModules = permissions
      .filter(row => row.permissions.view)
      .map(row => ({
        module: row.module,
        permissions: Object.entries(row.permissions)
          .filter(([, enabled]) => enabled)
          .map(([perm]) => perm as 'view' | 'create' | 'edit' | 'delete'),
      }));

    onSave(updatedModules);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0">
        <PermissionHeader employee={employee} onBack={onClose} />

        <ScrollArea className="flex-1 px-6 py-4">
          <PermissionMatrix
            employee={employee}
            permissions={permissions}
            onPermissionChange={updatePermission}
          />
        </ScrollArea>

        <div className="border-t p-6 space-y-4">
          <PermissionActions
            onSelectAll={selectAll}
            onClearAll={clearAll}
            onRestore={() => restoreDefault(employee.role)}
            disabled={employee.role === 'owner'}
          />

          <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
            <p className="text-sm text-[#627271]">
              {hasChanges ? 'Você tem alterações não salvas' : 'Nenhuma alteração pendente'}
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#e5e7eb] text-[#627271]"
              >
                Voltar
              </Button>
              <Button
                onClick={handleSave}
                disabled={loading || !hasChanges || employee.role === 'owner'}
                className="bg-[#3e5653] text-white hover:bg-[#1f2937]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
