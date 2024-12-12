import React from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
        <AlertCircle className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {message}
      </p>
    </div>
  );
};