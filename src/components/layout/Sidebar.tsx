import React from 'react';
import { Link } from 'react-router-dom';
import { GenreFilter } from '../filters/GenreFilter';
import { RatingFilter } from '../filters/RatingFilter';
import { YearFilter } from '../filters/YearFilter';
import { Logo } from '../ui/Logo';
import { cn } from '../../utils/cn';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={cn("border-r border-border/50 p-6", className)}>
      <div className="mb-8">
        <Link to="/" className="block">
          <Logo size="sm" className="text-primary" />
          <h1 className="mt-2 text-xl font-bold text-primary">
            Suggestify
          </h1>
        </Link>
      </div>

      <div className="space-y-6 overflow-y-auto custom-scrollbar h-[calc(100vh-12rem)]">
        <GenreFilter />
        <RatingFilter />
        <YearFilter />
      </div>
    </aside>
  );
};