import apiClient from './apiClient';
import { TokenResponse } from '@/types/auth';

export const authService = {
  login: async (formData: FormData): Promise<TokenResponse> => {
    const { data } = await apiClient.post<TokenResponse>('/auth/login', formData);
    return data;
  }
};
