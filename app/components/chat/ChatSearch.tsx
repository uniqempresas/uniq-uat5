'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatSearchProps {
  onSearch?: (query: string) => void;
}

export function ChatSearch({ onSearch }: ChatSearchProps) {
  const [query, setQuery] = useState('');
  
  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };
  
  return (
    <div className="px-4 py-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder="Buscar conversas..."
          className={cn(
            'w-full pl-10 pr-10 py-2.5 rounded-xl text-[14px]',
            'bg-white/10 text-white placeholder-white/40',
            'border-0 focus:outline-none focus:ring-2 focus:ring-[#86cb92]/50',
            'transition-all'
          )}
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        )}
      </div>
    </div>
  );
}
