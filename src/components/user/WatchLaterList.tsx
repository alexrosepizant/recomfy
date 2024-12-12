import React from 'react';
import { useWatchLater } from '../../hooks/user/useWatchLater';
import { useToast } from '../../contexts/ToastContext';
import { MediaGrid } from './MediaGrid';
import { X } from 'lucide-react';

export const WatchLaterList: React.FC = () => {
  const { watchLater, removeFromWatchLater } = useWatchLater();
  const { showToast } = useToast();

  const handleRemove = (mediaId: string, title: string) => {
    removeFromWatchLater(mediaId);
    showToast(`Removed "${title}" from your watch later list`);
  };

  if (watchLater.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Your watch later list is empty. Click the like button on any media to add it here!
      </div>
    );
  }

  return <MediaGrid media={watchLater} compact />;
};