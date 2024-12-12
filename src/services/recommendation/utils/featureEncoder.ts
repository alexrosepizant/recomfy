import { MediaType } from '../../../types/media';

export class FeatureEncoder {
  private genreMap: Map<string, number>;
  private typeMap: Map<string, number>;

  constructor() {
    this.genreMap = new Map();
    this.typeMap = new Map(['movie', 'series', 'book'].map((type, i) => [type, i]));
  }

  encodeGenres(genres: string[]): number[] {
    // Ensure consistent genre encoding
    genres.forEach(genre => {
      if (!this.genreMap.has(genre)) {
        this.genreMap.set(genre, this.genreMap.size);
      }
    });

    const encoded = new Array(Math.max(10, this.genreMap.size)).fill(0);
    genres.forEach(genre => {
      const index = this.genreMap.get(genre);
      if (index !== undefined && index < encoded.length) {
        encoded[index] = 1;
      }
    });

    return encoded;
  }

  encodeType(type: MediaType): number[] {
    const encoded = new Array(3).fill(0); // Fixed size for media types
    const index = this.typeMap.get(type);
    if (index !== undefined) {
      encoded[index] = 1;
    }
    return encoded;
  }

  normalizeYear(year: number): number {
    const currentYear = new Date().getFullYear();
    return (year - (currentYear - 50)) / 50; // Normalize to [-1, 1] range
  }

  normalizeRating(rating: number): number {
    return rating / 10; // Normalize to [0, 1] range
  }

  encodeFeatures(
    genres: string[],
    type: MediaType,
    year: number,
    rating: number
  ): Record<string, number> {
    const encodedGenres = this.encodeGenres(genres);
    const encodedType = this.encodeType(type);
    
    // Create a flat object with numbered keys
    const features: Record<string, number> = {};
    
    // Add genre features
    encodedGenres.forEach((value, index) => {
      features[`genre_${index}`] = value;
    });
    
    // Add type features
    encodedType.forEach((value, index) => {
      features[`type_${index}`] = value;
    });
    
    // Add normalized year and rating
    features.year = this.normalizeYear(year);
    features.rating = this.normalizeRating(rating);
    
    return features;
  }
}