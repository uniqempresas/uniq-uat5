'use client';

import { PermissionRow as PermissionRowType } from '@/types/permission';
import { PermissionToggle } from './permission-toggle';
import { moduleLabels } from '@/lib/mocks';
import { countModulePermissions } from '@/lib/utils/permissions';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Wallet,
  Package,
  ShoppingCart,
  Store,
  Calendar,
  Settings,
} from 'lucide-react';
import { ModuleType } from '@/types/employee';
import { cn } from '@/lib/utils';

interface PermissionRowProps {
  row: PermissionRowType;
  onChange: (permission: string, value: boolean) => void;
  disabled?: boolean;
}

const iconMap: Record<ModuleType, React.ComponentType<{ className?: string }>> = {
  crm: Users,
  finance: Wallet,
  inventory: Package,
  sales: ShoppingCart,
  store: Store,
  appointments: Calendar,
  settings: Settings,
};

export function PermissionRow({ row, onChange, disabled }: PermissionRowProps) {
  const Icon = iconMap[row.module];
  const permissionCount = Object.values(row.permissions).filter(Boolean).length;
  const isAdminOnly = row.module === 'settings';

  return (
    <tr className="border-b border-[#e5e7eb] hover:bg-white transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-[#86cb92]" />
          <span className="font-medium text-[#1f2937]">
            {moduleLabels[row.module]}
          </span>
          <Badge
            className={cn(
              "ml-auto text-xs",
              isAdminOnly ? "bg-amber-100 text-amber-700" : "bg-[#efefef] text-[#627271]"
            )}
          >
            {permissionCount}/4
          </Badge>
          {isAdminOnly && (
            <Badge variant="outline" className="text-xs border-amber-200 text-amber-600">
              Admin
            </Badge>
          )}
        </div>
      </td>

      <td className="py-4 px-2 text-center">
        <div className="flex justify-center">
          <PermissionToggle
            checked={row.permissions.view}
            onChange={(v) => onChange('view', v)}
            disabled={disabled}
            color="blue"
          />
        </div>
      </td>

      <td className="py-4 px-2 text-center">
        <div className="flex justify-center">
          <PermissionToggle
            checked={row.permissions.create}
            onChange={(v) => onChange('create', v)}
            disabled={disabled || !row.permissions.view}
            color="green"
          />
        </div>
      </td>

      <td className="py-4 px-2 text-center">
        <div className="flex justify-center">
          <PermissionToggle
            checked={row.permissions.edit}
            onChange={(v) => onChange('edit', v)}
            disabled={disabled || !row.permissions.view}
            color="green"
          />
        </div>
      </td>

      <td className="py-4 px-2 text-center">
        <div className="flex justify-center">
          <PermissionToggle
            checked={row.permissions.delete}
            onChange={(v) => onChange('delete', v)}
            disabled={disabled || !row.permissions.view || row.module === 'settings'}
            color="red"
          />
        </div>
      </td>
    </tr>
  );
}
