import React from 'react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { Film, Tv, Book, Star } from 'lucide-react';

export const UserStats: React.FC = () => {
  const { ratings } = useUserPreferences();

  const stats = Object.values(ratings).reduce(
    (acc, rating) => {
      acc.totalRatings++;
      acc.averageRating += rating;
      return acc;
    },
    { totalRatings: 0, averageRating: 0 }
  );

  const avgRating = stats.totalRatings > 0 
    ? (stats.averageRating / stats.totalRatings).toFixed(1)
    : '0.0';

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      <div className="border-b border-border bg-muted px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Your Stats</h2>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <Star className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{avgRating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="flex justify-center mb-2 space-x-1">
              <Film className="w-5 h-5 text-primary" />
              <Tv className="w-5 h-5 text-primary" />
              <Book className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalRatings}
            </div>
            <div className="text-sm text-muted-foreground">Total Ratings</div>
          </div>
        </div>
      </div>
    </div>
  );
};