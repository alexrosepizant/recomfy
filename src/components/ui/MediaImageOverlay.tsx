import React from 'react';
import { cn } from '../../utils/cn';

interface MediaImageOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export const MediaImageOverlay: React.FC<MediaImageOverlayProps> = ({
  children,
  className
}) => (
  <div className={cn(
    'absolute inset-0 flex items-center justify-center',
    'bg-gradient-to-t from-black/60 to-transparent',
    className
  )}>
    {children}
  </div>
);