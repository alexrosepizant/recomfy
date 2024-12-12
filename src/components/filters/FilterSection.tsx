import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ 
  title, 
  icon: Icon, 
  children 
}) => (
  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
      <Icon className="w-4 h-4 text-blue-600" />
      <h3 className="font-medium text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);