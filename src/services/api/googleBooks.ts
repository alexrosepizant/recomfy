import { Media } from '../../types/media';
import { BaseApiService } from './base';
import { env } from '../../config/env';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1';

interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    averageRating?: number;
    categories?: string[];
  };
}

export class GoogleBooksService extends BaseApiService {
  constructor() {
    super(GOOGLE_BOOKS_API_URL);
    
    if (!env.GOOGLE_BOOKS_API_KEY) {
      console.warn('Google Books API key is not configured');
    }

    this.client.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        key: env.GOOGLE_BOOKS_API_KEY,
      };
      return config;
    });

    this.client.interceptors.response.use(
      (response) => {
        console.debug('Google Books API Response:', {
          endpoint: response.config.url,
          status: response.status,
          resultCount: response.data?.totalItems,
        });
        return response;
      },
      (error) => {
        console.error('Google Books API Error:', {
          endpoint: error.config?.url,
          status: error.response?.status,
          message: error.response?.data?.error?.message,
        });
        return Promise.reject(error);
      }
    );
  }

  async searchBooks(query: string): Promise<Media[]> {
    try {
      const response = await this.client.get('/volumes', {
        params: {
          q: query,
          maxResults: 20,
          printType: 'books',
        },
      });

      return response.data.items?.map(this.mapToMedia) || [];
    } catch (error) {
      console.error('Error searching Google Books:', error);
      return [];
    }
  }

  private mapToMedia(bookItem: GoogleBookItem): Media {
    const { volumeInfo } = bookItem;
    const publishYear = volumeInfo.publishedDate 
      ? new Date(volumeInfo.publishedDate).getFullYear()
      : 0;

    return {
      id: `book-${bookItem.id}`,
      type: 'book',
      title: volumeInfo.title,
      description: volumeInfo.description || '',
      releaseYear: publishYear,
      genres: volumeInfo.categories || [],
      rating: volumeInfo.averageRating || 0,
      imageUrl: volumeInfo.imageLinks?.thumbnail || 
                volumeInfo.imageLinks?.smallThumbnail || 
                '/placeholder-book.jpg',
      externalId: bookItem.id,
    };
  }
}