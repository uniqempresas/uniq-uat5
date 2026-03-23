// components/marketplace/empty-state.tsx
'use client';

import * as React from "react";
import { Store, Search, Package, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateIcon = 'store' | 'search' | 'package' | 'orders' | 'reviews';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: EmptyStateIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const iconMap: Record<EmptyStateIcon, React.ElementType> = {
  store: Store,
  search: Search,
  package: Package,
  orders: ShoppingBag,
  reviews: Star,
};

const iconSizes = {
  container: 'w-24 h-24',
  icon: 'w-12 h-12',
};

export function EmptyState({
  title,
  description,
  icon = 'store',
  action,
  className,
}: EmptyStateProps) {
  const Icon = iconMap[icon];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "bg-uniq-platinum rounded-full flex items-center justify-center mb-6",
          iconSizes.container
        )}
      >
        <Icon className={cn("text-uniq-muted", iconSizes.icon)} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-uniq-text mb-2">{title}</h3>

      {/* Description */}
      <p className="text-uniq-muted max-w-md mb-6">{description}</p>

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-uniq-primary hover:bg-uniq-hover text-white font-medium rounded-lg transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
