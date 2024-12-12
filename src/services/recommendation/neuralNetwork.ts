import { NeuralNetwork } from 'brain.js';
import { Media, UserPreferences } from '../../types/media';

interface TrainingData {
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

export class RecommendationNeuralNetwork {
  private network: NeuralNetwork;
  private genreMap: Map<string, number>;
  private typeMap: Map<string, number>;

  constructor() {
    this.network = new NeuralNetwork({
      hiddenLayers: [10, 5],
    });

    // Initialize maps for encoding categorical data
    this.genreMap = new Map();
    this.typeMap = new Map(['movie', 'series', 'book'].map((type, i) => [type, i]));
  }

  private normalizeYear(year: number): number {
    const currentYear = new Date().getFullYear();
    return (year - (currentYear - 50)) / 50; // Normalize to [-1, 1] range
  }

  private encodeGenres(genres: string[]): number[] {
    // Dynamically build genre map
    genres.forEach(genre => {
      if (!this.genreMap.has(genre)) {
        this.genreMap.set(genre, this.genreMap.size);
      }
    });

    // Create array with zeros
    const encoded = new Array(this.genreMap.size).fill(0);
    
    // Set 1 for present genres
    genres.forEach(genre => {
      const index = this.genreMap.get(genre);
      if (index !== undefined) {
        encoded[index] = 1;
      }
    });

    return encoded;
  }

  private encodeType(type: string): number[] {
    const encoded = new Array(this.typeMap.size).fill(0);
    const index = this.typeMap.get(type);
    if (index !== undefined) {
      encoded[index] = 1;
    }
    return encoded;
  }

  private prepareTrainingData(media: Media, score: number): TrainingData {
    return {
      input: {
        genres: this.encodeGenres(media.genres),
        rating: media.rating / 10, // Normalize to [0, 1]
        type: this.encodeType(media.type),
        year: this.normalizeYear(media.releaseYear),
      },
      output: {
        score,
      },
    };
  }

  async train(trainingSet: { media: Media; score: number }[]) {
    const trainingData = trainingSet.map(item => 
      this.prepareTrainingData(item.media, item.score)
    );

    await this.network.trainAsync(trainingData, {
      iterations: 1000,
      errorThresh: 0.005,
      log: true,
      logPeriod: 100,
    });
  }

  predict(media: Media): number {
    const input = this.prepareTrainingData(media, 0).input;
    const result = this.network.run(input) as { score: number };
    return result.score;
  }

  recommendMedia(availableMedia: Media[], limit: number = 10): Media[] {
    const scoredMedia = availableMedia
      .map(media => ({
        media,
        score: this.predict(media),
      }))
      .sort((a, b) => b.score - a.score);

    return scoredMedia.slice(0, limit).map(item => item.media);
  }
}