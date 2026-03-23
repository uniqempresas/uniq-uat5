// hooks/marketplace/use-seller-products.ts
'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product, ProductFilters } from '@/types/marketplace';
import { mockGetSellerProducts } from '@/lib/mocks/marketplace';

export function useSellerProducts(sellerId: string, initialFilters?: Partial<ProductFilters>) {
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sort: 'newest',
    ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-products', sellerId, filters],
    queryFn: async () => {
      const response = await mockGetSellerProducts(sellerId, filters);
      return response;
    },
    enabled: !!sellerId,
  });

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ page: 1, limit: 12, sort: 'newest' });
  }, []);

  return {
    products: data?.data ?? [],
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
