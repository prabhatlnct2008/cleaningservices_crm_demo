'use client';

import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pt-16 lg:pt-0 lg:pl-64 min-h-screen transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
