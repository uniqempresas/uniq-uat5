'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { CashFlowData } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CashFlowTableProps {
  data: CashFlowData[];
}

export function CashFlowTable({ data }: CashFlowTableProps) {
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = data.reduce((sum, item) => sum + item.expense, 0);
  const finalBalance = totalIncome - totalExpense;

  if (data.length === 0) {
    return (
      <div className="border border-uniq-border rounded-xl p-8 text-center">
        <p className="text-uniq-muted">Nenhum dado de fluxo de caixa encontrado.</p>
      </div>
    );
  }

  return (
    <div className="border border-uniq-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f9fafb]">
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Entradas</TableHead>
            <TableHead className="text-right">Saídas</TableHead>
            <TableHead className="text-right">Saldo do Dia</TableHead>
            <TableHead className="text-right">Saldo Acumulado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.date}>
              <TableCell className="font-medium">{formatDate(item.date)}</TableCell>
              <TableCell className="text-right text-uniq-accent">
                {item.income > 0 ? formatCurrency(item.income) : '-'}
              </TableCell>
              <TableCell className="text-right text-red-600">
                {item.expense > 0 ? formatCurrency(item.expense) : '-'}
              </TableCell>
              <TableCell className={`text-right font-medium ${item.balance >= 0 ? 'text-uniq-accent' : 'text-red-600'}`}>
                <div className="flex items-center justify-end gap-1">
                  {item.balance >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatCurrency(item.balance)}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.balance)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-uniq-platinum/50 font-semibold">
            <TableCell>Total</TableCell>
            <TableCell className="text-right text-uniq-accent">
              {formatCurrency(totalIncome)}
            </TableCell>
            <TableCell className="text-right text-red-600">
              {formatCurrency(totalExpense)}
            </TableCell>
            <TableCell className={`text-right ${finalBalance >= 0 ? 'text-uniq-accent' : 'text-red-600'}`}>
              {formatCurrency(finalBalance)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
