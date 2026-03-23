'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CashFlowData } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectionChartProps {
  data: CashFlowData[];
}

export function ProjectionChart({ data }: ProjectionChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-uniq-border rounded-lg shadow-lg">
          <p className="text-sm font-medium text-uniq-text mb-2">
            {format(parseISO(label), 'dd/MM/yyyy', { locale: ptBR })}
          </p>
          <p className="text-sm text-uniq-accent">
            Saldo: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-uniq-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-uniq-text">Projeção de Saldo</h3>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86cb92" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#86cb92" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#627271"
              tickFormatter={(value) => format(parseISO(value), 'dd/MM')}
              fontSize={12}
            />
            <YAxis 
              stroke="#627271"
              tickFormatter={(value) => `R$ ${value}`}
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#86cb92"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBalance)"
              name="Saldo"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
