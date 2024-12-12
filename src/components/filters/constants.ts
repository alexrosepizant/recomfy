import { MediaType } from '../../types/media';

export const MEDIA_TYPES: { label: string; value: MediaType }[] = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Series', value: 'series' },
  { label: 'Books', value: 'book' },
];

export const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller'
];

export const RATINGS = ['4+ Stars', '3+ Stars', '2+ Stars'];
export const YEARS = ['2023', '2022', '2021', '2020', 'Before 2020'];