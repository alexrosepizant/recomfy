import { useState, useEffect } from 'react';
import { Media } from '../types/media';
import { RecommendationNeuralNetwork } from '../services/recommendation/neuralNetwork';
import { useUserPreferences } from './useUserPreferences';

const recommendationEngine = new RecommendationNeuralNetwork();

export function useRecommendations(availableMedia: Media[]) {
  const [recommendations, setRecommendations] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { preferences, ratings } = useUserPreferences();

  useEffect(() => {
    async function trainAndRecommend() {
      try {
        setIsLoading(true);

        // Create training data from user ratings
        const trainingData = Object.entries(ratings).map(([id, rating]) => ({
          media: availableMedia.find(m => m.id === id)!,
          score: rating / 5, // Normalize to [0, 1]
        })).filter(item => item.media); // Filter out any undefined media

        // Train the network if we have ratings
        if (trainingData.length > 0) {
          await recommendationEngine.train(trainingData);
        }

        // Get recommendations
        const recommended = recommendationEngine.recommendMedia(
          availableMedia.filter(m => !ratings[m.id]), // Exclude rated items
          10
        );

        setRecommendations(recommended);
      } catch (error) {
        console.error('Error generating recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (availableMedia.length > 0) {
      trainAndRecommend();
    }
  }, [availableMedia, ratings, preferences]);

  return {
    recommendations,
    isLoading,
  };
}