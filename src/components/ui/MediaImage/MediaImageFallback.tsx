import React from 'react';
import { Film, Tv, Book } from 'lucide-react';
import { MediaType } from '../../../types/media';
import { cn } from '../../../utils/cn';

interface MediaImageFallbackProps {
  type: MediaType;
  className?: string;
}

const FALLBACK_ICONS = {
  movie: Film,
  series: Tv,
  book: Book,
} as const;

export const MediaImageFallback: React.FC<MediaImageFallbackProps> = ({
  type,
  className
}) => {
  const Icon = FALLBACK_ICONS[type];

  return (
    <div className={cn(
      'absolute inset-0 flex flex-col items-center justify-center',
      'bg-muted text-muted-foreground rounded-lg',
      className
    )}>
      <Icon className="w-12 h-12 opacity-20" />
    </div>
  );
};