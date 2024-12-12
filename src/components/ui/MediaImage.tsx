import React, { useState, useEffect } from 'react';
import { MediaType } from '../../types/media';
import { getImageUrl, preloadImage } from '../../utils/images';
import { cn } from '../../utils/cn';
import { MediaImageFallback } from './MediaImageFallback';

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
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageUrl = getImageUrl(src, type);

  useEffect(() => {
    let mounted = true;

    const loadImage = async () => {
      try {
        await preloadImage(imageUrl);
        if (mounted) {
          setLoaded(true);
          setError(false);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
          setLoaded(true);
        }
      }
    };

    loadImage();

    return () => {
      mounted = false;
    };
  }, [imageUrl]);

  return (
    <div className={cn(
      'relative overflow-hidden rounded-lg bg-muted',
      fill ? 'absolute inset-0' : 'h-full',
      className
    )}>
      {/* Show fallback while loading or on error */}
      {(!loaded || error) && (
        <MediaImageFallback type={type} />
      )}
      
      <img
        src={imageUrl}
        alt={alt}
        className={cn(
          'w-full h-full object-cover rounded-lg',
          fill && 'absolute inset-0',
          !loaded && 'opacity-0',
          loaded && 'opacity-100',
          'transition-opacity duration-300'
        )}
        loading="lazy"
      />
    </div>
  );
};