// ============================================
// COMPONENT: SupplierStats - Cards de Métricas do Fornecedor
// ============================================

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { SupplierStatsProps } from '@/app/types/suppliers';
import { formatCurrency, formatCurrencyCompact } from '@/app/lib/utils/masks';
import { Package, DollarSign, TrendingUp, Calendar } from 'lucide-react';

export function SupplierStats({ supplier }: SupplierStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Pedidos</p>
              <p className="text-xl font-semibold">{supplier.totalPurchases}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor Total</p>
              <p className="text-xl font-semibold">{formatCurrencyCompact(supplier.totalSpent)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Ticket Médio</p>
              <p className="text-xl font-semibold">{formatCurrency(supplier.averageTicket)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Última Compra</p>
              <p className="text-xl font-semibold">
                {supplier.lastPurchase 
                  ? new Date(supplier.lastPurchase).toLocaleDateString('pt-BR')
                  : '-'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}