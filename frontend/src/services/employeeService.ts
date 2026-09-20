import apiClient from './apiClient';
import { Employee } from '@/types/employee';

export const employeeService = {
  getAll: async (): Promise<Employee[]> => {
    const { data } = await apiClient.get<Employee[]>('/employees');
    return data;
  },
  getById: async (id: number): Promise<Employee> => {
    const { data } = await apiClient.get<Employee>(`/employees/${id}`);
    return data;
  }
};
