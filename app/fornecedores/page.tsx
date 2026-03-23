// ============================================
// COMPONENT: FornecedoresList - Página de Listagem de Fornecedores
// ============================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useSuppliers } from '@/app/hooks/use-suppliers';
import { Supplier } from '@/app/types/suppliers';
import { SupplierGrid } from '@/app/components/fornecedores/SupplierGrid';
import { SupplierFilters } from '@/app/components/fornecedores/SupplierFilters';
import { SupplierDetailsDrawer } from '@/app/components/fornecedores/SupplierDetailsDrawer';

export default function FornecedoresPage() {
  const router = useRouter();
  const {
    suppliers,
    loading,
    filters,
    setFilters,
    statusCounts,
    categories,
    deleteSupplier,
    updateSupplier,
  } = useSuppliers();

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleView = (id: string) => {
    const supplier = suppliers.find(s => s.id === id) || null;
    setSelectedSupplier(supplier);
    setDrawerOpen(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/fornecedores/${id}/editar`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      deleteSupplier(id);
    }
  };

  const handleAddNew = () => {
    router.push('/fornecedores/novo');
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedSupplier(null);
  };

  const handleEditFromDrawer = (id: string) => {
    setDrawerOpen(false);
    router.push(`/fornecedores/${id}/editar`);
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Fornecedores" />
      
      <main className="ml-0 lg:ml-64 pt-16">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fornecedores</h1>
              <p className="text-gray-500 mt-1">
                Gerencie seus fornecedores e parceiros comerciais
              </p>
            </div>
            <Button 
              onClick={handleAddNew}
              className="gap-2 bg-uniq-primary hover:bg-uniq-hover"
            >
              <Plus className="w-4 h-4" />
              Novo Fornecedor
            </Button>
          </div>

          {/* Filtros */}
          <div className="mb-6">
            <SupplierFilters
              filters={filters}
              onChange={setFilters}
              categories={categories}
              statusCounts={statusCounts}
            />
          </div>

          {/* Grid de Fornecedores */}
          <SupplierGrid
            suppliers={suppliers}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
          />

          {/* Drawer de Detalhes */}
          <SupplierDetailsDrawer
            supplier={selectedSupplier}
            open={drawerOpen}
            onClose={handleCloseDrawer}
            onEdit={handleEditFromDrawer}
          />
        </div>
      </main>
    </div>
  );
}
