// ============================================
// PAGE: Novo Fornecedor
// ============================================

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useSuppliers } from '@/app/hooks/use-suppliers';
import { SupplierForm } from '@/app/components/fornecedores/SupplierForm';
import { SupplierFormData } from '@/app/types/suppliers';

export default function NovoFornecedorPage() {
  const router = useRouter();
  const { createSupplier } = useSuppliers();

  const handleSubmit = (data: SupplierFormData) => {
    const supplierData = {
      ...data,
      ratingCount: 0,
      totalPurchases: 0,
      totalSpent: 0,
      lastPurchase: null,
      averageTicket: 0,
    };
    createSupplier(supplierData);
    router.push('/fornecedores');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Novo Fornecedor" />
      
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
              <h1 className="text-2xl font-bold text-gray-900">Novo Fornecedor</h1>
              <p className="text-gray-500 mt-1">
                Cadastre um novo fornecedor para sua empresa
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <SupplierForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
