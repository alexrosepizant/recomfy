import React from 'react';
import { cn } from '../../utils/cn';

interface MediaImageContainerProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: 'square' | 'poster' | 'auto';
  fill?: boolean;
}

const ASPECT_RATIO_CLASSES = {
  square: 'aspect-square',
  poster: 'aspect-[2/3]',
  auto: 'aspect-auto',
} as const;

export const MediaImageContainer: React.FC<MediaImageContainerProps> = ({
  children,
  className,
  aspectRatio = 'poster',
  fill = false,
}) => {
  return (
    <div className={cn(
      'relative overflow-hidden bg-muted rounded-lg',
      !fill && ASPECT_RATIO_CLASSES[aspectRatio],
      fill && 'absolute inset-0',
      className
    )}>
      {children}
    </div>
  );
};