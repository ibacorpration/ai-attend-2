import apiClient from './apiClient';
import { AttendanceRecord } from './attendanceService';

export const reviewService = {
  getPendingReviews: async () => {
    const response = await apiClient.get<AttendanceRecord[]>('/reviews/');
    return response.data;
  },

  handleReview: async (id: number, action: 'approve' | 'reject') => {
    const response = await apiClient.patch(`/reviews/${id}`, { action });
    return response.data;
  }
};
