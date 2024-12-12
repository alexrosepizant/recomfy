import React from 'react';
import { GenreCard } from './GenreCard';
import { useGenres } from '../../hooks/useGenres';
import { useFilterContext } from '../../contexts/FilterContext';

interface GenreGridProps {
  onGenreSelect?: (genre: string) => void;
}

export const GenreGrid: React.FC<GenreGridProps> = ({ onGenreSelect }) => {
  const { genres } = useGenres();
  const { filters } = useFilterContext();
  const selectedType = filters.types[0];

  // Filter genres based on selected media type
  const filteredGenres = selectedType ? genres.filter(genre => {
    switch (selectedType) {
      case 'movie':
        return !['Romance', 'Mystery'].includes(genre); // Example: exclude certain genres for movies
      case 'series':
        return true; // Show all genres for TV series
      case 'book':
        return !['Action', 'Horror'].includes(genre); // Example: exclude certain genres for books
      default:
        return true;
    }
  }) : genres;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredGenres.map(genre => (
        <GenreCard 
          key={genre} 
          genre={genre} 
          onClick={() => onGenreSelect?.(genre)}
        />
      ))}
    </div>
  );
};