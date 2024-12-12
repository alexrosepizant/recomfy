import React from 'react';
import { Calendar } from 'lucide-react';
import { useFilterContext } from '../../contexts/FilterContext';
import { FilterSection } from './FilterSection';
import { FilterCheckbox } from './FilterCheckbox';
import { YEARS } from './constants';

export const YearFilter: React.FC = () => {
  const { filters, toggleYear } = useFilterContext();

  return (
    <FilterSection title="Release Year" icon={Calendar}>
      <div className="space-y-2">
        {YEARS.map(year => (
          <FilterCheckbox
            key={year}
            label={year}
            checked={filters.years.includes(year)}
            onChange={() => toggleYear(year)}
          />
        ))}
      </div>
    </FilterSection>
  );
};