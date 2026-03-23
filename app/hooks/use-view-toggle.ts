'use client';

import { useState, useEffect, useCallback } from 'react';
import { EmployeeFilters, VIEW_MODE_STORAGE_KEY } from '@/types/employee';

interface UseViewToggleReturn {
  view: 'cards' | 'table';
  setView: (view: 'cards' | 'table') => void;
  toggle: () => void;
}

export function useViewToggle(): UseViewToggleReturn {
  const [view, setViewState] = useState<'cards' | 'table'>('cards');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      if (stored === 'cards' || stored === 'table') {
        setViewState(stored);
      }
      setIsInitialized(true);
    }
  }, []);

  // Persist to localStorage when view changes
  const setView = useCallback((newView: 'cards' | 'table') => {
    setViewState(newView);
    if (typeof window !== 'undefined') {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, newView);
    }
  }, []);

  const toggle = useCallback(() => {
    setView(view === 'cards' ? 'table' : 'cards');
  }, [view, setView]);

  return {
    view: isInitialized ? view : 'cards',
    setView,
    toggle,
  };
}
