import { RecommendationEngine } from './types';
import { BrainNetworkEngine } from './engines/brainNetwork';

export function createRecommendationEngine(): RecommendationEngine {
  return new BrainNetworkEngine();
}