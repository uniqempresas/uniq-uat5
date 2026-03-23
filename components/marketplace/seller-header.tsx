// components/marketplace/seller-header.tsx
'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Store,
  MessageCircle,
  Heart,
  Package,
  Star,
  BadgeCheck,
  Phone,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import { StatusBadge } from "./status-badge";
import { formatJoinedDate } from "@/lib/utils/format-date";
import type { Seller } from "@/types/marketplace";

interface SellerHeaderProps {
  seller: Seller;
  onFollow?: () => void;
  onMessage?: () => void;
  isFollowing?: boolean;
  className?: string;
}

export function SellerHeader({
  seller,
  onFollow,
  onMessage,
  isFollowing = false,
  className,
}: SellerHeaderProps) {
  return (
    <div className={cn("", className)}>
      {/* Banner */}
      <div className="h-48 md:h-56 bg-gradient-to-r from-uniq-primary to-uniq-muted relative">
        {seller.banner && (
          <Image
            src={seller.banner}
            alt="Banner"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-16 relative">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Logo */}
          <div className="w-32 h-32 rounded-2xl bg-uniq-white p-2 shadow-lg">
            <div className="w-full h-full rounded-xl bg-uniq-platinum flex items-center justify-center overflow-hidden">
              {seller.logo ? (
                <Image
                  src={seller.logo}
                  alt={`Logo ${seller.name}`}
                  width={120}
                  height={120}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <Store className="w-12 h-12 text-uniq-muted" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {seller.name}
              </h1>
              {seller.isVerified && (
                <BadgeCheck className="w-6 h-6 text-uniq-accent" />
              )}
            </div>
            <p className="text-white/80 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {seller.location.city}, {seller.location.state}
            </p>
            <p className="text-white/60 text-sm mt-1">
              {formatJoinedDate(seller.createdAt)}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-white/90">
            <div className="text-center">
              <p className="text-2xl font-bold">{seller.rating.toFixed(1)}</p>
              <div className="flex items-center justify-center">
                <StarRating rating={seller.rating} size="sm" />
              </div>
              <p className="text-xs text-white/60">{seller.reviewCount} avaliações</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{seller.productCount}</p>
              <p className="text-xs text-white/60">Produtos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{seller.salesCount}</p>
              <p className="text-xs text-white/60">Vendas</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-4">
          {seller.isPremium && <StatusBadge status="premium" size="sm" />}
          {seller.isNew && <StatusBadge status="new" size="sm" />}
          {seller.categories?.map((cat) => (
            <span
              key={cat}
              className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-6 pb-6">
          <Link
            href="#products"
            className="px-6 py-2.5 bg-uniq-accent hover:bg-uniq-accent/90 text-uniq-text font-semibold rounded-lg transition-all flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Ver Produtos
          </Link>
          <button
            onClick={onMessage}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar Mensagem
          </button>
          <button
            onClick={onFollow}
            className={cn(
              "px-4 py-2.5 font-medium rounded-lg transition-all flex items-center gap-2",
              isFollowing
                ? "bg-uniq-accent/20 text-uniq-accent border border-uniq-accent hover:bg-uniq-accent/30"
                : "px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isFollowing && "fill-current")} />
            {isFollowing ? "Seguindo" : "Seguir"}
          </button>
        </div>
      </div>

      {/* Contact Info */}
      {(seller.phone || seller.whatsapp || seller.email) && (
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            {seller.phone && (
              <a
                href={`tel:${seller.phone}`}
                className="flex items-center gap-1 hover:text-white"
              >
                <Phone className="w-4 h-4" />
                {seller.phone}
              </a>
            )}
            {seller.whatsapp && (
              <a
                href={`https://wa.me/55${seller.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            )}
            {seller.email && (
              <a
                href={`mailto:${seller.email}`}
                className="flex items-center gap-1 hover:text-white"
              >
                <Mail className="w-4 h-4" />
                {seller.email}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
