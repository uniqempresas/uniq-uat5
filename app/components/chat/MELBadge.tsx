'use client';

import { Zap } from 'lucide-react';

interface MELBadgeProps {
  size?: 'sm' | 'md';
}

export function MELBadge({ size = 'sm' }: MELBadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1 rounded-full font-medium
      ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}
      bg-gradient-to-r from-[#86cb92] to-[#5fb86e] text-white
    `}>
      <Zap className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      MEL
    </span>
  );
}
