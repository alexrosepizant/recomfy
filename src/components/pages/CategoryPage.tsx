import React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import { SearchResults } from '../search/SearchResults';
import { ExploreSection } from '../ExploreSection';
import { MediaType } from '../../types/media';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface CategoryPageProps {
  type: MediaType;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ type }) => {
  const { setSelectedTypes } = useSearchContext();
  const { categoryMedia, isLoading, error } = useDefaultMedia(type);

  // Set the selected type when the component mounts
  React.useEffect(() => {
    setSelectedTypes([type]);
  }, [type, setSelectedTypes]);

  const title = type === 'series' ? 'TV Series' : `${type}s`;

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      <SearchResults />
      {isLoading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <ExploreSection
          title={`Popular ${title}`}
          description={`Discover popular ${title.toLowerCase()} across all genres`}
          media={categoryMedia}
        />
      )}
    </>
  );
};