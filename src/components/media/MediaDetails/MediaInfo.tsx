import React from 'react';
import { Media } from '../../../types/media';
import { MediaGenres } from '../../ui/MediaGenres';

interface MediaInfoProps {
  media: Media;
}

export const MediaInfo: React.FC<MediaInfoProps> = ({ media }) => {
  return (
    <div className="space-y-6">
      <MediaGenres genres={media.genres} />
      
      <div className="prose prose-gray max-w-none dark:prose-invert">
        <h2 className="text-xl font-semibold mb-3">Overview</h2>
        <p className="text-muted-foreground leading-relaxed">
          {media.description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};