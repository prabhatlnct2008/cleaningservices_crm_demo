'use client';

import { useState } from 'react';
import {
  Building,
  Package,
  ClipboardList,
  Receipt,
  MessageSquare,
  Shield,
  Bell,
  Palette,
  Save,
  Plus,
  Trash2,
  Edit,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { services, formatCurrency } from '@/data/mockData';

const settingsTabs = [
  { id: 'company', label: 'Company', icon: Building },
  { id: 'services', label: 'Service Catalog', icon: Package },
  { id: 'checklists', label: 'Checklists', icon: ClipboardList },
  { id: 'invoicing', label: 'Tax & Invoicing', icon: Receipt },
  { id: 'messages', label: 'Message Templates', icon: MessageSquare },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('company');
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        subtitle="Configure your CRM"
      />

      <div className="p-6 animate-fade-in">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="!p-2">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'company' && (
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Company Name" defaultValue="CleanPro Services" />
                    <Input label="Business Registration" placeholder="GST Number" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Email" type="email" defaultValue="info@cleanpro.com" />
                    <Input label="Phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={3}
                      defaultValue="123 Business Park, Sector 50, Gurugram, Haryana 122018"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Website" placeholder="https://www.cleanpro.com" />
                    <Select
                      label="Currency"
                      options={[
                        { value: 'INR', label: 'Indian Rupee (INR)' },
                        { value: 'USD', label: 'US Dollar (USD)' },
                      ]}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {activeTab === 'services' && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Service Catalog</h2>
                  <Button onClick={() => setIsServiceModalOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Service
                  </Button>
                </div>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={service.category === 'residential' ? 'info' : service.category === 'commercial' ? 'warning' : 'primary'}>
                            {service.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(service.basePrice)}</p>
                          <p className="text-sm text-gray-500">{service.unit}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="!p-2">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="!p-2 text-danger-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'checklists' && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Checklist Templates</h2>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Template
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Deep Cleaning Checklist', items: 12, services: ['Deep Cleaning'] },
                    { name: 'Regular Cleaning Checklist', items: 8, services: ['Regular Cleaning'] },
                    { name: 'Office Cleaning Checklist', items: 10, services: ['Office Cleaning'] },
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.items} items</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {template.services.map((service) => (
                            <Badge key={service} variant="primary" size="sm">{service}</Badge>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="!p-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'invoicing' && (
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Tax & Invoice Settings</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Invoice Prefix" defaultValue="INV" />
                    <Input label="Starting Number" type="number" defaultValue="2026" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="GST Number" placeholder="22XXXXX1234X1Z5" />
                    <Input label="Tax Rate (%)" type="number" defaultValue="18" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Payment Terms"
                      options={[
                        { value: 'due_on_receipt', label: 'Due on Receipt' },
                        { value: 'net_7', label: 'Net 7 Days' },
                        { value: 'net_15', label: 'Net 15 Days' },
                        { value: 'net_30', label: 'Net 30 Days' },
                      ]}
                    />
                    <Input label="Late Fee (%)" type="number" placeholder="2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Invoice Footer Notes</label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={3}
                      placeholder="Thank you for your business!"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {activeTab === 'messages' && (
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Template
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Quote Follow-up', type: 'WhatsApp', active: true },
                    { name: 'Job Reminder', type: 'SMS', active: true },
                    { name: 'Invoice Sent', type: 'Email', active: true },
                    { name: 'Payment Received', type: 'WhatsApp', active: false },
                  ].map((template, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{template.name}</h3>
                          <Badge variant="info" size="sm">{template.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={template.active} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                        <Button variant="ghost" size="sm" className="!p-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'roles' && (
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Roles & Permissions</h2>
                <div className="space-y-4">
                  {[
                    { role: 'Admin', description: 'Full access to all features', users: 1 },
                    { role: 'Manager', description: 'Lead handling, scheduling, quality check', users: 1 },
                    { role: 'Field Staff', description: 'View jobs, update status, upload photos', users: 3 },
                    { role: 'Accountant', description: 'Invoice management, payment reconciliation', users: 1 },
                  ].map((role, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-medium text-gray-900">{role.role}</h3>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="default">{role.users} users</Badge>
                        <Button variant="ghost" size="sm" className="!p-2">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
                <div className="space-y-6">
                  {[
                    { label: 'New Lead Received', description: 'Get notified when a new lead is created' },
                    { label: 'Job Completed', description: 'Get notified when a job is marked complete' },
                    { label: 'Payment Received', description: 'Get notified when a payment is recorded' },
                    { label: 'Invoice Overdue', description: 'Get notified when an invoice becomes overdue' },
                    { label: 'Daily Summary', description: 'Receive a daily summary of activities' },
                  ].map((notification, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{notification.label}</p>
                        <p className="text-sm text-gray-500">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title="Add New Service"
      >
        <form className="space-y-4">
          <Input label="Service Name" placeholder="e.g., Carpet Cleaning" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={2}
              placeholder="Brief description of the service"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Base Price" type="number" placeholder="0" />
            <Input label="Unit" placeholder="e.g., per sq ft, per room" />
          </div>
          <Select
            label="Category"
            options={[
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' },
              { value: 'both', label: 'Both' },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsServiceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Service</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
