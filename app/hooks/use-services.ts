"use client";

import { useState, useMemo, useCallback } from "react";
import { mockServices, mockServiceCategories } from "@/lib/mocks/services";
import type { Service, ServiceFilters, ServiceFormData } from "@/app/types/service";

interface UseServicesReturn {
  // Estado
  services: Service[];
  loading: boolean;
  error: string | null;
  
  // Filtros
  filters: ServiceFilters;
  setFilters: (filters: ServiceFilters) => void;
  filteredServices: Service[];
  
  // Ações
  toggleServiceActive: (id: number, active: boolean) => void;
  createService: (data: ServiceFormData) => Promise<Service>;
  updateService: (id: number, data: ServiceFormData) => Promise<Service>;
  deleteService: (id: number) => Promise<void>;
  
  // Dados auxiliares
  categories: typeof mockServiceCategories;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ServiceFilters>({
    search: '',
    category: null,
    minPrice: null,
    maxPrice: null,
    status: 'all',
  });

  // Filtrar serviços
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Filtro de busca
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          service.name.toLowerCase().includes(searchLower) ||
          service.description?.toLowerCase().includes(searchLower) ||
          service.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Filtro de categoria
      if (filters.category && service.category !== filters.category) {
        return false;
      }

      // Filtro de preço
      if (filters.minPrice !== null && service.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && service.price > filters.maxPrice) {
        return false;
      }

      // Filtro de status
      if (filters.status === 'active' && !service.active) {
        return false;
      }
      if (filters.status === 'inactive' && service.active) {
        return false;
      }

      return true;
    });
  }, [services, filters]);

  // Toggle ativo/inativo
  const toggleServiceActive = useCallback((id: number, active: boolean) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, active } : service
      )
    );
  }, []);

  // Criar serviço
  const createService = useCallback(async (data: ServiceFormData): Promise<Service> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newService: Service = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) => [...prev, newService]);
    setLoading(false);
    return newService;
  }, []);

  // Atualizar serviço
  const updateService = useCallback(async (id: number, data: ServiceFormData): Promise<Service> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedService: Service = {
      ...data,
      id,
      createdAt: services.find((s) => s.id === id)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) =>
      prev.map((service) => (service.id === id ? updatedService : service))
    );
    setLoading(false);
    return updatedService;
  }, [services]);

  // Deletar serviço
  const deleteService = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 300));

    setServices((prev) => prev.filter((service) => service.id !== id));
    setLoading(false);
  }, []);

  return {
    services,
    loading,
    error,
    filters,
    setFilters,
    filteredServices,
    toggleServiceActive,
    createService,
    updateService,
    deleteService,
    categories: mockServiceCategories,
  };
}
