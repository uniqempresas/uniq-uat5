'use client';

import { Button } from '../../../../components/ui/button';
import { Users, UserPlus } from 'lucide-react';

interface EmployeeEmptyProps {
  onAddEmployee: () => void;
}

export function EmployeeEmpty({ onAddEmployee }: EmployeeEmptyProps) {
  return (
    <div className="py-16 text-center bg-white rounded-xl border border-[#e5e7eb]">
      <Users className="w-16 h-16 text-[#e5e7eb] mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-[#1f2937]">
        Nenhum colaborador encontrado
      </h3>
      <p className="text-sm text-[#627271] max-w-sm mx-auto mt-2">
        Adicione membros à sua equipe para começar a gerenciar permissões e acessos.
      </p>
      <Button
        onClick={onAddEmployee}
        className="mt-6 bg-[#3e5653] hover:bg-[#1f2937] text-white"
      >
        <UserPlus className="w-5 h-5 mr-2" />
        Adicionar Primeiro Colaborador
      </Button>
    </div>
  );
}
