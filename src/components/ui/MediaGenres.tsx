import React from 'react';
import { Tag } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MediaGenresProps {
  genres: string[];
}

export const MediaGenres: React.FC<MediaGenresProps> = ({ genres }) => {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Genres</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <span
            key={genre}
            className={cn(
              "px-3 py-1 rounded-full text-sm",
              "bg-primary/10 text-primary"
            )}
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};