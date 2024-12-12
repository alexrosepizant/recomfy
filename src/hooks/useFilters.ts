import { useState, useCallback } from 'react';
import { MediaType } from '../types/media';

export interface Filters {
  types: MediaType[];
  genres: string[];
  minRating: number | null;
  years: string[];
}

const initialFilters: Filters = {
  types: [], // Empty array means all types
  genres: [],
  minRating: null,
  years: [],
};

export function useFilters() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const setMediaType = useCallback((type: MediaType | null) => {
    setFilters(prev => ({
      ...prev,
      types: type ? [type] : [], // Empty array for "All"
    }));
  }, []);

  const toggleGenre = useCallback((genre: string) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  }, []);

  const toggleYear = useCallback((year: string) => {
    setFilters(prev => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter(y => y !== year)
        : [...prev.years, year],
    }));
  }, []);

  const setRating = useCallback((rating: number | null) => {
    setFilters(prev => ({ ...prev, minRating: rating }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    setMediaType,
    toggleGenre,
    toggleYear,
    setRating,
    resetFilters,
  };
}