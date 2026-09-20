import apiClient from './apiClient';

export interface AttendanceRecord {
  id: number;
  employee_id: number;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: string;
  similarity_score: number | null;
  needs_review: boolean;
}

export const attendanceService = {
  getDailyAttendance: async (date?: string) => {
    const params = date ? { target_date: date } : {};
    const response = await apiClient.get<AttendanceRecord[]>('/attendance/daily', { params });
    return response.data;
  },
  
  getEmployeeAttendance: async (employeeId: number) => {
    const response = await apiClient.get<AttendanceRecord[]>(`/attendance/employee/${employeeId}`);
    return response.data;
  }
};
