'use client';

import { useState, useCallback, useRef } from 'react';

export function useTypingIndicator(delayMs: number = 2000) {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const triggerTyping = useCallback(() => {
    setIsTyping(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Simula resposta após delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, delayMs);
  }, [delayMs]);
  
  const stopTyping = useCallback(() => {
    setIsTyping(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);
  
  return { isTyping, triggerTyping, stopTyping };
}
