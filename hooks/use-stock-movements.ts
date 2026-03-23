'use client';

import { useState, useEffect, useCallback } from 'react';
import { StockMovement, StockMovementFilters, StockMovementType } from '@/lib/estoque/types';
import { mockMovements } from '@/lib/estoque/mock-data';
import { paginateArray } from '@/lib/estoque/utils';

interface UseStockMovementsResult {
  movements: StockMovement[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  filters: StockMovementFilters;
  setFilters: (filters: StockMovementFilters) => void;
  setPage: (page: number) => void;
  refetch: () => void;
}

const PAGE_SIZE = 20;

export function useStockMovements(initialFilters?: StockMovementFilters): UseStockMovementsResult {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<StockMovementFilters>(initialFilters || {});
  const [page, setPageState] = useState(1);

  const fetchMovements = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMovements(mockMovements);
    } catch (err) {
      setError('Erro ao carregar movimentações');
      console.error('Error fetching movements:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  // Apply filters
  const filteredMovements = movements.filter(movement => {
    // Type filter
    if (filters.type && filters.type !== 'all') {
      if (movement.type !== (filters.type as StockMovementType)) return false;
    }

    // Product filter
    if (filters.productId) {
      if (movement.productId !== filters.productId) return false;
    }

    // Date range filter
    if (filters.startDate) {
      const movementDate = new Date(movement.createdAt);
      const startDate = new Date(filters.startDate);
      if (movementDate < startDate) return false;
    }

    if (filters.endDate) {
      const movementDate = new Date(movement.createdAt);
      const endDate = new Date(filters.endDate);
      if (movementDate > endDate) return false;
    }

    return true;
  });

  // Apply pagination
  const paginatedResult = paginateArray(filteredMovements, page, PAGE_SIZE);
  const pagination = {
    page,
    pageSize: PAGE_SIZE,
    totalPages: paginatedResult.totalPages,
    totalItems: paginatedResult.totalItems,
  };

  const setFilters = useCallback((newFilters: StockMovementFilters) => {
    setFiltersState(newFilters);
    setPageState(1);
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  return {
    movements: paginatedResult.items,
    isLoading,
    error,
    pagination,
    filters,
    setFilters,
    setPage,
    refetch: fetchMovements,
  };
}
