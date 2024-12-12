import React from 'react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { MediaGrid } from '../media/MediaGrid';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';
import { EmptyState } from '../EmptyState';
import { Star } from 'lucide-react';

export const RatedMediaPage: React.FC = () => {
  const { ratings } = useUserPreferences();
  const { trendingMedia } = useDefaultMedia();
  const { filters } = useFilterContext();

  const ratedMedia = trendingMedia
    .filter(media => ratings[media.id])
    .sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));

  const filteredRatedMedia = useFilteredMedia(ratedMedia, filters);

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-md bg-primary/10">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Rated Media</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Browse through all the content you've rated
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <MediaTypeFilterBar />

      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        {ratedMedia.length === 0 ? (
          <EmptyState
            title="No Rated Content"
            message="Rate some movies, TV shows, or books to see them here"
          />
        ) : filteredRatedMedia.length === 0 ? (
          <EmptyState
            title="No Results"
            message="Try adjusting your filters to see more content"
          />
        ) : (
          <MediaGrid media={filteredRatedMedia} />
        )}
      </div>
    </div>
  );
};