'use client';

import { useState, useCallback } from 'react';

export function useProfessionalFilter(initialSelected: string[] = []) {
  const [selectedProfessionals, setSelectedProfessionals] = useState<string[]>(initialSelected);

  const toggleProfessional = useCallback((id: string) => {
    setSelectedProfessionals(prev => {
      if (prev.includes(id)) {
        return prev.filter(profId => profId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const selectAll = useCallback((ids: string[]) => {
    setSelectedProfessionals(ids);
  }, []);

  const clearAll = useCallback(() => {
    setSelectedProfessionals([]);
  }, []);

  const isSelected = useCallback((id: string) => {
    return selectedProfessionals.length === 0 || selectedProfessionals.includes(id);
  }, [selectedProfessionals]);

  return {
    selectedProfessionals,
    toggleProfessional,
    selectAll,
    clearAll,
    isSelected
  };
}
