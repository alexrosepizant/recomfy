import React from 'react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  return (
    <svg 
      viewBox="0 0 400 400" 
      className={cn(sizes[size], className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      <g transform="translate(200, 200) scale(0.7)" fill="currentColor">
        <path 
          d="M-100 -80 L-50 -80 Q-30 -80 -30 -60 L-30 60 Q-30 80 -50 80 L-100 80 Z" 
          transform="rotate(-15)"
        />
        
        <path 
          d="M0 -100 L80 -60 L80 60 L0 20 L-80 60 L-80 -60 Z" 
          stroke="currentColor" 
          strokeWidth="10" 
          transform="translate(0, -20) rotate(5)"
        />
        
        <rect 
          x="-120" 
          y="0" 
          width="80" 
          height="50" 
          rx="10" 
          ry="10" 
          transform="translate(50, 50) rotate(-10)"
        />
      </g>
    </svg>
  );
};