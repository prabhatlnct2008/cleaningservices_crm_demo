'use client';

import { useState } from 'react';
import { Search, CreditCard, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import { payments, formatCurrency } from '@/data/mockData';
import { format } from 'date-fns';
import { Payment, PaymentMethod } from '@/lib/types';

const methodLabels: Record<PaymentMethod, string> = {
  cash: 'Cash',
  card: 'Card',
  upi: 'UPI',
  bank_transfer: 'Bank Transfer',
  cheque: 'Cheque',
};

const methodColors: Record<PaymentMethod, string> = {
  cash: 'bg-green-100 text-green-800',
  card: 'bg-blue-100 text-blue-800',
  upi: 'bg-purple-100 text-purple-800',
  bank_transfer: 'bg-orange-100 text-orange-800',
  cheque: 'bg-gray-100 text-gray-800',
};

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.reference && payment.reference.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const methodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'cash', label: 'Cash' },
    { value: 'card', label: 'Card' },
    { value: 'upi', label: 'UPI' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'cheque', label: 'Cheque' },
  ];

  const totalReceived = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const avgPayment = filteredPayments.length > 0 ? totalReceived / filteredPayments.length : 0;

  const columns = [
    {
      key: 'date',
      header: 'Date',
      render: (payment: Payment) => (
        <span className="text-gray-900">{format(new Date(payment.date), 'MMM d, yyyy')}</span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (payment: Payment) => (
        <span className="font-medium text-gray-900">{payment.customerName}</span>
      ),
    },
    {
      key: 'invoiceNumber',
      header: 'Invoice',
      render: (payment: Payment) => (
        <span className="font-mono text-sm text-gray-600">{payment.invoiceNumber}</span>
      ),
    },
    {
      key: 'method',
      header: 'Method',
      render: (payment: Payment) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${methodColors[payment.method]}`}>
          {methodLabels[payment.method]}
        </span>
      ),
    },
    {
      key: 'reference',
      header: 'Reference',
      render: (payment: Payment) => (
        <span className="text-gray-600 font-mono text-sm">{payment.reference || '-'}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (payment: Payment) => (
        <span className="font-semibold text-green-600">{formatCurrency(payment.amount)}</span>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Payments"
        subtitle={`${filteredPayments.length} total payments`}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-100 text-green-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Received</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReceived)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{filteredPayments.length}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Payment</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgPayment)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalReceived)}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by customer, invoice, or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={methodOptions}
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Payments Table */}
        <Card padding="none">
          <Table
            columns={columns}
            data={filteredPayments}
            keyExtractor={(payment) => payment.id}
            emptyMessage="No payments found"
          />
        </Card>

        {/* Payment Method Distribution */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(
              payments.reduce((acc, p) => {
                acc[p.method] = (acc[p.method] || 0) + p.amount;
                return acc;
              }, {} as Record<string, number>)
            ).map(([method, amount]) => (
              <div key={method} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mb-2 ${methodColors[method as PaymentMethod]}`}>
                  {methodLabels[method as PaymentMethod]}
                </div>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(amount)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
