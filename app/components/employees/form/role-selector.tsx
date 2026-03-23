'use client';

import { EmployeeRole } from '@/types/employee';
import { RoleCard } from './role-card';
import { roleFormOptions } from '@/lib/mocks';

interface RoleSelectorProps {
  value: EmployeeRole;
  onChange: (role: EmployeeRole) => void;
  disabled?: boolean;
}

export function RoleSelector({ value, onChange, disabled }: RoleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-[#1f2937]">
        Papel do colaborador <span className="text-red-500">*</span>
      </label>
      <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-4">
        <div className="space-y-3">
          {roleFormOptions.map((option) => (
            <RoleCard
              key={option.value}
              selected={value === option.value}
              onClick={() => onChange(option.value)}
              label={option.label}
              description={option.description}
              isRecommended={option.isRecommended}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
