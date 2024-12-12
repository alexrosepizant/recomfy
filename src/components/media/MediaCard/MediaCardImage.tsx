import React from 'react';
import { Info } from 'lucide-react';
import { MediaType } from '../../../types/media';
import { cn } from '../../../utils/cn';
import { MediaImage } from '../MediaImage';
import { MediaTypeIcon } from '../../ui/MediaTypeIcon';

interface MediaCardImageProps {
  src: string | null;
  alt: string;
  type: MediaType;
}

export const MediaCardImage: React.FC<MediaCardImageProps> = ({
  src,
  alt,
  type,
}) => {
  return (
    <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden">
      <MediaImage
        src={src}
        alt={alt}
        type={type}
        fill
        className="rounded-lg"
      />
      
      {/* Detail button overlay */}
      <div className={cn(
        "absolute right-2 bottom-2 transition-transform duration-200",
        "transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
      )}>
        <button 
          className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-lg"
          aria-label="Show details"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Media Type Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
        <MediaTypeIcon 
          type={type} 
          className="text-foreground" 
          size="sm"
        />
      </div>
    </div>
  );
};