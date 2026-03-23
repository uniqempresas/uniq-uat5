'use client';

import { Professional } from '@/app/types/agendamentos';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface ProfessionalFilterProps {
  professionals: Professional[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ProfessionalFilter({ professionals, selectedIds, onToggle }: ProfessionalFilterProps) {
  return (
    <div className="space-y-2">
      {professionals.map((professional) => (
        <label
          key={professional.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <Checkbox
            checked={selectedIds.length === 0 || selectedIds.includes(professional.id)}
            onCheckedChange={() => onToggle(professional.id)}
            className={cn(
              "border-gray-300 data-[state=checked]:bg-[#86cb92] data-[state=checked]:border-[#86cb92]"
            )}
          />
          <Avatar className="w-8 h-8">
            <AvatarFallback 
              className="text-white text-xs"
              style={{ backgroundColor: professional.color }}
            >
              {professional.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-700 truncate">{professional.name}</span>
        </label>
      ))}
    </div>
  );
}
