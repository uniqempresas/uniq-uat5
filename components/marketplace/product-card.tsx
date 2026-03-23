// components/marketplace/product-card.tsx
'use client';

import * as React from "react";
import Image from "next/image";
import { Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import { formatCurrency, formatDiscountBadge } from "@/lib/utils/format-currency";
import type { Product } from "@/types/marketplace";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountText = hasDiscount
    ? formatDiscountBadge(product.compareAtPrice!, product.price)
    : null;

  return (
    <div
      className={cn(
        "bg-uniq-white rounded-xl border border-uniq-border overflow-hidden",
        "hover:shadow-lg hover:border-uniq-accent transition-all duration-300",
        "cursor-pointer group",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-square bg-uniq-platinum relative overflow-hidden">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-uniq-muted text-sm">Sem imagem</span>
          </div>
        )}

        {/* Discount Badge */}
        {discountText && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            {discountText}
          </span>
        )}

        {/* Free Shipping Badge */}
        {product.hasFreeShipping && (
          <span className="absolute bottom-2 left-2 px-2 py-1 bg-uniq-accent text-uniq-text text-xs font-medium rounded flex items-center gap-1">
            <Truck className="w-3 h-3" />
            Frete Grátis
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="text-sm font-medium text-uniq-text line-clamp-2 mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-uniq-primary">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-uniq-muted line-through">
              {formatCurrency(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="mb-2">
            <StarRating
              rating={product.rating}
              count={product.reviewCount}
              size="sm"
            />
          </div>
        )}

        {/* Sales Count */}
        <p className="text-xs text-uniq-muted">
          {product.salesCount} vendidos
        </p>
      </div>
    </div>
  );
}
