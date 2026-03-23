// components/marketplace/seller-card.tsx
'use client';

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Package, ShoppingBag, Store, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import { StatusBadge } from "./status-badge";
import type { Seller } from "@/types/marketplace";

interface SellerCardProps {
  seller: Seller;
  className?: string;
}

export function SellerCard({ seller, className }: SellerCardProps) {
  return (
    <Link
      href={`/marketplace/lojista/${seller.slug}`}
      className={cn(
        "block bg-uniq-white rounded-xl border border-uniq-border p-6",
        "hover:shadow-lg hover:border-uniq-accent transition-all duration-300",
        "group",
        className
      )}
    >
      {/* Header: Logo + Badges */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo */}
        <div className="w-16 h-16 rounded-xl bg-uniq-platinum flex items-center justify-center overflow-hidden">
          {seller.logo ? (
            <Image
              src={seller.logo}
              alt={`Logo ${seller.name}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <Store className="w-8 h-8 text-uniq-muted" />
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-col gap-1 items-end">
          {seller.isVerified && <StatusBadge status="verified" size="sm" />}
          {seller.isPremium && <StatusBadge status="premium" size="sm" />}
          {seller.isNew && <StatusBadge status="new" size="sm" />}
        </div>
      </div>

      {/* Seller Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-uniq-text group-hover:text-uniq-primary transition-colors">
          {seller.name}
        </h3>
        <p className="text-sm text-uniq-muted mt-1 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {seller.location.city}, {seller.location.state}
        </p>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating
          rating={seller.rating}
          showValue
          count={seller.reviewCount}
          size="sm"
        />
      </div>

      {/* Metrics */}
      <div className="flex items-center gap-4 text-sm text-uniq-muted mb-4">
        <span className="flex items-center gap-1">
          <Package className="w-4 h-4" />
          {seller.productCount} produtos
        </span>
        <span className="flex items-center gap-1">
          <ShoppingBag className="w-4 h-4" />
          {seller.salesCount} vendas
        </span>
      </div>

      {/* Categories */}
      {seller.categories && seller.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {seller.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-uniq-platinum text-uniq-muted text-xs rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="pt-4 border-t border-uniq-border">
        <button className="w-full py-2.5 bg-uniq-primary hover:bg-uniq-hover text-white text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2">
          <Eye className="w-4 h-4" />
          Ver Loja
        </button>
      </div>
    </Link>
  );
}
