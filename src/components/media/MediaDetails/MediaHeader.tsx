import React from 'react';
import { Media } from '../../../types/media';
import { Calendar } from 'lucide-react';
import { MediaRating } from '../../ui/MediaRating';
import { MediaTypeIcon } from '../../ui/MediaTypeIcon';

interface MediaHeaderProps {
  media: Media;
}

export const MediaHeader: React.FC<MediaHeaderProps> = ({ media }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-4">
        {media.title}
      </h1>

      <div className="flex items-center gap-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MediaTypeIcon type={media.type} className="w-4 h-4" />
          <span className="capitalize">{media.type}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{media.releaseYear}</span>
        </div>

        <MediaRating rating={media.rating} />
      </div>
    </div>
  );
};