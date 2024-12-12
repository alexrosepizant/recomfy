import React from 'react';
import { Film, Tv, Book, LayoutGrid } from 'lucide-react';
import { useFilterContext } from '../../contexts/FilterContext';
import { cn } from '../../utils/cn';
import { MediaType } from '../../types/media';

const mediaTypes = [
  { value: 'all', label: 'All', icon: LayoutGrid },
  { value: 'movie', label: 'Movies', icon: Film },
  { value: 'series', label: 'TV Series', icon: Tv },
  { value: 'book', label: 'Books', icon: Book },
] as const;

export const MediaTypeFilterBar: React.FC = () => {
  const { filters, setMediaType } = useFilterContext();
  const selectedType = filters.types.length === 0 ? 'all' : filters.types[0];

  const handleTypeChange = (type: MediaType | 'all') => {
    if (type === 'all') {
      setMediaType(null);
    } else {
      setMediaType(type as MediaType);
    }
  };

  return (
    <div className="sticky top-[4rem] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center gap-2 px-6 py-2 border-b border-border/50">
          {mediaTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handleTypeChange(value)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                "transition-colors hover:bg-primary/10",
                selectedType === value
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};