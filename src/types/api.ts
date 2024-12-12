export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export class ApiException extends Error {
  constructor(message: string, public details?: ApiError) {
    super(message);
    this.name = 'ApiException';
  }
}