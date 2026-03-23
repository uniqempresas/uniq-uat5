'use client';

import { cn } from '@/lib/utils';

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
}

export function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(reply)}
          className={cn(
            'px-4 py-2 rounded-full text-[13px] font-medium transition-all',
            'bg-[#86cb92]/10 text-[#86cb92] hover:bg-[#86cb92]/20',
            'border border-[#86cb92]/30 hover:border-[#86cb92]/50',
            'shadow-sm hover:shadow'
          )}
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
