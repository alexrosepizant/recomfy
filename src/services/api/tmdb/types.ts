export interface TMDBMovieResult {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  imdb_id?: string;
}

export interface TMDBTVResult {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string | null;
}

export interface TMDBSearchResponse {
  page: number;
  results: (TMDBMovieResult | TMDBTVResult)[];
  total_results: number;
  total_pages: number;
}