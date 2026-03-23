'use client';

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PDVProduct } from '@/types/pdv';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: PDVProduct;
  onAdd: () => void;
  isAnimating?: boolean;
}

function ProductCard({ product, onAdd, isAnimating }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const stockWarning = product.stock <= (product.minStock || 5);
  const stockDanger = product.stock === 0;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 overflow-hidden group",
        "active:scale-[0.98]", // Touch feedback
        isAnimating && "scale-95 ring-2 ring-[#86cb92]",
        isHovered && "shadow-lg",
        stockDanger && "opacity-50"
      )}
      onClick={onAdd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Stock Badge */}
          {stockWarning && (
            <Badge 
              className={cn(
                "absolute top-2 right-2 text-xs",
                stockDanger 
                  ? 'bg-red-500 hover:bg-red-500' 
                  : 'bg-amber-500 hover:bg-amber-500'
              )}
            >
              {stockDanger ? 'Esgotado' : `${product.stock} un.`}
            </Badge>
          )}
          
          {/* Touch/Hover Overlay - Always visible on mobile, hover on desktop */}
          <div className={cn(
            "absolute inset-0 bg-[#3e5653]/70 flex items-center justify-center transition-opacity duration-200",
            (isHovered || !('ontouchstart' in window)) && !stockDanger ? 'opacity-100' : 'opacity-0 md:opacity-0'
          )}>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#86cb92] rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 md:w-8 md:h-8 text-[#3e5653]" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-2 md:p-3">
        <h3 className="font-medium text-xs md:text-sm line-clamp-2 text-[#1f2937] min-h-[32px] md:min-h-[40px]">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-1 md:mt-2">
          <span className="font-bold text-[#3e5653] text-sm md:text-lg">
            {formatCurrency(product.price)}
          </span>
          
          <span className="text-xs text-gray-500 hidden md:inline">
            {product.sku}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

interface ProductGridProps {
  products: PDVProduct[];
  onAddToCart: (product: PDVProduct) => void;
  loading?: boolean;
}

export function ProductGrid({ products, onAddToCart, loading }: ProductGridProps) {
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const handleAdd = (product: PDVProduct) => {
    if (product.stock <= 0) return;
    
    setAnimatingId(product.id);
    onAddToCart(product);
    
    setTimeout(() => {
      setAnimatingId(null);
    }, 300);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center px-4">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl md:text-4xl">🔍</span>
        </div>
        <h3 className="text-base md:text-lg font-semibold text-[#1f2937]">Nenhum produto encontrado</h3>
        <p className="text-sm md:text-base text-gray-500 mt-1">Tente buscar com outros termos ou categoria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={() => handleAdd(product)}
          isAnimating={animatingId === product.id}
        />
      ))}
    </div>
  );
}

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse" />
      <CardContent className="p-2 md:p-3">
        <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse mb-1 md:mb-2" />
        <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse w-3/4 mb-2 md:mb-3" />
        <div className="flex justify-between">
          <div className="h-5 md:h-6 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-3 md:h-4 bg-gray-200 rounded animate-pulse w-1/4 hidden md:block" />
        </div>
      </CardContent>
    </Card>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}
