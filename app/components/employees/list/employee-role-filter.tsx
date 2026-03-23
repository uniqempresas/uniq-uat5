'use client';

import { EmployeeRole } from '../../../types/employee';
import { ChevronDown } from 'lucide-react';

interface EmployeeRoleFilterProps {
  value: EmployeeRole | 'all';
  onChange: (value: EmployeeRole | 'all') => void;
}

const roleLabels: Record<EmployeeRole | 'all', string> = {
  all: 'Todos os papéis',
  owner: 'Proprietário',
  admin: 'Administrador',
  manager: 'Gerente',
  seller: 'Vendedor',
  viewer: 'Visualizador',
};

export function EmployeeRoleFilter({ value, onChange }: EmployeeRoleFilterProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as EmployeeRole | 'all')}
        className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer"
      >
        {Object.entries(roleLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" />
    </div>
  );
}
