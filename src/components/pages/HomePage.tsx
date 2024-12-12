import React from 'react';
import { useSearchContext } from '../../contexts/SearchContext';
import { SearchSection } from '../sections/SearchSection';
import { TrendingSection } from '../sections/TrendingSection';
import { RecommendedSection } from '../sections/RecommendedSection';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';

export const HomePage: React.FC = () => {
  const { searchQuery } = useSearchContext();
  const { trendingMedia } = useDefaultMedia();

  return (
    <div className="min-h-screen">
      {/* Show search results when searching */}
      {searchQuery ? (
        <SearchSection />
      ) : (
        <>
          {/* Show recommendations when not searching */}
          {trendingMedia.length > 0 && (
            <RecommendedSection availableMedia={trendingMedia} />
          )}

          {/* Always show trending section */}
          <TrendingSection />
        </>
      )}
    </div>
  );
};