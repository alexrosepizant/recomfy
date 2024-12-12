import React from 'react';

interface FilterCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  checked,
  onChange
}) => (
  <label className="flex items-center gap-2 py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);