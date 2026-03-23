'use client';

import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface SystemMessageProps {
  content: string;
  type?: 'transfer' | 'status' | 'info';
}

export function SystemMessage({ content, type = 'info' }: SystemMessageProps) {
  const icons = {
    transfer: '↔️',
    status: 'ℹ️',
    info: <Info className="w-3.5 h-3.5 text-[#627271]" />
  };
  
  return (
    <div className="flex justify-center my-4">
      <div className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full text-[12px]',
        'bg-[#f3f4f6] text-[#627271]'
      )}>
        {typeof icons[type] === 'string' ? (
          <span>{icons[type]}</span>
        ) : (
          icons[type]
        )}
        <span>{content}</span>
      </div>
    </div>
  );
}
