import { Media } from '../../../types/media';
import { OpenLibraryWork, OpenLibrarySearchResult } from './types';
import { standardizeGenre } from '../books/utils';
import { normalizeRating } from '../../../utils/ratings';

export function mapOpenLibraryToMedia(work: OpenLibraryWork | OpenLibrarySearchResult): Media {
  const isSearchResult = 'cover_i' in work;
  const id = work.key.split('/').pop() || '';
  
  // Extract description
  let description = '';
  if (!isSearchResult && work.description) {
    description = typeof work.description === 'string' 
      ? work.description 
      : work.description.value;
  }

  // Extract and normalize genres from subjects
  const subjects = isSearchResult 
    ? (work as OpenLibrarySearchResult).subject || []
    : (work as OpenLibraryWork).subjects || [];
  
  const genres = subjects
    .map(standardizeGenre)
    .filter((genre, index, self) => 
      genre && self.indexOf(genre) === index
    )
    .slice(0, 3);

  // Ensure at least one genre
  if (genres.length === 0) {
    genres.push('Fiction');
  }

  // Get cover image URL
  const coverId = isSearchResult 
    ? (work as OpenLibrarySearchResult).cover_i
    : (work as OpenLibraryWork).covers?.[0];
  
  const imageUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  // Get publish year
  const year = isSearchResult
    ? (work as OpenLibrarySearchResult).first_publish_year
    : work.first_publish_date 
      ? parseInt(work.first_publish_date.split(',')[0])
      : new Date().getFullYear();

  // Normalize rating to 0-5 scale
  const rating = normalizeRating(
    (work as OpenLibraryWork).ratings_average || 0,
    'openLibrary'
  );

  return {
    id: `book-${id}`,
    type: 'book',
    title: work.title,
    description: description || 'No description available',
    releaseYear: year || new Date().getFullYear(),
    genres,
    rating,
    imageUrl,
    externalId: id,
  };
}