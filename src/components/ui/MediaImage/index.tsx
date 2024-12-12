import React from 'react';
import { MediaType } from '../../../types/media';
import { useMediaImage } from './useMediaImage';
import { MediaImageFallback } from './MediaImageFallback';
import { cn } from '../../../utils/cn';
import { getDefaultImage } from '../../../utils/images';

interface MediaImageProps {
  src: string | null;
  alt: string;
  type: MediaType;
  className?: string;
  fill?: boolean;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  type,
  className,
  fill = false,
}) => {
  const { imageUrl, isLoading, hasError } = useMediaImage(src, type);

  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg bg-muted',
      fill ? 'absolute inset-0' : 'aspect-[3/4]',
      className
    )}>
      {/* Show fallback while loading or on error */}
      {(isLoading || hasError) && (
        <MediaImageFallback type={type} />
      )}
      
      {/* Actual image */}
      <img
        src={imageUrl}
        alt={alt}
        className={cn(
          'w-full h-full object-cover rounded-lg',
          fill && 'absolute inset-0',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100',
          'transition-opacity duration-300'
        )}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = getDefaultImage(type);
        }}
      />
    </div>
  );
};