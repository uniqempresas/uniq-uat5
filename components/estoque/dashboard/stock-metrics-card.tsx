'use client';

import { cn } from '@/lib/estoque/utils';
import { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StockMetricsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'critical';
  isLoading?: boolean;
  className?: string;
}

export function StockMetricsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  isLoading = false,
  className,
}: StockMetricsCardProps) {
  const variantStyles = {
    default: {
      iconBg: 'bg-[#86cb92]/20',
      iconColor: 'text-[#86cb92]',
      valueColor: 'text-[#1f2937]',
      borderLeft: '',
    },
    warning: {
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      valueColor: 'text-yellow-600',
      borderLeft: '',
    },
    critical: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      valueColor: 'text-red-600',
      borderLeft: 'border-l-4 border-l-red-500',
    },
  };

  const styles = variantStyles[variant];

  if (isLoading) {
    return (
      <div className={cn('bg-white rounded-xl shadow-sm border border-gray-200 p-5', className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="w-12 h-12 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow',
        styles.borderLeft,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#627271] mb-1">{title}</p>
          <h3 className={cn('text-2xl font-bold', styles.valueColor)}>
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </h3>
          {subtitle && (
            <div className="flex items-center gap-1 mt-2">
              {variant === 'warning' && (
                <Icon className="w-3 h-3 text-yellow-600" />
              )}
              {variant === 'critical' && (
                <Icon className="w-3 h-3 text-red-600" />
              )}
              <span className="text-xs text-[#627271]">{subtitle}</span>
            </div>
          )}
        </div>
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', styles.iconBg)}>
          <Icon className={cn('w-6 h-6', styles.iconColor)} />
        </div>
      </div>
    </div>
  );
}
