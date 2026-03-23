'use client';

import { TopProduct } from '@/lib/estoque/types';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface StockTurnoverChartProps {
  products: TopProduct[];
  isLoading?: boolean;
}

type Period = '7d' | '30d' | '3m';

export function StockTurnoverChart({ products, isLoading = false }: StockTurnoverChartProps) {
  const [period, setPeriod] = useState<Period>('7d');

  const periods: { value: Period; label: string }[] = [
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
    { value: '3m', label: '3m' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-[#1f2937]">Giro de Estoque</h3>
          <p className="text-sm text-[#627271]">Produtos mais vendidos (Top 5)</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                period === p.value
                  ? 'bg-white text-[#1f2937] shadow-sm'
                  : 'text-[#627271] hover:text-[#1f2937]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="flex-1 h-3" />
              <Skeleton className="w-12 h-4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex items-center gap-4">
              <span className="w-32 text-sm text-[#627271] truncate">
                {product.name}
              </span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#86cb92] rounded-full transition-all duration-500"
                  style={{ width: `${product.percentage}%` }}
                />
              </div>
              <span className="w-12 text-sm font-medium text-[#1f2937] text-right">
                {product.sold}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
