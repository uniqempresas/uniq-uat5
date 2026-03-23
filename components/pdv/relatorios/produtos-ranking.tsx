'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Package } from 'lucide-react';
import { TopSellingProduct } from '@/types/venda';

interface ProdutosRankingProps {
  products: TopSellingProduct[];
}

export function ProdutosRanking({ products }: ProdutosRankingProps) {
  const maxAmount = Math.max(...products.map(p => p.totalAmount));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Óculos de Sol': 'bg-amber-100 text-amber-700',
      'Armações': 'bg-blue-100 text-blue-700',
      'Lentes': 'bg-green-100 text-green-700',
      'Acessórios': 'bg-purple-100 text-purple-700',
      'Lentes de Contato': 'bg-pink-100 text-pink-700',
      'Infantil': 'bg-orange-100 text-orange-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Produtos Mais Vendidos
          </CardTitle>
          <CardDescription>Ranking dos produtos com melhor desempenho em vendas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-right">Qtd</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">%</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={product.productId}>
                  <TableCell>
                    <RankBadge rank={index + 1} />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getCategoryColor(product.category)}>
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{product.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(product.totalAmount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-gray-500 w-10">{product.percentage}%</span>
                      <Progress value={product.percentage} className="w-20" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cards de Destaque */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="w-4 h-4" />
            Top Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          {products[0] && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{products[0].name}</p>
                <Badge variant="secondary" className={getCategoryColor(products[0].category)}>
                  {products[0].category}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Quantidade</p>
                  <p className="text-xl font-bold">{products[0].quantity}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-bold">{formatCurrency(products[0].totalAmount)}</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">Representa</p>
                <p className="text-2xl font-bold text-[#86cb92]">
                  {products[0].percentage}% 
                  <span className="text-sm font-normal text-gray-500 ml-1">das vendas totais</span>
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo por Quantidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <div key={product.productId} className="flex items-center gap-3">
                <span className="w-6 text-sm text-gray-500">#{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                </div>
                <div className="w-24">
                  <Progress 
                    value={(product.quantity / Math.max(...products.map(p => p.quantity))) * 100} 
                    className="h-2"
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">{product.quantity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
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
