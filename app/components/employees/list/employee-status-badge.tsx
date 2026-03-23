'use client';

import { Badge } from '../../../../components/ui/badge';
import { EmployeeStatus } from '../../../types/employee';
import { statusColors } from '../../../lib/mocks';

interface EmployeeStatusBadgeProps {
  status: EmployeeStatus;
}

export function EmployeeStatusBadge({ status }: EmployeeStatusBadgeProps) {
  const colors = statusColors[status];

  return (
    <Badge className={`${colors.bg} ${colors.text} font-medium`}>
      {colors.label}
    </Badge>
  );
}
