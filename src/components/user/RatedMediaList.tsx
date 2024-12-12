import React from 'react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { MediaGrid } from './MediaGrid';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';

export const RatedMediaList: React.FC = () => {
  const { ratings } = useUserPreferences();
  const { trendingMedia } = useDefaultMedia();

  const ratedMedia = trendingMedia
    .filter(media => ratings[media.id])
    .sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));

  if (ratedMedia.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        You haven't rated any content yet. Start rating to get personalized recommendations!
      </div>
    );
  }

  return <MediaGrid media={ratedMedia} compact />;
};