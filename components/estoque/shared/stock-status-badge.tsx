'use client';

import { cn } from '@/lib/estoque/utils';
import { StockStatus } from '@/lib/estoque/types';
import { STOCK_STATUS_CONFIG } from '@/lib/estoque/constants';
import {
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  XCircle,
} from 'lucide-react';

interface StockStatusBadgeProps {
  status: StockStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap = {
  ok: CheckCircle,
  low: AlertTriangle,
  critical: AlertOctagon,
  out: XCircle,
};

export function StockStatusBadge({
  status,
  showLabel = true,
  size = 'md',
  className,
}: StockStatusBadgeProps) {
  const config = STOCK_STATUS_CONFIG[status];
  const Icon = iconMap[status];

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1',
    lg: 'px-3 py-1.5 text-sm gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
