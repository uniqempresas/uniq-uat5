'use client';

import { StockMetricsCard } from './stock-metrics-card';
import { StockMetrics } from '@/lib/estoque/types';
import { Package, DollarSign, AlertTriangle, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/estoque/utils';

interface StockMetricsGridProps {
  metrics: StockMetrics | null;
  isLoading?: boolean;
}

export function StockMetricsGrid({ metrics, isLoading = false }: StockMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StockMetricsCard
        title="Total de Produtos"
        value={metrics?.totalProducts ?? 0}
        subtitle="Cadastrados"
        icon={Package}
        variant="default"
        isLoading={isLoading}
      />
      
      <StockMetricsCard
        title="Valor em Estoque"
        value={metrics ? formatCurrency(metrics.totalValue) : 'R$ 0,00'}
        subtitle="Custo Total"
        icon={DollarSign}
        variant="default"
        isLoading={isLoading}
      />
      
      <StockMetricsCard
        title="Estoque Baixo"
        value={metrics?.lowStock ?? 0}
        subtitle="Atenção necessária"
        icon={AlertTriangle}
        variant="warning"
        isLoading={isLoading}
      />
      
      <StockMetricsCard
        title="Produtos sem Estoque"
        value={metrics?.outOfStock ?? 0}
        subtitle="Esgotados"
        icon={XCircle}
        variant="critical"
        isLoading={isLoading}
      />
    </div>
  );
}
