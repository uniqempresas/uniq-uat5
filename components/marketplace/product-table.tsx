// components/marketplace/product-table.tsx
'use client';

import * as React from "react";
import Image from "next/image";
import { Pencil, Copy, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { formatCurrency } from "@/lib/utils/format-currency";
import type { Product, ProductStatus } from "@/types/marketplace";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDuplicate: (product: Product) => void;
  onDelete: (product: Product) => void;
  onStatusChange: (product: Product, status: ProductStatus) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProductTable({
  products,
  onEdit,
  onDuplicate,
  onDelete,
  onStatusChange,
  isLoading = false,
  className,
}: ProductTableProps) {
  if (isLoading) {
    return (
      <div className={className}>
        <div className="bg-uniq-white rounded-xl border border-uniq-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-uniq-platinum">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-uniq-muted uppercase">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-uniq-border">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-uniq-border" />
                        <div>
                          <div className="h-4 bg-uniq-border rounded w-32 mb-2" />
                          <div className="h-3 bg-uniq-border rounded w-20" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-uniq-border rounded w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-uniq-border rounded w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-uniq-border rounded w-12" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 bg-uniq-border rounded-full w-16" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-8 bg-uniq-border rounded w-8" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-uniq-white rounded-xl border border-uniq-border">
        <p className="text-uniq-muted">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="bg-uniq-white rounded-xl border border-uniq-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-uniq-platinum">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Vendas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-uniq-muted uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-uniq-border">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-uniq-platinum transition-colors"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-uniq-platinum overflow-hidden flex-shrink-0">
                        {product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-uniq-muted text-xs">
                            IMG
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-uniq-text truncate max-w-[200px]">
                          {product.name}
                        </p>
                        {product.sku && (
                          <p className="text-xs text-uniq-muted">
                            SKU: {product.sku}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-uniq-text">
                      {formatCurrency(product.price)}
                    </p>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <p className="text-xs text-uniq-muted line-through">
                        {formatCurrency(product.compareAtPrice)}
                      </p>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock <= 5
                          ? "text-amber-600"
                          : "text-uniq-text"
                      }`}
                    >
                      {product.stock === 0
                        ? "Sem estoque"
                        : `${product.stock} unidades`}
                    </p>
                    {product.stock > 0 && product.stock <= 5 && (
                      <p className="text-xs text-amber-600">Estoque baixo</p>
                    )}
                  </td>

                  {/* Sales */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-uniq-text">
                      {product.salesCount} vendas
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={product.status} size="sm" />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(product)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(product)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {product.status === 'active' ? (
                          <DropdownMenuItem
                            onClick={() => onStatusChange(product, 'paused')}
                          >
                            Pausar
                          </DropdownMenuItem>
                        ) : product.status === 'paused' ? (
                          <DropdownMenuItem
                            onClick={() => onStatusChange(product, 'active')}
                          >
                            Ativar
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem
                          onClick={() => onDelete(product)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
