import React from 'react';
import { Link } from 'react-router-dom';
import { Media } from '../types/media';
import { useUserPreferences } from '../hooks/user/useUserPreferences';
import { useWatchLater } from '../hooks/user/useWatchLater';
import { useToast } from '../contexts/ToastContext';
import { cn } from '../utils/cn';
import { MediaCardImage } from './ui/MediaCardImage';
import { MediaCardContent } from './ui/MediaCardContent';
import { MediaCardActions } from './ui/MediaCardActions';

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
  const { ratings, rateMedia } = useUserPreferences();
  const { addToWatchLater, isInWatchLater } = useWatchLater();
  const { showToast } = useToast();

  const handleFeedback = (liked: boolean) => {
    onFeedback?.(media.id, liked);
    rateMedia(media.id, liked ? 5 : 1);

    if (liked && !isInWatchLater(media.id)) {
      addToWatchLater(media);
      showToast(`Added "${media.title}" to your watch later list`);
    }
  };

  return (
    <Link 
      to={`/media/${media.type}-${media.id}`}
      className={cn(
        "group bg-card rounded-xl border border-border/50",
        "hover:bg-muted hover:border-primary/20 cursor-pointer",
        "transition-all duration-200 overflow-hidden shadow-sm",
        compact ? "p-2" : "p-3"
      )}
    >
      <div className="space-y-3">
        {/* Image Container */}
        <div className="w-full h-40 rounded-lg overflow-hidden">
          <MediaCardImage
            src={media.imageUrl}
            alt={media.title}
            type={media.type}
          />
        </div>

        <MediaCardContent
          title={media.title}
          description={media.description}
          compact={compact}
        />

        <MediaCardActions
          mediaId={media.id}
          rating={media.rating}
          userRating={ratings[media.id]}
          showFeedback={showFeedback}
          onRate={rateMedia}
          onFeedback={handleFeedback}
        />
      </div>
    </Link>
  );
};