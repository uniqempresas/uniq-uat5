"use client";

import { ServiceCard } from "./service-card";
import { ServiceSkeleton } from "./service-skeleton";
import { EmptyState } from "./empty-state";
import type { ServiceGridProps } from "@/app/types/service";

interface ExtendedServiceGridProps extends ServiceGridProps {
  onAddNew: () => void;
}

export function ServiceGrid({ 
  services, 
  loading = false, 
  onEdit, 
  onToggleActive,
  onAddNew 
}: ExtendedServiceGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return <EmptyState onAddNew={onAddNew} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={onEdit}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
