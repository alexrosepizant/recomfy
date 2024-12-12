import React from 'react';
import { useMediaHistory } from '../../hooks/useMediaHistory';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { MediaGrid } from '../media/MediaGrid';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';
import { EmptyState } from '../EmptyState';
import { History } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { history } = useMediaHistory();
  const { filters } = useFilterContext();
  const filteredHistory = useFilteredMedia(history, filters);

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-md bg-primary/10">
              <History className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Recently Viewed</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Browse through your viewing history
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <MediaTypeFilterBar />

      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        {history.length === 0 ? (
          <EmptyState
            title="No History Yet"
            message="Start watching or reading content to build your history"
          />
        ) : filteredHistory.length === 0 ? (
          <EmptyState
            title="No Results"
            message="Try adjusting your filters to see more content"
          />
        ) : (
          <MediaGrid media={filteredHistory} />
        )}
      </div>
    </div>
  );
};