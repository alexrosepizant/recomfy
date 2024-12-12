import { MediaType } from '../types/media';

// Default images for each media type
const DEFAULT_IMAGES: Record<MediaType, string> = {
  movie: '/images/default-movie.png',
  series: '/images/default-series.png',
  book: '/images/default-book.png',
} as const;

// Cache for preloaded images
const IMAGE_CACHE = new Map<string, string>();

/**
 * Get the default image for a media type
 */
export function getDefaultImage(type: MediaType): string {
  return DEFAULT_IMAGES[type];
}

/**
 * Check if an image URL is valid
 */
export function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  if (IMAGE_CACHE.has(url)) return true;
  return url.startsWith('http') || url.startsWith('/');
}

/**
 * Get the appropriate image URL with fallback
 */
export function getImageUrl(url: string | null | undefined, type: MediaType): string {
  if (!url || !isValidImageUrl(url)) {
    return getDefaultImage(type);
  }
  return IMAGE_CACHE.get(url) || url;
}

/**
 * Preload an image and cache it
 */
export async function preloadImage(url: string): Promise<void> {
  if (IMAGE_CACHE.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      IMAGE_CACHE.set(url, url);
      resolve();
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Clear the image cache
 */
export function clearImageCache(): void {
  IMAGE_CACHE.clear();
}