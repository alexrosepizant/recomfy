import { Link, useLocation } from 'react-router-dom';
import { Film, Tv, Book } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  {
    title: 'Movies',
    href: '/movies',
    icon: Film,
  },
  {
    title: 'TV Series',
    href: '/series',
    icon: Tv,
  },
  {
    title: 'Books',
    href: '/books',
    icon: Book,
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex space-x-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              'hover:bg-gray-100',
              isActive 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}