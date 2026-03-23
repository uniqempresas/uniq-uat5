'use client';

import { Product } from '@/types/chat';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSendDetails?: () => void;
}

export function ProductCard({ product, onSendDetails }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden max-w-[280px]">
      <div className="flex gap-4 p-4">
        {/* Imagem placeholder */}
        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <ShoppingCart className="w-8 h-8 text-gray-300" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-semibold text-[#1f2937] truncate">{product.name}</h4>
          <p className="text-[12px] text-[#627271] mb-2 line-clamp-2">{product.description}</p>
          <p className="text-[18px] font-bold text-[#86cb92]">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      {onSendDetails && (
        <div className="px-4 py-3 bg-[#f9fafb] border-t border-[#e5e7eb]">
          <button 
            onClick={onSendDetails}
            className="w-full py-2 bg-[#86cb92] hover:bg-[#5fb86e] text-white 
                       rounded-lg text-[13px] font-medium transition-colors"
          >
            Enviar Detalhes
          </button>
        </div>
      )}
    </div>
  );
}
