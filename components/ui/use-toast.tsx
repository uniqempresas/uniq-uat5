import { useState, useCallback } from 'react';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

interface Toast extends ToastOptions {
  id: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...options, id };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toast, toasts, dismiss };
}

// Simple toast function for direct use
export function toast(options: ToastOptions) {
  // In a real implementation, this would add to a global toast context
  // For now, just log to console
  console.log(`[${options.variant || 'default'}] ${options.title}: ${options.description}`);
}
