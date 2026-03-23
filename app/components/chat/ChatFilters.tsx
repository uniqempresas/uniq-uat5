'use client';

import { FilterType } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    unread: number;
    open: number;
  };
}

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'unread', label: 'Não Lidas' },
  { key: 'open', label: 'Abertas' },
];

export function ChatFilters({ activeFilter, onFilterChange, counts }: ChatFiltersProps) {
  return (
    <div className="px-4 py-2 border-b border-white/10">
      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all',
              activeFilter === filter.key
                ? 'bg-[#86cb92] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            {filter.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded text-[10px]',
              activeFilter === filter.key
                ? 'bg-white/20'
                : 'bg-white/10'
            )}>
              {counts[filter.key]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
