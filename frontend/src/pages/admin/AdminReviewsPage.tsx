import React, { useState, useEffect } from 'react';
import { ReviewQueueTable, ReviewItem } from '@/features/reviews/ReviewQueueTable';
import { useToast } from '@/context/ToastContext';
import { reviewService } from '@/services/reviewService';

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getPendingReviews();
        setReviews(data.map(d => ({
          id: d.id,
          employeeName: `EMP ${d.employee_id}`,
          date: d.date,
          type: 'System Flag',
          reason: `Similarity Score was ${d.similarity_score?.toFixed(2) || 'unknown'}, flagged for review.`,
          status: 'pending'
        })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    try {
      await reviewService.handleReview(id, action);
      setReviews(reviews.filter(r => r.id !== id));
      showToast(`Request ${action}d successfully.`, 'SUCCESS');
    } catch (err) {
      showToast('Failed to process review', 'ERROR');
    }
  };

  return (
    <div>
      <ReviewQueueTable items={reviews} onAction={handleAction} />
    </div>
  );
}
