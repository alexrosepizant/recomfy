import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilterContext } from '../../contexts/FilterContext';
import { GenreGrid } from '../browse/GenreGrid';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';

export const BrowsePage: React.FC = () => {
  const navigate = useNavigate();
  const { filters, toggleGenre } = useFilterContext();

  const handleGenreSelect = (genre: string) => {
    toggleGenre(genre);
    navigate(`/browse/${genre}`);
  };

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Browse by Genre</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {filters.types.length === 1 
              ? `Explore ${filters.types[0] === 'series' ? 'TV series' : `${filters.types[0]}s`} across different genres`
              : 'Explore our collection of movies, TV shows, and books across different genres'}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <MediaTypeFilterBar />
      
      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        <GenreGrid onGenreSelect={handleGenreSelect} />
      </div>
    </div>
  );
};