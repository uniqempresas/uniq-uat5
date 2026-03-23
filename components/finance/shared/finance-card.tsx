'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils/currency';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { FinanceCardProps } from '@/lib/types/finance';

export function FinanceCard({
  title,
  value,
  currency = false,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
  subtitle,
  alert,
  isLoading = false
}: FinanceCardProps) {
  if (isLoading) {
    return (
      <Card className="border-uniq-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-20" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-uniq-border hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-uniq-muted">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-uniq-text">
          {currency ? formatCurrency(value) : value}
        </div>
        
        {trend && (
          <div className="flex items-center gap-1 mt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value}
            </span>
            <span className="text-xs text-uniq-muted">{trend.label}</span>
          </div>
        )}
        
        {subtitle && !trend && (
          <p className="text-xs text-uniq-muted mt-1">{subtitle}</p>
        )}
        
        {alert && (
          <p className="text-xs text-red-500 mt-1 font-medium">{alert}</p>
        )}
      </CardContent>
    </Card>
  );
}
