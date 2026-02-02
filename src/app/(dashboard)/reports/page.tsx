'use client';

import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Target,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { jobs, invoices, leads, users, payments, formatCurrency } from '@/data/mockData';
import { format } from 'date-fns';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter((j) => j.status === 'closed').length;
  const totalLeads = leads.length;
  const convertedLeads = leads.filter((l) => l.status === 'won').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
  const outstandingAmount = invoices
    .filter((i) => i.status !== 'paid' && i.status !== 'void')
    .reduce((sum, i) => sum + (i.total - i.paidAmount), 0);

  const cleaners = users.filter((u) => u.role === 'cleaner');
  const cleanerStats = cleaners.map((cleaner) => {
    const cleanerJobs = jobs.filter((j) => j.assignedTeam.includes(cleaner.id));
    const completedJobs = cleanerJobs.filter((j) => j.status === 'closed').length;
    return {
      ...cleaner,
      totalJobs: cleanerJobs.length,
      completedJobs,
      completionRate: cleanerJobs.length > 0 ? Math.round((completedJobs / cleanerJobs.length) * 100) : 0,
    };
  }).sort((a, b) => b.completedJobs - a.completedJobs);

  const dateRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Reports"
        subtitle="Analytics and insights"
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Date Range Filter */}
        <div className="flex justify-between items-center">
          <div className="w-48">
            <Select
              options={dateRangeOptions}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-2 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">12% vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Jobs Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{completedJobs}/{totalJobs}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-600">
                  <span className="text-sm font-medium">{Math.round((completedJobs / totalJobs) * 100)}% completion</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Lead Conversion</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{conversionRate}%</p>
                <div className="flex items-center gap-1 mt-2 text-purple-600">
                  <span className="text-sm font-medium">{convertedLeads} of {totalLeads} leads</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <Target className="w-6 h-6" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">Outstanding Payments</p>
                <p className="text-2xl font-bold text-danger-600 mt-1">{formatCurrency(outstandingAmount)}</p>
                <div className="flex items-center gap-1 mt-2 text-orange-600">
                  <span className="text-sm font-medium">{invoices.filter(i => i.status === 'overdue').length} overdue</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart Placeholder */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">Revenue chart visualization</p>
                <p className="text-sm text-gray-400 mt-1">Coming soon</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalRevenue * 0.25)}</p>
                <p className="text-xs text-gray-500">Week 1</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalRevenue * 0.35)}</p>
                <p className="text-xs text-gray-500">Week 2</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalRevenue * 0.40)}</p>
                <p className="text-xs text-gray-500">Week 3</p>
              </div>
            </div>
          </Card>

          {/* Jobs by Cleaner */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Jobs by Team Member</h3>
            <div className="space-y-4">
              {cleanerStats.slice(0, 5).map((cleaner, index) => (
                <div key={cleaner.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{cleaner.name}</span>
                      <span className="text-sm text-gray-500">{cleaner.completedJobs} jobs</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary-500 h-2 rounded-full transition-all"
                        style={{ width: `${cleaner.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {cleanerStats.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No cleaner data available</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Lead Sources */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Lead Sources</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(
              leads.reduce((acc, lead) => {
                acc[lead.source] = (acc[lead.source] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([source, count]) => (
              <div key={source} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500 mt-1">{source}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Service Breakdown */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Service Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(
              jobs.reduce((acc, job) => {
                acc[job.serviceType] = (acc[job.serviceType] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([service, count]) => (
              <div key={service} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-primary-600">{count}</p>
                <p className="text-sm text-gray-700 font-medium">{service}</p>
                <p className="text-xs text-gray-500 mt-1">{Math.round((count / jobs.length) * 100)}% of total</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
