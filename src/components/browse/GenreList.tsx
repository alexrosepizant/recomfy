import React from 'react';
import { useGenres } from '../../hooks/useGenres';
import { GenreIcon } from './GenreIcon';

interface GenreListProps {
  onSelect: (genre: string) => void;
}

export const GenreList: React.FC<GenreListProps> = ({ onSelect }) => {
  const { genres } = useGenres();

  return (
    <div className="grid grid-cols-1 gap-2">
      {genres.map(genre => (
        <button
          key={genre}
          onClick={() => onSelect(genre)}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
        >
          <GenreIcon genre={genre} className="w-4 h-4 text-primary" />
          <span className="text-sm">{genre}</span>
        </button>
      ))}
    </div>
  );
};