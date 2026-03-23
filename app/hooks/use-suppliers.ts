// ============================================
// HOOK: useSuppliers - Gerenciamento de Fornecedores
// ============================================

'use client';

import { useState, useCallback, useMemo } from 'react';
import { Supplier, SupplierFilters } from '@/app/types/suppliers';
import { mockSuppliers } from '@/app/lib/mocks/suppliers';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SupplierFilters>({
    search: '',
    category: null,
    status: 'all',
  });

  /**
   * Fornecedores filtrados com base nos filtros atuais
   */
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      // Filtro de busca por nome, documento ou razão social
      if (filters.search) {
        const search = filters.search.toLowerCase();
        const matchesSearch = 
          supplier.name.toLowerCase().includes(search) ||
          supplier.document.includes(search) ||
          supplier.legalName.toLowerCase().includes(search) ||
          (supplier.email?.toLowerCase().includes(search) ?? false);
        
        if (!matchesSearch) return false;
      }

      // Filtro de categoria
      if (filters.category && supplier.category !== filters.category) {
        return false;
      }

      // Filtro de status
      if (filters.status !== 'all' && supplier.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [suppliers, filters]);

  /**
   * Contagem de fornecedores por status
   */
  const statusCounts = useMemo(() => ({
    all: suppliers.length,
    active: suppliers.filter(s => s.status === 'active').length,
    inactive: suppliers.filter(s => s.status === 'inactive').length,
    pending: suppliers.filter(s => s.status === 'pending').length,
  }), [suppliers]);

  /**
   * Lista de categorias únicas com contagem
   */
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    suppliers.forEach(s => {
      categoryMap.set(s.category, (categoryMap.get(s.category) || 0) + 1);
    });
    return Array.from(categoryMap.entries()).map(([id, count]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      count,
    }));
  }, [suppliers]);

  /**
   * Retorna um fornecedor pelo ID
   */
  const getSupplierById = useCallback((id: string) => {
    return suppliers.find(s => s.id === id) || null;
  }, [suppliers]);

  /**
   * Cria um novo fornecedor
   */
  const createSupplier = useCallback((
    data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>
  ): Supplier => {
    setLoading(true);
    
    const now = new Date().toISOString();
    const newSupplier: Supplier = {
      ...data,
      id: `sup-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    
    setSuppliers(prev => [newSupplier, ...prev]);
    setLoading(false);
    
    return newSupplier;
  }, []);

  /**
   * Atualiza um fornecedor existente
   */
  const updateSupplier = useCallback((id: string, data: Partial<Supplier>) => {
    setLoading(true);
    
    setSuppliers(prev => prev.map(s => 
      s.id === id 
        ? { ...s, ...data, updatedAt: new Date().toISOString() }
        : s
    ));
    
    setLoading(false);
  }, []);

  /**
   * Remove um fornecedor
   */
  const deleteSupplier = useCallback((id: string) => {
    setLoading(true);
    setSuppliers(prev => prev.filter(s => s.id !== id));
    setLoading(false);
  }, []);

  /**
   * Limpa todos os filtros
   */
  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: null,
      status: 'all',
    });
  }, []);

  return {
    // Data
    suppliers: filteredSuppliers,
    allSuppliers: suppliers,
    loading,
    
    // Filters
    filters,
    setFilters,
    clearFilters,
    
    // Statistics
    statusCounts,
    categories,
    
    // Actions
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  };
}