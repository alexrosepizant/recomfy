import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../../../types/media';
import { cn } from '../../../utils/cn';
import { MediaCardImage } from './MediaCardImage';
import { MediaCardContent } from './MediaCardContent';
import { MediaCardActions } from './MediaCardActions';

interface MediaCardProps {
  media: Media;
  compact?: boolean;
  showFeedback?: boolean;
  onFeedback?: (mediaId: string, liked: boolean) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ 
  media,
  compact = false,
  showFeedback,
  onFeedback,
}) => {
  return (
    <Link 
      to={`/media/${media.type}-${media.id}`}
      className={cn(
        "group bg-card rounded-xl border border-border/50",
        "hover:bg-muted hover:border-primary/20 cursor-pointer",
        "transition-all duration-200 overflow-hidden shadow-sm",
        compact ? "p-3" : "p-4"
      )}
    >
      <div className="space-y-4">
        <MediaCardImage
          src={media.imageUrl}
          alt={media.title}
          type={media.type}
        />

        <MediaCardContent
          title={media.title}
          description={media.description}
          compact={compact}
        />

        <MediaCardActions
          mediaId={media.id}
          rating={media.rating || 0}
          showFeedback={showFeedback}
          onFeedback={onFeedback}
        />
      </div>
    </Link>
  );
};