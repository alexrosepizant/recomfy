import { useMemo } from 'react';
import { createRecommendationEngine } from '../../services/recommendation/factory';

export function useRecommendationEngine() {
  return useMemo(() => createRecommendationEngine(), []);
}