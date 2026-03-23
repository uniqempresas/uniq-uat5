'use client';

import { ModuleAccess } from '../../../types/employee';
import { moduleLabels } from '../../../lib/mocks';

interface EmployeeBadgesProps {
  modules: ModuleAccess[];
  maxVisible?: number;
}

export function EmployeeBadges({ modules, maxVisible = 3 }: EmployeeBadgesProps) {
  const visibleModules = modules.slice(0, maxVisible);
  const remainingCount = modules.length - maxVisible;

  if (modules.length === 0) {
    return <span className="text-xs text-[#627271]">Sem módulos</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleModules.map((access) => (
        <span
          key={access.module}
          className="px-2 py-0.5 bg-[#efefef] text-[#627271] text-xs rounded-md"
        >
          {moduleLabels[access.module]}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-0.5 bg-[#efefef] text-[#627271] text-xs rounded-md">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
