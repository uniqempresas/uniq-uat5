// hooks/marketplace/use-seller.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import type { Seller } from '@/types/marketplace';
import { mockGetSellerBySlug } from '@/lib/mocks/marketplace';

export function useSeller(slug: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['seller', slug],
    queryFn: async () => {
      const response = await mockGetSellerBySlug(slug);
      return response;
    },
    enabled: !!slug,
  });

  return {
    seller: data ?? null,
    isLoading,
    error,
  };
}
