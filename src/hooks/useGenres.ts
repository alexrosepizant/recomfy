import { useMemo } from 'react';

export function useGenres() {
  const genres = useMemo(() => [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller'
  ], []);

  return { genres };
}