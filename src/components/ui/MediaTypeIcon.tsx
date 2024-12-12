import React from 'react';
import { Film, Tv, Book, LucideIcon } from 'lucide-react';
import { MediaType } from '../../types/media';
import { cn } from '../../utils/cn';

interface MediaTypeIconProps {
  type: MediaType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ICONS: Record<MediaType, LucideIcon> = {
  movie: Film,
  series: Tv,
  book: Book,
};

export const MediaTypeIcon: React.FC<MediaTypeIconProps> = ({ 
  type, 
  className,
  size = 'md'
}) => {
  const Icon = ICONS[type];

  if (!Icon) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <Icon className={cn(sizeClasses[size], className)} />
  );
};