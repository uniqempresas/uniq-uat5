// hooks/marketplace/use-seller-orders.ts
'use client';

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Order, OrderFilters, OrderStatus } from '@/types/marketplace';
import { mockGetSellerOrders } from '@/lib/mocks/marketplace';

export function useSellerOrders(sellerId: string, initialFilters?: Partial<OrderFilters>) {
  const [filters, setFilters] = useState<OrderFilters>({
    page: 1,
    limit: 10,
    ...initialFilters,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['seller-orders', sellerId, filters],
    queryFn: async () => {
      const response = await mockGetSellerOrders(sellerId, filters);
      return response;
    },
    enabled: !!sellerId,
  });

  const updateFilters = useCallback((newFilters: Partial<OrderFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  return {
    orders: data?.data ?? [],
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    currentPage: filters.page ?? 1,
    isLoading,
    error,
    filters,
    updateFilters,
  };
}

// Hook for order status mutations
export function useOrderStatus() {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatus;
    }) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In real app, would call API
      return { orderId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-orders'] });
    },
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}
