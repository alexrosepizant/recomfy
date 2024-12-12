import { Media } from '../../../types/media';
import { BaseApiService } from '../base';
import { mapGoogleBooksToMedia } from './mapper';
import { GoogleBooksResponse, GoogleBooksVolume } from './types';
import { withRetry } from '../retry';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1';

export class GoogleBooksService extends BaseApiService {
  constructor() {
    super(GOOGLE_BOOKS_API_URL);
  }

  async getBookDetails(id: string): Promise<Media | null> {
    try {
      // Extract the actual book ID from the combined ID
      const bookId = id.startsWith('book-') ? id.replace('book-', '') : id;
      
      const response = await withRetry(() => 
        this.client.get<GoogleBooksVolume>(`/volumes/${bookId}`)
      );
      
      if (!response.data) {
        return null;
      }

      return mapGoogleBooksToMedia(response.data);
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  async searchBooks(query: string): Promise<Media[]> {
    if (!query.trim()) return [];

    try {
      const response = await this.client.get<GoogleBooksResponse>('/volumes', {
        params: {
          q: query,
          maxResults: 20,
          printType: 'books',
          orderBy: 'relevance',
          langRestrict: 'en'
        }
      });

      return (response.data.items || []).map(mapGoogleBooksToMedia);
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  async getTrendingBooks(): Promise<Media[]> {
    try {
      // Popular book categories
      const categories = [
        'fiction bestseller',
        'mystery thriller',
        'science fiction fantasy',
        'romance',
        'contemporary literature'
      ];

      // Fetch books from each category with retry logic
      const responses = await Promise.allSettled(
        categories.map(category => 
          withRetry(() => 
            this.client.get<GoogleBooksResponse>('/volumes', {
              params: {
                q: `subject:${category}`,
                maxResults: 10,
                printType: 'books',
                orderBy: 'newest',
                langRestrict: 'en'
              }
            })
          )
        )
      );

      // Process successful responses
      const books = responses
        .filter((response): response is PromiseFulfilledResult<any> => 
          response.status === 'fulfilled' && Boolean(response.value?.data?.items)
        )
        .flatMap(response => 
          response.value.data.items.map(mapGoogleBooksToMedia)
        );

      // Remove duplicates and sort by rating
      const uniqueBooks = Array.from(
        new Map(books.map(book => [book.id, book])).values()
      ).sort((a, b) => b.rating - a.rating);

      return uniqueBooks.slice(0, 20);
    } catch (error) {
      console.error('Error fetching trending books:', error);
      return [];
    }
  }
}