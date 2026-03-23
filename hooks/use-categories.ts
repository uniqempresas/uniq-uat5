'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/lib/estoque/types';
import { mockCategories, mockCategoriesFlat } from '@/lib/estoque/mock-data';
import { buildCategoryTree } from '@/lib/estoque/utils';

interface UseCategoriesResult {
  categories: Category[];
  categoryTree: Category[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Flat list
      setCategories(mockCategoriesFlat);
      
      // Build tree structure
      setCategoryTree(buildCategoryTree(mockCategories));
    } catch (err) {
      setError('Erro ao carregar categorias');
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    categoryTree,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}
