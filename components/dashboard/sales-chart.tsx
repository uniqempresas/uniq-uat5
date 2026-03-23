"use client";

import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockChartData } from "@/lib/mocks/dashboard";
import { formatCurrency } from "@/lib/utils";

type Period = "7d" | "30d" | "90d";

interface ChartDataPoint {
  date: string;
  sales: number;
  label: string;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-uniq-border rounded-lg shadow-lg">
        <p className="text-sm text-uniq-muted mb-1">{label}</p>
        <p className="text-lg font-bold text-uniq-text">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  const [period, setPeriod] = useState<Period>("7d");
  const data = mockChartData[period];

  return (
    <Card className="border-uniq-border shadow-sm">
      <CardHeader className="border-b border-uniq-border px-6 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-uniq-text">
          Vendas
        </CardTitle>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <TabsList className="bg-uniq-platinum">
            <TabsTrigger value="7d" className="text-xs data-[state=active]:bg-white">
              7 dias
            </TabsTrigger>
            <TabsTrigger value="30d" className="text-xs data-[state=active]:bg-white">
              30 dias
            </TabsTrigger>
            <TabsTrigger value="90d" className="text-xs data-[state=active]:bg-white">
              90 dias
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3e5653" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3e5653" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#627271", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#627271", fontSize: 12 }}
                tickFormatter={(value: number) => `R$${value / 1000}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3e5653"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
