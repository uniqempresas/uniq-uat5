'use client';

import { useEffect, useCallback } from 'react';

export interface KeyboardShortcuts {
  'F1': () => void;
  'F2': () => void;
  'F3': () => void;
  'F4': () => void;
  'F5': () => void;
  'F6': () => void;
  'F7': () => void;
  'F8': () => void;
  'F9': () => void;
  'F10': () => void;
  'F11': () => void;
  'F12': () => void;
}

export function useKeyboardShortcuts(shortcuts: Partial<KeyboardShortcuts>) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Verificar se é um atalho F1-F12
    if (!event.key.startsWith('F')) return;
    
    // Não interceptar se estiver em um input/textarea (exceto F2)
    const target = event.target as HTMLElement;
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
    
    if (isInput && event.key !== 'F2') return;
    
    const handler = shortcuts[event.key as keyof KeyboardShortcuts];
    
    if (handler) {
      event.preventDefault();
      handler();
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
