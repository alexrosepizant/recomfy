import React from 'react';
import { Tag } from 'lucide-react';
import { useFilterContext } from '../../contexts/FilterContext';
import { FilterSection } from './FilterSection';
import { FilterCheckbox } from './FilterCheckbox';
import { GENRES } from './constants';

export const GenreFilter: React.FC = () => {
  const { filters, toggleGenre } = useFilterContext();

  const handleGenreToggle = (genre: string) => {
    toggleGenre(genre);
  };

  return (
    <FilterSection title="Genres" icon={Tag}>
      <div className="space-y-2">
        {GENRES.map(genre => (
          <FilterCheckbox
            key={genre}
            label={genre}
            checked={filters.genres.includes(genre)}
            onChange={() => handleGenreToggle(genre)}
          />
        ))}
      </div>
    </FilterSection>
  );
};