import { useState, useCallback } from 'react';
import { Media } from '../../types/media';

const WATCHED_KEY = 'recomfy_watched';
const READ_KEY = 'recomfy_read';

interface MediaStatus {
  hasWatched: boolean;
  hasRead: boolean;
  toggleWatched: () => void;
  toggleRead: () => void;
}

export function useMediaStatus(media: Media): MediaStatus {
  // Load initial states from localStorage
  const [hasWatched, setHasWatched] = useState(() => {
    try {
      const watched = localStorage.getItem(WATCHED_KEY);
      const watchedIds = watched ? JSON.parse(watched) : [];
      return watchedIds.includes(media.id);
    } catch {
      return false;
    }
  });

  const [hasRead, setHasRead] = useState(() => {
    try {
      const read = localStorage.getItem(READ_KEY);
      const readIds = read ? JSON.parse(read) : [];
      return readIds.includes(media.id);
    } catch {
      return false;
    }
  });

  const toggleWatched = useCallback(() => {
    setHasWatched(prev => {
      const newState = !prev;
      try {
        const watched = localStorage.getItem(WATCHED_KEY);
        const watchedIds = watched ? JSON.parse(watched) : [];
        
        if (newState) {
          watchedIds.push(media.id);
        } else {
          const index = watchedIds.indexOf(media.id);
          if (index > -1) {
            watchedIds.splice(index, 1);
          }
        }
        
        localStorage.setItem(WATCHED_KEY, JSON.stringify(watchedIds));
      } catch (error) {
        console.error('Error updating watched status:', error);
      }
      return newState;
    });
  }, [media.id]);

  const toggleRead = useCallback(() => {
    setHasRead(prev => {
      const newState = !prev;
      try {
        const read = localStorage.getItem(READ_KEY);
        const readIds = read ? JSON.parse(read) : [];
        
        if (newState) {
          readIds.push(media.id);
        } else {
          const index = readIds.indexOf(media.id);
          if (index > -1) {
            readIds.splice(index, 1);
          }
        }
        
        localStorage.setItem(READ_KEY, JSON.stringify(readIds));
      } catch (error) {
        console.error('Error updating read status:', error);
      }
      return newState;
    });
  }, [media.id]);

  return {
    hasWatched,
    hasRead,
    toggleWatched,
    toggleRead
  };
}