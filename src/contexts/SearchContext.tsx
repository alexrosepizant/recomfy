import React, { createContext, useContext, useState, useCallback } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Media, MediaType } from '../types/media';
import { searchMedia } from '../services/api/search';

const MAX_HISTORY_ITEMS = 10;
const SEARCH_HISTORY_KEY = 'suggestify_search_history';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Media[];
  isSearching: boolean;
  error: string | null;
  selectedTypes: MediaType[];
  setSelectedTypes: (types: MediaType[]) => void;
  searchHistory: string[];
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Media[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<MediaType[]>(['movie', 'series', 'book']);
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  const addToHistory = useCallback((query: string) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== query);
      const updated = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromHistory = useCallback((query: string) => {
    setSearchHistory(prev => {
      const updated = prev.filter(item => item !== query);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const results = await searchMedia(query);
      const filteredResults = results.filter(item => selectedTypes.includes(item.type));
      setSearchResults(filteredResults);
      addToHistory(query.trim());
    } catch (error) {
      console.error('Search error:', error);
      setError('An error occurred while searching. Please try again.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [selectedTypes, addToHistory]);

  React.useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        error,
        selectedTypes,
        setSelectedTypes,
        searchHistory,
        clearHistory,
        removeFromHistory,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};