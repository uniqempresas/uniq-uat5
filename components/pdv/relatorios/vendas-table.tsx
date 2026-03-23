'use client';

import { useState } from 'react';
import { Search, Eye, Printer, MoreHorizontal, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sale, SaleStatus } from '@/types/venda';
import { PaymentMethodType } from '@/types/payment';

interface VendasTableProps {
  sales: Sale[];
}

export function VendasTable({ sales }: VendasTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const filteredSales = sales.filter(sale =>
    sale.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: SaleStatus) => {
    const variants: Record<SaleStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      [SaleStatus.CONCLUIDA]: { label: 'Concluída', variant: 'default' },
      [SaleStatus.CANCELADA]: { label: 'Cancelada', variant: 'destructive' },
      [SaleStatus.PENDENTE]: { label: 'Pendente', variant: 'secondary' },
      [SaleStatus.EM_ANDAMENTO]: { label: 'Em Andamento', variant: 'outline' },
      [SaleStatus.REEMBOLSADA]: { label: 'Reembolsada', variant: 'secondary' }
    };
    
    const { label, variant } = variants[status] || { label: status, variant: 'default' };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getPaymentMethodLabel = (method: PaymentMethodType) => {
    const labels: Record<PaymentMethodType, string> = {
      [PaymentMethodType.DINHEIRO]: 'Dinheiro',
      [PaymentMethodType.CARTAO_CREDITO]: 'Cartão Crédito',
      [PaymentMethodType.CARTAO_DEBITO]: 'Cartão Débito',
      [PaymentMethodType.PIX]: 'Pix',
      [PaymentMethodType.BOLETO]: 'Boleto',
      [PaymentMethodType.VALE]: 'Vale',
      [PaymentMethodType.CREDITO_LOJA]: 'Crédito Loja'
    };
    return labels[method] || method;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Histórico de Vendas</CardTitle>
              <CardDescription>Lista de todas as vendas realizadas no período</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar venda..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Venda</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Forma de Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">#{sale.number}</TableCell>
                  <TableCell>
                    {new Date(sale.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    {sale.customer?.name || 'Cliente não identificado'}
                  </TableCell>
                  <TableCell>{sale.seller.name}</TableCell>
                  <TableCell>
                    {sale.payments.length > 0 
                      ? getPaymentMethodLabel(sale.payments[0].method)
                      : '-'
                    }
                  </TableCell>
                  <TableCell>{getStatusBadge(sale.status)}</TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(sale.total)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedSale(sale)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="w-4 h-4 mr-2" />
                          Imprimir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Ver Cupom
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSales.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Nenhuma venda encontrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sale Details Dialog */}
      <Dialog open={!!selectedSale} onOpenChange={() => setSelectedSale(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Venda #{selectedSale?.number}</DialogTitle>
          </DialogHeader>
          {selectedSale && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Data</p>
                  <p className="font-medium">
                    {new Date(selectedSale.createdAt).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>{getStatusBadge(selectedSale.status)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cliente</p>
                  <p className="font-medium">
                    {selectedSale.customer?.name || 'Não identificado'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendedor</p>
                  <p className="font-medium">{selectedSale.seller.name}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Itens</p>
                <div className="space-y-2">
                  {selectedSale.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatCurrency(item.subtotal)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selectedSale.subtotal)}</span>
                </div>
                {selectedSale.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>-{formatCurrency(selectedSale.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(selectedSale.total)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
