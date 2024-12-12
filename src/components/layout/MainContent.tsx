import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <div className="flex-1 min-w-0">
      {children}
    </div>
  );
};