import apiClient from './apiClient';
import { Message } from '@/types/message';

export const messageService = {
  getEmployeeMessages: async (employeeId: number): Promise<Message[]> => {
    const { data } = await apiClient.get<Message[]>(`/employees/${employeeId}/messages`);
    return data;
  },
  sendToEmployee: async (employeeId: number, body: string): Promise<Message> => {
    const { data } = await apiClient.post<Message>(`/admin/employees/${employeeId}/messages`, { body });
    return data;
  },
  markAsRead: async (employeeId: number, messageId: number): Promise<Message> => {
    const { data } = await apiClient.patch<Message>(`/employees/${employeeId}/messages/${messageId}/read`);
    return data;
  }
};
