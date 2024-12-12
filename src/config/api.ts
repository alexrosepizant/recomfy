import { env } from './env';

export const API_CONFIG = {
  TMDB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    DEFAULT_PARAMS: {
      api_key: env.TMDB_API_KEY,
      language: 'en-US',
      include_adult: false,
    },
  },
  GOOGLE_BOOKS: {
    BASE_URL: 'https://www.googleapis.com/books/v1',
    DEFAULT_PARAMS: {},
  },
} as const;

export function validateApiConfig(): { isValid: boolean; error?: string } {
  if (!env.TMDB_API_KEY) {
    return {
      isValid: false,
      error: 'TMDB API key is missing. Please add it to your .env file.',
    };
  }

  return { isValid: true };
}