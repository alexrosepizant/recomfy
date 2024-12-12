import React from 'react';
import { useUserPreferences } from '../../hooks/user/useUserPreferences';
import { GENRES, MEDIA_TYPES } from '../filters/constants';
import { toggleGenre } from '../../utils/genres';
import { cn } from '../../utils/cn';

export const UserPreferencesForm: React.FC = () => {
  const { preferences, updatePreferences } = useUserPreferences();

  const handleGenreToggle = (genre: string, type: 'favorite' | 'excluded') => {
    const updates = toggleGenre(genre, type, preferences);
    updatePreferences(updates);
  };

  const handleTypeToggle = (type: string) => {
    const updated = preferences.mediaTypes.includes(type as any)
      ? preferences.mediaTypes.filter(t => t !== type)
      : [...preferences.mediaTypes, type as any];
    updatePreferences({ mediaTypes: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-4">Media Types</h3>
        <div className="grid grid-cols-3 gap-4">
          {MEDIA_TYPES.map(({ label, value }) => (
            <label
              key={value}
              className={cn(
                "relative flex items-center justify-center p-4 rounded-lg",
                "border border-border cursor-pointer transition-colors",
                "hover:bg-muted",
                preferences.mediaTypes.includes(value) && "bg-primary/10 border-primary/20"
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={preferences.mediaTypes.includes(value)}
                onChange={() => handleTypeToggle(value)}
              />
              <span className={cn(
                "text-sm",
                preferences.mediaTypes.includes(value)
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground mb-4">Favorite Genres</h3>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre, 'favorite')}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-colors",
                preferences.favoriteGenres.includes(genre)
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground mb-4">Excluded Genres</h3>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre, 'excluded')}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-colors",
                preferences.excludedGenres.includes(genre)
                  ? "bg-destructive/10 text-destructive"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};