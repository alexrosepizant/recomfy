import { useState, useEffect, useCallback, useRef } from 'react';
import { Media } from '../../types/media';
import { useRecommendationEngine } from './useRecommendationEngine';
import { useUserPreferences } from '../user/useUserPreferences';

export function useRecommendations(availableMedia: Media[]) {
  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [excludedIds] = useState(() => new Set<string>());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const engine = useRecommendationEngine();
  const { ratings } = useUserPreferences();
  const generationInProgress = useRef(false);
  const availableMediaRef = useRef(availableMedia);

  // Update ref when availableMedia changes
  useEffect(() => {
    availableMediaRef.current = availableMedia;
  }, [availableMedia]);

  const generateRecommendations = useCallback(async (forceNew: boolean = false) => {
    if (generationInProgress.current) return;
    
    try {
      generationInProgress.current = true;
      setIsLoading(true);
      setError(null);

      const currentMedia = availableMediaRef.current;

      // Get rated items for training
      const ratedItems = Object.entries(ratings)
        .map(([id, rating]) => {
          const media = currentMedia.find(m => m.id === id);
          if (!media) return null;
          return { media, score: rating / 5 };
        })
        .filter((item): item is { media: Media; score: number } => 
          item !== null && !excludedIds.has(item.media.id)
        );

      // Get candidate items for recommendations
      const candidates = currentMedia.filter(media => 
        !ratings[media.id] && 
        !excludedIds.has(media.id) &&
        (forceNew ? !recommendations.find(r => r.id === media.id) : true)
      );

      if (candidates.length === 0) {
        setRecommendations([]);
        return;
      }

      // Generate recommendations
      if (ratedItems.length > 0) {
        await engine.train(ratedItems);
        const recommended = engine.recommendMedia(candidates, 10);
        setRecommendations(recommended);
      } else {
        // If no ratings, return random selection
        const shuffled = [...candidates]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        setRecommendations(shuffled);
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setError('Failed to generate recommendations');
    } finally {
      setIsLoading(false);
      generationInProgress.current = false;
    }
  }, [ratings, engine, excludedIds]);

  // Only regenerate recommendations when availableMedia changes
  useEffect(() => {
    if (availableMedia.length > 0) {
      generateRecommendations();
    }
  }, [availableMedia]);

  const handleFeedback = useCallback((mediaId: string, liked: boolean) => {
    if (!liked) {
      excludedIds.add(mediaId);
      setRecommendations(prev => prev.filter(item => item.id !== mediaId));
      generateRecommendations();
    }
  }, [excludedIds, generateRecommendations]);

  const showOtherSuggestions = useCallback(() => {
    generateRecommendations(true);
  }, [generateRecommendations]);

  return {
    recommendations,
    isLoading,
    error,
    handleFeedback,
    showOtherSuggestions
  };
}