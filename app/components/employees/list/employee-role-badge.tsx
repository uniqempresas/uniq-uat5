'use client';

import { Badge } from '../../../../components/ui/badge';
import { EmployeeRole } from '../../../types/employee';
import { roleColors } from '../../../lib/mocks';
import { Shield } from 'lucide-react';

interface EmployeeRoleBadgeProps {
  role: EmployeeRole;
  size?: 'sm' | 'md';
}

export function EmployeeRoleBadge({ role, size = 'md' }: EmployeeRoleBadgeProps) {
  const colors = roleColors[role];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <Badge
      className={`${colors.bg} ${colors.text} font-medium inline-flex items-center gap-1.5 ${sizeClasses[size]}`}
    >
      <Shield className="w-3 h-3" />
      {colors.label}
    </Badge>
  );
}
