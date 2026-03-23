'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/storefront';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  
  return (
    <Card className="group relative overflow-hidden border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
            Novo
          </Badge>
        )}
        {product.isBestseller && (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
            Mais Vendido
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive" className="text-xs">
            -{discount}%
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="secondary" className="text-xs">
            Esgotado
          </Badge>
        )}
      </div>
      
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
          variant={isInCart(product.id) ? 'secondary' : 'default'}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock === 0
            ? 'Esgotado'
            : isInCart(product.id)
            ? 'Adicionar Mais'
            : 'Adicionar'}
        </Button>
      </div>
    </Card>
  );
}
