"use client";

import { MetricCard } from "@/components/metric-card";
import { TrendingUp, ShoppingBag, Users, Target } from "lucide-react";
import { mockDashboardStats } from "@/lib/mocks/dashboard";

export function MetricsSection() {
  const stats = mockDashboardStats;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Vendas */}
      <MetricCard
        title="Vendas (Mês)"
        value={stats.sales.formatted}
        icon={TrendingUp}
        iconBgColor="bg-uniq-accent/20"
        iconColor="text-uniq-accent"
        trend={{
          value: `+${stats.sales.change}%`,
          isPositive: stats.sales.trend === "up",
          label: "vs mês anterior",
        }}
      />

      {/* Clientes */}
      <MetricCard
        title="Clientes Ativos"
        value={stats.customers.value.toString()}
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        trend={{
          value: `+${stats.customers.change}`,
          isPositive: stats.customers.trend === "up",
          label: "esta semana",
        }}
      />

      {/* Pedidos */}
      <MetricCard
        title="Pedidos Hoje"
        value={stats.orders.value.toString()}
        icon={ShoppingBag}
        iconBgColor="bg-uniq-primary/20"
        iconColor="text-uniq-primary"
        subtitle={`${stats.orders.change > 0 ? "+" : ""}${stats.orders.change} em processamento`}
      />

      {/* Conversão */}
      <MetricCard
        title="Taxa de Conversão"
        value={stats.conversion.formatted}
        icon={Target}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
        trend={{
          value: `+${stats.conversion.change}%`,
          isPositive: stats.conversion.trend === "up",
          label: "vs ontem",
        }}
      />
    </section>
  );
}
