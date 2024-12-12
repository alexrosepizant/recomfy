import React from 'react';
import { useWatchLater } from '../../hooks/user/useWatchLater';
import { MediaGrid } from './MediaGrid';

export const WatchLaterList: React.FC = () => {
  const { watchLater } = useWatchLater();

  if (watchLater.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Your watch later list is empty. Click the like button on any media to add it here!
      </div>
    );
  }

  return <MediaGrid media={watchLater} compact />;
};