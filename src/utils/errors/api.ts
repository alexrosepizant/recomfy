import { AxiosError } from 'axios';
import { ApiError } from '../../types/api';
import { ERROR_MESSAGES } from './messages';

export function handleApiError(error: unknown): ApiError {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const message = ERROR_MESSAGES.api[status as keyof typeof ERROR_MESSAGES.api] || 
                   ERROR_MESSAGES.api.default;

    return {
      message,
      status,
      code: error.code
    };
  }

  // Handle other types of errors
  if (error instanceof Error) {
    return {
      message: error.message || ERROR_MESSAGES.api.default,
      status: 500
    };
  }

  return {
    message: ERROR_MESSAGES.api.default,
    status: 500
  };
}

export function shouldRetry(error: unknown): boolean {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status === 429 || status === 503;
  }
  return false;
}