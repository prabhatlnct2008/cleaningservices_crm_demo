'use client';

import { useState } from 'react';
import { Plus, Search, Send, Download, CreditCard, Eye, FileText, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import { invoices, formatCurrency, formatStatus, getStatusColor } from '@/data/mockData';
import { format } from 'date-fns';
import { Invoice } from '@/lib/types';

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'partially_paid', label: 'Partially Paid' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'void', label: 'Void' },
  ];

  const totalOutstanding = filteredInvoices
    .filter((i) => i.status !== 'paid' && i.status !== 'void')
    .reduce((sum, i) => sum + (i.total - i.paidAmount), 0);

  const overdueCount = filteredInvoices.filter((i) => i.status === 'overdue').length;

  const columns = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      render: (invoice: Invoice) => (
        <span className="font-mono text-sm text-gray-900">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (invoice: Invoice) => (
        <span className="font-medium text-gray-900">{invoice.customerName}</span>
      ),
    },
    {
      key: 'total',
      header: 'Amount',
      render: (invoice: Invoice) => (
        <span className="font-semibold text-gray-900">{formatCurrency(invoice.total)}</span>
      ),
    },
    {
      key: 'paidAmount',
      header: 'Paid',
      render: (invoice: Invoice) => (
        <span className="text-gray-600">{formatCurrency(invoice.paidAmount)}</span>
      ),
    },
    {
      key: 'balance',
      header: 'Balance',
      render: (invoice: Invoice) => {
        const balance = invoice.total - invoice.paidAmount;
        return (
          <span className={balance > 0 ? 'text-danger-600 font-medium' : 'text-gray-600'}>
            {formatCurrency(balance)}
          </span>
        );
      },
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (invoice: Invoice) => (
        <span className="text-gray-600">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (invoice: Invoice) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
          {formatStatus(invoice.status)}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Invoices"
        subtitle={`${filteredInvoices.length} total invoices`}
        action={{
          label: 'New Invoice',
          onClick: () => {},
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{filteredInvoices.length}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning-100 text-warning-600">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOutstanding)}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-danger-100 text-danger-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue Invoices</p>
                <p className="text-2xl font-bold text-danger-600">{overdueCount}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search invoices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Invoices Table */}
        <Card padding="none">
          <Table
            columns={columns}
            data={filteredInvoices}
            keyExtractor={(invoice) => invoice.id}
            onRowClick={(invoice) => setSelectedInvoice(invoice)}
            emptyMessage="No invoices found"
          />
        </Card>
      </div>

      {/* Invoice Detail Modal */}
      <Modal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        title="Invoice Details"
        size="lg"
      >
        {selectedInvoice && (
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="flex items-start justify-between pb-4 border-b">
              <div>
                <p className="text-sm text-gray-500 font-mono">{selectedInvoice.invoiceNumber}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">{selectedInvoice.customerName}</h3>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                {formatStatus(selectedInvoice.status)}
              </span>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Invoice Date</p>
                <p className="font-medium">{format(new Date(selectedInvoice.createdAt), 'MMM d, yyyy')}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="font-medium">{format(new Date(selectedInvoice.dueDate), 'MMM d, yyyy')}</p>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Items</h4>
              <div className="space-y-2">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{item.serviceName}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x {formatCurrency(item.rate)}
                      </p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.total)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(selectedInvoice.subtotal)}</span>
              </div>
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(selectedInvoice.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span>{formatCurrency(selectedInvoice.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(selectedInvoice.total)}</span>
              </div>
              {selectedInvoice.paidAmount > 0 && (
                <>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Paid</span>
                    <span>-{formatCurrency(selectedInvoice.paidAmount)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Balance Due</span>
                    <span className="text-danger-600">
                      {formatCurrency(selectedInvoice.total - selectedInvoice.paidAmount)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              {selectedInvoice.status === 'draft' && (
                <Button className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Invoice
                </Button>
              )}
              {selectedInvoice.status !== 'paid' && selectedInvoice.status !== 'void' && (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setSelectedInvoice(null);
                    setIsPaymentModalOpen(true);
                  }}
                >
                  <CreditCard className="w-4 h-4" />
                  Add Payment
                </Button>
              )}
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Add Payment"
      >
        <form className="space-y-4">
          <Input label="Amount" type="number" placeholder="Enter amount" />
          <Select
            label="Payment Method"
            options={[
              { value: '', label: 'Select method' },
              { value: 'cash', label: 'Cash' },
              { value: 'card', label: 'Card' },
              { value: 'upi', label: 'UPI' },
              { value: 'bank_transfer', label: 'Bank Transfer' },
              { value: 'cheque', label: 'Cheque' },
            ]}
          />
          <Input label="Reference Number" placeholder="Transaction ID / Cheque No." />
          <Input label="Date" type="date" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
