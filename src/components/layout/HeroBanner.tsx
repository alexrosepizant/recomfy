import React from 'react';
import { Film, Tv, Book } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to recomfy
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your personal guide to discovering amazing movies, TV shows, and books. Get tailored recommendations based on your interests.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-blue-100">
                <Film className="w-5 h-5" />
                <span>Movies</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Tv className="w-5 h-5" />
                <span>TV Series</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Book className="w-5 h-5" />
                <span>Books</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 flex justify-center">
            <Logo size="lg" className="w-48 h-48" />
          </div>
        </div>
      </div>
    </div>
  );
};