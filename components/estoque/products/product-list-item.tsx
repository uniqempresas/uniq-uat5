'use client';

import { Product } from '@/lib/estoque/types';
import { StockStatusBadge } from '../shared/stock-status-badge';
import { formatCurrency } from '@/lib/estoque/utils';
import { Edit, Eye, Trash2, Package } from 'lucide-react';
import Link from 'next/link';

interface ProductListItemProps {
  product: Product;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export function ProductListItem({ product, onEdit, onView, onDelete }: ProductListItemProps) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Product */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-8 h-8 object-cover"
              />
            ) : (
              <Package className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-[#1f2937] truncate">{product.name}</p>
            <p className="text-xs text-[#627271]">{product.category?.name || 'Sem categoria'}</p>
          </div>
        </div>
      </td>

      {/* SKU */}
      <td className="px-4 py-3">
        <span className="text-sm font-mono text-[#627271]">{product.sku}</span>
      </td>

      {/* Stock */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1f2937]">{product.stock} {product.unit}</span>
          <StockStatusBadge status={product.stockStatus} size="sm" showLabel={false} />
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <div className="flex flex-col">
          {product.promotionalPrice ? (
            <>
              <span className="text-sm font-medium text-[#1f2937]">
                {formatCurrency(product.promotionalPrice)}
              </span>
              <span className="text-xs text-[#627271] line-through">
                {formatCurrency(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-[#1f2937]">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${
          product.status === 'active'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            product.status === 'active' ? 'bg-green-600' : 'bg-gray-400'
          }`} />
          {product.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <Link
            href={`/estoque/produtos/${product.id}`}
            className="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg transition-colors"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <Link
            href={`/estoque/produtos/${product.id}`}
            className="p-2 text-[#627271] hover:text-[#3e5653] hover:bg-gray-100 rounded-lg transition-colors"
            title="Visualizar"
          >
            <Eye className="w-4 h-4" />
          </Link>
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-2 text-[#627271] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
