import React from 'react';

interface MediaHeaderProps {
  title: string;
}

export const MediaHeader: React.FC<MediaHeaderProps> = ({ title }) => (
  <h1 className="text-3xl font-bold text-foreground mb-2">
    {title}
  </h1>
);