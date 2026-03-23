// ============================================
// COMPONENT: SupplierCard - Card de Visualização do Fornecedor
// ============================================

'use client';

import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Pencil, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { SupplierCardProps } from '@/app/types/suppliers';
import { SupplierRating } from './SupplierRating';
import { formatCurrencyCompact } from '@/app/lib/utils/masks';

export function SupplierCard({ 
  supplier, 
  onView, 
  onEdit, 
  onDelete 
}: SupplierCardProps) {
  const statusStyles = {
    active: 'bg-green-100 text-green-700 border-green-200',
    inactive: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  };

  const statusLabels = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Em Análise',
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-gray-200">
      {/* Header com logo e rating */}
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-gray-400" />
          </div>
          <SupplierRating value={supplier.rating} readonly size="sm" showValue />
        </div>

        {/* Nome e CNPJ/CPF */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {supplier.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {supplier.documentType === 'cnpj' ? 'CNPJ' : 'CPF'}: {supplier.document}
        </p>

        {/* Contato */}
        <div className="mt-4 space-y-2">
          {supplier.email && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{supplier.email}</span>
            </div>
          )}
          {supplier.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{supplier.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{supplier.address.city}, {supplier.address.state}</span>
          </div>
        </div>

        {/* Badge de categoria */}
        <Badge variant="secondary" className="mt-3 bg-gray-100 text-gray-700">
          {supplier.category}
        </Badge>

        {/* Estatísticas */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              {formatCurrencyCompact(supplier.totalSpent)}/ano
            </span>
            <span className="text-gray-500">
              {supplier.totalPurchases} compras
            </span>
          </div>
        </div>

        {/* Status */}
        <Badge 
          className={cn("mt-3", statusStyles[supplier.status])}
        >
          {statusLabels[supplier.status]}
        </Badge>
      </CardContent>

      {/* Footer com ações */}
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onView(supplier.id)}
          className="text-gray-600 hover:text-gray-900"
        >
          Ver detalhes
        </Button>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(supplier.id)}
            className="h-8 w-8"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(supplier.id)}
            className="h-8 w-8 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Helper function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}