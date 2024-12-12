import { GenreColors } from './types';

export const genreColors: Record<string, GenreColors> = {
  'Action': {
    background: 'bg-gradient-to-br from-red-600/90 to-red-900/90',
    hover: 'group-hover:from-red-500/90 group-hover:to-red-800/90'
  },
  'Adventure': {
    background: 'bg-gradient-to-br from-amber-600/90 to-amber-900/90',
    hover: 'group-hover:from-amber-500/90 group-hover:to-amber-800/90'
  },
  'Comedy': {
    background: 'bg-gradient-to-br from-yellow-500/90 to-yellow-800/90',
    hover: 'group-hover:from-yellow-400/90 group-hover:to-yellow-700/90'
  },
  'Drama': {
    background: 'bg-gradient-to-br from-purple-600/90 to-purple-900/90',
    hover: 'group-hover:from-purple-500/90 group-hover:to-purple-800/90'
  },
  'Fantasy': {
    background: 'bg-gradient-to-br from-blue-600/90 to-blue-900/90',
    hover: 'group-hover:from-blue-500/90 group-hover:to-blue-800/90'
  },
  'Horror': {
    background: 'bg-gradient-to-br from-gray-800/90 to-gray-900/90',
    hover: 'group-hover:from-gray-700/90 group-hover:to-gray-800/90'
  },
  'Mystery': {
    background: 'bg-gradient-to-br from-indigo-600/90 to-indigo-900/90',
    hover: 'group-hover:from-indigo-500/90 group-hover:to-indigo-800/90'
  },
  'Romance': {
    background: 'bg-gradient-to-br from-pink-600/90 to-pink-900/90',
    hover: 'group-hover:from-pink-500/90 group-hover:to-pink-800/90'
  },
  'Sci-Fi': {
    background: 'bg-gradient-to-br from-cyan-600/90 to-cyan-900/90',
    hover: 'group-hover:from-cyan-500/90 group-hover:to-cyan-800/90'
  },
  'Thriller': {
    background: 'bg-gradient-to-br from-emerald-600/90 to-emerald-900/90',
    hover: 'group-hover:from-emerald-500/90 group-hover:to-emerald-800/90'
  }
};

export function getGenreColor(genre: string): GenreColors {
  return genreColors[genre] || {
    background: 'bg-gradient-to-br from-gray-600/90 to-gray-900/90',
    hover: 'group-hover:from-gray-500/90 group-hover:to-gray-800/90'
  };
}