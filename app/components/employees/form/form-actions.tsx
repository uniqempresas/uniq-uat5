'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { X, UserPlus } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
  isEdit?: boolean;
}

export function FormActions({
  onCancel,
  loading,
  submitLabel,
  isEdit,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-[#e5e7eb]">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={loading}
        className="border-[#e5e7eb] text-[#627271] hover:bg-[#efefef]"
      >
        <X className="w-4 h-4 mr-2" />
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#3e5653] text-white hover:bg-[#1f2937]"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <UserPlus className="w-4 h-4 mr-2" />
        )}
        {submitLabel || (isEdit ? 'Salvar Alterações' : 'Adicionar Colaborador')}
      </Button>
    </div>
  );
}
