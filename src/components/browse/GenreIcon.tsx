import React from 'react';
import { 
  Swords, 
  Laugh, 
  Heart, 
  Skull, 
  Footprints,
  Theater,
  Rocket,
  Search,
  Zap,
  Film,
  LucideIcon 
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface GenreIconProps {
  genre: string;
  className?: string;
}

const GENRE_ICONS: Record<string, LucideIcon> = {
  'Action': Swords,
  'Adventure': Footprints,
  'Comedy': Laugh,
  'Drama': Theater,
  'Fantasy': Zap,
  'Horror': Skull,
  'Mystery': Search,
  'Romance': Heart,
  'Sci-Fi': Rocket,
  'Thriller': Film,
};

export const GenreIcon: React.FC<GenreIconProps> = ({ genre, className }) => {
  const Icon = GENRE_ICONS[genre] || Film;
  return <Icon className={cn('w-4 h-4', className)} />;
};