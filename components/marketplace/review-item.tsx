// components/marketplace/review-item.tsx
'use client';

import * as React from "react";
import Image from "next/image";
import { Reply, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { StarRating } from "./star-rating";
import { formatRelativeDate } from "@/lib/utils/format-date";
import type { Review } from "@/types/marketplace";

interface ReviewItemProps {
  review: Review;
  onReply?: (review: Review) => void;
  canReply?: boolean;
  className?: string;
}

export function ReviewItem({
  review,
  onReply,
  canReply = false,
  className,
}: ReviewItemProps) {
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyText, setReplyText] = React.useState("");

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onReply?.(review);
      setReplyText("");
      setIsReplying(false);
    }
  };

  // Generate initials from customer name
  const initials = review.customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("border-b border-uniq-border pb-6 mb-6 last:border-0 last:pb-0 last:mb-0", className)}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-uniq-primary flex items-center justify-center text-white font-bold text-sm">
            {review.customerAvatar ? (
              <Image
                src={review.customerAvatar}
                alt={review.customerName}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              initials
            )}
          </div>

          {/* Customer Info */}
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-uniq-text">
                {review.customerName}
              </p>
              {review.isVerifiedPurchase && (
                <span className="flex items-center gap-1 text-xs text-uniq-accent">
                  <BadgeCheck className="w-3 h-3" />
                  Verificado
                </span>
              )}
            </div>
            <p className="text-xs text-uniq-muted">
              {formatRelativeDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Rating */}
        <StarRating rating={review.rating} size="md" />
      </div>

      {/* Title */}
      {review.title && (
        <p className="text-sm font-medium text-uniq-text mb-2">{review.title}</p>
      )}

      {/* Content */}
      <p className="text-sm text-uniq-muted mb-3">{review.content}</p>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2 mb-3">
          {review.photos.map((photo, index) => (
            <div
              key={index}
              className="w-16 h-16 rounded-lg bg-uniq-platinum overflow-hidden"
            >
              <Image
                src={photo}
                alt={`Foto ${index + 1}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Product Link */}
      {review.productName && (
        <p className="text-xs text-uniq-muted mb-3">
          Produto:{" "}
          <span className="text-uniq-primary hover:underline cursor-pointer">
            {review.productName}
          </span>
        </p>
      )}

      {/* Reply from Seller */}
      {review.reply && (
        <div className="ml-4 pl-4 border-l-2 border-uniq-accent/30 bg-uniq-platinum rounded-r-lg p-3 mb-3">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium text-uniq-accent">Resposta da loja</p>
            <span className="text-xs text-uniq-muted">
              {formatRelativeDate(review.reply.createdAt)}
            </span>
          </div>
          <p className="text-sm text-uniq-muted">{review.reply.content}</p>
        </div>
      )}

      {/* Reply Button */}
      {canReply && !review.reply && (
        <div className="mt-3">
          {isReplying ? (
            <div className="space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Digite sua resposta..."
                className="w-full px-3 py-2 rounded-lg border border-uniq-border bg-white text-sm text-uniq-text placeholder-uniq-muted focus:outline-none focus:ring-2 focus:ring-uniq-accent focus:border-uniq-accent resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSubmitReply}
                  className="px-4 py-2 bg-uniq-primary hover:bg-uniq-hover text-white text-sm font-medium rounded-lg transition-all"
                >
                  Enviar Resposta
                </button>
                <button
                  onClick={() => setIsReplying(false)}
                  className="px-4 py-2 bg-uniq-platinum hover:bg-uniq-border text-uniq-text text-sm font-medium rounded-lg transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsReplying(true)}
              className="flex items-center gap-1 text-sm text-uniq-primary hover:underline"
            >
              <Reply className="w-4 h-4" />
              Responder
            </button>
          )}
        </div>
      )}
    </div>
  );
}
