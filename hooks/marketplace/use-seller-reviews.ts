// hooks/marketplace/use-seller-reviews.ts
'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import type { Review, ReviewDistribution } from '@/types/marketplace';
import { mockGetSellerReviews, mockGetReviewDistribution, mockReplyReview } from '@/lib/mocks/marketplace';

interface ReviewReplyInput {
  reviewId: string;
  content: string;
}

export function useSellerReviews(sellerId: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['seller-reviews', sellerId],
    queryFn: async () => {
      const [reviews, distribution] = await Promise.all([
        mockGetSellerReviews(sellerId),
        mockGetReviewDistribution(sellerId),
      ]);
      return { reviews, distribution };
    },
    enabled: !!sellerId,
  });

  const replyMutation = useMutation({
    mutationFn: async ({ reviewId, content }: ReviewReplyInput) => {
      await mockReplyReview(reviewId, content);
    },
    onSuccess: () => {
      refetch();
    },
  });

  return {
    reviews: data?.reviews ?? [],
    distribution: data?.distribution ?? null,
    isLoading,
    error,
    reply: replyMutation.mutate,
    isReplying: replyMutation.isPending,
  };
}
