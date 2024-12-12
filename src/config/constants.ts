// API Configuration
export const API_CONFIG = {
  TMDB: {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
    DEFAULT_PARAMS: {
      language: 'en-US',
      include_adult: false,
    },
  },
} as const;