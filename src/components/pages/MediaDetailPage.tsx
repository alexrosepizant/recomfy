import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMediaDetails } from '../../hooks/useMediaDetails';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { MediaDetails } from '../media/MediaDetails';
import { cn } from '../../utils/cn';

export const MediaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { media, isLoading, error } = useMediaDetails(id);

  const handleBack = () => navigate(-1);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className={cn(
          "bg-destructive/10 border border-destructive/20",
          "rounded-lg p-6 text-center"
        )}>
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-destructive/80">{error}</p>
        </div>
      </div>
    );
  }

  // Handle no media state
  if (!media) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="text-center py-12">
          <p className="text-muted-foreground">Media not found</p>
        </div>
      </div>
    );
  }

  return <MediaDetails media={media} onBack={handleBack} />;
};