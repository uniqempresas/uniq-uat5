'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { ReceivablesTable } from '@/components/finance/receivables/receivables-table';
import { TransactionFilters } from '@/components/finance/shared/transaction-filters';
import { ReceiveModal } from '@/components/finance/receivables/receive-modal';
import { ReceivableForm } from '@/components/finance/receivables/receivable-form';
import { useFinance } from '@/lib/hooks/use-finance';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Receivable, ReceivePaymentData } from '@/lib/types/finance';
import { toast } from '@/components/ui/use-toast';
import { mockCategories } from '@/lib/mocks/finance';

export default function ReceberPage() {
  const {
    receivables,
    receivableFilters,
    setReceivableFilters,
    receivePayment
  } = useFinance();

  const [selectedReceivable, setSelectedReceivable] = useState<Receivable | null>(null);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showReceivableForm, setShowReceivableForm] = useState(false);

  const handleReceive = (id: number) => {
    const receivable = receivables.find(r => r.id === id);
    if (receivable) {
      setSelectedReceivable(receivable);
      setShowReceiveModal(true);
    }
  };

  const handleConfirmReceive = (data: ReceivePaymentData) => {
    receivePayment(data);
    toast({
      title: 'Recebimento registrado',
      description: 'Pagamento recebido com sucesso.'
    });
    setShowReceiveModal(false);
  };

  const handleView = (id: number) => {
    console.log('Visualizar recebível:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Editar recebível:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Excluir recebível:', id);
  };

  const handleSendReminder = (id: number) => {
    console.log('Enviar cobrança:', id);
    toast({
      title: 'Cobrança enviada',
      description: 'E-mail de cobrança enviado ao cliente.'
    });
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header
        pageTitle="Contas a Receber"
        breadcrumbs={[
          { label: 'Início', href: '/dashboard' },
          { label: 'Financeiro', href: '/financeiro' },
          { label: 'Contas a Receber' }
        ]}
      />

      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-uniq-text">Contas a Receber</h1>
            <p className="text-uniq-muted">Gerencie seus títulos a receber</p>
          </div>
          <Button 
            onClick={() => setShowReceivableForm(true)}
            className="bg-uniq-accent hover:bg-uniq-accent/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Receita
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TransactionFilters
            type="income"
            onFilterChange={setReceivableFilters}
            categories={mockCategories.income.map(c => c.name)}
          />
        </div>

        {/* Table */}
        <ReceivablesTable
          data={receivables}
          onReceive={handleReceive}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onSendReminder={handleSendReminder}
        />

        {/* Modals */}
        <ReceiveModal
          isOpen={showReceiveModal}
          onClose={() => setShowReceiveModal(false)}
          receivable={selectedReceivable}
          onConfirm={handleConfirmReceive}
        />

        <ReceivableForm
          isOpen={showReceivableForm}
          onClose={() => setShowReceivableForm(false)}
          onSubmit={(data) => {
            console.log('Nova receita:', data);
            toast({
              title: 'Receita criada',
              description: 'Conta a receber criada com sucesso.'
            });
            setShowReceivableForm(false);
          }}
        />
      </main>
    </div>
  );
}
