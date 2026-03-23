'use client';

import { PermissionRow } from './permission-row';
import { PermissionRow as PermissionRowType } from '@/types/permission';
import { Employee, ModuleType } from '@/types/employee';

interface PermissionMatrixProps {
  employee: Employee;
  permissions: PermissionRowType[];
  onPermissionChange: (module: ModuleType, permission: string, value: boolean) => void;
  disabled?: boolean;
}

export function PermissionMatrix({
  employee,
  permissions,
  onPermissionChange,
  disabled,
}: PermissionMatrixProps) {
  const isOwner = employee.role === 'owner';
  const isLocked = disabled || isOwner;

  if (isOwner) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🔒</span>
        </div>
        <h3 className="text-lg font-semibold text-[#1f2937]">
          Permissões do Proprietário
        </h3>
        <p className="text-sm text-[#627271] mt-2">
          O papel de Proprietário não pode ter suas permissões alteradas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] overflow-hidden">
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 py-3 bg-white border-b border-[#e5e7eb]">
        <div className="flex items-center gap-2 text-xs text-[#627271]">
          <span className="w-3 h-3 rounded bg-blue-500" />
          Ver
        </div>
        <div className="flex items-center gap-2 text-xs text-[#627271]">
          <span className="w-3 h-3 rounded bg-green-500" />
          Criar/Editar
        </div>
        <div className="flex items-center gap-2 text-xs text-[#627271]">
          <span className="w-3 h-3 rounded bg-red-500" />
          Excluir
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#e5e7eb]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#1f2937] uppercase tracking-wider w-48">
                Módulo
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#1f2937] uppercase tracking-wider w-24">
                Ver
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#1f2937] uppercase tracking-wider w-24">
                Criar
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#1f2937] uppercase tracking-wider w-24">
                Editar
              </th>
              <th className="px-2 py-3 text-center text-xs font-semibold text-[#1f2937] uppercase tracking-wider w-24">
                Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((row) => (
              <PermissionRow
                key={row.module}
                row={row}
                onChange={(perm, value) => onPermissionChange(row.module, perm, value)}
                disabled={isLocked}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
