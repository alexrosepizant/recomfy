import { Media, MediaType } from '../../../types/media';
import { createTMDBClient } from './client';
import { mapTMDBToMedia } from './mapper';
import { TMDBSearchResponse } from './types';
import { validateApiConfig } from '../../../config/api';
import { handleTMDBError } from './error-handler';

export class TMDBService {
  private client;
  private initialized: boolean;
  private initError?: string;

  constructor() {
    const { isValid, error } = validateApiConfig();
    
    if (!isValid) {
      this.initialized = false;
      this.initError = error;
      console.error('TMDBService initialization failed:', error);
    } else {
      this.initialized = true;
      this.client = createTMDBClient();
    }
  }

  private ensureInitialized() {
    if (!this.initialized) {
      throw new Error(this.initError || 'TMDB service is not properly initialized');
    }
  }

  async getTrending(type: MediaType): Promise<Media[]> {
    try {
      this.ensureInitialized();
      const mediaType = type === 'movie' ? 'movie' : 'tv';
      const response = await this.client?.get<TMDBSearchResponse>(
        `/trending/${mediaType}/week`
      );

      if (!response?.data?.results) {
        return [];
      }

      return response.data.results.map(item => mapTMDBToMedia(item, type));
    } catch (error) {
      const apiError = handleTMDBError(error);
      console.error('Error fetching trending media:', apiError);
      throw apiError;
    }
  }

  async searchMedia(query: string, type: MediaType): Promise<Media[]> {
    if (!query.trim()) return [];

    try {
      this.ensureInitialized();
      const endpoint = type === 'movie' ? '/search/movie' : '/search/tv';
      const response = await this.client?.get<TMDBSearchResponse>(endpoint, {
        params: { query }
      });

      return response?.data?.results?.map(item => mapTMDBToMedia(item, type)) ?? [];
    } catch (error) {
      const apiError = handleTMDBError(error);
      console.error('Error searching media:', apiError);
      return [];
    }
  }

  async getMediaDetails(id: string, type: 'movie' | 'series'): Promise<Media | null> {
    try {
      this.ensureInitialized();
      const endpoint = type === 'movie' ? `/movie/${id}` : `/tv/${id}`;
      const response = await this.client?.get(endpoint);
      
      if (!response?.data) {
        return null;
      }

      return mapTMDBToMedia(response.data, type);
    } catch (error) {
      const apiError = handleTMDBError(error);
      console.error('Error fetching media details:', apiError);
      return null;
    }
  }
}