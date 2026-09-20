export interface RecognitionResult {
  success: boolean;
  employee_id?: number;
  employee_code?: string;
  full_name?: string;
  department?: string;
  employee_status?: string;
  similarity_score?: number;
  status?: string; // "match", "borderline", "unknown"
  error?: string;
  liveness_passed: boolean;
  quality_passed: boolean;
}
