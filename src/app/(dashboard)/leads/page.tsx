'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Phone, Mail, Calendar, MoreVertical, Eye, FileText, XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { leads, formatStatus, getStatusColor } from '@/data/mockData';
import { format } from 'date-fns';
import { Lead } from '@/lib/types';

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'walkthrough_scheduled', label: 'Walkthrough Scheduled' },
    { value: 'quote_sent', label: 'Quote Sent' },
    { value: 'won', label: 'Won' },
    { value: 'lost', label: 'Lost' },
  ];

  return (
    <div className="min-h-screen">
      <Header
        title="Leads"
        subtitle={`${filteredLeads.length} total leads`}
        action={{
          label: 'New Lead',
          onClick: () => setIsCreateModalOpen(true),
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Filters */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, phone, or email..."
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

        {/* Lead Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLeads.map((lead) => (
            <Card
              key={lead.id}
              hover
              className="group"
              onClick={() => setSelectedLead(lead)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-lg">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {lead.name}
                    </h3>
                    <p className="text-sm text-gray-500">{lead.source}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {formatStatus(lead.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{lead.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{lead.email}</span>
                </div>
                {lead.nextFollowUp && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Follow-up: {format(new Date(lead.nextFollowUp), 'MMM d, yyyy')}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-primary-600">{lead.serviceInterest}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No leads found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Create Lead Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Lead"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" placeholder="Enter full name" />
            <Input label="Phone" placeholder="Enter phone number" type="tel" />
          </div>
          <Input label="Email" placeholder="Enter email address" type="email" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Source"
              options={[
                { value: '', label: 'Select source' },
                { value: 'Google Ads', label: 'Google Ads' },
                { value: 'Facebook', label: 'Facebook' },
                { value: 'Referral', label: 'Referral' },
                { value: 'Website', label: 'Website' },
                { value: 'JustDial', label: 'JustDial' },
              ]}
            />
            <Select
              label="Service Interest"
              options={[
                { value: '', label: 'Select service' },
                { value: 'Deep Cleaning', label: 'Deep Cleaning' },
                { value: 'Regular Cleaning', label: 'Regular Cleaning' },
                { value: 'Office Cleaning', label: 'Office Cleaning' },
                { value: 'Post-Construction Cleaning', label: 'Post-Construction Cleaning' },
              ]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Add any notes..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Lead</Button>
          </div>
        </form>
      </Modal>

      {/* Lead Detail Modal */}
      <Modal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Lead Details"
        size="lg"
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-2xl">
                {selectedLead.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedLead.name}</h3>
                <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                  {formatStatus(selectedLead.status)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{selectedLead.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium text-gray-900">{selectedLead.source}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Interest</p>
                <p className="font-medium text-gray-900">{selectedLead.serviceInterest}</p>
              </div>
              {selectedLead.nextFollowUp && (
                <div>
                  <p className="text-sm text-gray-500">Next Follow-up</p>
                  <p className="font-medium text-gray-900">
                    {format(new Date(selectedLead.nextFollowUp), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-medium text-gray-900">
                  {format(new Date(selectedLead.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="gap-2">
                <Phone className="w-4 h-4" />
                Mark Contacted
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Create Quote
              </Button>
              <Button variant="outline" className="gap-2 text-danger-600 hover:bg-danger-50">
                <XCircle className="w-4 h-4" />
                Mark Lost
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
