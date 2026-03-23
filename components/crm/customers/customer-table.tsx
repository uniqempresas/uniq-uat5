'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Customer, SortConfig } from '@/types/crm';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ArrowUpDown,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  selectedIds: string[];
  onSelect: (selectedIds: string[]) => void;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function CustomerTable({
  customers,
  loading = false,
  onEdit,
  onDelete,
  selectedIds,
  onSelect,
  sortConfig,
  onSort,
}: CustomerTableProps) {
  const handleSelectAll = () => {
    if (selectedIds.length === customers.length) {
      onSelect([]);
    } else {
      onSelect(customers.map((c) => c.id));
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelect(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 ml-1" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-3 h-3 ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"><Skeleton className="h-4 w-4" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20" /></TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">Nenhum cliente encontrado</p>
          <p className="text-sm">
            Tente ajustar os filtros ou adicione um novo cliente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={
                  selectedIds.length === customers.length && customers.length > 0
                }
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('name')}
            >
              <div className="flex items-center">
                Nome
                {getSortIcon('name')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('email')}
            >
              <div className="flex items-center">
                Email
                {getSortIcon('email')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('phone')}
            >
              <div className="flex items-center">
                Telefone
                {getSortIcon('phone')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('lastPurchase')}
            >
              <div className="flex items-center">
                Última Compra
                {getSortIcon('lastPurchase')}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => onSort('totalSpent')}
            >
              <div className="flex items-center">
                Total Gasto
                {getSortIcon('totalSpent')}
              </div>
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <Checkbox
                  checked={selectedIds.includes(customer.id)}
                  onCheckedChange={() => handleSelectOne(customer.id)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-primary/10">
                      {customer.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{customer.name}</span>
                </div>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone || '-'}</TableCell>
              <TableCell>
                {customer.lastPurchase
                  ? format(new Date(customer.lastPurchase), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })
                  : '-'}
              </TableCell>
              <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {customer.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag.id}
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        borderColor: tag.color,
                      }}
                      variant="outline"
                      className="text-xs"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                  {customer.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{customer.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(customer)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDelete(customer)}
                    >
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
