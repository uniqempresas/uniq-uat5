'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Filter, Download, Printer, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { VendasTable } from '@/components/pdv/relatorios/vendas-table';
import { ProdutosRanking } from '@/components/pdv/relatorios/produtos-ranking';
import { PerformanceVendedor } from '@/components/pdv/relatorios/performance-vendedor';
import { mockSales, mockSalesSummary, mockTopSellingProducts, mockSellersPerformance } from '@/lib/mocks/pdv-sales';
import { CaixaFilters } from '@/types/caixa';

export default function RelatoriosPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CaixaFilters>({
    period: 'today'
  });

  const presets = [
    { label: 'Hoje', value: 'today' as const },
    { label: 'Ontem', value: 'yesterday' as const },
    { label: 'Últimos 7 dias', value: 'week' as const },
    { label: 'Este mês', value: 'month' as const },
    { label: 'Personalizado', value: 'custom' as const }
  ];

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Relatórios"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'PDV', href: '/pdv' },
          { label: 'Relatórios' }
        ]}
      />

      {/* Filters */}
      <div className="ml-0 lg:ml-64 pt-16 bg-white border-b px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-500" />
          {presets.map((preset) => (
            <Button
              key={preset.value}
              variant={filters.period === preset.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilters({ ...filters, period: preset.value })}
              className={filters.period === preset.value ? 'bg-[#3e5653]' : ''}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResumoCard
            icon={<DollarSign className="w-5 h-5" />}
            label="Total em Vendas"
            value={mockSalesSummary.totalAmount}
            isCurrency
            color="bg-green-100 text-green-600"
          />
          <ResumoCard
            icon={<TrendingUp className="w-5 h-5" />}
            label="Ticket Médio"
            value={mockSalesSummary.averageTicket}
            isCurrency
            color="bg-blue-100 text-blue-600"
          />
          <ResumoCard
            icon={<ShoppingCart className="w-5 h-5" />}
            label="Total de Vendas"
            value={mockSalesSummary.totalSales}
            color="bg-purple-100 text-purple-600"
          />
          <ResumoCard
            icon={<Users className="w-5 h-5" />}
            label="Itens Vendidos"
            value={mockSalesSummary.totalItems}
            color="bg-amber-100 text-amber-600"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="vendas" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="vendas">Vendas</TabsTrigger>
            <TabsTrigger value="produtos">Produtos</TabsTrigger>
            <TabsTrigger value="vendedores">Vendedores</TabsTrigger>
          </TabsList>

          <TabsContent value="vendas" className="space-y-6">
            <VendasTable sales={mockSales} />
          </TabsContent>

          <TabsContent value="produtos" className="space-y-6">
            <ProdutosRanking products={mockTopSellingProducts} />
          </TabsContent>

          <TabsContent value="vendedores" className="space-y-6">
            <PerformanceVendedor sellers={mockSellersPerformance} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function ResumoCard({ 
  icon, 
  label, 
  value, 
  isCurrency = false,
  color
}: { 
  icon: React.ReactNode;
  label: string; 
  value: number;
  isCurrency?: boolean;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-[#3e5653]">
              {isCurrency ? formatCurrency(value) : value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
