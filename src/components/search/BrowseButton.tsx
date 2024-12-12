import React from 'react';
import { Telescope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export const BrowseButton: React.FC = () => {
  return (
    <Link
      to="/browse"
      className={cn(
        'flex items-center gap-2 px-4 h-10',
        'bg-muted hover:bg-muted/80 rounded-r-full',
        'border-l border-border/50 transition-colors'
      )}
      aria-label="Browse genres"
    >
      <Telescope className="w-4 h-4" />
    </Link>
  );
};