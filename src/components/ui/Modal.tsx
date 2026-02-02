'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const sizes = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl',
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Mobile: full screen, Desktop: centered with padding */}
      <div className="flex min-h-full sm:items-center sm:justify-center sm:p-4">
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={onClose}
        />
        <div
          className={clsx(
            'relative w-full bg-white shadow-2xl transform transition-all animate-slide-up',
            'min-h-screen sm:min-h-0 sm:rounded-2xl',
            sizes[size]
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate pr-4">{title}</h2>
            {showClose && (
              <Button variant="ghost" size="sm" onClick={onClose} className="!p-1.5 rounded-full flex-shrink-0">
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-80px)] sm:max-h-[70vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
