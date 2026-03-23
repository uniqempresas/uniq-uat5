// hooks/marketplace/use-my-store.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Seller, SellerMetrics, SellerUpdateInput } from '@/types/marketplace';
import { mockGetMyStore, mockGetSellerMetrics, mockUpdateMyStore } from '@/lib/mocks/marketplace';

export function useMyStore() {
  const queryClient = useQueryClient();

  const { data: seller, isLoading: isLoadingSeller, error: sellerError } = useQuery({
    queryKey: ['my-store'],
    queryFn: async () => {
      const store = await mockGetMyStore();
      return store;
    },
  });

  const { data: metrics, isLoading: isLoadingMetrics, error: metricsError } = useQuery({
    queryKey: ['my-store-metrics'],
    queryFn: async () => {
      if (!seller?.id) return null;
      const sellerMetrics = await mockGetSellerMetrics(seller.id);
      return sellerMetrics;
    },
    enabled: !!seller?.id,
  });

  const updateMutation = useMutation({
    mutationFn: async (data: SellerUpdateInput) => {
      if (!seller?.id) throw new Error('No store');
      await mockUpdateMyStore(seller.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-store'] });
    },
  });

  return {
    seller: seller ?? null,
    metrics: metrics ?? null,
    isLoading: isLoadingSeller || isLoadingMetrics,
    error: sellerError || metricsError,
    isNoStore: !isLoadingSeller && !seller,
    updateStore: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
