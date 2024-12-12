import { Media } from '../../types/media';
import { BaseApiService } from './base';

export class GoodreadsService extends BaseApiService {
  private apiKey: string;

  constructor(apiKey: string) {
    super(''); // Goodreads API is deprecated, this is a placeholder
    this.apiKey = apiKey;
  }

  async searchBooks(query: string): Promise<Media[]> {
    // Note: Goodreads API is deprecated, this is a placeholder
    // Would need to use alternative book APIs like Google Books
    return [];
  }
}