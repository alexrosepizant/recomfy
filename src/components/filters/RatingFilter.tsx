import React from 'react';
import { Star } from 'lucide-react';
import { useFilterContext } from '../../contexts/FilterContext';
import { FilterSection } from './FilterSection';

const RATINGS = [4, 3, 2];

export const RatingFilter: React.FC = () => {
  const { filters, setRating } = useFilterContext();

  const handleRatingChange = (rating: number | null) => {
    setRating(rating);
  };

  return (
    <FilterSection title="Rating" icon={Star}>
      <div className="space-y-2">
        {RATINGS.map(rating => (
          <label
            key={rating}
            className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === rating}
              onChange={() => handleRatingChange(rating)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 flex items-center gap-1">
              {rating}+ <Star className="w-3 h-3 fill-current text-yellow-400" />
            </span>
          </label>
        ))}
        {filters.minRating !== null && (
          <button
            onClick={() => handleRatingChange(null)}
            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
          >
            Clear rating filter
          </button>
        )}
      </div>
    </FilterSection>
  );
};