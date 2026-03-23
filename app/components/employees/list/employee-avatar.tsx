'use client';

import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Employee } from '../../../types/employee';
import { statusColors } from '../../../lib/mocks';
import { getInitials } from '../../../lib/utils/formatters';

interface EmployeeAvatarProps {
  employee: Employee;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const statusDotClasses = {
  sm: 'w-2 h-2 -bottom-0.5 -right-0.5',
  md: 'w-2.5 h-2.5 -bottom-0.5 -right-0.5',
  lg: 'w-3 h-3 -bottom-1 -right-1',
  xl: 'w-4 h-4 -bottom-1 -right-1',
};

export function EmployeeAvatar({ employee, size = 'md', showStatus = false }: EmployeeAvatarProps) {
  const status = employee.status;
  const colors = statusColors[status];

  return (
    <div className="relative inline-block">
      {employee.avatar ? (
        <Avatar className={sizeClasses[size]}>
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback className="bg-[#3e5653] text-white font-bold">
            {getInitials(employee.name)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className={sizeClasses[size]}>
          <AvatarFallback className="bg-[#3e5653] text-white font-bold">
            {getInitials(employee.name)}
          </AvatarFallback>
        </Avatar>
      )}

      {showStatus && (
        <span
          className={`absolute ${statusDotClasses[size]} rounded-full border-2 border-white ${colors.dot}`}
          title={colors.label}
        />
      )}
    </div>
  );
}
