'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { SellerPerformance } from '@/types/venda';

interface PerformanceVendedorProps {
  sellers: SellerPerformance[];
}

export function PerformanceVendedor({ sellers }: PerformanceVendedorProps) {
  const totalSales = sellers.reduce((acc, s) => acc + s.totalSales, 0);
  const totalAmount = sellers.reduce((acc, s) => acc + s.totalAmount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Ranking Table */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Ranking de Vendedores
          </CardTitle>
          <CardDescription>Performance dos vendedores no período selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Vendas</TableHead>
                <TableHead className="text-right">Itens</TableHead>
                <TableHead className="text-right">Ticket Médio</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.map((seller) => (
                <TableRow key={seller.sellerId}>
                  <TableCell>
                    <RankBadge rank={seller.ranking} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#3e5653] text-white text-xs">
                          {seller.sellerName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{seller.sellerName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{seller.totalSales}</TableCell>
                  <TableCell className="text-right">{seller.totalItems}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(seller.averageTicket)}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {formatCurrency(seller.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-500">
                        {Math.round((seller.totalAmount / totalAmount) * 100)}%
                      </span>
                      <Progress 
                        value={(seller.totalAmount / totalAmount) * 100} 
                        className="w-16"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="w-4 h-4" />
              Resumo da Equipe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total de Vendedores</p>
              <p className="text-2xl font-bold">{sellers.length}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Total de Vendas</p>
              <p className="text-2xl font-bold">{totalSales}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Faturamento Total</p>
              <p className="text-2xl font-bold text-[#86cb92]">{formatCurrency(totalAmount)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="w-4 h-4" />
              Melhor Vendedor
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sellers[0] && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-yellow-100 text-yellow-700 text-lg">
                      {sellers[0].sellerName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{sellers[0].sellerName}</p>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      🏆 1º Lugar
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Vendas</p>
                    <p className="text-xl font-bold">{sellers[0].totalSales}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Itens</p>
                    <p className="text-xl font-bold">{sellers[0].totalItems}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ticket Médio</span>
                    <span className="font-medium">{formatCurrency(sellers[0].averageTicket)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#86cb92]">{formatCurrency(sellers[0].totalAmount)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="w-4 h-4" />
              Comparativo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellers.slice(0, 3).map((seller, index) => {
                const maxAmount = sellers[0].totalAmount;
                const percentage = (seller.totalAmount / maxAmount) * 100;
                
                return (
                  <div key={seller.sellerId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{index + 1}. {seller.sellerName}</span>
                      <span>{formatCurrency(seller.totalAmount)}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const getColor = () => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 2: return 'bg-gray-100 text-gray-700 border-gray-300';
      case 3: return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${getColor()}`}>
      {rank}
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
