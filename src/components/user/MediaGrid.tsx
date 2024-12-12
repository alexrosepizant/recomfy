import React from 'react';
import { Media } from '../../types/media';
import { MediaCard } from '../MediaCard';

interface MediaGridProps {
  media: Media[];
  compact?: boolean;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ media, compact = false }) => {
  if (media.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items to display
      </div>
    );
  }

  return (
    <div className={`grid gap-4 ${
      compact 
        ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {media.map((item) => (
        <MediaCard 
          key={item.id} 
          media={item} 
          compact={compact}
        />
      ))}
    </div>
  );
};