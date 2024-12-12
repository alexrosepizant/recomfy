import React from 'react';
import { Link } from 'react-router-dom';
import { GenreIcon } from './GenreIcon';
import { getGenreColor } from '../../utils/genres';
import { cn } from '../../utils/cn';

interface GenreCardProps {
  genre: string;
  onClick?: () => void;
}

export const GenreCard: React.FC<GenreCardProps> = ({ genre, onClick }) => {
  const { background, hover } = getGenreColor(genre);
  
  return (
    <Link
      to={`/browse/${genre}`}
      onClick={onClick}
      className={cn(
        "group relative aspect-[1.5] w-full overflow-hidden",
        "rounded-xl border border-border/50",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-xl hover:border-primary/20"
      )}
    >
      {/* Background with gradient */}
      <div className={cn(
        "absolute inset-0 transition-colors duration-300",
        background,
        hover
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <GenreIcon genre={genre} className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{genre}</h3>
          <div className={cn(
            "w-16 h-1 rounded-full bg-white/50 transition-all duration-300",
            "group-hover:w-24 group-hover:bg-white"
          )} />
        </div>
      </div>
    </Link>
  );
};