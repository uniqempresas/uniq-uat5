'use client';

import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Category } from '@/types/storefront';
import { formatPrice } from '@/lib/utils/formatters';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: number[];
  onToggleCategory: (categoryId: number) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  onToggleCategory,
  priceRange,
  onPriceChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-4">Categorias</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onToggleCategory(category.id)}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer flex-1"
              >
                {category.name}
                <span className="text-muted-foreground ml-1">
                  ({category.count})
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">Faixa de Preço</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            max={2000}
            step={50}
            min={0}
            onValueChange={(value) => onPriceChange(value as [number, number])}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
