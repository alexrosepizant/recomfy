import { UserPreferences } from '../../types/media';

export function toggleGenre(
  genre: string,
  type: 'favorite' | 'excluded',
  preferences: UserPreferences
): Pick<UserPreferences, 'favoriteGenres' | 'excludedGenres'> {
  const isFavorite = preferences.favoriteGenres.includes(genre);
  const isExcluded = preferences.excludedGenres.includes(genre);
  
  let favoriteGenres = [...preferences.favoriteGenres];
  let excludedGenres = [...preferences.excludedGenres];

  if (type === 'favorite') {
    if (isFavorite) {
      favoriteGenres = favoriteGenres.filter(g => g !== genre);
    } else {
      favoriteGenres.push(genre);
      excludedGenres = excludedGenres.filter(g => g !== genre);
    }
  } else {
    if (isExcluded) {
      excludedGenres = excludedGenres.filter(g => g !== genre);
    } else {
      excludedGenres.push(genre);
      favoriteGenres = favoriteGenres.filter(g => g !== genre);
    }
  }

  return { favoriteGenres, excludedGenres };
}