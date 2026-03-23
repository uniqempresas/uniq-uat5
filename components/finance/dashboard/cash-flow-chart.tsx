'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CashFlowData } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CashFlowChartProps {
  data: CashFlowData[];
  period?: '7d' | '30d' | '3m' | '6m' | '1y';
}

type PeriodType = '7d' | '30d' | '3m' | '6m' | '1y';

const periodLabels: Record<PeriodType, string> = {
  '7d': '7 dias',
  '30d': '30 dias',
  '3m': '3 meses',
  '6m': '6 meses',
  '1y': '1 ano'
};

export function CashFlowChart({ data, period = '30d' }: CashFlowChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(period);

  const filteredData = useMemo(() => {
    const daysMap: Record<PeriodType, number> = {
      '7d': 7,
      '30d': 30,
      '3m': 90,
      '6m': 180,
      '1y': 365
    };
    return data.slice(-daysMap[selectedPeriod]);
  }, [data, selectedPeriod]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-uniq-border rounded-lg shadow-lg">
          <p className="text-sm font-medium text-uniq-text mb-2">
            {format(parseISO(label), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
          <p className="text-sm text-uniq-accent">
            Receitas: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-red-500">
            Despesas: {formatCurrency(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-uniq-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-uniq-text">Fluxo de Caixa</h3>
        <div className="flex gap-2">
          {(Object.keys(periodLabels) as PeriodType[]).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedPeriod === p
                  ? 'bg-uniq-primary text-white'
                  : 'bg-uniq-platinum text-uniq-muted hover:bg-uniq-border'
              }`}
            >
              {periodLabels[p]}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => format(parseISO(value), 'dd/MM')}
              stroke="#627271"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => `R$ ${value}`}
              stroke="#627271"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              name="Receitas"
              stroke="#86cb92"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              name="Despesas"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
