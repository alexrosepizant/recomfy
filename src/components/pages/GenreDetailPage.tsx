import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDefaultMedia } from '../../hooks/useDefaultMedia';
import { useFilterContext } from '../../contexts/FilterContext';
import { MediaGrid } from '../media/MediaGrid';
import { MediaTypeFilterBar } from '../filters/MediaTypeFilterBar';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { GenreIcon } from '../browse/GenreIcon';
import { getGenreColor } from '../../utils/genres';
import { EmptyState } from '../EmptyState';
import { cn } from '../../utils/cn';

export const GenreDetailPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  const navigate = useNavigate();
  const { trendingMedia, isLoading } = useDefaultMedia();
  const { filters } = useFilterContext();

  if (!genre) {
    return null;
  }

  const { background } = getGenreColor(genre);

  // Filter media by genre and selected media type
  const filteredMedia = trendingMedia.filter(media => {
    const matchesGenre = media.genres.includes(genre);
    const matchesType = filters.types.length === 0 || filters.types.includes(media.type);
    return matchesGenre && matchesType;
  });

  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className={cn(
        "relative border-b border-border/50",
        background
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative max-w-[2000px] mx-auto px-6 py-12">
          <button
            onClick={() => navigate('/browse', { state: { preserveFilters: true } })}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Browse</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <GenreIcon genre={genre} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{genre}</h1>
              <p className="text-lg text-white/80">
                Browse {filters.types.length === 1 
                  ? filters.types[0] === 'series' 
                    ? 'TV series' 
                    : `${filters.types[0]}s` 
                  : 'content'} in {genre}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <MediaTypeFilterBar />

      {/* Content */}
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" className="border-primary/20 border-t-primary" />
          </div>
        ) : filteredMedia.length === 0 ? (
          <EmptyState
            title="No Content Found"
            message={filters.types.length > 0 
              ? `No ${filters.types.join(' or ')} content found in the ${genre} genre` 
              : `No content found in the ${genre} genre`}
          />
        ) : (
          <MediaGrid media={filteredMedia} />
        )}
      </div>
    </div>
  );
};