// hooks/marketplace/use-sellers.ts
'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Seller, SellerFilters, PaginatedResponse } from '@/types/marketplace';
import { mockGetSellers } from '@/lib/mocks/marketplace';

export function useSellers(initialFilters?: Partial<SellerFilters>) {
  const [filters, setFilters] = useState<SellerFilters>({
    page: 1,
    limit: 12,
    sort: 'relevance',
    ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['sellers', filters],
    queryFn: async () => {
      const response = await mockGetSellers(filters);
      return response;
    },
  });

  const updateFilters = useCallback((newFilters: Partial<SellerFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12, sort: 'relevance' });
  }, []);

  return {
    sellers: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    currentPage: filters.page ?? 1,
    isLoading,
    error,
    filters,
    updateFilters,
    resetFilters,
  };
}
