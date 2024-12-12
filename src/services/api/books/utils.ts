import { GENRE_MAP } from './constants';

export function standardizeGenre(genre: string): string {
  const normalizedGenre = genre.trim();
  
  // Check direct mapping
  if (normalizedGenre in GENRE_MAP) {
    return GENRE_MAP[normalizedGenre];
  }

  // Check for partial matches
  for (const [key, value] of Object.entries(GENRE_MAP)) {
    if (normalizedGenre.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }

  return 'Fiction';
}