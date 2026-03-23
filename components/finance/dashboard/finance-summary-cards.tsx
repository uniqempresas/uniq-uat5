'use client';

import { FinanceCard } from '../shared/finance-card';
import { Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';
import { FinanceSummary } from '@/lib/types/finance';

interface FinanceSummaryCardsProps {
  summary: FinanceSummary;
  isLoading?: boolean;
}

export function FinanceSummaryCards({ summary, isLoading }: FinanceSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <FinanceCard
        title="Saldo em Contas"
        value={summary.balance}
        currency
        icon={Wallet}
        iconBgColor="bg-uniq-accent/20"
        iconColor="text-uniq-accent"
        trend={{
          value: `${summary.previousMonthChange > 0 ? '+' : ''}${summary.previousMonthChange}%`,
          isPositive: summary.previousMonthChange > 0,
          label: 'vs mês anterior'
        }}
        isLoading={isLoading}
      />
      
      <FinanceCard
        title="A Receber"
        value={summary.toReceive}
        currency
        icon={ArrowDownLeft}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        subtitle={`${summary.receivableCount} títulos`}
        isLoading={isLoading}
      />
      
      <FinanceCard
        title="A Pagar"
        value={summary.toPay}
        currency
        icon={ArrowUpRight}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
        subtitle={`${summary.payableCount} títulos`}
        alert={summary.payableCount > 5 ? `${summary.payableCount} próximos do vencimento` : undefined}
        isLoading={isLoading}
      />
      
      <FinanceCard
        title="Fluxo do Mês"
        value={summary.monthlyFlow}
        currency
        icon={TrendingUp}
        iconBgColor="bg-uniq-primary/20"
        iconColor="text-uniq-primary"
        trend={{
          value: summary.monthlyFlow > 0 ? '+' : '',
          isPositive: summary.monthlyFlow > 0,
          label: 'saldo líquido'
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
