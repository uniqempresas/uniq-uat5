// components/marketplace/seller-filters.tsx
'use client';

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SellerFilters, Category, SellerSortOption } from "@/types/marketplace";

interface SellerFiltersProps {
  filters: SellerFilters;
  onFiltersChange: (filters: Partial<SellerFilters>) => void;
  categories?: Category[];
  locations?: { value: string; label: string }[];
  className?: string;
}

const SORT_OPTIONS: { value: SellerSortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevância' },
  { value: 'rating_desc', label: 'Mais bem avaliados' },
  { value: 'products_desc', label: 'Mais produtos' },
  { value: 'sales_desc', label: 'Mais vendas' },
  { value: 'newest', label: 'Mais recentes' },
];

const RATING_OPTIONS = [
  { value: 0, label: 'Qualquer avaliação' },
  { value: 5, label: '★★★★★ 5 estrelas' },
  { value: 4, label: '★★★★☆ 4+ estrelas' },
  { value: 3, label: '★★★☆☆ 3+ estrelas' },
];

export function SellerFilters({
  filters,
  onFiltersChange,
  categories = [],
  locations = [],
  className,
}: SellerFiltersProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {/* Category */}
      <Select
        value={filters.category || ''}
        onValueChange={(value) => onFiltersChange({ category: value || undefined })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas as categorias</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.slug}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location */}
      <Select
        value={filters.location || ''}
        onValueChange={(value) => onFiltersChange({ location: value || undefined })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Localização" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((loc) => (
            <SelectItem key={loc.value} value={loc.value}>
              {loc.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Rating */}
      <Select
        value={String(filters.minRating || 0)}
        onValueChange={(value) =>
          onFiltersChange({ minRating: Number(value) || undefined })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Avaliação" />
        </SelectTrigger>
        <SelectContent>
          {RATING_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={filters.sort || 'relevance'}
        onValueChange={(value) =>
          onFiltersChange({ sort: value as SellerSortOption })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
