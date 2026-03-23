# SPEC - Sprint 06: Finance UI 💰

## Overview Técnico

- **Stack:** Next.js 14 + React 18 + TypeScript 5 + Tailwind CSS 3 + shadcn/ui
- **Padrão:** Componentes funcionais com hooks
- **Estado:** useState/useReducer locais (mock data)
- **Gráficos:** Recharts (LineChart, AreaChart)
- **Datas:** date-fns (formatação e manipulação)
- **Ícones:** Lucide React

### Stack Tecnológica Detalhada

| Camada | Tecnologia | Versão | Uso |
|--------|------------|--------|-----|
| Framework | Next.js | 14.2.5 | App Router, Server Components |
| Linguagem | TypeScript | 5.4.5 | Tipagem estática |
| UI Library | React | 18.3.1 | Componentes funcionais |
| Estilização | Tailwind CSS | 3.4.4 | Utility-first CSS |
| Componentes | shadcn/ui | v4.0.5 | Design System base |
| Ícones | Lucide React | 0.400.0 | Ícones consistentes |
| Gráficos | Recharts | 2.x | Gráfico de fluxo de caixa |
| Formatação | date-fns | 4.1.0 | Manipulação de datas |

---

## Estrutura de Arquivos

```
app/
├── financeiro/
│   ├── page.tsx                    # Dashboard Financeiro
│   ├── receber/
│   │   └── page.tsx                # Contas a Receber
│   ├── pagar/
│   │   └── page.tsx                # Contas a Pagar
│   └── fluxo/
│       └── page.tsx                # Fluxo de Caixa

components/
├── finance/
│   ├── dashboard/
│   │   ├── finance-summary-cards.tsx   # Cards de métricas
│   │   ├── cash-flow-chart.tsx         # Gráfico de fluxo
│   │   └── upcoming-bills.tsx          # Contas próximas
│   ├── receivables/
│   │   ├── receivables-table.tsx       # Tabela de recebíveis
│   │   ├── receivable-form.tsx         # Formulário de cadastro
│   │   └── receive-modal.tsx           # Modal de recebimento
│   ├── payables/
│   │   ├── payables-table.tsx          # Tabela de pagáveis
│   │   ├── payable-form.tsx            # Formulário de cadastro
│   │   └── pay-modal.tsx               # Modal de pagamento
│   ├── cash-flow/
│   │   ├── cash-flow-calendar.tsx      # Calendário mensal
│   │   ├── cash-flow-table.tsx         # Tabela de fluxo
│   │   └── projection-chart.tsx        # Gráfico de projeção
│   └── shared/
│       ├── status-badge.tsx            # Badge de status
│       ├── category-badge.tsx          # Badge de categoria
│       ├── transaction-filters.tsx     # Filtros de transação
│       └── finance-card.tsx            # Card de métrica financeira

lib/
├── mocks/
│   └── finance.ts                      # Mock data completo
├── hooks/
│   └── use-finance.ts                  # Hook de dados (mock)
├── utils/
│   ├── currency.ts                     # Formatação de moeda
│   └── date.ts                         # Formatação de data
└── types/
    └── finance.ts                      # Tipos TypeScript

```

---

## Tipos TypeScript

### Arquivo: `lib/types/finance.ts`

```typescript
// ============================================
// TIPOS BÁSICOS
// ============================================

export type TransactionStatus = 'pending' | 'paid' | 'overdue' | 'scheduled';
export type TransactionType = 'income' | 'expense';
export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer' | 'boleto';

// ============================================
// INTERFACES PRINCIPAIS
// ============================================

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  dueDate: string; // ISO date string
  status: TransactionStatus;
  category: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Receivable extends Transaction {
  type: 'income';
  client: string;
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  discount?: number;
  interest?: number;
}

export interface Payable extends Transaction {
  type: 'expense';
  supplier: string;
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  receiptUrl?: string;
}

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string; // Lucide icon name
  type: TransactionType;
}

export interface BankAccount {
  id: number;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'investment';
}

export interface CashFlowData {
  date: string;
  income: number;
  expense: number;
  balance: number;
}

export interface UpcomingBill {
  id: number;
  type: TransactionType;
  description: string;
  category: string;
  amount: number;
  dueIn: string;
  isUrgent: boolean;
}

export interface FinanceSummary {
  balance: number;
  toReceive: number;
  toPay: number;
  projected: number;
  previousMonthChange: number;
  receivableCount: number;
  payableCount: number;
  monthlyFlow: number;
}

// ============================================
// PROPS DE COMPONENTES
// ============================================

export interface FinanceCardProps {
  title: string;
  value: number;
  currency?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  subtitle?: string;
  alert?: string;
  isLoading?: boolean;
}

export interface StatusBadgeProps {
  status: TransactionStatus;
  label?: string;
  className?: string;
}

export interface CategoryBadgeProps {
  category: string;
  type: TransactionType;
  className?: string;
}

export interface TransactionTableProps<T extends Transaction> {
  data: T[];
  type: TransactionType;
  isLoading?: boolean;
  onReceive?: (id: number) => void;
  onPay?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

export interface TransactionFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  type: TransactionType;
}

export interface FilterState {
  period: string;
  status: TransactionStatus | 'all';
  category: string;
  search: string;
}

export interface ReceivableFormData {
  description: string;
  client: string;
  amount: number;
  dueDate: string;
  category: string;
  notes?: string;
}

export interface PayableFormData {
  description: string;
  supplier: string;
  amount: number;
  dueDate: string;
  category: string;
  notes?: string;
}

export interface ReceivePaymentData {
  id: number;
  paidDate: string;
  paymentMethod: PaymentMethod;
  accountId: number;
  discount?: number;
  interest?: number;
}

export interface MakePaymentData {
  id: number;
  paidDate: string;
  paymentMethod: PaymentMethod;
  accountId: number;
}
```

