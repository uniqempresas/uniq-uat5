'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '../shared/status-badge';
import { CategoryBadge } from '../shared/category-badge';
import { Receivable } from '@/lib/types/finance';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Mail
} from 'lucide-react';

interface ReceivablesTableProps {
  data: Receivable[];
  onReceive: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  onSendReminder?: (id: number) => void;
}

export function ReceivablesTable({
  data,
  onReceive,
  onEdit,
  onDelete,
  onView,
  onSendReminder
}: ReceivablesTableProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelectedIds(prev =>
      prev.length === data.length ? [] : data.map(d => d.id)
    );
  };

  if (data.length === 0) {
    return (
      <div className="border border-uniq-border rounded-xl p-8 text-center">
        <p className="text-uniq-muted">Nenhuma conta a receber encontrada.</p>
      </div>
    );
  }

  return (
    <div className="border border-uniq-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#f9fafb]">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedIds.length === data.length && data.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="w-24">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onCheckedChange={() => toggleSelection(item.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.client}</TableCell>
              <TableCell>{formatDate(item.dueDate)}</TableCell>
              <TableCell className="font-medium text-uniq-accent">
                {formatCurrency(item.amount)}
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                <CategoryBadge category={item.category} type="income" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onView(item.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {item.status !== 'paid' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-uniq-accent"
                      onClick={() => onReceive(item.id)}
                    >
                      <DollarSign className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(item.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(item.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {item.status !== 'paid' && onSendReminder && (
                        <DropdownMenuItem onClick={() => onSendReminder(item.id)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar cobrança
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
