// components/marketplace/seller-metrics.tsx
'use client';

import * as React from "react";
import { TrendingUp, DollarSign, Clock, Package } from "lucide-react";
import { MetricCard } from "./metric-card";
import type { SellerMetrics } from "@/types/marketplace";
import { formatCurrency } from "@/lib/utils/format-currency";

interface SellerMetricsProps {
  metrics: SellerMetrics | null;
  isLoading?: boolean;
  className?: string;
}

export function SellerMetrics({
  metrics,
  isLoading = false,
  className,
}: SellerMetricsProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-uniq-white rounded-xl border border-uniq-border p-6 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-uniq-border" />
                <div className="w-16 h-6 rounded-full bg-uniq-border" />
              </div>
              <div className="mt-4 h-4 bg-uniq-border rounded w-1/2" />
              <div className="mt-2 h-8 bg-uniq-border rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Vendas do Mês"
          value={formatCurrency(metrics.salesMonth)}
          icon={TrendingUp}
          variant="default"
          change={{
            value: metrics.salesMonthChange,
            direction: metrics.salesMonthChange >= 0 ? 'up' : 'down',
            label: 'vs mês anterior',
          }}
        />

        <MetricCard
          title="Receita Hoje"
          value={formatCurrency(metrics.revenueToday)}
          icon={DollarSign}
          variant="success"
        />

        <MetricCard
          title="Pedidos Pendentes"
          value={metrics.ordersPending}
          icon={Clock}
          variant="warning"
          subtitle={`${metrics.ordersNewToday} novos hoje`}
        />

        <MetricCard
          title="Produtos Ativos"
          value={`${metrics.productsActive}/${metrics.productsTotal}`}
          icon={Package}
          variant="info"
        />
      </div>
    </div>
  );
}
