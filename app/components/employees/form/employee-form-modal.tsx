'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Employee, EmployeeFormData } from '@/types/employee';
import { EmployeeForm } from './employee-form';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => void;
  employee?: Employee;
  loading?: boolean;
}

export function EmployeeFormModal({
  isOpen,
  onClose,
  onSubmit,
  employee,
  loading,
}: EmployeeFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f2937]">
            {employee ? 'Editar Colaborador' : 'Novo Colaborador'}
          </DialogTitle>
        </DialogHeader>

        <EmployeeForm
          initialData={employee}
          onSubmit={onSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
