import { Media } from '../../types/media';
import { TMDBService } from './tmdb';
import { GoogleBooksService } from './googleBooks';
import { env } from '../../config/env';

const tmdbService = new TMDBService();
const googleBooksService = new GoogleBooksService();

export async function searchMedia(query: string): Promise<Media[]> {
  console.debug('Searching media with query:', query);

  if (!env.TMDB_API_KEY && !env.GOOGLE_BOOKS_API_KEY) {
    console.warn('No API keys configured. Please set up your environment variables.');
    return [];
  }

  try {
    const searchPromises: Promise<Media[]>[] = [];

    if (env.TMDB_API_KEY) {
      searchPromises.push(
        tmdbService.searchMedia(query, 'movie'),
        tmdbService.searchMedia(query, 'series')
      );
    }

    if (env.GOOGLE_BOOKS_API_KEY) {
      searchPromises.push(googleBooksService.searchBooks(query));
    }

    const results = await Promise.allSettled(searchPromises);

    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<Media[]> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)
      .flat();

    console.debug('Search results:', {
      total: successfulResults.length,
      movies: successfulResults.filter(item => item.type === 'movie').length,
      series: successfulResults.filter(item => item.type === 'series').length,
      books: successfulResults.filter(item => item.type === 'book').length,
    });

    return successfulResults;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}