// hooks/marketplace/use-product-crud.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, ProductCreateInput, ProductUpdateInput } from '@/types/marketplace';
import { mockCreateProduct, mockUpdateProduct, mockDeleteProduct, mockDuplicateProduct } from '@/lib/mocks/marketplace';

export function useProductCrud() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: ProductCreateInput) => {
      const newProduct = await mockCreateProduct(data);
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['my-store-metrics'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductUpdateInput }) => {
      await mockUpdateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['my-store-metrics'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await mockDeleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['my-store-metrics'] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (id: string) => {
      const duplicate = await mockDuplicateProduct(id);
      return duplicate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['my-store-metrics'] });
    },
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    duplicate: duplicateMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isDuplicating: duplicateMutation.isPending,
  };
}
