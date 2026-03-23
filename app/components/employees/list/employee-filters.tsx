'use client';

import { EmployeeFilters as EmployeeFiltersType } from '@/types/employee';
import { EmployeeSearch } from './employee-search';
import { EmployeeStatusFilter } from './employee-status-filter';
import { EmployeeRoleFilter } from './employee-role-filter';
import { ViewToggle } from './view-toggle';

interface EmployeeFiltersProps {
  filters: EmployeeFiltersType;
  onChange: (filters: EmployeeFiltersType) => void;
}

export function EmployeeFilters({ filters, onChange }: EmployeeFiltersProps) {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <EmployeeSearch
          value={filters.search}
          onChange={(search) => onChange({ ...filters, search })}
        />
        <EmployeeStatusFilter
          value={filters.status}
          onChange={(status) => onChange({ ...filters, status })}
        />
        <EmployeeRoleFilter
          value={filters.role}
          onChange={(role) => onChange({ ...filters, role })}
        />
      </div>

      <ViewToggle
        value={filters.view}
        onChange={(view) => onChange({ ...filters, view })}
      />
    </div>
  );
}
