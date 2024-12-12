import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Library, Clock, History, Star, Bookmark, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MenuItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, label, isActive }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
      "transition-colors hover:bg-muted",
      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export const LeftMenu: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="pt-8 p-4">
      <div className="space-y-8">
        {/* Library Section */}
        <div>
          <h2 className="text-lg font-bold text-foreground px-4 mb-4 flex items-center gap-2">
            <Library className="w-5 h-5" />
            Library
          </h2>
          <div className="space-y-1">
            <MenuItem
              href="/library/watchlist"
              icon={<Bookmark className="w-4 h-4" />}
              label="Watchlist"
              isActive={location.pathname === '/library/watchlist'}
            />
            <MenuItem
              href="/library/rated"
              icon={<Star className="w-4 h-4" />}
              label="Rated"
              isActive={location.pathname === '/library/rated'}
            />
          </div>
        </div>

        {/* Recent Section */}
        <div>
          <div className="flex items-center gap-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            <Clock className="w-4 h-4" />
            <span>Recent</span>
          </div>
          <div className="space-y-1">
            <MenuItem
              href="/recent/history"
              icon={<History className="w-4 h-4" />}
              label="History"
              isActive={location.pathname === '/recent/history'}
            />
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <div className="flex items-center gap-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </div>
          <div className="space-y-1">
            <MenuItem
              href="/profile"
              icon={<Settings className="w-4 h-4" />}
              label="Profile Settings"
              isActive={location.pathname === '/profile'}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};