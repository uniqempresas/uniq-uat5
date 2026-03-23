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
