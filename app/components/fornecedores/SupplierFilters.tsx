// ============================================
// COMPONENT: SupplierFilters - Filtros e Abas de Status
// ============================================

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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, X } from 'lucide-react';
import { SupplierFiltersProps, SupplierStatus } from '@/app/types/suppliers';

export function SupplierFilters({ 
  filters, 
  onChange, 
  categories,
  statusCounts 
}: SupplierFiltersProps) {
  const handleStatusChange = (status: string) => {
    onChange({
      ...filters,
      status: status as SupplierStatus | 'all',
    });
  };

  const handleCategoryChange = (category: string) => {
    onChange({
      ...filters,
      category: category === 'all' ? null : category,
    });
  };

  const handleSearchChange = (search: string) => {
    onChange({
      ...filters,
      search,
    });
  };

  const clearFilters = () => {
    onChange({
      search: '',
      category: null,
      status: 'all',
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.status !== 'all';

  return (
    <div className="space-y-4">
      {/* Tabs de Status */}
      <Tabs 
        value={filters.status} 
        onValueChange={handleStatusChange}
        className="w-full"
      >
        <TabsList className="bg-gray-100 p-1 rounded-lg w-full justify-start overflow-x-auto">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Todos ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
          >
            Ativos ({statusCounts.active})
          </TabsTrigger>
          <TabsTrigger 
            value="inactive"
            className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
          >
            Inativos ({statusCounts.inactive})
          </TabsTrigger>
          <TabsTrigger 
            value="pending"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700"
          >
            Em Análise ({statusCounts.pending})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filtros de Busca e Categoria */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por nome, CNPJ/CPF ou email..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {filters.search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <Select
          value={filters.category || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Limpar filtros
          </Button>
        )}
      </div>
    </div>
  );
}