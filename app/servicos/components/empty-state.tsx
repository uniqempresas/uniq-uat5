import { Scissors, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddNew: () => void;
}

export function EmptyState({ onAddNew }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-uniq-platinum flex items-center justify-center mb-4">
        <Scissors className="w-10 h-10 text-uniq-muted" />
      </div>
      <h3 className="text-lg font-semibold text-uniq-text mb-2">
        Nenhum serviço cadastrado
      </h3>
      <p className="text-sm text-uniq-muted max-w-sm mb-6">
        Comece cadastrando seu primeiro serviço para disponibilizá-lo no catálogo.
      </p>
      <Button onClick={onAddNew} className="gap-2">
        <Plus className="w-4 h-4" />
        Cadastrar primeiro serviço
      </Button>
    </div>
  );
}
