'use client';

import { Product } from '@/lib/estoque/types';
import { StockStatusBadge } from '../shared/stock-status-badge';
import { formatCurrency } from '@/lib/estoque/utils';
import { Edit, Eye, Trash2, Package } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
}

export function ProductCard({ product, onEdit, onView, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <StockStatusBadge status={product.stockStatus} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[#1f2937] truncate mb-1">{product.name}</h3>
        <p className="text-xs text-[#627271] mb-3">SKU: {product.sku}</p>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-4 h-4 text-[#627271]" />
          <span className="text-sm font-medium text-[#1f2937]">
            {product.stock} {product.unit}
          </span>
          {product.hasVariations && (
            <span className="text-xs text-[#627271]">(+{product.variations?.length || 0} variações)</span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          {product.promotionalPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#3e5653]">
                {formatCurrency(product.promotionalPrice)}
              </span>
              <span className="text-sm text-[#627271] line-through">
                {formatCurrency(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-[#3e5653]">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/estoque/produtos/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#3e5653] text-white text-sm rounded-lg hover:bg-[#1f2937] transition-colors"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Link>
          <Link
            href={`/estoque/produtos/${product.id}`}
            className="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-[#627271]" />
          </Link>
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center justify-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
