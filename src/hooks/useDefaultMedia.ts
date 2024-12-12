import { useState, useEffect, useCallback } from 'react';
import { Media, MediaType } from '../types/media';
import { TMDBService } from '../services/api/tmdb/service';
import { GoogleBooksService } from '../services/api/books/service';
import { ApiError } from '../types/api';

const tmdbService = new TMDBService();
const booksService = new GoogleBooksService();

interface State {
  trendingMedia: Media[];
  categoryMedia: Media[];
  isLoading: boolean;
  error: string | null;
}

export function useDefaultMedia(type?: MediaType) {
  const [state, setState] = useState<State>({
    trendingMedia: [],
    categoryMedia: [],
    isLoading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      if (type) {
        // Fetch specific category
        const data = type === 'book'
          ? await booksService.getTrendingBooks()
          : await tmdbService.getTrending(type);
        setState(prev => ({
          ...prev,
          categoryMedia: data,
          isLoading: false,
        }));
      } else {
        // Fetch all media types
        const [movies, tvShows, books] = await Promise.all([
          tmdbService.getTrending('movie').catch(() => []),
          tmdbService.getTrending('series').catch(() => []),
          booksService.getTrendingBooks().catch(() => []),
        ]);

        if ([...movies, ...tvShows, ...books].length === 0) {
          throw new Error('No media content available');
        }

        setState(prev => ({
          ...prev,
          trendingMedia: [...movies, ...tvShows, ...books],
          isLoading: false,
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch media content';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: `${message}. Please try again later.`,
      }));
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}