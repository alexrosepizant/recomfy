import React from 'react';
import { MediaCard } from '../MediaCard';
import { useSearchContext } from '../../contexts/SearchContext';
import { useFilterContext } from '../../contexts/FilterContext';
import { useFilteredMedia } from '../../hooks/useFilteredMedia';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const SearchResults: React.FC = () => {
  const { searchResults, isSearching, error, searchQuery } = useSearchContext();
  const { filters } = useFilterContext();
  const filteredResults = useFilteredMedia(searchResults, filters);

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (searchQuery && filteredResults.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found. Try adjusting your search terms or filters.
      </div>
    );
  }

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredResults.map((media) => (
        <MediaCard key={media.id} media={media} />
      ))}
    </div>
  );
}