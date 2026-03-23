'use client';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Employee } from '@/types/employee';
import { EmployeeAvatar } from './employee-avatar';
import { EmployeeRoleBadge } from './employee-role-badge';
import { EmployeeStatusBadge } from './employee-status-badge';
import { EmployeeBadges } from './employee-badges';
import { EmployeeDropdown } from './employee-dropdown';
import { formatLastAccess } from '@/lib/utils/formatters';
import { Clock } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: () => void;
  onOpenPermissions: () => void;
  onDeactivate: () => void;
  onActivate: () => void;
  onDelete: () => void;
  onResendInvite: () => void;
}

export function EmployeeCard({
  employee,
  onEdit,
  onOpenPermissions,
  onDeactivate,
  onActivate,
  onDelete,
  onResendInvite,
}: EmployeeCardProps) {
  return (
    <Card className="hover:shadow-md transition-all cursor-pointer group">
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <EmployeeAvatar employee={employee} size="lg" showStatus />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#1f2937] truncate group-hover:text-[#86cb92] transition-colors">
            {employee.name}
          </h3>
          <p className="text-sm text-[#627271] truncate">{employee.email}</p>
        </div>

        <EmployeeDropdown
          employee={employee}
          onEdit={onEdit}
          onOpenPermissions={onOpenPermissions}
          onDeactivate={onDeactivate}
          onActivate={onActivate}
          onDelete={onDelete}
          onResendInvite={onResendInvite}
        />
      </CardHeader>

      <CardContent className="space-y-3">
        <EmployeeRoleBadge role={employee.role} />
        <EmployeeBadges modules={employee.modules} />
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-1.5 text-xs text-[#627271]">
          <Clock className="w-3.5 h-3.5" />
          <span>Último acesso: {formatLastAccess(employee.lastAccess)}</span>
        </div>
        <EmployeeStatusBadge status={employee.status} />
      </CardFooter>
    </Card>
  );
}
