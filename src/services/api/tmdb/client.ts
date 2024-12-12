import axios from 'axios';
import { env } from '../../../config/env';
import { API_CONFIG } from '../../../config/constants';

export const createTMDBClient = () => {
  const client = axios.create({
    baseURL: API_CONFIG.TMDB.BASE_URL,
    params: {
      api_key: env.TMDB_API_KEY,
      ...API_CONFIG.TMDB.DEFAULT_PARAMS,
    },
    timeout: 10000,
  });

  // Add request interceptor for debugging
  client.interceptors.request.use(
    (config) => {
      if (!config.params?.api_key) {
        console.warn('TMDB API request made without API key');
      }
      return config;
    },
    (error) => {
      console.error('TMDB API request error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.error('TMDB API key is invalid or missing');
        return Promise.reject(new Error('Invalid API configuration. Please check your TMDB API key.'));
      }
      return Promise.reject(error);
    }
  );

  return client;
};