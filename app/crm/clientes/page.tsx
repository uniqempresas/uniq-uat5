'use client';

import React, { useState, useMemo } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Customer, CustomerFilters, SortConfig } from '@/types/crm';
import { CustomerTable } from '@/components/crm/customers/customer-table';
import { CustomerForm } from '@/components/crm/customers/customer-form';
import { CustomerFilters as FilterBar } from '@/components/crm/customers/customer-filters';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockCustomers, mockTags } from '@/lib/mocks/crm-data';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { CustomerFormData } from '@/lib/schemas/customer-schema';

export default function CustomersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc',
  });
  const [filters, setFilters] = useState<CustomerFilters>({
    search: '',
    lastPurchaseDate: { from: null, to: null },
    totalSpent: { min: null, max: null },
    tags: [],
    hasPurchase: 'all',
  });
  const [formOpen, setFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(searchLower) ||
          c.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.tags.length > 0) {
      result = result.filter((c) =>
        filters.tags.some((tagId) => c.tags.some((t) => t.id === tagId))
      );
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [customers, debouncedSearch, filters.tags, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => ({
      key: key as keyof Customer,
      direction:
        current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleAdd = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    if (confirm(`Tem certeza que deseja excluir ${customer.name}?`)) {
      setCustomers((prev) => prev.filter((c) => c.id !== customer.id));
      toast({
        title: 'Cliente excluído',
        description: `${customer.name} foi removido com sucesso.`,
      });
    }
  };

  const handleSubmit = (data: CustomerFormData) => {
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomer.id ? { ...c, ...data } : c
        )
      );
      toast({
        title: 'Cliente atualizado',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      const newCustomer: Customer = {
        ...data,
        id: `cust-${Date.now()}`,
        totalSpent: 0,
        totalOrders: 0,
        createdAt: new Date().toISOString(),
        interactions: [],
      };
      setCustomers((prev) => [newCustomer, ...prev]);
      toast({
        title: 'Cliente criado',
        description: `${data.name} foi adicionado com sucesso.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      
      <Header
        pageTitle="Clientes"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'CRM', href: '/crm' },
          { label: 'Clientes' },
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-uniq-text">Clientes</h1>
              <p className="text-uniq-muted">
                Gerencie sua base de clientes e leads
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button onClick={handleAdd} className="bg-uniq-primary hover:bg-uniq-hover">
                <Plus className="w-4 h-4 mr-2" />
                Novo Cliente
              </Button>
            </div>
          </div>

          <FilterBar filters={filters} onFiltersChange={setFilters} tags={mockTags} />

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 p-2 bg-uniq-platinum rounded-lg border border-uniq-border">
              <span className="text-sm text-uniq-text">
                {selectedIds.length} cliente(s) selecionado(s)
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                Limpar seleção
              </Button>
            </div>
          )}

          <CustomerTable
            customers={filteredCustomers}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedIds={selectedIds}
            onSelect={setSelectedIds}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          <CustomerForm
            customer={editingCustomer}
            open={formOpen}
            onOpenChange={setFormOpen}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}
