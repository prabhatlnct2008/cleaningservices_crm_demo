'use client';

import { useState } from 'react';
import { Plus, Search, Building2, Phone, Mail, Calendar, MapPin, Receipt, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import { customers, properties, jobs, invoices, formatCurrency } from '@/data/mockData';
import { format } from 'date-fns';
import { Customer } from '@/lib/types';

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );

  const getCustomerProperties = (customerId: string) =>
    properties.filter((p) => p.customerId === customerId);

  const getCustomerJobs = (customerId: string) =>
    jobs.filter((j) => j.customerId === customerId);

  const getCustomerInvoices = (customerId: string) =>
    invoices.filter((i) => i.customerId === customerId);

  const columns = [
    {
      key: 'name',
      header: 'Customer',
      render: (customer: Customer) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold">
            {customer.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-900">{customer.name}</p>
            {customer.company && (
              <p className="text-sm text-gray-500">{customer.company}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (customer: Customer) => (
        <span className="text-gray-600">{customer.phone}</span>
      ),
    },
    {
      key: 'email',
      header: 'Email',
      render: (customer: Customer) => (
        <span className="text-gray-600 truncate max-w-[200px] block">{customer.email}</span>
      ),
    },
    {
      key: 'tags',
      header: 'Tags',
      render: (customer: Customer) => (
        <div className="flex flex-wrap gap-1">
          {customer.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="primary" size="sm">
              {tag}
            </Badge>
          ))}
          {customer.tags.length > 2 && (
            <Badge variant="default" size="sm">
              +{customer.tags.length - 2}
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'lastJobDate',
      header: 'Last Job',
      render: (customer: Customer) => (
        <span className="text-gray-600">
          {customer.lastJobDate
            ? format(new Date(customer.lastJobDate), 'MMM d, yyyy')
            : '-'}
        </span>
      ),
    },
    {
      key: 'outstandingAmount',
      header: 'Outstanding',
      render: (customer: Customer) => (
        <span className={customer.outstandingAmount > 0 ? 'text-danger-600 font-medium' : 'text-gray-600'}>
          {formatCurrency(customer.outstandingAmount)}
        </span>
      ),
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'Properties' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'invoices', label: 'Invoices' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Customers"
        subtitle={`${filteredCustomers.length} total customers`}
        action={{
          label: 'Add Customer',
          onClick: () => setIsCreateModalOpen(true),
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Search & Actions */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </Card>

        {/* Customers Table */}
        <Card padding="none">
          <Table
            columns={columns}
            data={filteredCustomers}
            keyExtractor={(customer) => customer.id}
            onRowClick={(customer) => setSelectedCustomer(customer)}
            emptyMessage="No customers found"
          />
        </Card>
      </div>

      {/* Create Customer Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New Customer"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" placeholder="Enter full name" />
            <Input label="Company (optional)" placeholder="Enter company name" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone" placeholder="Enter phone number" type="tel" />
            <Input label="Email" placeholder="Enter email address" type="email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <Input placeholder="Add tags separated by comma" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Customer</Button>
          </div>
        </form>
      </Modal>

      {/* Customer Detail Modal */}
      <Modal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        title="Customer Profile"
        size="xl"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            {/* Customer Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-2xl">
                {selectedCustomer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h3>
                {selectedCustomer.company && (
                  <p className="text-gray-500 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {selectedCustomer.company}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="primary">Create Quote</Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Customer Since</p>
                        <p className="font-medium">
                          {format(new Date(selectedCustomer.createdAt), 'MMMM yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Total Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {getCustomerJobs(selectedCustomer.id).length}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Outstanding</p>
                      <p className={`text-2xl font-bold ${
                        selectedCustomer.outstandingAmount > 0 ? 'text-danger-600' : 'text-gray-900'
                      }`}>
                        {formatCurrency(selectedCustomer.outstandingAmount)}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCustomer.tags.map((tag) => (
                        <Badge key={tag} variant="primary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'properties' && (
                <div className="space-y-4">
                  {getCustomerProperties(selectedCustomer.id).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No properties added yet</p>
                      <Button variant="outline" className="mt-4 gap-2">
                        <Plus className="w-4 h-4" />
                        Add Property
                      </Button>
                    </div>
                  ) : (
                    getCustomerProperties(selectedCustomer.id).map((property) => (
                      <div key={property.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                            <div>
                              <p className="font-medium text-gray-900">{property.address}</p>
                              <p className="text-sm text-gray-500">{property.city}</p>
                              {property.size && (
                                <p className="text-sm text-gray-500 mt-1">Size: {property.size}</p>
                              )}
                            </div>
                          </div>
                          <Badge variant={property.type === 'residential' ? 'info' : 'warning'}>
                            {property.type}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  {getCustomerJobs(selectedCustomer.id).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No jobs scheduled yet</p>
                    </div>
                  ) : (
                    getCustomerJobs(selectedCustomer.id).map((job) => (
                      <div key={job.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{job.serviceType}</p>
                          <p className="text-sm text-gray-500">
                            {format(new Date(job.scheduledDate), 'MMM d, yyyy')} at {job.scheduledTime}
                          </p>
                        </div>
                        <Badge variant={job.status === 'closed' ? 'success' : 'info'}>
                          {job.status}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'invoices' && (
                <div className="space-y-4">
                  {getCustomerInvoices(selectedCustomer.id).length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No invoices yet</p>
                    </div>
                  ) : (
                    getCustomerInvoices(selectedCustomer.id).map((invoice) => (
                      <div key={invoice.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                          <p className="text-sm text-gray-500">
                            Due: {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(invoice.total)}</p>
                          <Badge
                            variant={
                              invoice.status === 'paid' ? 'success' :
                              invoice.status === 'overdue' ? 'danger' : 'warning'
                            }
                          >
                            {invoice.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={4}
                    placeholder="Add notes about this customer..."
                  />
                  <Button>Save Notes</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
