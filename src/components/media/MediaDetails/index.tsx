import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Media } from '../../../types/media';
import { MediaImage } from '../MediaImage';
import { MediaHeader } from './MediaHeader';
import { MediaInfo } from './MediaInfo';
import { MediaActions } from './MediaActions';
import { SimilarMedia } from './SimilarMedia';

interface MediaDetailsProps {
  media: Media;
  onBack: () => void;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({ media, onBack }) => {
  return (
    <div className="w-full">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background border-b border-border/50">
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>

          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="md:flex">
              {/* Media Image */}
              <div className="md:w-1/3 relative aspect-[2/3]">
                <MediaImage
                  src={media.imageUrl}
                  alt={media.title}
                  type={media.type}
                  fill
                />
              </div>

              {/* Media Details */}
              <div className="p-6 md:p-8 md:flex-1 space-y-8">
                <MediaHeader media={media} />
                <MediaInfo media={media} />
                <MediaActions media={media} />
              </div>
            </div>
          </div>

          {/* Similar Media Section */}
      <div className="max-w-[2000px] mx-auto px-6 py-8">
        <SimilarMedia currentMedia={media} />
      </div>
        </div>

         
      </div>

     
    </div>
  );
};