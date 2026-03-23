'use client';

import { EmployeeStatus } from '../../../types/employee';
import { ChevronDown } from 'lucide-react';

interface EmployeeStatusFilterProps {
  value: EmployeeStatus | 'all';
  onChange: (value: EmployeeStatus | 'all') => void;
}

export function EmployeeStatusFilter({ value, onChange }: EmployeeStatusFilterProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as EmployeeStatus | 'all')}
        className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-[#e5e7eb] bg-white text-sm text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] cursor-pointer"
      >
        <option value="all">Todos</option>
        <option value="active">Ativos</option>
        <option value="inactive">Inativos</option>
        <option value="pending">Pendentes</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271] pointer-events-none" />
    </div>
  );
}
