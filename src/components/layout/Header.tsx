'use client';

import { Bell, Search, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export default function Header({ title, subtitle, action }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 lg:top-0 z-30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-0 sm:h-16 gap-3 sm:gap-0">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 truncate">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search */}
          <div className="hidden md:block w-72">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              className="!py-2"
            />
          </div>

          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
          </button>

          {/* Action Button */}
          {action && (
            <Button onClick={action.onClick} size="sm" className="gap-1 sm:gap-2">
              {action.icon || <Plus className="w-4 h-4" />}
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
