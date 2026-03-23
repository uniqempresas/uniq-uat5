// ============================================
// COMPONENT: SupplierGrid - Grid Responsivo de Fornecedores
// ============================================

'use client';

import { SupplierGridProps } from '@/app/types/suppliers';
import { SupplierCard } from './SupplierCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export function SupplierGrid({ 
  suppliers, 
  loading = false, 
  onView, 
  onEdit, 
  onDelete,
  onAddNew 
}: SupplierGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-5 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="w-12 h-12 rounded-lg" />
              <Skeleton className="w-20 h-5" />
            </div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-5 w-20" />
            <div className="pt-4 border-t">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhum fornecedor encontrado
        </h3>
        <p className="text-gray-500 mb-6">
          Comece adicionando seu primeiro fornecedor
        </p>
        <Button onClick={onAddNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar Fornecedor
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}