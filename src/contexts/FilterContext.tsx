import React, { createContext, useContext } from 'react';
import { useFilters, Filters } from '../hooks/useFilters';
import { MediaType } from '../types/media';

interface FilterContextType {
  filters: Filters;
  setMediaType: (type: MediaType) => void;
  toggleGenre: (genre: string) => void;
  toggleYear: (year: string) => void;
  setRating: (rating: number | null) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const { filters, setMediaType, toggleGenre, toggleYear, setRating } = useFilters();

  return (
    <FilterContext.Provider
      value={{
        filters,
        setMediaType,
        toggleGenre,
        toggleYear,
        setRating,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}