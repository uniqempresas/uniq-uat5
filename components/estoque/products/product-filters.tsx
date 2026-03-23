'use client';

import { Category, ProductStatus, StockStatus } from '@/lib/estoque/types';
import { HierarchicalSelect } from '../shared/hierarchical-select';
import { Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

interface ProductFiltersProps {
  categories: Category[];
  selectedCategory?: string;
  selectedStatus?: ProductStatus | 'all';
  selectedStockStatus?: StockStatus | 'all';
  searchQuery?: string;
  viewMode?: 'grid' | 'list';
  onCategoryChange?: (categoryId: string) => void;
  onStatusChange?: (status: ProductStatus | 'all') => void;
  onStockStatusChange?: (status: StockStatus | 'all') => void;
  onSearchChange?: (query: string) => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function ProductFilters({
  categories,
  selectedCategory,
  selectedStatus,
  selectedStockStatus,
  searchQuery,
  viewMode = 'grid',
  onCategoryChange,
  onStatusChange,
  onStockStatusChange,
  onSearchChange,
  onViewModeChange,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#627271]" />
          <input
            type="text"
            placeholder="Buscar por nome, SKU ou código..."
            value={searchQuery || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <HierarchicalSelect
          categories={categories}
          value={selectedCategory || ''}
          onChange={(value) => onCategoryChange?.(value)}
          placeholder="Todas as categorias"
        />

        {/* Status Filter */}
        <select
          value={selectedStatus || 'all'}
          onChange={(e) => onStatusChange?.(e.target.value as ProductStatus | 'all')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent bg-white"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>

        {/* Stock Status Filter */}
        <select
          value={selectedStockStatus || 'all'}
          onChange={(e) => onStockStatusChange?.(e.target.value as StockStatus | 'all')}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#86cb92] focus:border-transparent bg-white"
        >
          <option value="all">Todos os estoques</option>
          <option value="ok">OK</option>
          <option value="low">Baixo</option>
          <option value="critical">Crítico</option>
          <option value="out">Esgotado</option>
        </select>

        {/* More Filters Button */}
        <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Mais Filtros</span>
        </button>

        {/* View Mode Toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 ml-auto">
          <button
            onClick={() => onViewModeChange?.('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-[#1f2937] shadow-sm'
                : 'text-[#627271] hover:text-[#1f2937]'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange?.('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-white text-[#1f2937] shadow-sm'
                : 'text-[#627271] hover:text-[#1f2937]'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
