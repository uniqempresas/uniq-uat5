'use client';

import { useStockMetrics } from '@/hooks/use-stock-metrics';
import { StockMetricsGrid } from '@/components/estoque/dashboard/stock-metrics-grid';
import { StockAlertsList } from '@/components/estoque/dashboard/stock-alerts-list';
import { StockTurnoverChart } from '@/components/estoque/dashboard/stock-turnover-chart';
import { QuickActionsCard } from '@/components/estoque/dashboard/quick-actions-card';
import { Sidebar } from '@/components/sidebar';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function EstoqueDashboardPage() {
  const { metrics, alerts, topProducts, isLoading } = useStockMetrics();

  return (
    <div className="min-h-screen bg-[#efefef] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-[#1f2937]">Dashboard de Estoque</h1>
            <p className="text-sm text-[#627271]">Visão geral do seu estoque</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/estoque/produtos/novo"
              className="flex items-center gap-2 px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Metrics Grid */}
          <section className="mb-6">
            <StockMetricsGrid metrics={metrics} isLoading={isLoading} />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Alerts List */}
            <div className="lg:col-span-2">
              <StockAlertsList 
                alerts={alerts} 
                isLoading={isLoading}
                onViewAll={() => window.location.href = '/estoque/produtos?stockStatus=low'}
              />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActionsCard />
            </div>
          </div>

          {/* Turnover Chart */}
          <section className="mt-6">
            <StockTurnoverChart products={topProducts} isLoading={isLoading} />
          </section>

          {/* Recent Activity */}
          <section className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#1f2937]">Atividade Recente</h3>
                <Link 
                  href="/estoque/movimentacoes"
                  className="text-sm text-[#3e5653] hover:underline"
                >
                  Ver todas
                </Link>
              </div>
              <p className="text-sm text-[#627271] text-center py-8">
                Última movimentação: Hoje às 14:30
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
