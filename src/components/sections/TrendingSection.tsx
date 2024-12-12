import React from 'react';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { MediaGrid } from '../media/MediaGrid';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { EmptyState } from '../EmptyState';
import { BarChart2 } from 'lucide-react';

export const TrendingSection: React.FC = () => {
  const { trendingMedia, isLoading, error } = useDefaultMedia();
  const { filters } = useFilterContext();
  const filteredMedia = useFilteredMedia(trendingMedia, filters);

  if (error) {
    return (
      <div className="w-full border-t border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full border-t border-border/50">
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-md bg-primary/10">
            <BarChart2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Trending Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Popular content across all categories
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner className="border-primary/20 border-t-primary" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <EmptyState
            title="No Results Found"
            message="Try adjusting your filters to see more content."
          />
        ) : (
          <MediaGrid media={filteredMedia} />
        )}
      </div>
    </section>
  );
};