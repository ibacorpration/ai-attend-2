export interface Message {
  id: number;
  employee_id: number;
  sender: string;
  body: string;
  created_at: string;
  read_at?: string;
}
