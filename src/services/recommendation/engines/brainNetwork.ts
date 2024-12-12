import { NeuralNetwork } from 'brain.js';
import { Media } from '../../../types/media';
import { RecommendationEngine } from '../types';
import { FeatureEncoder } from '../utils/featureEncoder';
import { normalizeScore } from '../utils/normalization';

export class BrainNetworkEngine implements RecommendationEngine {
  private network: NeuralNetwork;
  private encoder: FeatureEncoder;
  private initialized: boolean = false;
  private trainingInProgress: boolean = false;

  constructor() {
    this.network = new NeuralNetwork({
      hiddenLayers: [6, 3],
      activation: 'sigmoid',
      learningRate: 0.2,
    });
    this.encoder = new FeatureEncoder();
  }

  async train(trainingSet: { media: Media; score: number }[]): Promise<void> {
    if (trainingSet.length === 0 || this.trainingInProgress) return;

    try {
      this.trainingInProgress = true;
      const trainingData = trainingSet.map(({ media, score }) => ({
        input: this.encoder.encodeFeatures(
          media.genres,
          media.type,
          media.releaseYear,
          media.rating
        ),
        output: { score: normalizeScore(score) }
      }));

      await this.network.trainAsync(trainingData, {
        iterations: 100,
        errorThresh: 0.01,
        log: false
      });

      this.initialized = true;
    } catch (error) {
      console.error('Training error:', error);
      throw error;
    } finally {
      this.trainingInProgress = false;
    }
  }

  predict(media: Media): number {
    if (!this.initialized) return 0;

    try {
      const features = this.encoder.encodeFeatures(
        media.genres,
        media.type,
        media.releaseYear,
        media.rating
      );
      
      const result = this.network.run(features) as { score: number };
      return normalizeScore(result.score);
    } catch (error) {
      console.error('Prediction error:', error);
      return 0;
    }
  }

  recommendMedia(availableMedia: Media[], limit: number = 5): Media[] {
    if (!this.initialized || availableMedia.length === 0) {
      return availableMedia.slice(0, limit);
    }

    try {
      const scoredMedia = availableMedia
        .map(media => ({
          media,
          score: this.predict(media)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

      return scoredMedia.map(({ media }) => media);
    } catch (error) {
      console.error('Recommendation error:', error);
      return availableMedia.slice(0, limit);
    }
  }
}