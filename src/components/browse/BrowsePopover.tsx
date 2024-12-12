import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GenreList } from './GenreList';
import { useFilterContext } from '../../contexts/FilterContext';

interface BrowsePopoverProps {
  onClose: () => void;
}

export const BrowsePopover: React.FC<BrowsePopoverProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { setMediaType, toggleGenre } = useFilterContext();

  const handleGenreSelect = (genre: string) => {
    toggleGenre(genre);
    setMediaType(null); // Show all media types
    navigate('/');
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 z-50 w-64 bg-card rounded-lg shadow-lg border border-border p-4">
      <h3 className="text-sm font-medium mb-3">Browse by Genre</h3>
      <GenreList onSelect={handleGenreSelect} />
    </div>
  );
};