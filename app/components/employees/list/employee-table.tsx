'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Employee } from '@/types/employee';
import { EmployeeAvatar } from './employee-avatar';
import { EmployeeRoleBadge } from './employee-role-badge';
import { EmployeeStatusBadge } from './employee-status-badge';
import { EmployeeBadges } from './employee-badges';
import { EmployeeDropdown } from './employee-dropdown';
import { formatLastAccess } from '@/lib/utils/formatters';
import { Clock } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onOpenPermissions: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
  onActivate: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onResendInvite: (employee: Employee) => void;
}

export function EmployeeTable({
  employees,
  onEdit,
  onOpenPermissions,
  onDeactivate,
  onActivate,
  onDelete,
  onResendInvite,
}: EmployeeTableProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f9fafb] border-b border-[#e5e7eb]">
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Colaborador
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Cargo/Função
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Papel
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Módulos
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Último Acesso
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="text-xs font-medium text-[#627271] uppercase tracking-wider">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="border-b border-[#e5e7eb] hover:bg-gray-50 transition-colors">
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <EmployeeAvatar employee={employee} size="md" showStatus />
                  <div>
                    <div className="text-sm font-medium text-[#1f2937]">{employee.name}</div>
                    <div className="text-xs text-[#627271]">{employee.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4 text-sm text-[#1f2937]">
                {employee.position || '-'}
              </TableCell>
              <TableCell className="py-4">
                <EmployeeRoleBadge role={employee.role} size="sm" />
              </TableCell>
              <TableCell className="py-4">
                <EmployeeBadges modules={employee.modules} maxVisible={2} />
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-1.5 text-sm text-[#627271]">
                  <Clock className="w-3.5 h-3.5" />
                  {formatLastAccess(employee.lastAccess)}
                </div>
              </TableCell>
              <TableCell className="py-4">
                <EmployeeStatusBadge status={employee.status} />
              </TableCell>
              <TableCell className="py-4">
                <EmployeeDropdown
                  employee={employee}
                  onEdit={() => onEdit(employee)}
                  onOpenPermissions={() => onOpenPermissions(employee)}
                  onDeactivate={() => onDeactivate(employee)}
                  onActivate={() => onActivate(employee)}
                  onDelete={() => onDelete(employee)}
                  onResendInvite={() => onResendInvite(employee)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
