import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  className,
  onClick 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2",
        "text-muted-foreground hover:text-foreground",
        "transition-colors group",
        className
      )}
    >
      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    </button>
  );
};