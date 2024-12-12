import { AxiosError } from 'axios';
import { ApiError } from '../../types/api';

const ERROR_MESSAGES = {
  401: 'Authentication failed. Please check your API key.',
  403: 'Access forbidden. Please check your permissions.',
  404: 'The requested content was not found.',
  429: 'Too many requests. Please try again later.',
  503: 'Service temporarily unavailable. Please try again later.',
  default: 'An unexpected error occurred. Please try again later.',
} as const;

export function handleApiError(error: unknown): ApiError {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const message = ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.default;

    return {
      message,
      status,
      code: error.code,
      details: error.response?.data
    };
  }

  // Handle other types of errors
  if (error instanceof Error) {
    return {
      message: error.message || ERROR_MESSAGES.default,
      status: 500
    };
  }

  return {
    message: ERROR_MESSAGES.default,
    status: 500
  };
}

export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.default;
  }
  
  return error instanceof Error ? error.message : ERROR_MESSAGES.default;
}

export function isServiceUnavailable(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 503;
}

export function shouldRetry(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status === 429 || status === 503;
  }
  return false;
}