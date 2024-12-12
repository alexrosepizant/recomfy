type RatingSource = 'tmdb' | 'googleBooks' | 'openLibrary' | 'app';

/**
 * Normalize ratings from different sources to a 0-5 scale
 */
export function normalizeRating(rating: number, source: RatingSource): number {
  switch (source) {
    case 'tmdb':
      // TMDB uses 0-10 scale
      return Math.round((rating / 10) * 5 * 10) / 10;
    
    case 'googleBooks':
      // Google Books uses 0-5 scale
      return Math.round(rating * 10) / 10;
    
    case 'openLibrary':
      // Open Library uses 0-5 scale
      return Math.round(rating * 10) / 10;
    
    case 'app':
      // Internal app rating is already 0-5
      return Math.round(rating * 10) / 10;
    
    default:
      return 0;
  }
}