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
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={trend.isPositive ? 'text-green-600' : 'text-red-600'} >
                {trend.value}%
              </span>
              <span className="text-gray-500 text-sm">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
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

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link href="/leads">
            <Button variant="outline" className="gap-2">
              <Target className="w-4 h-4" />
              New Lead
            </Button>
          </Link>
          <Link href="/quotes">
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              New Quote
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline" className="gap-2">
              <CalendarPlus className="w-4 h-4" />
              Schedule Job
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <StatCard
            title="Today's Jobs"
            value={dashboardStats.todaysJobs}
            icon={<Calendar className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Open Leads"
            value={dashboardStats.openLeads}
            icon={<Target className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="purple"
          />
          <StatCard
            title="Unassigned Jobs"
            value={dashboardStats.unassignedJobs}
            icon={<AlertCircle className="w-6 h-6" />}
            color="yellow"
          />
          <StatCard
            title="Overdue Invoices"
            value={dashboardStats.overdueInvoices}
            icon={<Clock className="w-6 h-6" />}
            color="red"
          />
          <StatCard
            title="Weekly Revenue"
            value={formatCurrency(dashboardStats.weeklyRevenue)}
            icon={<DollarSign className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="green"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(dashboardStats.monthlyRevenue)}
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 15, isPositive: true }}
            color="green"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Today&apos;s Schedule</h2>
              <Link href="/jobs" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {todaysJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No jobs scheduled for today</p>
                </div>
              ) : (
                todaysJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-semibold">
                      {job.scheduledTime}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{job.customerName}</p>
                      <p className="text-sm text-gray-500 truncate">{job.propertyAddress}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {formatStatus(job.status)}
                      </span>
                      {job.assignedTeam.length > 0 && (
                        <div className="flex items-center gap-1 text-gray-500">
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
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Follow-ups Due</h2>
              <Link href="/leads" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentLeads.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>All caught up! No pending follow-ups</p>
                </div>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-medium">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.serviceInterest}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
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
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[
              { action: 'Job completed', detail: 'Deep Cleaning at Green Park Main', time: '2 hours ago', icon: CheckCircle2, color: 'text-green-500' },
              { action: 'New lead received', detail: 'Karan Malhotra - Deep Cleaning', time: '3 hours ago', icon: Target, color: 'text-blue-500' },
              { action: 'Invoice paid', detail: 'INV-2026-0021 - ₹11,796', time: '1 day ago', icon: DollarSign, color: 'text-green-500' },
              { action: 'Quote sent', detail: 'Office Cleaning - TechCorp Solutions', time: '2 days ago', icon: FileText, color: 'text-purple-500' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
