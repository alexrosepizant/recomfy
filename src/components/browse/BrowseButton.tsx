import React from 'react';
import { Compass } from 'lucide-react';
import { BrowsePopover } from './BrowsePopover';

export const BrowseButton: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-muted transition-colors"
      >
        <Compass className="w-4 h-4" />
        <span className="text-sm font-medium">Browse</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <BrowsePopover onClose={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};