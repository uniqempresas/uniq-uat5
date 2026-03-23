'use client';

import { cn } from '@/lib/estoque/utils';
import { StockStatus } from '@/lib/estoque/types';
import { STOCK_STATUS_CONFIG } from '@/lib/estoque/constants';

interface StockLevelIndicatorProps {
  current: number;
  min: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StockLevelIndicator({
  current,
  min,
  max,
  showLabel = false,
  size = 'md',
  className,
}: StockLevelIndicatorProps) {
  // Calculate percentage based on min and max
  const percentage = max ? Math.min((current / max) * 100, 100) : Math.min((current / min) * 100, 100);
  
  // Determine status
  let status: StockStatus = 'ok';
  if (current === 0) status = 'out';
  else if (current <= min * 0.2) status = 'critical';
  else if (current <= min) status = 'low';
  
  const config = STOCK_STATUS_CONFIG[status];

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', config.bg.replace('bg-', 'bg-'))}
          style={{ width: `${Math.max(percentage, 0)}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>{current} un</span>
          <span>{min} mín</span>
        </div>
      )}
    </div>
  );
}
