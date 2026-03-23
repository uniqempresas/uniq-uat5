'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateSeparatorProps {
  date: string;
}

export function DateSeparator({ date }: DateSeparatorProps) {
  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateObj.toDateString() === today.toDateString()) {
      return 'Hoje';
    }
    
    if (dateObj.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    }
    
    return format(dateObj, "EEEE, d 'de' MMMM", { locale: ptBR });
  };
  
  return (
    <div className="flex items-center justify-center my-6">
      <span className="text-[12px] text-[#627271] bg-[#e5e7eb] px-3 py-1 rounded-full">
        {formatDate(date)}
      </span>
    </div>
  );
}
