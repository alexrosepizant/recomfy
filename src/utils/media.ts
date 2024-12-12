import { MediaType } from '../types/media';
import { env } from '../config/env';

// Define default images with proper paths
const DEFAULT_IMAGES: Record<MediaType, string> = {
  movie: '/images/default-movie.png',
  series: '/images/default-series.png',
  book: '/images/default-book.png',
} as const;

/**
 * Get the image URL for a media item, with fallback to default images
 */
export function getMediaImageUrl(
  posterPath: string | null | undefined,
  type: MediaType
): string {
  // If there's no poster path, return the default image for the media type
  if (!posterPath) {
    return DEFAULT_IMAGES[type];
  }

  // Handle TMDB-style paths that start with '/'
  if (posterPath.startsWith('/')) {
    try {
      return `${env.TMDB_IMAGE_BASE_URL}${posterPath}`;
    } catch (error) {
      console.error('Error constructing TMDB image URL:', error);
      return DEFAULT_IMAGES[type];
    }
  }

  // Handle full URLs (some APIs might return complete URLs)
  if (posterPath.startsWith('http')) {
    return posterPath;
  }

  // Fallback to default image if path is invalid
  return DEFAULT_IMAGES[type];
}

/**
 * Check if an image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  return url.startsWith('http') || url.startsWith('/');
}