// ============================================
// COMPONENT: SupplierRating - Sistema de Avaliação por Estrelas
// ============================================

'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupplierRatingProps } from '@/app/types/suppliers';

export function SupplierRating({ 
  value, 
  onChange, 
  readonly = false, 
  showValue = true,
  size = 'md'
}: SupplierRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => handleClick(star)}
          className={cn(
            "transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded",
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          )}
          aria-label={`Avaliar com ${star} estrelas`}
        >
          <Star
            className={cn(
              sizes[size],
              star <= value 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            )}
          />
        </button>
      ))}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600 font-medium">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}