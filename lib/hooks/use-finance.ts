'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  Receivable,
  Payable,
  FinanceSummary,
  FilterState,
  ReceivePaymentData,
  MakePaymentData
} from '@/lib/types/finance';
import {
  mockFinanceSummary,
  mockReceivables,
  mockPayables,
  mockCashFlow,
  mockUpcomingBills
} from '@/lib/mocks/finance';

export function useFinance() {
  // Estados
  const [summary] = useState<FinanceSummary>(mockFinanceSummary);
  const [receivables, setReceivables] = useState<Receivable[]>(mockReceivables);
  const [payables, setPayables] = useState<Payable[]>(mockPayables);
  const [cashFlow] = useState(mockCashFlow);
  const [upcomingBills] = useState(mockUpcomingBills);
  const [isLoading, setIsLoading] = useState(false);

  // Filtros
  const [receivableFilters, setReceivableFilters] = useState<FilterState>({
    period: 'this_month',
    status: 'all',
    category: 'all',
    search: ''
  });

  const [payableFilters, setPayableFilters] = useState<FilterState>({
    period: 'this_month',
    status: 'all',
    category: 'all',
    search: ''
  });

  // Filtrar recebíveis
  const filteredReceivables = useMemo(() => {
    return receivables.filter((item) => {
      if (receivableFilters.status !== 'all' && item.status !== receivableFilters.status) {
        return false;
      }
      if (receivableFilters.category !== 'all' && item.category !== receivableFilters.category) {
        return false;
      }
      if (receivableFilters.search) {
        const search = receivableFilters.search.toLowerCase();
        return (
          item.description.toLowerCase().includes(search) ||
          item.client.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [receivables, receivableFilters]);

  // Filtrar pagáveis
  const filteredPayables = useMemo(() => {
    return payables.filter((item) => {
      if (payableFilters.status !== 'all' && item.status !== payableFilters.status) {
        return false;
      }
      if (payableFilters.category !== 'all' && item.category !== payableFilters.category) {
        return false;
      }
      if (payableFilters.search) {
        const search = payableFilters.search.toLowerCase();
        return (
          item.description.toLowerCase().includes(search) ||
          item.supplier.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [payables, payableFilters]);

  // Ações
  const receivePayment = useCallback((data: ReceivePaymentData) => {
    setReceivables((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? {
              ...item,
              status: 'paid',
              paidDate: data.paidDate,
              paymentMethod: data.paymentMethod,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const makePayment = useCallback((data: MakePaymentData) => {
    setPayables((prev) =>
      prev.map((item) =>
        item.id === data.id
          ? {
              ...item,
              status: 'paid',
              paidDate: data.paidDate,
              paymentMethod: data.paymentMethod,
              updatedAt: new Date().toISOString()
            }
          : item
      )
    );
  }, []);

  const addReceivable = useCallback((data: Omit<Receivable, 'id' | 'createdAt' | 'updatedAt' | 'type'>) => {
    const newReceivable: Receivable = {
      ...data,
      id: Math.max(...receivables.map((r) => r.id)) + 1,
      type: 'income',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReceivables((prev) => [...prev, newReceivable]);
  }, [receivables]);

  const addPayable = useCallback((data: Omit<Payable, 'id' | 'createdAt' | 'updatedAt' | 'type'>) => {
    const newPayable: Payable = {
      ...data,
      id: Math.max(...payables.map((p) => p.id)) + 1,
      type: 'expense',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPayables((prev) => [...prev, newPayable]);
  }, [payables]);

  const deleteReceivable = useCallback((id: number) => {
    setReceivables((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const deletePayable = useCallback((id: number) => {
    setPayables((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    // Dados
    summary,
    receivables: filteredReceivables,
    payables: filteredPayables,
    cashFlow,
    upcomingBills,
    isLoading,
    
    // Filtros
    receivableFilters,
    setReceivableFilters,
    payableFilters,
    setPayableFilters,
    
    // Ações
    receivePayment,
    makePayment,
    addReceivable,
    addPayable,
    deleteReceivable,
    deletePayable
  };
}
