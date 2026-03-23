// components/marketplace/metric-card.tsx
'use client';

import * as React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
    label?: string;
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
  alert?: string;
  className?: string;
}

const VARIANT_CONFIG = {
  default: {
    iconBg: 'bg-uniq-accent/20',
    iconColor: 'text-uniq-accent',
  },
  success: {
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  warning: {
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  info: {
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
};

export function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  variant = 'default',
  alert,
  className,
}: MetricCardProps) {
  const variantStyles = VARIANT_CONFIG[variant];

  return (
    <Card
      className={cn(
        "p-6 border-uniq-border bg-uniq-white hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {/* Icon Container */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            variantStyles.iconBg
          )}
        >
          <Icon className={cn("w-6 h-6", variantStyles.iconColor)} />
        </div>

        {/* Change Badge */}
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
              change.direction === 'up'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            )}
          >
            {change.direction === 'up' ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            <span>{change.value}%</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <p className="text-sm text-uniq-muted uppercase font-medium">{title}</p>
        <p className="text-2xl font-bold text-uniq-text mt-1">
          {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
        </p>

        {/* Change Label */}
        {change?.label && (
          <p className="text-xs text-uniq-muted mt-1">{change.label}</p>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs text-uniq-accent font-medium mt-2">{subtitle}</p>
        )}

        {/* Alert */}
        {alert && (
          <p className="text-xs text-red-600 font-medium mt-2">{alert}</p>
        )}
      </div>
    </Card>
  );
}
