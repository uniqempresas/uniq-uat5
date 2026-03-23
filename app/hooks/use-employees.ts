'use client';

import { useState, useEffect, useCallback } from 'react';
import { Employee, EmployeeFormData, EmployeeFilters } from '@/types/employee';
import { mockEmployees } from '@/lib/mocks';

interface UseEmployeesReturn {
  employees: Employee[];
  filteredEmployees: Employee[];
  loading: boolean;
  error: string | null;
  addEmployee: (data: EmployeeFormData) => Promise<void>;
  updateEmployee: (id: string, data: EmployeeFormData) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  deactivateEmployee: (id: string) => Promise<void>;
  activateEmployee: (id: string) => Promise<void>;
  resendInvite: (id: string) => Promise<void>;
  refetch: () => void;
  filters: EmployeeFilters;
  setFilters: (filters: EmployeeFilters) => void;
  resetFilters: () => void;
}

const defaultFilters: EmployeeFilters = {
  search: '',
  status: 'all',
  role: 'all',
  view: 'cards',
};

export function useEmployees(): UseEmployeesReturn {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EmployeeFilters>(defaultFilters);

  // Simulate API fetch
  const fetchEmployees = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate network delay
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Filter employees
  const filteredEmployees = employees.filter((employee) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = employee.name.toLowerCase().includes(searchLower);
      const matchesEmail = employee.email.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesEmail) return false;
    }

    // Status filter
    if (filters.status !== 'all' && employee.status !== filters.status) {
      return false;
    }

    // Role filter
    if (filters.role !== 'all' && employee.role !== filters.role) {
      return false;
    }

    return true;
  });

  const addEmployee = async (data: EmployeeFormData): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEmployee: Employee = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      role: data.role,
      status: 'pending',
      modules: data.modules,
      createdAt: new Date(),
      updatedAt: new Date(),
      invitedAt: new Date(),
      inviteExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    setLoading(false);
  };

  const updateEmployee = async (id: string, data: EmployeeFormData): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        return {
          ...emp,
          name: data.name,
          email: data.email,
          phone: data.phone,
          position: data.position,
          role: data.role,
          modules: data.modules,
          updatedAt: new Date(),
        };
      }
      return emp;
    }));
    
    setLoading(false);
  };

  const deleteEmployee = async (id: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setLoading(false);
  };

  const deactivateEmployee = async (id: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: 'inactive' as const, updatedAt: new Date() };
      }
      return emp;
    }));
    
    setLoading(false);
  };

  const activateEmployee = async (id: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: 'active' as const, updatedAt: new Date() };
      }
      return emp;
    }));
    
    setLoading(false);
  };

  const resendInvite = async (id: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === id) {
        return {
          ...emp,
          invitedAt: new Date(),
          inviteExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date(),
        };
      }
      return emp;
    }));
    
    setLoading(false);
  };

  const resetFilters = () => setFilters(defaultFilters);

  return {
    employees,
    filteredEmployees,
    loading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deactivateEmployee,
    activateEmployee,
    resendInvite,
    refetch: fetchEmployees,
    filters,
    setFilters,
    resetFilters,
  };
}
