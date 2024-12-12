import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MediaRatingProps {
  rating: number | null | undefined;
}

export const MediaRating: React.FC<MediaRatingProps> = ({ rating }) => {
  if (!rating || rating === 0) {
    return (
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-muted-foreground" />
        <span className="text-muted-foreground">Not rated</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Star className="w-4 h-4 text-primary fill-current" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};