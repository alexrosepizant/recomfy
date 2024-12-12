import { Media, MediaType } from '../../../types/media';
import { TMDBMovieResult, TMDBTVResult } from './types';
import { getMediaImageUrl } from '../../../utils/media';
import { formatYear } from '../../../utils/date';
import { normalizeRating } from '../../../utils/ratings';

export function mapTMDBToMedia(item: any | TMDBTVResult, type: MediaType): Media {
  const isMovie = type === 'movie';
  const title = isMovie ? (item as TMDBMovieResult).title : (item as TMDBTVResult).name;
  const releaseDate = isMovie 
    ? (item as TMDBMovieResult).release_date 
    : (item as TMDBTVResult).first_air_date;

  // Convert TMDB rating (0-10) to app rating (0-5)
  const rating = normalizeRating(item.vote_average || 0, 'tmdb');

  // Map genre IDs to genre names (you'll need to implement this)
  const genres = item.genre_ids?.map((id: number) => getGenreName(id)) || [];

  return {
    id: item.id.toString(),
    type,
    title,
    description: item.overview,
    releaseYear: formatYear(releaseDate),
    genres,
    rating,
    imageUrl: getMediaImageUrl(item.poster_path, type),
    externalId: isMovie ? (item as TMDBMovieResult).imdb_id : undefined,
  };
}

// TMDB genre mapping
const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  35: 'Comedy',
  18: 'Drama',
  14: 'Fantasy',
  27: 'Horror',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  53: 'Thriller',
  // Add more mappings as needed
};

function getGenreName(genreId: number): string {
  return GENRE_MAP[genreId] || 'Other';
}