import React from 'react';
import { Star, BookOpen, Eye, ExternalLink } from 'lucide-react';
import { Media } from '../../types/media';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { cn } from '../../utils/cn';

interface MediaActionsProps {
  media: Media;
}

export const MediaActions: React.FC<MediaActionsProps> = ({ media }) => {
  const { ratings, rateMedia } = useUserPreferences();
  const userRating = ratings[media.id];
  const [hasRead, setHasRead] = React.useState(false);
  const [hasWatched, setHasWatched] = React.useState(false);

  const handleToggleRead = () => {
    setHasRead(!hasRead);
  };

  const handleToggleWatched = () => {
    setHasWatched(!hasWatched);
  };

  const getExternalLink = () => {
    switch (media.type) {
      case 'movie':
        return `https://www.imdb.com/title/${media.externalId}`;
      case 'series':
        return `https://www.imdb.com/title/${media.externalId}`;
      case 'book':
        return `https://www.goodreads.com/book/show/${media.externalId}`;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Rating Section */}
      <div>
        <h3 className="text-sm font-medium mb-3">Your Rating</h3>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => rateMedia(media.id, rating)}
              className={cn(
                "p-2 rounded-md transition-colors",
                rating <= (userRating || 0)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Star className="w-5 h-5 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Status Section */}
      <div>
        <h3 className="text-sm font-medium mb-3">Status</h3>
        <div className="flex gap-3">
          {media.type === 'book' ? (
            <button
              onClick={handleToggleRead}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                hasRead
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="w-4 h-4" />
              <span>{hasRead ? 'Read' : 'Mark as Read'}</span>
            </button>
          ) : (
            <button
              onClick={handleToggleWatched}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                hasWatched
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="w-4 h-4" />
              <span>{hasWatched ? 'Watched' : 'Mark as Watched'}</span>
            </button>
          )}
        </div>
      </div>

      {/* External Link */}
      {media.externalId && (
        <div>
          <h3 className="text-sm font-medium mb-3">More Info</h3>
          <a
            href={getExternalLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md",
              "bg-muted text-muted-foreground hover:text-foreground",
              "transition-colors w-fit"
            )}
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on {media.type === 'book' ? 'Goodreads' : 'IMDb'}</span>
          </a>
        </div>
      )}
    </div>
  );
};