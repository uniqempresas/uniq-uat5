"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { FiltersProps } from "@/app/types/service";

export function Filters({ filters, onChange, categories }: FiltersProps) {
  const activeFiltersCount = [
    filters.category,
    filters.minPrice !== null,
    filters.maxPrice !== null,
    filters.status !== 'all'
  ].filter(Boolean).length;

  const clearFilters = () => {
    onChange({
      search: filters.search,
      category: null,
      minPrice: null,
      maxPrice: null,
      status: 'all',
    });
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <Select
        value={filters.category || 'all'}
        onValueChange={(value) => 
          onChange({ ...filters, category: value === 'all' ? null : value })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas categorias</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(value: 'all' | 'active' | 'inactive') => 
          onChange({ ...filters, status: value })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativos</SelectItem>
          <SelectItem value="inactive">Inativos</SelectItem>
        </SelectContent>
      </Select>

      {activeFiltersCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-sm text-uniq-muted hover:text-uniq-text transition-colors"
        >
          <X className="w-4 h-4" />
          Limpar filtros
          <Badge variant="secondary" className="ml-1 text-xs">
            {activeFiltersCount}
          </Badge>
        </button>
      )}
    </div>
  );
}
