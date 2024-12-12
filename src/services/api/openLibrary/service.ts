import { Media } from '../../../types/media';
import { BaseApiService } from '../base';
import { mapOpenLibraryToMedia } from './mapper';
import { OpenLibrarySearchResponse, OpenLibraryWork } from './types';
import { withRetry } from '../retry';

const OPEN_LIBRARY_API_URL = 'https://openlibrary.org';

export class OpenLibraryService extends BaseApiService {
  constructor() {
    super(OPEN_LIBRARY_API_URL);
  }

  async getBookDetails(id: string): Promise<Media | null> {
    try {
      // Extract the actual book ID from the combined ID
      const bookId = id.startsWith('book-') ? id.replace('book-', '') : id;
      
      const response = await withRetry(() => 
        this.client.get<OpenLibraryWork>(`/works/${bookId}.json`)
      );
      
      if (!response.data) {
        return null;
      }

      return mapOpenLibraryToMedia(response.data);
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  async searchBooks(query: string): Promise<Media[]> {
    if (!query.trim()) return [];

    try {
      const response = await this.client.get<OpenLibrarySearchResponse>('/search.json', {
        params: {
          q: query,
          limit: 20,
          fields: 'key,title,author_name,first_publish_year,cover_i,subject',
        }
      });

      return response.data.docs.map(mapOpenLibraryToMedia);
    } catch (error) {
      console.error('Error searching books:', error);
      return [];
    }
  }

  async getTrendingBooks(): Promise<Media[]> {
    try {
      // Get trending books by querying popular subjects
      const subjects = ['bestseller', 'popular', 'fiction', 'fantasy', 'mystery'];
      
      const responses = await Promise.allSettled(
        subjects.map(subject => 
          withRetry(() => 
            this.client.get<OpenLibrarySearchResponse>('/search.json', {
              params: {
                q: `subject:${subject}`,
                limit: 10,
                fields: 'key,title,author_name,first_publish_year,cover_i,subject',
              }
            })
          )
        )
      );

      // Process successful responses
      const books = responses
        .filter((response): response is PromiseFulfilledResult<any> => 
          response.status === 'fulfilled' && Boolean(response.value?.data?.docs)
        )
        .flatMap(response => 
          response.value.data.docs.map(mapOpenLibraryToMedia)
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