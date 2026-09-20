import apiClient from './apiClient';
import { RecognitionResult } from '@/types/recognition';

export const recognitionService = {
  verify: async (formData: FormData): Promise<RecognitionResult> => {
    const { data } = await apiClient.post<RecognitionResult>('/recognition/verify', formData);
    return data;
  }
};
