// components/marketplace/order-card.tsx
'use client';

import * as React from "react";
import Image from "next/image";
import { Eye, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { formatCurrency } from "@/lib/utils/format-currency";
import { formatOrderDate } from "@/lib/utils/format-date";
import type { Order } from "@/types/marketplace";

interface OrderCardProps {
  order: Order;
  onViewDetails?: (order: Order) => void;
  className?: string;
}

export function OrderCard({ order, onViewDetails, className }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      className={cn(
        "bg-uniq-white rounded-xl border border-uniq-border p-6",
        "hover:shadow-md transition-shadow",
        className
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        {/* Order Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="text-sm font-semibold text-uniq-text">
              {order.orderNumber}
            </p>
            <StatusBadge status={order.status} size="sm" />
          </div>
          <p className="text-sm text-uniq-muted">
            Cliente: {order.customer.name}
          </p>
          <p className="text-sm text-uniq-muted">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>

        {/* Products Preview */}
        <div className="flex items-center gap-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={item.id}
              className="relative w-10 h-10 rounded-lg bg-uniq-platinum overflow-hidden border border-uniq-border"
            >
              {item.productImage ? (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-uniq-muted">
                  IMG
                </span>
              )}
              {/* Quantity Badge */}
              {item.quantity > 1 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-uniq-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              )}
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-10 h-10 rounded-lg bg-uniq-platinum flex items-center justify-center text-xs text-uniq-muted border border-uniq-border">
              +{order.items.length - 3}
            </div>
          )}
        </div>
      </div>

      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-1 text-sm text-uniq-muted hover:text-uniq-primary transition-colors mb-4"
      >
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "rotate-180"
          )}
        />
        Ver detalhes
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-uniq-border pt-4 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-3 last:mb-0">
              <div className="w-10 h-10 rounded-lg bg-uniq-platinum overflow-hidden">
                {item.productImage && (
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-uniq-text">
                  {item.productName}
                </p>
                <p className="text-xs text-uniq-muted">
                  {item.quantity}x {formatCurrency(item.price)}
                </p>
              </div>
            </div>
          ))}

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="mt-4 p-3 bg-uniq-platinum rounded-lg">
              <p className="text-xs font-medium text-uniq-text mb-1">Endereço de entrega:</p>
              <p className="text-xs text-uniq-muted">
                {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.state}
              </p>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs font-medium text-amber-800 mb-1">Observação:</p>
              <p className="text-xs text-amber-700">{order.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-uniq-border">
        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-bold text-uniq-text">
            {formatCurrency(order.total)}
          </p>
          <p className="text-xs text-uniq-muted">
            {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
          </p>
        </div>

        {/* Actions */}
        <button
          onClick={() => onViewDetails?.(order)}
          className="px-4 py-2 bg-uniq-primary hover:bg-uniq-hover text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
