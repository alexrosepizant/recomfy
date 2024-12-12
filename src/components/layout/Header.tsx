import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchInput } from '../search/SearchInput';
import { UserMenu } from './UserMenu';
import { Logo } from '../ui/Logo';
import { UserDisplay } from '../ui/UserDisplay';
import { BackButton } from '../ui/BackButton';

export const Header: React.FC = () => {
  const location = useLocation();
  const showBackButton = !['/', '/browse'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
      <div className="px-6 py-4">
        {/* Center container */}
        <div className="flex items-center justify-between gap-4">
          {/* Left spacer */}
          <div className="w-[240px]">
            {showBackButton && <BackButton />}
          </div>

          {/* Centered logo and search */}
          <div className="flex-1 flex items-center justify-center gap-4 max-w-2xl">
            <Link to="/" className="flex-shrink-0">
              <Logo size="sm" className="w-12 h-12 text-primary" />
            </Link>
            <SearchInput className="w-full max-w-xl" />
          </div>

          {/* Right section */}
          <div className="flex items-center justify-end gap-4 w-[240px]">
            <UserDisplay />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};