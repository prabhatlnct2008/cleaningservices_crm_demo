'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Target,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  FileText,
  CalendarPlus,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { dashboardStats, jobs, leads, formatCurrency, formatStatus, getStatusColor } from '@/data/mockData';
import { format } from 'date-fns';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              )}
              <span className={`text-xs sm:text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.value}%
              </span>
              <span className="text-gray-500 text-xs hidden sm:inline">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${colors[color]} flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const todaysJobs = jobs.filter(
    (job) => format(new Date(job.scheduledDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
  const recentLeads = leads.filter((lead) => lead.status !== 'won' && lead.status !== 'lost').slice(0, 5);

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle={format(new Date(), 'EEEE, MMMM d, yyyy')}
        action={{
          label: 'New Lead',
          onClick: () => {},
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-fade-in">
        {/* Quick Actions - horizontal scroll on mobile */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap">
          <Link href="/leads" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Target className="w-4 h-4" />
              <span className="whitespace-nowrap">New Lead</span>
            </Button>
          </Link>
          <Link href="/quotes" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <FileText className="w-4 h-4" />
              <span className="whitespace-nowrap">New Quote</span>
            </Button>
          </Link>
          <Link href="/jobs" className="flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <CalendarPlus className="w-4 h-4" />
              <span className="whitespace-nowrap">Schedule Job</span>
            </Button>
          </Link>
        </div>

        {/* Stats Grid - 2 cols on mobile, 3 on tablet, 6 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard
            title="Today's Jobs"
            value={dashboardStats.todaysJobs}
            icon={<Calendar className="w-5 h-5 sm:w-6 sm:h-6" />}
            color="blue"
          />
          <StatCard
            title="Open Leads"
            value={dashboardStats.openLeads}
            icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="purple"
          />
          <StatCard
            title="Unassigned"
            value={dashboardStats.unassignedJobs}
            icon={<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
            color="yellow"
          />
          <StatCard
            title="Overdue"
            value={dashboardStats.overdueInvoices}
            icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
            color="red"
          />
          <StatCard
            title="Weekly"
            value={formatCurrency(dashboardStats.weeklyRevenue)}
            icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Monthly"
            value={formatCurrency(dashboardStats.monthlyRevenue)}
            icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
            trend={{ value: 15, isPositive: true }}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Today's Schedule */}
          <Card className="!p-4 sm:!p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Today&apos;s Schedule</h2>
              <Link href="/jobs" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {todaysJobs.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                  <p className="text-sm">No jobs scheduled for today</p>
                </div>
              ) : (
                todaysJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-semibold text-xs sm:text-sm">
                      {job.scheduledTime}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{job.customerName}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{job.propertyAddress}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {formatStatus(job.status)}
                      </span>
                      {job.assignedTeam.length > 0 && (
                        <div className="hidden sm:flex items-center gap-1 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{job.assignedTeam.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Follow-ups Due */}
          <Card className="!p-4 sm:!p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Follow-ups Due</h2>
              <Link href="/leads" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {recentLeads.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                  <p className="text-sm">All caught up! No pending follow-ups</p>
                </div>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-medium text-sm">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{lead.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{lead.serviceInterest}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {formatStatus(lead.status)}
                      </span>
                      {lead.nextFollowUp && (
                        <span className="text-xs text-gray-500">
                          {format(new Date(lead.nextFollowUp), 'MMM d')}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="!p-4 sm:!p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[
              { action: 'Job completed', detail: 'Deep Cleaning at Green Park Main', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500' },
              { action: 'New lead received', detail: 'Karan Malhotra - Deep Cleaning', time: '3 hours ago', icon: Target, color: 'text-blue-500' },
              { action: 'Invoice paid', detail: 'INV-2026-0021 - ₹11,796', time: '1 day ago', icon: DollarSign, color: 'text-green-500' },
              { action: 'Quote sent', detail: 'Office Cleaning - TechCorp Solutions', time: '2 days ago', icon: FileText, color: 'text-purple-500' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4">
                <div className={`p-1.5 sm:p-2 rounded-lg bg-gray-100 ${activity.color} flex-shrink-0`}>
                  <activity.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{activity.detail}</p>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
