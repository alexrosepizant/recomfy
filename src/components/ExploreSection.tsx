import React from 'react';
import { Media } from '../types/media';
import { MediaCard } from './MediaCard';
import { useFilterContext } from '../contexts/FilterContext';
import { useFilteredMedia } from '../hooks/useFilteredMedia';

interface ExploreSectionProps {
  title: string;
  description: string;
  media: Media[];
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  title,
  description,
  media,
}) => {
  const { filters } = useFilterContext();
  const filteredMedia = useFilteredMedia(media, filters);

  if (filteredMedia.length === 0) {
    return (
      <section className="py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="text-center py-8 text-gray-500">
          No results match your current filters.
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <MediaCard key={item.id} media={item} />
        ))}
      </div>
    </section>
  );
};