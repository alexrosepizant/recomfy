import { Media } from '../../types/media';
import { BaseApiService } from './base';

export class GoodreadsService extends BaseApiService {

  constructor() {
    super(''); // Goodreads API is deprecated, this is a placeholder
  }

  async searchBooks(): Promise<Media[]> {
    // Note: Goodreads API is deprecated, this is a placeholder
    // Would need to use alternative book APIs like Google Books
    return [];
  }
}