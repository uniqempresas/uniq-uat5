'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Product, ProductFilters, StockStatus, ProductStatus } from '@/lib/estoque/types';
import { mockProducts, mockCategoriesFlat } from '@/lib/estoque/mock-data';
import { searchProducts, paginateArray, calculateStockStatus } from '@/lib/estoque/utils';
import { DEFAULT_PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '@/lib/estoque/constants';

// Tipo temporário para os dados do formulário (será substituído pelo componente)
export interface ProductFormData {
  name: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  description?: string;
  stock: number;
  minStock: number;
  maxStock?: number;
  unit: 'un' | 'kg' | 'L' | 'm' | 'caixa' | 'par';
  location?: string;
  cost: number;
  price: number;
  promotionalPrice?: number;
  status: 'active' | 'inactive';
  notes?: string;
}

interface UseProductsResult {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  setPage: (page: number) => void;
  refetch: () => void;
  createProduct: (data: ProductFormData) => Promise<{ success: boolean; error?: string }>;
  updateProduct: (id: string, data: ProductFormData) => Promise<{ success: boolean; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
}

export function useProducts(initialFilters?: ProductFilters): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<ProductFilters>(initialFilters || {});
  const [page, setPageState] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search || '');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search || '');
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProducts(mockProducts);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search filter
    if (debouncedSearch) {
      result = searchProducts(result, debouncedSearch);
    }

    // Category filter
    if (filters.category) {
      result = result.filter(p => p.categoryId === filters.category);
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      result = result.filter(p => p.status === (filters.status as ProductStatus));
    }

    // Stock status filter
    if (filters.stockStatus && filters.stockStatus !== 'all') {
      result = result.filter(p => p.stockStatus === (filters.stockStatus as StockStatus));
    }

    return result;
  }, [products, debouncedSearch, filters]);

  // Apply pagination
  const pagination = useMemo(() => {
    const result = paginateArray(filteredProducts, page, DEFAULT_PAGE_SIZE);
    return {
      page,
      pageSize: DEFAULT_PAGE_SIZE,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    };
  }, [filteredProducts, page]);

  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState(newFilters);
    setPageState(1); // Reset to page 1 when filters change
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  // Create product
  const createProduct = useCallback(async (data: ProductFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      // Buscar a categoria
      const category = mockCategoriesFlat.find(c => c.id === data.categoryId);

      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: data.name,
        sku: data.sku,
        barcode: data.barcode,
        categoryId: data.categoryId,
        category,
        stock: data.stock,
        minStock: data.minStock,
        maxStock: data.maxStock,
        unit: data.unit,
        location: data.location,
        cost: data.cost,
        price: data.price,
        promotionalPrice: data.promotionalPrice,
        images: [],
        description: data.description,
        status: data.status,
        stockStatus: calculateStockStatus(data.stock, data.minStock),
        hasVariations: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProducts(prev => [...prev, newProduct]);
      return { success: true };
    } catch (err) {
      console.error('Error creating product:', err);
      return { success: false, error: 'Erro ao criar produto' };
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id: string, data: ProductFormData): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      // Buscar a categoria
      const category = mockCategoriesFlat.find(c => c.id === data.categoryId);

      setProducts(prev => prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            name: data.name,
            sku: data.sku,
            barcode: data.barcode,
            categoryId: data.categoryId,
            category,
            stock: data.stock,
            minStock: data.minStock,
            maxStock: data.maxStock,
            unit: data.unit,
            location: data.location,
            cost: data.cost,
            price: data.price,
            promotionalPrice: data.promotionalPrice,
            description: data.description,
            status: data.status,
            stockStatus: calculateStockStatus(data.stock, data.minStock),
            notes: data.notes,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      }));

      return { success: true };
    } catch (err) {
      console.error('Error updating product:', err);
      return { success: false, error: 'Erro ao atualizar produto' };
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 300));

      setProducts(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      return { success: false, error: 'Erro ao excluir produto' };
    }
  }, []);

  return {
    products,
    filteredProducts: paginateArray(filteredProducts, page, DEFAULT_PAGE_SIZE).items,
    isLoading,
    error,
    pagination,
    filters,
    setFilters,
    setPage,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
