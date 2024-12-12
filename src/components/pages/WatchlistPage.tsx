import React from 'react';
import { useWatchLater } from '../../hooks/user/useWatchLater';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { MediaGrid } from '../media/MediaGrid';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';
import { EmptyState } from '../EmptyState';
import { Bookmark } from 'lucide-react';

export const WatchlistPage: React.FC = () => {
  const { watchLater } = useWatchLater();
  const { filters } = useFilterContext();
  const filteredWatchlist = useFilteredMedia(watchLater, filters);

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-md bg-primary/10">
              <Bookmark className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Your Watchlist</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Keep track of media you want to watch or read later
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <MediaTypeFilterBar />

      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        {watchLater.length === 0 ? (
          <EmptyState
            title="Your Watchlist is Empty"
            message="Add media to your watchlist to keep track of what you want to watch or read"
          />
        ) : filteredWatchlist.length === 0 ? (
          <EmptyState
            title="No Results"
            message="Try adjusting your filters to see more content"
          />
        ) : (
          <MediaGrid media={filteredWatchlist} />
        )}
      </div>
    </div>
  );
};