// components/marketplace/star-rating.tsx
'use client';

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  count?: number;
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

const textSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  count,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], "text-amber-400 fill-amber-400")}
          />
        ))}
        
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeClasses[size], "text-amber-200 fill-amber-200")} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={cn(sizeClasses[size], "text-amber-400 fill-amber-400")} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-amber-200 fill-amber-200")}
          />
        ))}
      </div>
      
      {showValue && (
        <span className={cn(textSizes[size], "font-semibold text-uniq-text ml-1")}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {count !== undefined && (
        <span className={cn(textSizes[size], "text-uniq-muted")}>
          ({count})
        </span>
      )}
    </div>
  );
}
