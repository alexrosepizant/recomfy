import { Media } from '../../types/media';

export interface TrainingData {
  input: {
    genres: number[];
    rating: number;
    type: number[];
    year: number;
  };
  output: {
    score: number;
  };
}

export interface RecommendationEngine {
  train(trainingSet: { media: Media; score: number }[]): Promise<void>;
  predict(media: Media): number;
  recommendMedia(availableMedia: Media[], limit?: number): Media[];
}

export interface EncodedFeatures {
  genres: number[];
  rating: number;
  type: number[];
  year: number;
}