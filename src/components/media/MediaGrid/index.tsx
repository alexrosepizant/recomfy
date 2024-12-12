import React from 'react';
import { Media } from '../../../types/media';
import { MediaCard } from '../MediaCard';
import { cn } from '../../../utils/cn';

interface MediaGridProps {
  media: Media[];
  showFeedback?: boolean;
  onFeedback?: (mediaId: string, liked: boolean) => void;
  compact?: boolean;
}

export const MediaGrid: React.FC<MediaGridProps> = ({ 
  media, 
  showFeedback,
  onFeedback,
  compact 
}) => {
  if (media.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No items to display
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-6",
      compact 
        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" 
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    )}>
      {media.map((item) => (
        <MediaCard 
          key={item.id} 
          media={item}
          compact={compact}
          showFeedback={showFeedback}
          onFeedback={onFeedback}
        />
      ))}
    </div>
  );
};