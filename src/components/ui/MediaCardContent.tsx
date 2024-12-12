import React from 'react';

interface MediaCardContentProps {
  title: string;
  description?: string;
  compact?: boolean;
}

export const MediaCardContent: React.FC<MediaCardContentProps> = ({
  title,
  description,
  compact = false,
}) => {
  return (
    <div className="px-1">
      <h3 className="font-semibold line-clamp-1 text-base">
        {title}
      </h3>
      {!compact && description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {description || 'No description available'}
        </p>
      )}
    </div>
  );
};