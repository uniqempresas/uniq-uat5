'use client';

import { cn } from '@/lib/estoque/utils';
import { StockAlert } from '@/lib/estoque/types';
import { STOCK_STATUS_CONFIG } from '@/lib/estoque/constants';
import { StockStatusBadge } from '../shared/stock-status-badge';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface StockAlertsListProps {
  alerts: StockAlert[];
  isLoading?: boolean;
  onBuyClick?: (productId: string) => void;
  onViewAll?: () => void;
}

export function StockAlertsList({
  alerts,
  isLoading = false,
  onBuyClick,
  onViewAll,
}: StockAlertsListProps) {
  // Sort alerts by type: critical > low > out
  const sortedAlerts = [...alerts].sort((a, b) => {
    const order = { critical: 0, low: 1, out: 2 };
    return order[a.type] - order[b.type];
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-[#1f2937]">Alertas de Estoque</h3>
          <p className="text-sm text-[#627271]">Produtos que precisam de atenção</p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[#3e5653] text-sm font-medium hover:underline flex items-center gap-1"
          >
            Ver todos
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="divide-y divide-gray-100">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-12" />
            </div>
          ))
        ) : sortedAlerts.length === 0 ? (
          <div className="p-8 text-center text-[#627271]">
            Nenhum alerta de estoque
          </div>
        ) : (
          sortedAlerts.slice(0, 5).map((alert) => (
            <AlertItem
              key={alert.id}
              alert={alert}
              onBuyClick={onBuyClick ? () => onBuyClick(alert.productId) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface AlertItemProps {
  alert: StockAlert;
  onBuyClick?: () => void;
}

function AlertItem({ alert, onBuyClick }: AlertItemProps) {
  const config = STOCK_STATUS_CONFIG[alert.type];

  return (
    <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
      {/* Product Image */}
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        {alert.product?.images?.[0] ? (
          <img
            src={alert.product.images[0]}
            alt={alert.product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-[#1f2937] truncate">
          {alert.product?.name || 'Produto'}
        </h4>
        <p className="text-xs text-[#627271]">
          SKU: {alert.product?.sku || 'N/A'}
        </p>
      </div>

      {/* Stock Info */}
      <div className="text-center">
        <p className={cn(
          'text-sm font-semibold',
          alert.currentStock === 0 ? 'text-red-600' : 'text-[#1f2937]'
        )}>
          {alert.currentStock} un
        </p>
        <p className="text-xs text-[#627271]">Atual</p>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-[#1f2937]">
          {alert.minStock} un
        </p>
        <p className="text-xs text-[#627271]">Mínimo</p>
      </div>

      {/* Status Badge */}
      <StockStatusBadge status={alert.type} size="sm" />

      {/* Actions */}
      <div className="flex gap-2">
        {onBuyClick && (
          <button
            onClick={onBuyClick}
            className={cn(
              'px-3 py-1.5 text-sm rounded-lg font-medium transition-colors',
              alert.type === 'critical' || alert.type === 'out'
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-[#3e5653] text-white hover:bg-[#1f2937]'
            )}
          >
            Comprar
          </button>
        )}
        <button className="p-1.5 text-[#627271] hover:text-[#1f2937] hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}
