// ============================================
// HOOK: useCEPSearch - Busca de Endereço por CEP
// ============================================

'use client';

import { useState, useCallback } from 'react';
import { CEPResult, Address } from '@/app/types/suppliers';
import { mockCEPData } from '@/app/lib/mocks/cep';

export function useCEPSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca endereço por CEP (simulado)
   */
  const searchCEP = useCallback(async (cep: string): Promise<CEPResult | null> => {
    if (!cep || cep.length < 8) {
      setError('CEP inválido');
      return null;
    }

    setLoading(true);
    setError(null);

    // Simular delay de API (300-800ms)
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));

    // Remove máscara do CEP para busca
    const cleanCEP = cep.replace(/\D/g, '');
    const result = mockCEPData[cleanCEP];

    if (result) {
      setLoading(false);
      return result;
    } else {
      setError('CEP não encontrado');
      setLoading(false);
      return null;
    }
  }, []);

  /**
   * Converte resultado de CEP para formato de Endereço
   */
  const convertToAddress = useCallback((cepResult: CEPResult, number: string = '', complement: string = ''): Address => {
    return {
      cep: cepResult.cep,
      street: cepResult.logradouro,
      number,
      complement,
      neighborhood: cepResult.bairro,
      city: cepResult.cidade,
      state: cepResult.estado,
    };
  }, []);

  /**
   * Limpa o erro atual
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Limpa todos os estados
   */
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    // States
    loading,
    error,
    
    // Functions
    searchCEP,
    convertToAddress,
    clearError,
    reset,
  };
}