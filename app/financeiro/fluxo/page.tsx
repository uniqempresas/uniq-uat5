'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { CashFlowCalendar } from '@/components/finance/cash-flow/cash-flow-calendar';
import { CashFlowTable } from '@/components/finance/cash-flow/cash-flow-table';
import { ProjectionChart } from '@/components/finance/cash-flow/projection-chart';
import { useFinance } from '@/lib/hooks/use-finance';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Table, TrendingUp } from 'lucide-react';

export default function FluxoPage() {
  const { cashFlow } = useFinance();

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Fluxo de Caixa"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Fluxo de Caixa' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-uniq-text">Fluxo de Caixa</h1>
          <p className="text-uniq-muted">Acompanhe suas entradas e saídas</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="bg-white border border-uniq-border">
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="table" className="gap-2">
              <Table className="h-4 w-4" />
              Tabela
            </TabsTrigger>
            <TabsTrigger value="projection" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Projeção
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <CashFlowCalendar data={cashFlow} />
          </TabsContent>

          <TabsContent value="table">
            <CashFlowTable data={cashFlow} />
          </TabsContent>

          <TabsContent value="projection">
            <ProjectionChart data={cashFlow} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
