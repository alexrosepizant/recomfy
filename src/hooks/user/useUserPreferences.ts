import { useState, useCallback, useEffect } from 'react';
import { MediaType } from '../../types/media';

interface UserPreferences {
  username?: string;
  favoriteGenres: string[];
  excludedGenres: string[];
  minimumRating: number;
  mediaTypes: MediaType[];
}

const STORAGE_KEY = 'recomfy_preferences';
const RATINGS_KEY = 'recomfy_ratings';

const defaultPreferences: UserPreferences = {
  username: '',
  favoriteGenres: [],
  excludedGenres: [],
  minimumRating: 0,
  mediaTypes: ['movie', 'series', 'book'],
};

// Create a global event to notify all components of preference changes
const PREFERENCES_UPDATED_EVENT = 'recomfy:preferences-updated';

export function useUserPreferences() {
  // Load saved preferences from localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultPreferences;
    } catch {
      return defaultPreferences;
    }
  });

  // Load saved ratings from localStorage
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(RATINGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Listen for preference updates from other components
  useEffect(() => {
    const handlePreferencesUpdate = (event: CustomEvent<UserPreferences>) => {
      setPreferences(event.detail);
    };

    window.addEventListener(
      PREFERENCES_UPDATED_EVENT,
      handlePreferencesUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        PREFERENCES_UPDATED_EVENT,
        handlePreferencesUpdate as EventListener
      );
    };
  }, []);

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...updates };
      
      // Save to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving preferences:', error);
      }

      // Dispatch event to notify other components
      window.dispatchEvent(
        new CustomEvent(PREFERENCES_UPDATED_EVENT, { detail: updated })
      );

      return updated;
    });
  }, []);

  const rateMedia = useCallback((mediaId: string, rating: number) => {
    setRatings(prev => {
      const updated = { ...prev, [mediaId]: rating };
      try {
        localStorage.setItem(RATINGS_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving rating:', error);
      }
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