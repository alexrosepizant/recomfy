import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

export const UserMenu: React.FC = () => {
  return (
    <Link
      to="/profile"
      className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="User profile"
    >
      <User className="w-5 h-5 text-gray-600" />
    </Link>
  );
};