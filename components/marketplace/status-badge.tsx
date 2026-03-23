// components/marketplace/status-badge.tsx
'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Clock,
  Check,
  Truck,
  CheckCheck,
  X,
  BadgeCheck,
  Crown,
  Sparkles,
} from "lucide-react";
import type { ProductStatus, OrderStatus } from "@/types/marketplace";

type StatusType = ProductStatus | OrderStatus | 'verified' | 'new' | 'premium';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const STATUS_CONFIG: Record<
  StatusType,
  { label: string; className: string; icon?: React.ElementType }
> = {
  // Product Status
  active: { label: 'Ativo', className: 'bg-green-100 text-green-700' },
  paused: { label: 'Pausado', className: 'bg-amber-100 text-amber-700' },
  out_of_stock: { label: 'Sem estoque', className: 'bg-red-100 text-red-700' },
  draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-700' },

  // Order Status
  pending: { label: 'Pendente', className: 'bg-amber-100 text-amber-700', icon: Clock },
  paid: { label: 'Pago', className: 'bg-blue-100 text-blue-700', icon: Check },
  shipped: { label: 'Enviado', className: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Entregue', className: 'bg-green-100 text-green-700', icon: CheckCheck },
  cancelled: { label: 'Cancelado', className: 'bg-red-100 text-red-700', icon: X },

  // Seller Badges
  verified: { label: 'Verificado', className: 'bg-uniq-accent/10 text-uniq-accent', icon: BadgeCheck },
  new: { label: 'Novo', className: 'bg-blue-100 text-blue-700', icon: Sparkles },
  premium: { label: 'Premium', className: 'bg-amber-100 text-amber-700', icon: Crown },
};

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full',
        config.className,
        sizeClasses[size],
        className
      )}
    >
      {Icon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
}
