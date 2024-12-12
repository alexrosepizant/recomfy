import { Media } from '../../../types/media';
import { GoogleBooksVolume } from './types';
import { getImageUrl } from '../../../utils/images';
import { normalizeRating } from '../../../utils/ratings';
import { standardizeGenre } from './utils';

export function mapGoogleBooksToMedia(book: GoogleBooksVolume): Media {
  const { volumeInfo } = book;
  
  // Extract and validate year
  const publishYear = volumeInfo.publishedDate 
    ? new Date(volumeInfo.publishedDate).getFullYear()
    : new Date().getFullYear();

  // Normalize rating to 0-5 scale
  const rating = normalizeRating(
    volumeInfo.averageRating || 0, 
    'googleBooks'
  );

  // Map categories to standardized genres
  const genres = (volumeInfo.categories || [])
    .flatMap(category => category.split(/\s*[/,]\s*/))
    .filter(Boolean)
    .map(standardizeGenre)
    .filter((genre, index, self) => self.indexOf(genre) === index)
    .slice(0, 3); // Limit to 3 genres

  // Ensure we have at least one genre
  if (genres.length === 0) {
    genres.push('Fiction');
  }

  return {
    id: `book-${book.id}`,
    type: 'book',
    title: volumeInfo.title || 'Untitled Book',
    description: volumeInfo.description || 'No description available',
    releaseYear: publishYear,
    genres,
    rating: rating || 0,
    imageUrl: volumeInfo.imageLinks?.thumbnail || null,
    externalId: book.id,
  };
}