import React from 'react';
import { Film, Tv, Book } from 'lucide-react';
import { MediaType } from '../../types/media';
import { cn } from '../../utils/cn';

interface MediaTypeSelectorProps {
  selectedTypes: MediaType[];
  onTypeChange: (types: MediaType[]) => void;
}

export const MediaTypeSelector: React.FC<MediaTypeSelectorProps> = ({
  selectedTypes,
  onTypeChange,
}) => {
  const toggleType = (type: MediaType) => {
    if (selectedTypes.includes(type)) {
      // Don't allow deselecting if it's the last type
      if (selectedTypes.length > 1) {
        onTypeChange(selectedTypes.filter(t => t !== type));
      }
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  const types: { type: MediaType; label: string; icon: typeof Film }[] = [
    { type: 'movie', label: 'Movies', icon: Film },
    { type: 'series', label: 'TV Series', icon: Tv },
    { type: 'book', label: 'Books', icon: Book },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {types.map(({ type, label, icon: Icon }) => (
        <button
          key={type}
          onClick={() => toggleType(type)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
            selectedTypes.includes(type)
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};