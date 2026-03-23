'use client';

import { EmployeeCard } from './employee-card';
import { Employee } from '../../../types/employee';

interface EmployeeGridProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onOpenPermissions: (employee: Employee) => void;
  onDeactivate: (employee: Employee) => void;
  onActivate: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onResendInvite: (employee: Employee) => void;
}

export function EmployeeGrid({
  employees,
  onEdit,
  onOpenPermissions,
  onDeactivate,
  onActivate,
  onDelete,
  onResendInvite,
}: EmployeeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={() => onEdit(employee)}
          onOpenPermissions={() => onOpenPermissions(employee)}
          onDeactivate={() => onDeactivate(employee)}
          onActivate={() => onActivate(employee)}
          onDelete={() => onDelete(employee)}
          onResendInvite={() => onResendInvite(employee)}
        />
      ))}
    </div>
  );
}
