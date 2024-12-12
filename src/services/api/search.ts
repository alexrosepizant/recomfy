import { Media } from '../../types/media';
import { TMDBService } from './tmdb/service';
import { GoogleBooksService } from './books/service';

const tmdbService = new TMDBService();
const booksService = new GoogleBooksService();

export async function searchMedia(query: string): Promise<Media[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const [movies, tvShows, books] = await Promise.all([
      tmdbService.searchMedia(query, 'movie'),
      tmdbService.searchMedia(query, 'series'),
      booksService.searchBooks(query),
    ]);

    return [...movies, ...tvShows, ...books];
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search media. Please try again later.');
  }
}