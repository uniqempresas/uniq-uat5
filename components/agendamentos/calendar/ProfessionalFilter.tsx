'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Professional } from '@/types/agendamentos';

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
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all',
            selectedIds.length === 0 || selectedIds.includes(professional.id)
              ? 'hover:bg-gray-50'
              : 'opacity-50 hover:opacity-75'
          )}
        >
          <input
            type="checkbox"
            checked={selectedIds.length === 0 || selectedIds.includes(professional.id)}
            onChange={() => onToggle(professional.id)}
            className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
          />
          <Avatar className="w-8 h-8">
            {professional.avatar && <AvatarImage src={professional.avatar} alt={professional.name} />}
            <AvatarFallback
              className="text-white text-xs font-medium"
              style={{ backgroundColor: professional.color }}
            >
              {professional.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <span className={cn(
              'text-sm block truncate',
              selectedIds.length === 0 || selectedIds.includes(professional.id)
                ? 'text-gray-700'
                : 'text-gray-400'
            )}>
              {professional.name}
            </span>
          </div>
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: professional.color }}
          />
        </label>
      ))}
    </div>
  );
}
