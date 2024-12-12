import { useState, useCallback } from 'react';
import { MediaType } from '../types/media';

interface UserPreferences {
  favoriteGenres: string[];
  excludedGenres: string[];
  minimumRating: number;
  mediaTypes: MediaType[];
}

const STORAGE_KEY = 'recomfy_preferences';
const RATINGS_KEY = 'recomfy_ratings';

const defaultPreferences: UserPreferences = {
  favoriteGenres: [],
  excludedGenres: [],
  minimumRating: 0,
  mediaTypes: ['movie', 'series', 'book'],
};

export function useUserPreferences() {
  // Load saved preferences from localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultPreferences;
  });

  // Load saved ratings from localStorage
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(RATINGS_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const rateMedia = useCallback((mediaId: string, rating: number) => {
    setRatings(prev => {
      const updated = { ...prev, [mediaId]: rating };
      localStorage.setItem(RATINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return {
    preferences,
    updatePreferences,
    ratings,
    rateMedia,
  };
}