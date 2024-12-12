import React from 'react';
import { Media } from '../../types/media';
import { useRecommendations } from '../../hooks/recommendation/useRecommendations';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { MediaGrid } from './MediaGrid';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { EmptyState } from '../EmptyState';
import { cn } from '../../utils/cn';

interface RecommendedSectionProps {
  availableMedia: Media[];
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({ 
  availableMedia 
}) => {
  const { ratings } = useUserPreferences();
  const { filters } = useFilterContext();
  const filteredMedia = useFilteredMedia(availableMedia, filters);
  
  const { 
    recommendations, 
    isLoading, 
    error, 
    handleFeedback,
    showOtherSuggestions 
  } = useRecommendations(filteredMedia);
  
  const hasRatings = Object.keys(ratings).length > 0;

  if (!hasRatings) {
    return (
      <div className="w-full py-8">
        <EmptyRecommendations />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8">
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full border-b border-border/50">
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Made for You
              </h2>
              <p className="text-sm text-muted-foreground">
                Based on your ratings and preferences
              </p>
            </div>
          </div>

          <button
            onClick={showOtherSuggestions}
            disabled={isLoading}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-primary/10 hover:bg-primary/20 text-primary",
              "transition-colors disabled:opacity-50 text-sm font-medium"
            )}
          >
            <RefreshCw className={cn(
              "w-4 h-4",
              isLoading && "animate-spin"
            )} />
            Refresh
          </button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner className="border-primary/20 border-t-primary" />
          </div>
        ) : recommendations.length === 0 ? (
          <EmptyState
            title="No Recommendations Available"
            message="Try adjusting your filters or rating more content to get personalized suggestions."
          />
        ) : (
          <MediaGrid 
            media={recommendations} 
            onFeedback={handleFeedback}
            showFeedback
          />
        )}
      </div>
    </section>
  );
};

const EmptyRecommendations: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="inline-flex p-3 rounded-full bg-primary/10">
      <Sparkles className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-foreground">
      Get Personalized Recommendations
    </h3>
    <p className="text-sm text-muted-foreground max-w-md mx-auto">
      Rate some movies, TV shows, or books to get recommendations tailored just for you.
      The more you rate, the better your suggestions will be!
    </p>
  </div>
);