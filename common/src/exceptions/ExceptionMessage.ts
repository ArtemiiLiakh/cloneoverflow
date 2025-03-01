export interface ExceptionMessage {
  path: string;
  status: number;
  error: string;
  message: string | string[];
  timestamp: string;
}