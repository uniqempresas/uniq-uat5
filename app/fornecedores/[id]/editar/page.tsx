// ============================================
// PAGE: Editar Fornecedor
// ============================================

'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useSuppliers } from '@/app/hooks/use-suppliers';
import { SupplierForm } from '@/app/components/fornecedores/SupplierForm';
import { SupplierFormData, Supplier } from '@/app/types/suppliers';

export default function EditarFornecedorPage() {
  const router = useRouter();
  const params = useParams();
  const { getSupplierById, updateSupplier } = useSuppliers();
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundSupplier = getSupplierById(id);
    setSupplier(foundSupplier);
    setLoading(false);
  }, [params.id, getSupplierById]);

  const handleSubmit = (data: SupplierFormData) => {
    if (supplier) {
      updateSupplier(supplier.id, data);
      router.push('/fornecedores');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-uniq-platinum flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-uniq-primary" />
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-uniq-platinum flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Fornecedor não encontrado</h2>
          <Button onClick={() => router.push('/fornecedores')} className="mt-4">
            Voltar para lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Editar Fornecedor" />
      
      <main className="ml-0 lg:ml-64 pt-16">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleCancel}
              className="hover:bg-uniq-primary/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Editar Fornecedor</h1>
              <p className="text-gray-500 mt-1">
                Atualize as informações do fornecedor
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <SupplierForm
              initialData={supplier}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
