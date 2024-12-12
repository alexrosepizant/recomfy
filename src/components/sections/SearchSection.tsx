import React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { MediaGrid } from '../media/MediaGrid';
import { EmptyState } from '../EmptyState';
import { Search } from 'lucide-react';

export const SearchSection: React.FC = () => {
  const { searchResults, isSearching, error, searchQuery } = useSearchContext();
  const { filters } = useFilterContext();
  const filteredResults = useFilteredMedia(searchResults, filters);

  if (error) {
    return (
      <div className="w-full border-t border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-8">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-destructive">Error</h3>
                <div className="mt-2 text-sm text-destructive/80">
                  {error}
                </div>
              </div>
            </div>
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
            <Search className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Search Results</h2>
            <p className="text-sm text-muted-foreground">
              Found {filteredResults.length} results for "{searchQuery}"
            </p>
          </div>
        </div>

        {isSearching ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" className="border-primary/20 border-t-primary" />
          </div>
        ) : filteredResults.length === 0 ? (
          <EmptyState
            title="No Results Found"
            message="Try adjusting your search terms or filters."
          />
        ) : (
          <MediaGrid media={filteredResults} />
        )}
      </div>
    </section>
  );
};