'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Receipt,
  CreditCard,
  UserCog,
  BarChart3,
  Settings,
  Sparkles,
  Target,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/leads', icon: Target },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Quotes', href: '/quotes', icon: FileText },
  { name: 'Jobs', href: '/jobs', icon: Calendar },
  { name: 'Invoices', href: '/invoices', icon: Receipt },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Team', href: '/team', icon: UserCog },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Documentation', href: '/documentation', icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CleanPro</h1>
            <p className="text-xs text-gray-500">CRM System</p>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon
                    className={clsx(
                      'w-5 h-5 flex-shrink-0',
                      isActive ? 'text-primary-600' : 'text-gray-400'
                    )}
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Amit Sharma</p>
            <p className="text-xs text-gray-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CleanPro</h1>
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={clsx(
          'lg:hidden fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col z-50 transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col z-40">
        <SidebarContent />
      </aside>
    </>
  );
}
