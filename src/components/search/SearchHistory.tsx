import React from 'react';
import { Clock, X } from 'lucide-react';
import { useSearchContext } from '../../contexts/SearchContext';
import { cn } from '../../utils/cn';

interface SearchHistoryProps {
  onSelect: (query: string) => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect }) => {
  const { searchHistory, removeFromHistory, clearHistory } = useSearchContext();

  return (
    <div className="absolute top-full left-0 right-12 mt-2 py-2 bg-card rounded-lg border border-border shadow-lg z-50">
      <div className="flex items-center justify-between px-3 pb-2 mb-2 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Recent Searches</span>
        </div>
        <button
          onClick={clearHistory}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear All
        </button>
      </div>
      <ul className="max-h-64 overflow-y-auto">
        {searchHistory.map((query, index) => (
          <li key={index} className="relative group">
            <button
              onClick={() => onSelect(query)}
              className={cn(
                "w-full px-3 py-2 text-sm text-left",
                "hover:bg-muted transition-colors"
              )}
            >
              {query}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromHistory(query);
              }}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "p-1 rounded-full opacity-0 group-hover:opacity-100",
                "hover:bg-background/50 text-muted-foreground hover:text-foreground",
                "transition-all duration-200"
              )}
            >
              <X className="w-3 h-3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};