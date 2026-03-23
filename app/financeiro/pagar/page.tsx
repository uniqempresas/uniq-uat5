'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { PayablesTable } from '@/components/finance/payables/payables-table';
import { TransactionFilters } from '@/components/finance/shared/transaction-filters';
import { PayModal } from '@/components/finance/payables/pay-modal';
import { PayableForm } from '@/components/finance/payables/payable-form';
import { useFinance } from '@/lib/hooks/use-finance';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Payable, MakePaymentData } from '@/lib/types/finance';
import { toast } from '@/components/ui/use-toast';
import { mockCategories } from '@/lib/mocks/finance';

export default function PagarPage() {
  const {
    payables,
    payableFilters,
    setPayableFilters,
    makePayment
  } = useFinance();

  const [selectedPayable, setSelectedPayable] = useState<Payable | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPayableForm, setShowPayableForm] = useState(false);

  const handlePay = (id: number) => {
    const payable = payables.find(p => p.id === id);
    if (payable) {
      setSelectedPayable(payable);
      setShowPayModal(true);
    }
  };

  const handleConfirmPay = (data: MakePaymentData) => {
    makePayment(data);
    toast({
      title: 'Pagamento registrado',
      description: 'Pagamento realizado com sucesso.'
    });
    setShowPayModal(false);
  };

  const handleView = (id: number) => {
    console.log('Visualizar pagável:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Editar pagável:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Excluir pagável:', id);
  };

  const handleViewReceipt = (id: number) => {
    console.log('Ver comprovante:', id);
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Contas a Pagar"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Contas a Pagar' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-uniq-text">Contas a Pagar</h1>
            <p className="text-uniq-muted">Gerencie seus títulos a pagar</p>
          </div>
          <Button 
            onClick={() => setShowPayableForm(true)}
            variant="destructive"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Despesa
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TransactionFilters
            type="expense"
            onFilterChange={setPayableFilters}
            categories={mockCategories.expense.map(c => c.name)}
          />
        </div>

        {/* Table */}
        <PayablesTable
          data={payables}
          onPay={handlePay}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onViewReceipt={handleViewReceipt}
        />

        {/* Modals */}
        <PayModal
          isOpen={showPayModal}
          onClose={() => setShowPayModal(false)}
          payable={selectedPayable}
          onConfirm={handleConfirmPay}
        />

        <PayableForm
          isOpen={showPayableForm}
          onClose={() => setShowPayableForm(false)}
          onSubmit={(data) => {
            console.log('Nova despesa:', data);
            toast({
              title: 'Despesa criada',
              description: 'Conta a pagar criada com sucesso.'
            });
            setShowPayableForm(false);
          }}
        />
      </main>
    </div>
  );
}