---

## Componentes Detalhados

### 1. FinanceSummaryCards

**Arquivo:** `components/finance/dashboard/finance-summary-cards.tsx`

```typescript
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
```

### 2. CashFlowChart

**Arquivo:** `components/finance/dashboard/cash-flow-chart.tsx`

```typescript
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
```

### 3. StatusBadge

**Arquivo:** `components/finance/shared/status-badge.tsx`

```typescript
import { Badge } from '@/components/ui/badge';
import { TransactionStatus } from '@/lib/types/finance';

interface StatusBadgeProps {
  status: TransactionStatus;
  label?: string;
  className?: string;
}

const statusConfig: Record<TransactionStatus, { variant: any; label: string }> = {
  pending: { variant: 'warning', label: 'Pendente' },
  paid: { variant: 'success', label: 'Pago' },
  overdue: { variant: 'destructive', label: 'Vencido' },
  scheduled: { variant: 'info', label: 'Agendado' }
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className={className}>
      {label || config.label}
    </Badge>
  );
}
```

### 4. ReceivablesTable

**Arquivo:** `components/finance/receivables/receivables-table.tsx`

```typescript
'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../shared/status-badge';
import { Receivable } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Mail,
  CheckSquare
} from 'lucide-react';

interface ReceivablesTableProps {
  data: Receivable[];
  onReceive: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onSendReminder: (id: number) => void;
}

export function ReceivablesTable({
  data,
  onReceive,
  onEdit,
  onDelete,
  onView,
  onSendReminder
}: ReceivablesTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(prev =>
      prev.length === data.length ? [] : data.map(d => d.id)
    );
  };

  return (
    <div className="border border-uniq-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f9fafb]">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === data.length && data.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => toggleSelection(item.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.client}</TableCell>
              <TableCell>{formatDate(item.dueDate)}</TableCell>
              <TableCell className="font-medium text-uniq-accent">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onView(item.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {item.status !== 'paid' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-uniq-accent"
                      onClick={() => onReceive(item.id)}
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(item.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {item.status !== 'paid' && (
                        <DropdownMenuItem onClick={() => onSendReminder(item.id)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar cobrança
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

### 5. ReceiveModal

**Arquivo:** `components/finance/receivables/receive-modal.tsx`

```typescript
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Receivable, PaymentMethod } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { format, parseISO } from 'date-fns';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  receivable: Receivable | null;
  onConfirm: (data: {
    id: number;
    paidDate: string;
    paymentMethod: PaymentMethod;
    discount: number;
    interest: number;
  }) => void;
}

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Dinheiro' },
  { value: 'credit_card', label: 'Cartão de Crédito' },
  { value: 'debit_card', label: 'Cartão de Débito' },
  { value: 'pix', label: 'PIX' },
  { value: 'bank_transfer', label: 'Transferência Bancária' },
  { value: 'boleto', label: 'Boleto' }
];

