import { useCallback } from 'react';
import { useUserPreferences } from '../user/useUserPreferences';
import { Media } from '../../types/media';

export function useMediaRating(media: Media) {
  const { ratings, rateMedia } = useUserPreferences();
  const userRating = ratings[media.id];

  const handleRate = useCallback((rating: number) => {
    rateMedia(media.id, rating);
  }, [media.id, rateMedia]);

  return {
    userRating,
    handleRate
  };
}