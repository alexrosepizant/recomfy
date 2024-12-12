import { useMemo } from 'react';
import { Media } from '../types/media';
import { Filters } from './useFilters';

export function useFilteredMedia(media: Media[], filters: Filters) {
  return useMemo(() => {
    if (!media || media.length === 0) return [];

    return media.filter(item => {
      // If no type filter is set (empty array) or type matches
      if (filters.types.length > 0 && !filters.types.includes(item.type)) {
        return false;
      }

      // Filter by genres if any are selected
      if (filters.genres.length > 0) {
        const hasMatchingGenre = item.genres.some(genre => 
          filters.genres.includes(genre)
        );
        if (!hasMatchingGenre) {
          return false;
        }
      }

      // Filter by rating
      if (filters.minRating !== null && item.rating < filters.minRating) {
        return false;
      }

      // Filter by year
      if (filters.years.length > 0) {
        const itemYear = item.releaseYear.toString();
        const beforeYear = filters.years.includes('Before 2020');
        if (!filters.years.includes(itemYear) && !(beforeYear && item.releaseYear < 2020)) {
          return false;
        }
      }

      return true;
    });
  }, [media, filters]);
}