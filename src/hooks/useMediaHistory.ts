import { useState } from 'react';
import { Media } from '../types/media';

const HISTORY_KEY = 'recomfy_history';
const MAX_HISTORY_ITEMS = 50;

export function useMediaHistory() {
  const [history, setHistory] = useState<Media[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addToHistory = (media: Media) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== media.id);
      const updated = [media, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Error saving history:', error);
      }
      
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
}