import { useState, useCallback } from 'react';
import { Media } from '../../types/media';

const STORAGE_KEY = 'recomfy_watch_later';

export function useWatchLater() {
  const [watchLater, setWatchLater] = useState<Media[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToWatchLater = useCallback((media: Media) => {
    setWatchLater(prev => {
      const exists = prev.some(item => item.id === media.id);
      if (exists) return prev;
      
      const updated = [...prev, media];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving to watch later:', error);
      }
      return updated;
    });
  }, []);

  const removeFromWatchLater = useCallback((mediaId: string) => {
    setWatchLater(prev => {
      const updated = prev.filter(item => item.id !== mediaId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error removing from watch later:', error);
      }
      return updated;
    });
  }, []);

  return {
    watchLater,
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater: (mediaId: string) => watchLater.some(item => item.id === mediaId),
  };
}