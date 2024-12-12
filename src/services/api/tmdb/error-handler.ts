import { AxiosError } from 'axios';
import { ApiError } from '../../../types/api';

export function handleTMDBError(error: unknown): ApiError {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    
    switch (status) {
      case 401:
        return {
          message: 'Invalid API key. Please check your TMDB API configuration.',
          status: 401,
        };
      case 404:
        return {
          message: 'The requested content was not found.',
          status: 404,
        };
      case 429:
        return {
          message: 'Rate limit exceeded. Please try again later.',
          status: 429,
        };
      default:
        return {
          message: error.response?.data?.status_message || 'An error occurred while fetching data.',
          status: status || 500,
        };
    }
  }

  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    status: 500,
  };
}