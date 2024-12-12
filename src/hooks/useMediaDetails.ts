import { useState, useEffect } from 'react';
import { Media } from '../types/media';
import { TMDBService } from '../services/api/tmdb/service';
import { GoogleBooksService } from '../services/api/books/service';
import { ERROR_MESSAGES } from '../utils/errors/messages';

const tmdbService = new TMDBService();
const booksService = new GoogleBooksService();

interface MediaDetailsState {
  media: Media | null;
  isLoading: boolean;
  error: string | null;
}

export function useMediaDetails(id: string | undefined) {
  const [state, setState] = useState<MediaDetailsState>({
    media: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchDetails() {
      if (!id) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: ERROR_MESSAGES.media.invalidId 
        }));
        return;
      }

      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        // Parse media type and ID
        const [type, actualId] = id.split('-');
        if (!type || !actualId || !['movie', 'series', 'book'].includes(type)) {
          throw new Error(ERROR_MESSAGES.media.invalidId);
        }

        // Fetch details based on media type
        const details = type === 'book'
          ? await booksService.getBookDetails(actualId)
          : await tmdbService.getMediaDetails(actualId, type as 'movie' | 'series');

        if (!details && mounted) {
          setState({
            media: null,
            isLoading: false,
            error: ERROR_MESSAGES.media.notFound,
          });
          return;
        }

        if (mounted) {
          setState({
            media: details,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Error fetching media details:', error);
        
        if (mounted) {
          setState({
            media: null,
            isLoading: false,
            error: error instanceof Error 
              ? error.message 
              : ERROR_MESSAGES.media.loadError,
          });
        }
      }
    }

    fetchDetails();

    return () => {
      mounted = false;
    };
  }, [id]);

  return state;
}