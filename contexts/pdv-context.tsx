'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { UsePDVReturn, usePDV } from '@/hooks/use-pdv';

const PDVContext = createContext<UsePDVReturn | undefined>(undefined);

export function PDVProvider({ children }: { children: ReactNode }) {
  const pdv = usePDV();
  
  return (
    <PDVContext.Provider value={pdv}>
      {children}
    </PDVContext.Provider>
  );
}

export function usePDVContext() {
  const context = useContext(PDVContext);
  if (context === undefined) {
    throw new Error('usePDVContext must be used within a PDVProvider');
  }
  return context;
}
