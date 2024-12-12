import React from 'react';
import { Sliders } from 'lucide-react';
import { useFilterContext } from '../../contexts/FilterContext';
import { FilterSection } from './FilterSection';
import { FilterCheckbox } from './FilterCheckbox';
import { MEDIA_TYPES } from './constants';
import { useSearchContext } from '../../contexts/SearchContext';

export const MediaTypeFilter: React.FC = () => {
  const { filters, toggleType } = useFilterContext();
  const { setSelectedTypes } = useSearchContext();

  const handleTypeToggle = (type: any) => {
    toggleType(type);
    // Update search context to match filter selections
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    setSelectedTypes(updatedTypes.length > 0 ? updatedTypes : ['movie', 'series', 'book']);
  };

  return (
    <FilterSection title="Media Type" icon={Sliders}>
      <div className="space-y-2">
        {MEDIA_TYPES.map(({ label, value }) => (
          <FilterCheckbox
            key={value}
            label={label}
            checked={filters.types.includes(value)}
            onChange={() => handleTypeToggle(value)}
          />
        ))}
      </div>
    </FilterSection>
  );
};