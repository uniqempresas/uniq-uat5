'use client';

import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Users, UserPlus } from 'lucide-react';

interface EmployeeHeaderProps {
  totalCount: number;
  maxCount: number;
  onAddEmployee: () => void;
}

export function EmployeeHeader({ totalCount, maxCount, onAddEmployee }: EmployeeHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1f2937] flex items-center gap-3">
          <Users className="w-8 h-8 text-[#86cb92]" />
          Colaboradores
          <Badge className="bg-[#efefef] text-[#627271] text-sm font-medium px-2.5 py-0.5 rounded-full">
            {totalCount} de {maxCount}
          </Badge>
        </h1>
        <p className="text-[#627271] mt-1">
          Gerencie membros da sua equipe e permissões
        </p>
      </div>

      <Button
        onClick={onAddEmployee}
        className="bg-[#3e5653] text-white hover:bg-[#1f2937] flex items-center gap-2 transition-all"
      >
        <UserPlus className="w-5 h-5" />
        Novo Colaborador
      </Button>
    </div>
  );
}
