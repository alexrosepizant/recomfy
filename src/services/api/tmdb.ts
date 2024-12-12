import { Media, MediaType } from '../../types/media';
import { BaseApiService } from './base';
import { env } from '../../config/env';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export class TMDBService extends BaseApiService {
  constructor() {
    super(TMDB_BASE_URL);
    
    if (!env.TMDB_API_KEY) {
      console.warn('TMDB API key is not configured');
    }

    this.client.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        api_key: env.TMDB_API_KEY,
      };
      return config;
    });

    // Add response interceptor for debugging
    this.client.interceptors.response.use(
      (response) => {
        console.debug('TMDB API Response:', {
          endpoint: response.config.url,
          status: response.status,
          resultCount: response.data?.results?.length,
        });
        return response;
      },
      (error) => {
        console.error('TMDB API Error:', {
          endpoint: error.config?.url,
          status: error.response?.status,
          message: error.response?.data?.status_message,
        });
        return Promise.reject(error);
      }
    );
  }

  async searchMedia(query: string, type: MediaType): Promise<Media[]> {
    if (!env.TMDB_API_KEY) {
      console.warn('Skipping TMDB search - API key not configured');
      return [];
    }

    try {
      const endpoint = type === 'movie' ? '/search/movie' : '/search/tv';
      const response = await this.client.get(endpoint, {
        params: { query }
      });

      return response.data.results.map((item: any) => this.mapToMedia(item, type));
    } catch (error) {
      console.error('Error searching TMDB:', error);
      return [];
    }
  }

  private mapToMedia(tmdbItem: any, type: MediaType): Media {
    return {
      id: tmdbItem.id.toString(),
      type,
      title: tmdbItem.title || tmdbItem.name,
      description: tmdbItem.overview,
      releaseYear: new Date(tmdbItem.release_date || tmdbItem.first_air_date).getFullYear(),
      genres: [], // Would need to fetch genres separately
      rating: tmdbItem.vote_average || 0,
      imageUrl: tmdbItem.poster_path 
        ? `https://image.tmdb.org/t/p/w500${tmdbItem.poster_path}`
        : '/placeholder-poster.jpg',
      externalId: tmdbItem.imdb_id,
    };
  }
}