'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { useCategories } from '@/hooks/use-categories';
import { ProductCard } from '@/components/estoque/products/product-card';
import { ProductListItem } from '@/components/estoque/products/product-list-item';
import { ProductFilters } from '@/components/estoque/products/product-filters';
import { ProductDrawer } from '@/components/estoque/products/product-drawer';
import { DeleteConfirmationDialog } from '@/components/estoque/products/delete-confirmation-dialog';
import { ProductFormData } from '@/components/estoque/products/product-form';
import { Sidebar } from '@/components/sidebar';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

export default function ProdutosPage() {
  const { categories } = useCategories();
  const { filteredProducts, isLoading, pagination, filters, setFilters, createProduct, updateProduct, deleteProduct } = useProducts();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // CRUD state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Handlers
  const handleNewProduct = () => {
    setSelectedProduct(null);
    setDrawerOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    setIsSaving(true);
    try {
      let result;
      if (selectedProduct) {
        result = await updateProduct(selectedProduct.id, data);
      } else {
        result = await createProduct(data);
      }

      if (result.success) {
        toast({
          title: selectedProduct ? 'Produto atualizado' : 'Produto criado',
          description: selectedProduct 
            ? 'O produto foi atualizado com sucesso.' 
            : 'O produto foi criado com sucesso.',
          variant: 'success',
        });
        setDrawerOpen(false);
        setSelectedProduct(null);
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Ocorreu um erro ao salvar o produto.',
          variant: 'error',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsSaving(true);
    try {
      const result = await deleteProduct(productToDelete.id);
      
      if (result.success) {
        toast({
          title: 'Produto excluído',
          description: 'O produto foi excluído com sucesso.',
          variant: 'success',
        });
        setDeleteDialogOpen(false);
        setProductToDelete(null);
      } else {
        toast({
          title: 'Erro',
          description: result.error || 'Ocorreu um erro ao excluir o produto.',
          variant: 'error',
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#efefef] flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold text-[#1f2937]">Produtos</h1>
            <p className="text-sm text-[#627271]">{pagination.totalItems} produtos cadastrados</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleNewProduct}
              className="flex items-center gap-2 px-4 py-2 bg-[#86cb92] text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Filters */}
          <ProductFilters
            categories={categories}
            selectedCategory={filters.category}
            selectedStatus={filters.status}
            selectedStockStatus={filters.stockStatus}
            searchQuery={filters.search}
            viewMode={viewMode}
            onCategoryChange={(cat) => setFilters({ ...filters, category: cat })}
            onStatusChange={(status) => setFilters({ ...filters, status })}
            onStockStatusChange={(stockStatus) => setFilters({ ...filters, stockStatus })}
            onSearchChange={(search) => setFilters({ ...filters, search })}
            onViewModeChange={setViewMode}
          />

          {/* Products */}
          {isLoading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'bg-white rounded-xl shadow-sm border border-gray-200'}>
              {viewMode === 'grid' ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <Skeleton className="aspect-square rounded-t-xl" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                ))
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Produto</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">SKU</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Estoque</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Preço</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-3"><Skeleton className="h-8 w-48" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                        <td className="px-4 py-3"><Skeleton className="h-6 w-16" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1f2937] mb-2">Nenhum produto encontrado</h3>
              <p className="text-sm text-[#627271] mb-6">Cadastre seu primeiro produto para começar</p>
              <button
                onClick={handleNewProduct}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={() => handleEditProduct(product)}
                  onDelete={() => handleDeleteClick(product)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <ProductListItem 
                      key={product.id} 
                      product={product}
                      onEdit={() => handleEditProduct(product)}
                      onDelete={() => handleDeleteClick(product)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-[#627271]">
                Mostrando {((pagination.page - 1) * pagination.pageSize) + 1} a{' '}
                {Math.min(pagination.page * pagination.pageSize, pagination.totalItems)} de{' '}
                {pagination.totalItems} produtos
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {}}
                  disabled={pagination.page === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {}}
                    className={`px-3 py-1.5 border rounded-lg text-sm ${
                      pagination.page === i + 1
                        ? 'bg-[#3e5653] text-white border-[#3e5653]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => {}}
                  disabled={pagination.page === pagination.totalPages}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Próximo
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Drawer */}
      <ProductDrawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        categories={categories}
        onSave={handleSaveProduct}
        isLoading={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setProductToDelete(null);
        }}
        productName={productToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
        isLoading={isSaving}
      />
    </div>
  );
}
