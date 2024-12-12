import React from 'react';
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useUserPreferences } from '../../../hooks/user/useUserPreferences';

interface MediaCardActionsProps {
  mediaId: string;
  rating: number;
  showFeedback?: boolean;
  onFeedback?: (mediaId: string, liked: boolean) => void;
}

export const MediaCardActions: React.FC<MediaCardActionsProps> = ({
  mediaId,
  rating,
  showFeedback,
  onFeedback,
}) => {
  const { ratings, rateMedia } = useUserPreferences();
  const userRating = ratings[mediaId];

  const handleRate = (e: React.MouseEvent, rating: number) => {
    e.preventDefault();
    e.stopPropagation();
    rateMedia(mediaId, rating);
  };

  const handleFeedback = (e: React.MouseEvent, liked: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    onFeedback?.(mediaId, liked);
  };

  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-primary fill-current" />
        <span className="text-sm font-medium">
          {rating ? rating.toFixed(1) : 'N/A'}
        </span>
      </div>

      {showFeedback ? (
        <div className="flex space-x-4">
          <button
            onClick={(e) => handleFeedback(e, true)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ThumbsUp className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => handleFeedback(e, false)}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={(e) => handleRate(e, rating)}
              className={cn(
                "transition-colors",
                rating <= (userRating || 0)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};