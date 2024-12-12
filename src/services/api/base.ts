import axios, { AxiosInstance } from 'axios';
import { ApiError } from '../../types/api';
import { handleApiError } from './error-handler';

export abstract class BaseApiService {
  protected client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        const apiError = handleApiError(error);
        console.error('API Error:', apiError);
        return Promise.reject(apiError);
      }
    );
  }

  protected handleRequestError(error: unknown): ApiError {
    const apiError = handleApiError(error);
    console.error('Request failed:', apiError);
    return apiError;
  }
}