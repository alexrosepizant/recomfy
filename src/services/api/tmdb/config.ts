import { env } from '../../../config/env';
import { API_CONFIG } from '../../../config/constants';

export const tmdbConfig = {
  apiKey: env.TMDB_API_KEY,
  baseURL: API_CONFIG.TMDB.BASE_URL,
  imageBaseURL: env.TMDB_IMAGE_BASE_URL,
  defaultParams: API_CONFIG.TMDB.DEFAULT_PARAMS,
} as const;

export const validateTMDBConfig = (): boolean => {
  if (!tmdbConfig.apiKey) {
    console.error(
      'TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env file.\n' +
      'You can get an API key from: https://www.themoviedb.org/settings/api'
    );
    return false;
  }
  return true;
};