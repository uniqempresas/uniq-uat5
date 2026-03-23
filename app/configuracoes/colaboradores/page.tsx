'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { useEmployees } from '@/hooks/use-employees';
import { useViewToggle } from '@/hooks/use-view-toggle';
import { Employee, EmployeeFormData } from '@/types/employee';
import { MAX_EMPLOYEES } from '@/lib/mocks';
import { useToast } from '@/hooks/use-toast';
import {
  EmployeeHeader,
  EmployeeFilters,
  EmployeeGrid,
  EmployeeTable,
  EmployeeSkeleton,
  EmployeeEmpty,
} from '@/components/employees/list';
import {
  EmployeeFormModal,
} from '@/components/employees/form';
import {
  PermissionModal,
} from '@/components/employees/permissions';

export default function ColaboradoresPage() {
  const {
    filteredEmployees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    deactivateEmployee,
    activateEmployee,
    resendInvite,
    filters,
    setFilters,
  } = useEmployees();

  const { view, setView } = useViewToggle();
  const { toast } = useToast();

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>();

  // Sync view toggle with filters
  useEffect(() => {
    setFilters({ ...filters, view });
  }, [view]);

  const handleAddEmployee = () => {
    setEditingEmployee(undefined);
    setIsFormModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleOpenPermissions = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsPermissionModalOpen(true);
  };

  const handleDeactivate = async (employee: Employee) => {
    await deactivateEmployee(employee.id);
    toast({
      title: 'Colaborador desativado',
      description: `${employee.name} foi desativado com sucesso.`,
    });
  };

  const handleActivate = async (employee: Employee) => {
    await activateEmployee(employee.id);
    toast({
      title: 'Colaborador ativado',
      description: `${employee.name} foi ativado com sucesso.`,
    });
  };

  const handleDelete = async (employee: Employee) => {
    if (confirm(`Tem certeza que deseja excluir ${employee.name}?`)) {
      await deleteEmployee(employee.id);
      toast({
        title: 'Colaborador excluído',
        description: `${employee.name} foi excluído com sucesso.`,
      });
    }
  };

  const handleResendInvite = async (employee: Employee) => {
    await resendInvite(employee.id);
    toast({
      title: 'Convite reenviado',
      description: `Um novo convite foi enviado para ${employee.email}.`,
    });
  };

  const handleFormSubmit = async (data: EmployeeFormData) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee.id, data);
      toast({
        title: 'Colaborador atualizado',
        description: `${data.name} foi atualizado com sucesso.`,
      });
    } else {
      await addEmployee(data);
      toast({
        title: 'Colaborador adicionado',
        description: `${data.name} foi adicionado com sucesso. Convite enviado para ${data.email}.`,
      });
    }
    setIsFormModalOpen(false);
  };

  const handlePermissionsSave = async (permissions: Employee['modules']) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.id, {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        position: selectedEmployee.position,
        role: selectedEmployee.role,
        modules: permissions,
        notifyByEmail: true,
        whatsappAccess: false,
      });
      toast({
        title: 'Permissões atualizadas',
        description: `As permissões de ${selectedEmployee.name} foram atualizadas.`,
      });
      setIsPermissionModalOpen(false);
    }
  };

  const renderContent = () => {
    if (loading && filteredEmployees.length === 0) {
      return <EmployeeSkeleton count={6} />;
    }

    if (filteredEmployees.length === 0) {
      return <EmployeeEmpty onAddEmployee={handleAddEmployee} />;
    }

    if (filters.view === 'table') {
      return (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onOpenPermissions={handleOpenPermissions}
          onDeactivate={handleDeactivate}
          onActivate={handleActivate}
          onDelete={handleDelete}
          onResendInvite={handleResendInvite}
        />
      );
    }

    return (
      <EmployeeGrid
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onOpenPermissions={handleOpenPermissions}
        onDeactivate={handleDeactivate}
        onActivate={handleActivate}
        onDelete={handleDelete}
        onResendInvite={handleResendInvite}
      />
    );
  };

  return (
    <div className="min-h-screen bg-uniq-platinum">
      <Sidebar />
      <Header pageTitle="Colaboradores" breadcrumbs={[
        { label: 'Configurações', href: '/configuracoes' },
        { label: 'Colaboradores' }
      ]} />
      
      <main className="ml-0 lg:ml-64 pt-16">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <EmployeeHeader
              totalCount={filteredEmployees.length}
              maxCount={MAX_EMPLOYEES}
              onAddEmployee={handleAddEmployee}
            />

            <EmployeeFilters
              filters={filters}
              onChange={setFilters}
            />

            {renderContent()}

            <EmployeeFormModal
              isOpen={isFormModalOpen}
              onClose={() => setIsFormModalOpen(false)}
              onSubmit={handleFormSubmit}
              employee={editingEmployee}
              loading={loading}
            />

            {selectedEmployee && (
              <PermissionModal
                isOpen={isPermissionModalOpen}
                onClose={() => setIsPermissionModalOpen(false)}
                employee={selectedEmployee}
                onSave={handlePermissionsSave}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
