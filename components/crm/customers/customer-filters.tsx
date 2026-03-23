'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomerFilters as CustomerFiltersType, Tag } from '@/types/crm';
import { Search, X } from 'lucide-react';

interface CustomerFiltersProps {
  filters: CustomerFiltersType;
  onFiltersChange: (filters: CustomerFiltersType) => void;
  tags: Tag[];
}

export function CustomerFilters({
  filters,
  onFiltersChange,
  tags,
}: CustomerFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleTagToggle = (tagId: string) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter((t) => t !== tagId)
      : [...filters.tags, tagId];
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      search: '',
      lastPurchaseDate: { from: null, to: null },
      totalSpent: { min: null, max: null },
      tags: [],
      hasPurchase: 'all',
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.tags.length > 0 ||
    filters.hasPurchase !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome ou email..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="shrink-0"
          >
            <X className="w-4 h-4 mr-2" />
            Limpar filtros
          </Button>
        )}
      </div>

      {/* Filtro de Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Filtrar por tags:</span>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagToggle(tag.id)}
            className={`text-xs px-2 py-1 rounded-full border transition-opacity ${
              filters.tags.includes(tag.id)
                ? 'opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
              borderColor: tag.color,
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  );
}
