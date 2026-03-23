'use client';

import { Button } from '@/components/ui/button';
import { Employee } from '@/types/employee';
import { EmployeeAvatar } from '../list/employee-avatar';
import { EmployeeRoleBadge } from '../list/employee-role-badge';
import { ArrowLeft } from 'lucide-react';

interface PermissionHeaderProps {
  employee: Employee;
  onBack: () => void;
}

export function PermissionHeader({ employee, onBack }: PermissionHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-6 border-b border-[#e5e7eb]">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <EmployeeAvatar employee={employee} size="xl" />

      <div>
        <h2 className="text-xl font-bold text-[#1f2937]">{employee.name}</h2>
        <EmployeeRoleBadge role={employee.role} />
      </div>
    </div>
  );
}
