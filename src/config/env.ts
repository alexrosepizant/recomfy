import { z } from 'zod';

const envSchema = z.object({
  VITE_TMDB_API_KEY: z.string().min(1, 'TMDB API key is required'),
  VITE_GOOGLE_BOOKS_API_KEY: z.string().min(1, 'Google Books API key is required'),
});

export const env = {
  TMDB_API_KEY: import.meta.env.VITE_TMDB_API_KEY,
  GOOGLE_BOOKS_API_KEY: import.meta.env.VITE_GOOGLE_BOOKS_API_KEY,
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500',
} as const;

export function validateEnv(): { isValid: boolean; error?: string } {
  try {
    const result = envSchema.safeParse({
      VITE_TMDB_API_KEY: env.TMDB_API_KEY,
      VITE_GOOGLE_BOOKS_API_KEY: env.GOOGLE_BOOKS_API_KEY,
    });

    if (!result.success) {
      const error = 'TMDB API key is missing. Please follow these steps:\n\n' +
        '1. Copy .env.example to .env\n' +
        '2. Get an API key from https://www.themoviedb.org/settings/api\n' +
        '3. Add your API key to the .env file\n' +
        '4. Restart the development server';
      
      console.error(error);
      return { isValid: false, error };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Environment validation error:', error);
    return { 
      isValid: false, 
      error: 'Failed to validate environment configuration' 
    };
  }
}