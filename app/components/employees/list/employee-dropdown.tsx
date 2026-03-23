'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { Button } from '../../../../components/ui/button';
import { Employee } from '../../../types/employee';
import {
  MoreVertical,
  Pencil,
  Shield,
  Mail,
  UserX,
  UserCheck,
  Trash2,
} from 'lucide-react';

interface EmployeeDropdownProps {
  employee: Employee;
  onEdit: () => void;
  onOpenPermissions: () => void;
  onDeactivate: () => void;
  onActivate: () => void;
  onDelete: () => void;
  onResendInvite: () => void;
}

export function EmployeeDropdown({
  employee,
  onEdit,
  onOpenPermissions,
  onDeactivate,
  onActivate,
  onDelete,
  onResendInvite,
}: EmployeeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-[#627271] hover:text-[#1f2937] hover:bg-[#efefef]"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="w-4 h-4 mr-2 text-[#627271]" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onOpenPermissions}>
          <Shield className="w-4 h-4 mr-2 text-[#627271]" />
          Permissões
        </DropdownMenuItem>

        {employee.status === 'pending' && (
          <DropdownMenuItem onClick={onResendInvite}>
            <Mail className="w-4 h-4 mr-2 text-[#627271]" />
            Enviar convite
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {employee.role !== 'owner' && (
          <>
            {employee.status === 'active' ? (
              <DropdownMenuItem onClick={onDeactivate} className="text-amber-600">
                <UserX className="w-4 h-4 mr-2" />
                Desativar
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={onActivate} className="text-green-600">
                <UserCheck className="w-4 h-4 mr-2" />
                Ativar
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
