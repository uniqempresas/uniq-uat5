'use client';

import { Input } from '../../../../components/ui/input';
import { Search } from 'lucide-react';

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function EmployeeSearch({
  value,
  onChange,
  placeholder = 'Buscar colaborador...',
}: EmployeeSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-64 rounded-lg border border-[#e5e7eb] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92]"
      />
    </div>
  );
}
