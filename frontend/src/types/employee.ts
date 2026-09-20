export interface Employee {
  id: number;
  employee_code: string;
  full_name: string;
  email?: string;
  phone?: string;
  department?: string;
  role?: string;
  status: 'active' | 'inactive';
  salary?: number;
  consent_given_at?: string;
  created_at: string;
  updated_at: string;
}
