'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { FinanceSummaryCards } from '@/components/finance/dashboard/finance-summary-cards';
import { CashFlowChart } from '@/components/finance/dashboard/cash-flow-chart';
import { UpcomingBills } from '@/components/finance/dashboard/upcoming-bills';
import { Button } from '@/components/ui/button';
import { useFinance } from '@/lib/hooks/use-finance';
import { Plus, ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import { ReceivableForm } from '@/components/finance/receivables/receivable-form';
import { PayableForm } from '@/components/finance/payables/payable-form';
import Link from 'next/link';

export default function FinanceiroPage() {
  const { summary, cashFlow, upcomingBills, isLoading } = useFinance();
  const [showReceivableForm, setShowReceivableForm] = useState(false);
  const [showPayableForm, setShowPayableForm] = useState(false);

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Financeiro"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Financeiro' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Summary Cards */}
        <section className="mb-6">
          <FinanceSummaryCards summary={summary} isLoading={isLoading} />
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <CashFlowChart data={cashFlow} period="30d" />
          </div>

          {/* Upcoming Bills */}
          <div>
            <UpcomingBills bills={upcomingBills} />
          </div>
        </div>

        {/* Quick Actions */}
        <section className="bg-white rounded-xl border border-uniq-border p-6">
          <h3 className="text-lg font-semibold text-uniq-text mb-4">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setShowReceivableForm(true)}
              className="bg-uniq-accent hover:bg-uniq-accent/90 gap-2"
            >
              <ArrowDownLeft className="h-4 w-4" />
              Nova Receita
            </Button>
            <Button
              onClick={() => setShowPayableForm(true)}
              variant="destructive"
              className="gap-2"
            >
              <ArrowUpRight className="h-4 w-4" />
              Nova Despesa
            </Button>
            <Link href="/financeiro/receber">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Contas a Receber
              </Button>
            </Link>
            <Link href="/financeiro/pagar">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Contas a Pagar
              </Button>
            </Link>
            <Link href="/financeiro/fluxo">
              <Button variant="outline" className="gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Fluxo de Caixa
              </Button>
            </Link>
          </div>
        </section>

        {/* Modals */}
        <ReceivableForm
          isOpen={showReceivableForm}
          onClose={() => setShowReceivableForm(false)}
          onSubmit={(data) => {
            console.log('Nova receita:', data);
            setShowReceivableForm(false);
          }}
        />
        <PayableForm
          isOpen={showPayableForm}
          onClose={() => setShowPayableForm(false)}
          onSubmit={(data) => {
            console.log('Nova despesa:', data);
            setShowPayableForm(false);
          }}
        />
      </main>
    </div>
  );
}
