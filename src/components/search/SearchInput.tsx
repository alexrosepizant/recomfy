import React from 'react';
import { Search, X } from 'lucide-react';
import { useSearchContext } from '../../contexts/SearchContext';
import { cn } from '../../utils/cn';
import { BrowseButton } from './BrowseButton';
import { SearchHistory } from './SearchHistory';

interface SearchInputProps {
  className?: string;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder = 'Search for movies, TV shows, or books...',
}) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    isSearching,
    searchHistory,
    clearSearch,
  } = useSearchContext();

  const [showHistory, setShowHistory] = React.useState(false);

  const handleFocus = () => {
    if (searchHistory.length > 0 && !searchQuery) {
      setShowHistory(true);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow clicking history items
    setTimeout(() => setShowHistory(false), 200);
  };

  return (
    <div className={cn('relative flex-1 max-w-2xl', className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            'h-10 w-full rounded-l-full bg-muted',
            'pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            'transition-all duration-200',
            isSearching && 'animate-pulse'
          )}
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 p-1 rounded-full hover:bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {!searchQuery && (
          <BrowseButton />
          )}
      </div>

      {/* Search History Dropdown */}
      {showHistory && searchHistory.length > 0 && (
        <SearchHistory onSelect={(query) => {
          setSearchQuery(query);
          setShowHistory(false);
        }} />
      )}
    </div>
  );
};