export function ReceiveModal({
  isOpen,
  onClose,
  receivable,
  onConfirm
}: ReceiveModalProps) {
  const [paidDate, setPaidDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [discount, setDiscount] = useState('');
  const [interest, setInterest] = useState('');

  if (!receivable) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      id: receivable.id,
      paidDate,
      paymentMethod,
      discount: Number(discount) || 0,
      interest: Number(interest) || 0
    });
    onClose();
  };

  const finalAmount = receivable.amount 
    - (Number(discount) || 0) 
    + (Number(interest) || 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Recebimento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-uniq-platinum/50 p-4 rounded-lg">
            <p className="text-sm text-uniq-muted">Título</p>
            <p className="font-medium">{receivable.description}</p>
            <p className="text-sm text-uniq-muted mt-1">Cliente</p>
            <p className="font-medium">{receivable.client}</p>
            <p className="text-2xl font-bold text-uniq-accent mt-2">
              {formatCurrency(receivable.amount)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paidDate">Data do Recebimento</Label>
              <Input
                id="paidDate"
                type="date"
                value={paidDate}
                onChange={(e) => setPaidDate(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Forma de Pagamento</Label>
              <Select value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Desconto (R$)</Label>
              <Input
                id="discount"
                type="number"
                step="0.01"
                min="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="0,00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interest">Juros (R$)</Label>
              <Input
                id="interest"
                type="number"
                step="0.01"
                min="0"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="border-t border-uniq-border pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-uniq-muted">Valor Final</span>
              <span className="text-xl font-bold text-uniq-accent">
                {formatCurrency(finalAmount)}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-uniq-accent hover:bg-uniq-accent/90">
              Confirmar Recebimento
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### 6. TransactionFilters

**Arquivo:** `components/finance/shared/transaction-filters.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FilterState, TransactionType } from '@/lib/types/finance';
import { Search, Filter } from 'lucide-react';

interface TransactionFiltersProps {
  type: TransactionType;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

export function TransactionFilters({
  type,
  onFilterChange,
  categories
}: TransactionFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    period: 'this_month',
    status: 'all',
    category: 'all',
    search: ''
  });

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Select
        value={filters.period}
        onValueChange={(v) => handleChange('period', v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this_month">Este mês</SelectItem>
          <SelectItem value="last_month">Mês anterior</SelectItem>
          <SelectItem value="this_quarter">Este trimestre</SelectItem>
          <SelectItem value="this_year">Este ano</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(v) => handleChange('status', v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="pending">Pendentes</SelectItem>
          <SelectItem value="paid">Pagos</SelectItem>
          <SelectItem value="overdue">Vencidos</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.category}
        onValueChange={(v) => handleChange('category', v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1 min-w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-uniq-muted" />
        <Input
          placeholder={`Buscar ${type === 'income' ? 'cliente' : 'fornecedor'}...`}
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          className="pl-10"
        />
      </div>

      <Button variant="outline" className="gap-2">
        <Filter className="h-4 w-4" />
        Mais Filtros
      </Button>
    </div>
  );
}
```

### 7. CashFlowCalendar

**Arquivo:** `components/finance/cash-flow/cash-flow-calendar.tsx`

```typescript
'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CashFlowData } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';

interface CashFlowCalendarProps {
  data: CashFlowData[];
  onDayClick?: (date: Date) => void;
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function CashFlowCalendar({ data, onDayClick }: CashFlowCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const dataByDate = useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item.date] = item;
      return acc;
    }, {} as Record<string, CashFlowData>);
  }, [data]);

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="bg-white rounded-xl border border-uniq-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-uniq-text">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-uniq-muted"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const dayData = dataByDate[dateStr];
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);

          return (
            <div
              key={dateStr}
              onClick={() => onDayClick?.(day)}
              className={`
                min-h-24 p-2 border border-uniq-border/50 cursor-pointer
                hover:bg-uniq-platinum/50 transition-colors
                ${isCurrentMonth ? 'bg-white' : 'bg-uniq-platinum/30'}
                ${isTodayDate ? 'ring-2 ring-uniq-accent' : ''}
              `}
            >
              <div className="text-sm font-medium text-uniq-text mb-1">
                {format(day, 'd')}
              </div>
              
              {dayData && (
                <div className="space-y-1">
                  {dayData.income > 0 && (
                    <div className="text-xs text-uniq-accent font-medium">
                      +{formatCurrency(dayData.income)}
                    </div>
                  )}
                  {dayData.expense > 0 && (
                    <div className="text-xs text-red-500 font-medium">
                      -{formatCurrency(dayData.expense)}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-uniq-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-uniq-accent rounded-full" />
          <span className="text-sm text-uniq-muted">Entrada</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-uniq-muted">Saída</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-uniq-accent rounded-full" />
          <span className="text-sm text-uniq-muted">Hoje</span>
        </div>
      </div>
    </div>
  );
}
```

---

## Mock Data Implementável

### Arquivo: `lib/mocks/finance.ts`

```typescript
import { Receivable, Payable, CashFlowData, FinanceSummary, UpcomingBill, Category, BankAccount } from '@/lib/types/finance';

// ============================================
// SUMMARY
// ============================================

export const mockFinanceSummary: FinanceSummary = {
  balance: 15420.50,
  toReceive: 8500.00,
  toPay: 3200.00,
  projected: 20720.50,
  previousMonthChange: 12.5,
  receivableCount: 5,
  payableCount: 8,
  monthlyFlow: 11780.00
};

// ============================================
// CASH FLOW (30 dias)
// ============================================

export const mockCashFlow: CashFlowData[] = [
  { date: '2026-03-01', income: 3000, expense: 1500, balance: 1500 },
  { date: '2026-03-02', income: 2500, expense: 800, balance: 1700 },
  { date: '2026-03-03', income: 1800, expense: 1200, balance: 600 },
  { date: '2026-03-04', income: 4200, expense: 900, balance: 3300 },
  { date: '2026-03-05', income: 1500, expense: 2000, balance: -500 },
  { date: '2026-03-06', income: 3800, expense: 1100, balance: 2700 },
  { date: '2026-03-07', income: 2200, expense: 1400, balance: 800 },
  { date: '2026-03-08', income: 2900, expense: 1800, balance: 1100 },
  { date: '2026-03-09', income: 3500, expense: 1200, balance: 2300 },
  { date: '2026-03-10', income: 1800, expense: 2100, balance: -300 },
  { date: '2026-03-11', income: 4100, expense: 1500, balance: 2600 },
  { date: '2026-03-12', income: 2300, expense: 900, balance: 1400 },
  { date: '2026-03-13', income: 3200, expense: 1100, balance: 2100 },
  { date: '2026-03-14', income: 2800, expense: 1300, balance: 1500 },
  { date: '2026-03-15', income: 4500, expense: 2000, balance: 2500 },
  { date: '2026-03-16', income: 1900, expense: 1000, balance: 900 },
  { date: '2026-03-17', income: 3600, expense: 1400, balance: 2200 },
  { date: '2026-03-18', income: 2700, expense: 1800, balance: 900 },
  { date: '2026-03-19', income: 4200, expense: 1200, balance: 3000 },
  { date: '2026-03-20', income: 3100, expense: 1600, balance: 1500 },
  { date: '2026-03-21', income: 2400, expense: 1100, balance: 1300 },
  { date: '2026-03-22', income: 3800, expense: 1400, balance: 2400 },
  { date: '2026-03-23', income: 2900, expense: 1300, balance: 1600 },
  { date: '2026-03-24', income: 4300, expense: 1900, balance: 2400 },
  { date: '2026-03-25', income: 2100, expense: 1200, balance: 900 },
  { date: '2026-03-26', income: 3400, expense: 1500, balance: 1900 },
  { date: '2026-03-27', income: 2600, expense: 1000, balance: 1600 },
  { date: '2026-03-28', income: 3900, expense: 1700, balance: 2200 },
  { date: '2026-03-29', income: 2200, expense: 1400, balance: 800 },
  { date: '2026-03-30', income: 4100, expense: 1600, balance: 2500 },
  { date: '2026-03-31', income: 3300, expense: 1300, balance: 2000 },
];

// ============================================
// RECEIVABLES
// ============================================

export const mockReceivables: Receivable[] = [
  {
    id: 1,
    description: 'Venda #1234',
    client: 'João Silva',
    amount: 1200.00,
    dueDate: '2026-03-20',
    status: 'pending',
    category: 'Vendas',
    type: 'income',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 2,
    description: 'Serviço de Consultoria',
    client: 'Maria Santos',
    amount: 800.00,
    dueDate: '2026-03-18',
    status: 'paid',
    paidDate: '2026-03-15',
    paymentMethod: 'pix',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 3,
    description: 'Projeto Website',
    client: 'Empresa ABC Ltda',
    amount: 5000.00,
    dueDate: '2026-03-10',
    status: 'overdue',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 4,
    description: 'Mensalidade - Março',
    client: 'Cliente Recorrente',
    amount: 350.00,
    dueDate: '2026-03-25',
    status: 'pending',
    category: 'Assinatura',
    type: 'income',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 5,
    description: 'Venda Produtos',
    client: 'Carlos Mendes',
    amount: 950.00,
    dueDate: '2026-03-22',
    status: 'scheduled',
    category: 'Vendas',
    type: 'income',
    createdAt: '2026-03-12T10:00:00Z',
    updatedAt: '2026-03-12T10:00:00Z'
  },
  {
    id: 6,
    description: 'Serviço de Design',
    client: 'Ana Paula Design',
    amount: 2500.00,
    dueDate: '2026-03-28',
    status: 'pending',
    category: 'Serviços',
    type: 'income',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  }
];

// ============================================
// PAYABLES
// ============================================

export const mockPayables: Payable[] = [
  {
    id: 1,
    description: 'Aluguel Escritório',
    supplier: 'Imobiliária Central',
    amount: 2500.00,
    dueDate: '2026-03-12',
    status: 'pending',
    category: 'Aluguel',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 2,
    description: 'Energia Elétrica',
    supplier: 'CEMIG',
    amount: 890.00,
    dueDate: '2026-03-15',
    status: 'pending',
    category: 'Serviços',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 3,
    description: 'Internet Empresarial',
    supplier: 'Vivo Empresas',
    amount: 299.00,
    dueDate: '2026-03-20',
    status: 'paid',
    paidDate: '2026-03-18',
    paymentMethod: 'credit_card',
    category: 'Serviços',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-18T10:00:00Z'
  },
  {
    id: 4,
    description: 'Material de Escritório',
    supplier: 'Papelaria XYZ',
    amount: 450.00,
    dueDate: '2026-03-10',
    status: 'overdue',
    category: 'Compras',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  },
  {
    id: 5,
    description: 'Fornecedor Produtos',
    supplier: 'Distribuidora ABC',
    amount: 1500.00,
    dueDate: '2026-03-25',
    status: 'pending',
    category: 'Fornecedor',
    type: 'expense',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 6,
    description: 'Salário - Funcionário 1',
    supplier: 'Funcionário',
    amount: 3500.00,
    dueDate: '2026-03-05',
    status: 'paid',
    paidDate: '2026-03-05',
    paymentMethod: 'bank_transfer',
    category: 'Funcionários',
    type: 'expense',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 7,
    description: 'Imposto - ISS',
    supplier: 'Prefeitura',
    amount: 450.00,
    dueDate: '2026-03-20',
    status: 'scheduled',
    category: 'Impostos',
    type: 'expense',
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-03-10T10:00:00Z'
  }
];

// ============================================
// UPCOMING BILLS
// ============================================

export const mockUpcomingBills: UpcomingBill[] = [
  {
    id: 1,
    type: 'expense',
    description: 'Aluguel Escritório',
    category: 'Imóvel',
    amount: 2500.00,
    dueIn: '2 dias',
    isUrgent: true
  },
  {
    id: 2,
    type: 'income',
    description: 'Venda #1234',
    category: 'ABC Ltda',
    amount: 3400.00,
    dueIn: '3 dias',
    isUrgent: false
  },
  {
    id: 3,
    type: 'expense',
    description: 'Fornecedor Produtos',
    category: 'Compra de materiais',
    amount: 890.00,
    dueIn: '5 dias',
    isUrgent: false
  },
  {
    id: 4,
    type: 'expense',
    description: 'Internet Empresarial',
    category: 'Serviços',
    amount: 299.00,
    dueIn: '7 dias',
    isUrgent: false
  },
  {
    id: 5,
    type: 'income',
    description: 'Projeto Website',
    category: 'Empresa ABC Ltda',
    amount: 5000.00,
    dueIn: 'Atrasado',
    isUrgent: true
  }
];

// ============================================
// CATEGORIES
// ============================================

export const mockCategories: {
  income: Category[];
  expense: Category[];
} = {
  income: [
    { id: 1, name: 'Vendas', color: '#86cb92', icon: 'ShoppingBag', type: 'income' },
    { id: 2, name: 'Serviços', color: '#3b82f6', icon: 'Briefcase', type: 'income' },
    { id: 3, name: 'Consultoria', color: '#8b5cf6', icon: 'Users', type: 'income' },
    { id: 4, name: 'Assinatura', color: '#f59e0b', icon: 'RefreshCw', type: 'income' },
    { id: 5, name: 'Outros', color: '#627271', icon: 'MoreHorizontal', type: 'income' }
  ],
  expense: [
    { id: 1, name: 'Aluguel', color: '#ef4444', icon: 'Home', type: 'expense' },
    { id: 2, name: 'Fornecedor', color: '#f97316', icon: 'Package', type: 'expense' },
    { id: 3, name: 'Serviços', color: '#3b82f6', icon: 'Zap', type: 'expense' },
    { id: 4, name: 'Funcionários', color: '#8b5cf6', icon: 'Users', type: 'expense' },
    { id: 5, name: 'Impostos', color: '#dc2626', icon: 'FileText', type: 'expense' },
    { id: 6, name: 'Compras', color: '#ec4899', icon: 'ShoppingCart', type: 'expense' }
  ]
};

// ============================================
// BANK ACCOUNTS
// ============================================

export const mockBankAccounts: BankAccount[] = [
  { id: 1, name: 'Conta Corrente - Bradesco', balance: 15420.50, type: 'checking' },
  { id: 2, name: 'Conta Poupança - Bradesco', balance: 8500.00, type: 'savings' },
  { id: 3, name: 'Investimentos - XP', balance: 25000.00, type: 'investment' }
];
```

---

## Utilitários

### Arquivo: `lib/utils/currency.ts`

```typescript
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function parseCurrency(value: string): number {
  return Number(value.replace(/[^\d,-]/g, '').replace(',', '.'));
}
```

### Arquivo: `lib/utils/date.ts`

```typescript
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy', { locale: ptBR });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy HH:mm', { locale: ptBR });
}

export function formatMonthYear(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'MMMM yyyy', { locale: ptBR });
}
```

---

## Hook useFinance

### Arquivo: `lib/hooks/use-finance.ts`

```typescript
'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Receivable,
  Payable,
  FinanceSummary,
  FilterState,
  ReceivePaymentData,
  MakePaymentData
} from '@/lib/types/finance';
import {
  mockFinanceSummary,
  mockReceivables,
  mockPayables,
  mockCashFlow,
  mockUpcomingBills
} from '@/lib/mocks/finance';

export function useFinance() {
  // Estados
  const [summary] = useState<FinanceSummary>(mockFinanceSummary);
  const [receivables, setReceivables] = useState<Receivable[]>(mockReceivables);
  const [payables, setPayables] = useState<Payable[]>(mockPayables);
  const [cashFlow] = useState(mockCashFlow);
  const [upcomingBills] = useState(mockUpcomingBills);
  const [isLoading, setIsLoading] = useState(false);

  // Filtros
  const [receivableFilters, setReceivableFilters] = useState<FilterState>({
    period: 'this_month',
    status: 'all',
    category: 'all',
    search: ''
  });

  const [payableFilters, setPayableFilters] = useState<FilterState>({
    period: 'this_month',
    status: 'all',
    category: 'all',
    search: ''
  });

  // Filtrar recebíveis
  const filteredReceivables = useMemo(() => {
    return receivables.filter((item) => {
      if (receivableFilters.status !== 'all' && item.status !== receivableFilters.status) {
        return false;
      }
      if (receivableFilters.category !== 'all' && item.category !== receivableFilters.category) {
        return false;
      }
      if (receivableFilters.search) {
        const search = receivableFilters.search.toLowerCase();
        return (
          item.description.toLowerCase().includes(search) ||
          item.client.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [receivables, receivableFilters]);

  // Filtrar pagáveis
  const filteredPayables = useMemo(() => {
    return payables.filter((item) => {
      if (payableFilters.status !== 'all' && item.status !== payableFilters.status) {
        return false;
      }
      if (payableFilters.category !== 'all' && item.category !== payableFilters.category) {
        return false;
      }
      if (payableFilters.search) {
        const search = payableFilters.search.toLowerCase();
        return (
          item.description.toLowerCase().includes(search) ||
          item.supplier.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [payables, payableFilters]);

  // Ações
  const receivePayment = useCallback((data: ReceivePaymentData) => {
    setReceivables((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? {
              ...item,
              status: 'paid',
              paidDate: data.paidDate,
              paymentMethod: data.paymentMethod,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const makePayment = useCallback((data: MakePaymentData) => {
    setPayables((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? {
              ...item,
              status: 'paid',
              paidDate: data.paidDate,
              paymentMethod: data.paymentMethod,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const addReceivable = useCallback((data: Omit<Receivable, 'id' | 'createdAt' | 'updatedAt' | 'type'>) => {
    const newReceivable: Receivable = {
      ...data,
      id: Math.max(...receivables.map((r) => r.id)) + 1,
      type: 'income',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReceivables((prev) => [...prev, newReceivable]);
  }, [receivables]);

  const addPayable = useCallback((data: Omit<Payable, 'id' | 'createdAt' | 'updatedAt' | 'type'>) => {
    const newPayable: Payable = {
      ...data,
      id: Math.max(...payables.map((p) => p.id)) + 1,
      type: 'expense',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPayables((prev) => [...prev, newPayable]);
  }, [payables]);

  const deleteReceivable = useCallback((id: number) => {
    setReceivables((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const deletePayable = useCallback((id: number) => {
    setPayables((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    // Dados
    summary,
    receivables: filteredReceivables,
    payables: filteredPayables,
    cashFlow,
    upcomingBills,
    isLoading,
    
    // Filtros
    receivableFilters,
    setReceivableFilters,
    payableFilters,
    setPayableFilters,
    
    // Ações
    receivePayment,
    makePayment,
    addReceivable,
    addPayable,
    deleteReceivable,
    deletePayable
  };
}
```

---

## Páginas Principais

### 1. Dashboard Financeiro

**Arquivo:** `app/financeiro/page.tsx`

```typescript
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

      <main className="ml-0 lg:ml-64 pt-16 p-6 min-h-[calc(100vh-64px)]">
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
            <Button variant="outline" className="gap-2">
              <ArrowLeftRight className="h-4 w-4" />
              Transferência
            </Button>
            <Button variant="outline" className="gap-2">
              Conciliar
            </Button>
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
```

---

## Gráficos (Recharts)

### Configuração de Cores

```typescript
const chartColors = {
  income: '#86cb92',    // Verde UNIQ
  expense: '#ef4444',   // Vermelho
  balance: '#3e5653',   // Verde escuro UNIQ
  projection: '#3b82f6', // Azul
  grid: '#e5e7eb',      // Borda UNIQ
  text: '#627271'       // Muted UNIQ
};
```

### Exemplo de Gráfico de Projeção

```typescript
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function ProjectionChart({ data }: { data: CashFlowData[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
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
        />
        <YAxis 
          stroke="#627271"
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip 
          formatter={(value: number) => formatCurrency(value)}
          labelFormatter={(label) => format(parseISO(label), 'dd/MM/yyyy')}
        />
        <Area
          type="monotone"
          dataKey="balance"
          stroke="#86cb92"
          fillOpacity={1}
          fill="url(#colorBalance)"
          name="Saldo Acumulado"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

---

## Estados e Interações

### Diagrama de Estados - Recebimento

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   pending   │────▶│    paid     │◄────│   overdue   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                   ▲
       │                                   │
       └─────────────┬─────────────────────┘
                     │
              ┌─────────────┐
              │  scheduled  │
              └─────────────┘
```

### Diagrama de Estados - Pagamento

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   pending   │────▶│    paid     │◄────│   overdue   │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐
│  scheduled  │
└─────────────┘
```

### Handlers Principais

```typescript
// Handler de Recebimento
const handleReceive = (id: number) => {
  const receivable = receivables.find(r => r.id === id);
  if (receivable) {
    setSelectedReceivable(receivable);
    setShowReceiveModal(true);
  }
};

// Handler de Pagamento
const handlePay = (id: number) => {
  const payable = payables.find(p => p.id === id);
  if (payable) {
    setSelectedPayable(payable);
    setShowPayModal(true);
  }
};

// Handler de Confirmação de Recebimento
const handleConfirmReceive = (data: ReceivePaymentData) => {
  receivePayment(data);
  toast({
    title: 'Recebimento registrado',
    description: `Pagamento de ${formatCurrency(data.amount)} recebido com sucesso.`
  });
};

// Handler de Filtros
const handleFilterChange = (newFilters: FilterState) => {
  setFilters(newFilters);
  // Aplicar filtros nos dados
};
```

---

## Dependências

### Dependências Existentes (Já Instaladas)

```json
{
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-checkbox": "^1.3.3",
  "lucide-react": "^0.400.0",
  "date-fns": "^4.1.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0"
}
```

### Novas Dependências a Instalar

```bash
# Gráficos
npm install recharts

# Confirmação: date-fns já está instalado (v4.1.0)
```

### Estrutura de Imports Padrão

```typescript
// Componentes shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

// Ícones
import { 
  Wallet, ArrowDownLeft, ArrowUpRight, TrendingUp,
  Eye, Edit, Trash2, DollarSign, Mail, MoreHorizontal,
  Filter, Search, ChevronLeft, ChevronRight
} from 'lucide-react';

// Gráficos
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Datas
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Utilitários
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';

// Hooks
import { useState, useMemo, useCallback } from 'react';
```

---

## Critérios de Aceitação Técnicos

### ✅ Checklist de Implementação

#### Dashboard Financeiro
- [ ] Cards de métricas renderizando com dados mock
- [ ] Gráfico de fluxo de caixa (Recharts LineChart) funcionando
- [ ] Filtros de período (7d, 30d, 3m, 6m, 1a) aplicando nos dados
- [ ] Lista de contas próximas do vencimento (últimos 7 dias)
- [ ] Botões de acesso rápido abrindo modais de cadastro
- [ ] Layout responsivo (1 coluna mobile, 2 tablet, 4 desktop)

#### Contas a Receber
- [ ] Tabela renderizando com colunas completas
- [ ] Filtros funcionando (status, data, categoria, busca)
- [ ] Checkbox de seleção múltipla funcionando
- [ ] Ações em hover (visualizar, receber, editar, excluir)
- [ ] Modal de recebimento com todos os campos
- [ ] Atualização de status após recebimento
- [ ] Empty state quando não há dados

#### Contas a Pagar
- [ ] Tabela renderizando com colunas completas
- [ ] Filtros funcionando (status, categoria, fornecedor)
- [ ] Categorias visíveis com badges coloridos
- [ ] Modal de pagamento com todos os campos
- [ ] Atualização de status após pagamento
- [ ] Empty state quando não há dados

#### Fluxo de Caixa
- [ ] Calendário mensal renderizando com dados
- [ ] Navegação entre meses funcionando
- [ ] Indicadores visuais de entrada/saída por dia
- [ ] Hover mostrando detalhes das transações
- [ ] Gráfico de saldo acumulado (AreaChart)
- [ ] Projeção para próximos 30 dias
- [ ] Legenda explicativa visível

#### Componentes Compartilhados
- [ ] FinanceCard com todas as props funcionando
- [ ] StatusBadge com variantes de cor
- [ ] CategoryBadge com ícones e cores
- [ ] TransactionFilters aplicando filtros
- [ ] Modais com animações de entrada/saída
- [ ] Formulários com validação visual

#### Qualidade de Código
- [ ] Todos os componentes tipados com TypeScript
- [ ] Props documentadas e validadas
- [ ] Estados locais usando useState/useReducer
- [ ] Hooks customizados isolando lógica
- [ ] Mock data completo e variado
- [ ] Formatação de moeda e data consistente
- [ ] Cores semânticas aplicadas corretamente

#### Design System
- [ ] Cores UNIQ aplicadas (primary: #3e5653, accent: #86cb92)
- [ ] Tipografia Poppins em todos os elementos
- [ ] Espaçamentos consistentes (p-6, gap-4)
- [ ] Bordas arredondadas (rounded-xl, rounded-lg)
- [ ] Hover effects em cards e tabelas
- [ ] Transições suaves (150ms, 200ms)
- [ ] Estados de loading (skeletons)

#### Testes Visuais
- [ ] Layout responsivo em mobile (320px+)
- [ ] Layout responsivo em tablet (768px+)
- [ ] Layout responsivo em desktop (1024px+)
- [ ] Scroll horizontal em tabelas em mobile
- [ ] Cards empilhados em mobile
- [ ] Modais centralizados e responsivos

### 📁 Checklist de Arquivos Criados

```
✅ app/financeiro/page.tsx
✅ app/financeiro/receber/page.tsx
✅ app/financeiro/pagar/page.tsx
✅ app/financeiro/fluxo/page.tsx
✅ components/finance/dashboard/finance-summary-cards.tsx
✅ components/finance/dashboard/cash-flow-chart.tsx
✅ components/finance/dashboard/upcoming-bills.tsx
✅ components/finance/receivables/receivables-table.tsx
✅ components/finance/receivables/receivable-form.tsx
✅ components/finance/receivables/receive-modal.tsx
✅ components/finance/payables/payables-table.tsx
✅ components/finance/payables/payable-form.tsx
✅ components/finance/payables/pay-modal.tsx
✅ components/finance/cash-flow/cash-flow-calendar.tsx
✅ components/finance/cash-flow/cash-flow-table.tsx
✅ components/finance/cash-flow/projection-chart.tsx
✅ components/finance/shared/status-badge.tsx
✅ components/finance/shared/category-badge.tsx
✅ components/finance/shared/transaction-filters.tsx
✅ components/finance/shared/finance-card.tsx
✅ lib/mocks/finance.ts
✅ lib/hooks/use-finance.ts
✅ lib/utils/currency.ts
✅ lib/utils/date.ts
✅ lib/types/finance.ts
```

---

## Notas para o Implementador

### 1. Estrutura de Pastas
```
# Criar estrutura de diretórios
mkdir -p app/financeiro/receber
mkdir -p app/financeiro/pagar
mkdir -p app/financeiro/fluxo
mkdir -p components/finance/dashboard
mkdir -p components/finance/receivables
mkdir -p components/finance/payables
mkdir -p components/finance/cash-flow
mkdir -p components/finance/shared
mkdir -p lib/mocks
mkdir -p lib/hooks
mkdir -p lib/utils
mkdir -p lib/types
```

### 2. Ordem de Implementação Recomendada

1. **Tipos e Mocks** - Criar types/finance.ts e mocks/finance.ts primeiro
2. **Utilitários** - Criar currency.ts e date.ts
3. **Componentes Compartilhados** - StatusBadge, CategoryBadge, FinanceCard
4. **Hook useFinance** - Para gerenciar estado global dos dados
5. **Dashboard** - Página principal com cards e gráfico
6. **Contas a Receber** - Tabela e modal de recebimento
7. **Contas a Pagar** - Tabela e modal de pagamento
8. **Fluxo de Caixa** - Calendário e projeção
9. **Polish** - Ajustes finais, responsividade, empty states

### 3. Padrões de Código

**Nomenclatura:**
- Componentes: PascalCase (FinanceCard, StatusBadge)
- Hooks: camelCase com prefixo "use" (useFinance)
- Arquivos: kebab-case (finance-summary-cards.tsx)
- Tipos/interfaces: PascalCase (Receivable, CashFlowData)

**Estilos:**
- Sempre usar classes do Tailwind
- Cores do design system: `uniq-primary`, `uniq-accent`, `uniq-text`, etc.
- Espaçamentos: preferir `gap-4`, `p-6`, `mb-6`
- Bordas: `border-uniq-border`, `rounded-xl`

**Estado:**
- useState para estados simples
- useReducer para estados complexos
- useMemo para cálculos derivados
- useCallback para handlers passados como props

### 4. Importante Lembrar

- **Recharts:** Instalar com `npm install recharts`
- **date-fns:** Já está instalado (v4.1.0)
- **Formatar moeda:** Usar sempre `formatCurrency()` do utils/currency.ts
- **Formatar data:** Usar sempre `formatDate()` do utils/date.ts
- **Responsivo:** Testar em mobile, tablet e desktop
- **Empty States:** Sempre mostrar quando não há dados
- **Loading:** Usar skeletons do shadcn/ui

---

**SPEC gerada em:** 20/03/2026  
**Planner:** @vibe-planner  
**Fase:** FASE 02 - Planning (SDD)  
**Próxima Fase:** FASE 03 - Implementation (@vibe-implementer)  
**Status:** 🟢 PRONTO PARA IMPLEMENTAÇÃO

---

> ⚠️ **IMPORTANTE:** Esta SPEC deve ser usada pelo @vibe-implementer para desenvolver o código. Após aprovação desta SPEC, limpar o contexto e chamar o implementer.

> 🎯 **PRÓXIMOS PASSOS:**
> 1. Usuário deve limpar contexto do chat
> 2. Chamar @vibe-implementer para desenvolvimento
> 3. Acompanhar progresso e fazer ajustes se necessário
