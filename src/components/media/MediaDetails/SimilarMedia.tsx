import React from 'react';
import { Media } from '../../../types/media';
import { MediaGrid } from '../MediaGrid';
import { useDefaultMedia } from '../../../hooks/useDefaultMedia';
import { useSimilarMedia } from '../../../hooks/media/useSimilarMedia';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { EmptyState } from '../../EmptyState';

interface SimilarMediaProps {
  currentMedia: Media;
}

export const SimilarMedia: React.FC<SimilarMediaProps> = ({ currentMedia }) => {
  const { trendingMedia, isLoading } = useDefaultMedia();
  const similarMedia = useSimilarMedia(currentMedia, trendingMedia);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" className="border-primary/20 border-t-primary" />
      </div>
    );
  }

  if (similarMedia.length === 0) {
    return (
      <EmptyState
        title="No Similar Content Found"
        message="We couldn't find any similar content at the moment."
      />
    );
  }

  return (
    <section className="mt-12 pt-12 border-t border-border/50">
      <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">More Like This</h2>
          <p className="text-muted-foreground mt-1">
            Similar {currentMedia.type === 'series' ? 'TV shows' : `${currentMedia.type}s`} you might enjoy
          </p>
      </div>
      <MediaGrid media={similarMedia} compact />
    </section>
  );
};