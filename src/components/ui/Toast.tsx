import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={cn(
          'flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg',
          'animate-slide-up transition-all duration-200',
          type === 'success' ? 'bg-green-600' : 'bg-red-600'
        )}
      >
        <div className="flex items-center gap-2 text-white">
          {type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>,
    document.body
  );
};