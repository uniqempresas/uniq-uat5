// components/marketplace/review-distribution.tsx
'use client';

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import type { ReviewDistribution as ReviewDistributionType } from "@/types/marketplace";

interface ReviewDistributionProps {
  distribution: ReviewDistributionType;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ReviewDistribution({
  distribution,
  orientation = 'horizontal',
  className,
}: ReviewDistributionProps) {
  const { average, total, 5: five, 4: four, 3: three, 2: two, 1: one } = distribution;

  const stars = [
    { label: '5', count: five },
    { label: '4', count: four },
    { label: '3', count: three },
    { label: '2', count: two },
    { label: '1', count: one },
  ];

  const getPercentage = (count: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  };

  if (orientation === 'vertical') {
    return (
      <div className={cn("flex items-start gap-6", className)}>
        {/* Average */}
        <div className="text-center min-w-[80px]">
          <p className="text-5xl font-bold text-uniq-text">{average.toFixed(1)}</p>
          <StarRating rating={average} size="lg" className="justify-center mt-2" />
          <p className="text-sm text-uniq-muted mt-1">{total} avaliações</p>
        </div>

        {/* Bars */}
        <div className="flex-1 space-y-2">
          {stars.map(({ label, count }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-sm text-uniq-muted w-6">{label}</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <div className="flex-1 h-2 bg-uniq-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${getPercentage(count)}%` }}
                />
              </div>
              <span className="text-sm text-uniq-muted w-10 text-right">
                {getPercentage(count)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-6", className)}>
      {/* Average */}
      <div className="text-center min-w-[100px]">
        <p className="text-5xl font-bold text-uniq-text">{average.toFixed(1)}</p>
        <StarRating rating={average} size="lg" className="justify-center mt-2" />
        <p className="text-sm text-uniq-muted mt-1">{total} avaliações</p>
      </div>

      {/* Bars */}
      <div className="flex-1 space-y-2">
        {stars.map(({ label, count }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-sm text-uniq-muted w-12">{label} estrelas</span>
            <div className="flex-1 h-2 bg-uniq-border rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(count)}%` }}
              />
            </div>
            <span className="text-sm text-uniq-muted w-12 text-right">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
