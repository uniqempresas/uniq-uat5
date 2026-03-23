'use client';

import { useState, useEffect, useCallback } from 'react';
import { StockMetrics, StockAlert, TopProduct } from '@/lib/estoque/types';
import { mockStockMetrics, mockAlerts, mockTopProducts } from '@/lib/estoque/mock-data';
import { METRICS_REFRESH_INTERVAL_MS } from '@/lib/estoque/constants';

interface UseStockMetricsResult {
  metrics: StockMetrics | null;
  alerts: StockAlert[];
  topProducts: TopProduct[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStockMetrics(): UseStockMetricsResult {
  const [metrics, setMetrics] = useState<StockMetrics | null>(null);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMetrics(mockStockMetrics);
      setAlerts(mockAlerts);
      setTopProducts(mockTopProducts);
    } catch (err) {
      setError('Erro ao carregar métricas do estoque');
      console.error('Error fetching stock metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();

    // Polling para atualização automática
    const interval = setInterval(fetchMetrics, METRICS_REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchMetrics]);

  return {
    metrics,
    alerts,
    topProducts,
    isLoading,
    error,
    refetch: fetchMetrics,
  };
}
