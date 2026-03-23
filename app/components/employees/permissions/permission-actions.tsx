'use client';

import { Button } from '@/components/ui/button';
import { CheckCheck, X, RotateCcw } from 'lucide-react';

interface PermissionActionsProps {
  onSelectAll: () => void;
  onClearAll: () => void;
  onRestore: () => void;
  disabled?: boolean;
}

export function PermissionActions({
  onSelectAll,
  onClearAll,
  onRestore,
  disabled,
}: PermissionActionsProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#e5e7eb]">
      <Button
        variant="ghost"
        onClick={onSelectAll}
        disabled={disabled}
        className="text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]"
      >
        <CheckCheck className="w-4 h-4 mr-2" />
        Selecionar tudo
      </Button>

      <Button
        variant="ghost"
        onClick={onClearAll}
        disabled={disabled}
        className="text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]"
      >
        <X className="w-4 h-4 mr-2" />
        Limpar tudo
      </Button>

      <Button
        variant="ghost"
        onClick={onRestore}
        disabled={disabled}
        className="text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Restaurar padrão
      </Button>
    </div>
  );
}
