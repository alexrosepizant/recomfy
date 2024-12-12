export type MediaType = 'movie' | 'book' | 'series';

export interface Media {
  id: string;
  type: MediaType;
  title: string;
  description: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  imageUrl: string;
  externalId?: string; // IMDb or Goodreads ID
}

export interface UserPreferences {
  favoriteGenres: string[];
  excludedGenres: string[];
  minimumRating: number;
  mediaTypes: MediaType[];
}