'use client';

import { Badge } from '@/components/ui/badge';
import { EmployeeRole } from '@/types/employee';
import { cn } from '@/lib/utils';

interface RoleCardProps {
  selected: boolean;
  onClick: () => void;
  label: string;
  description: string;
  isRecommended?: boolean;
  disabled?: boolean;
}

export function RoleCard({
  selected,
  onClick,
  label,
  description,
  isRecommended,
  disabled,
}: RoleCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all",
        selected
          ? "border-[#86cb92] bg-[#86cb92]/5 ring-2 ring-[#86cb92]"
          : "border-[#e5e7eb] hover:border-[#86cb92]",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <div
        className={cn(
          "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0",
          selected ? "border-[#86cb92]" : "border-[#e5e7eb]"
        )}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full bg-[#86cb92]" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[#1f2937]">{label}</span>
          {isRecommended && (
            <Badge variant="secondary" className="text-xs bg-[#86cb92]/20 text-[#86cb92]">
              Recomendado
            </Badge>
          )}
        </div>
        <p className="text-sm text-[#627271] mt-0.5">{description}</p>
      </div>
    </div>
  );
}
