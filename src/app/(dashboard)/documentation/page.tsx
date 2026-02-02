'use client';

import { useState } from 'react';
import {
  BookOpen,
  PlayCircle,
  Target,
  Users,
  FileText,
  Calendar,
  Receipt,
  CreditCard,
  UserCog,
  BarChart3,
  Settings,
  ChevronRight,
  Search,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

const sections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: PlayCircle,
    description: 'Learn the basics of CleanPro CRM',
  },
  {
    id: 'leads',
    title: 'Managing Leads',
    icon: Target,
    description: 'Track and convert leads effectively',
  },
  {
    id: 'customers',
    title: 'Customer Management',
    icon: Users,
    description: 'Manage customer profiles and properties',
  },
  {
    id: 'quotes',
    title: 'Creating Quotes',
    icon: FileText,
    description: 'Build and send professional quotes',
  },
  {
    id: 'jobs',
    title: 'Job Scheduling',
    icon: Calendar,
    description: 'Schedule and manage cleaning jobs',
  },
  {
    id: 'invoicing',
    title: 'Invoicing & Payments',
    icon: Receipt,
    description: 'Handle billing and payment tracking',
  },
  {
    id: 'team',
    title: 'Team Management',
    icon: UserCog,
    description: 'Manage your cleaning staff',
  },
  {
    id: 'reports',
    title: 'Reports & Analytics',
    icon: BarChart3,
    description: 'Track business performance',
  },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">
      <Header
        title="Documentation"
        subtitle="Learn how to use CleanPro CRM"
      />

      <div className="p-6 animate-fade-in">
        {/* Hero Section */}
        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome to CleanPro CRM Documentation</h1>
              <p className="text-primary-100 max-w-xl">
                Everything you need to know to manage your cleaning business efficiently.
                From lead tracking to invoicing, we have got you covered.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete guide</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step-by-step tutorials</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Best practices</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </Card>

        {/* Search */}
        <div className="max-w-md mb-6">
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="!p-2 sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {section.title}
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1 max-w-4xl">
            {activeSection === 'getting-started' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started with CleanPro CRM</h2>
                  <p className="text-gray-600 mb-6">
                    CleanPro CRM is a comprehensive solution designed specifically for cleaning service businesses.
                    Whether you manage residential cleaning, commercial cleaning, or both, this system helps you
                    streamline operations from lead capture to payment collection.
                  </p>

                  <div className="bg-primary-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-primary-900">Quick Tip</h4>
                        <p className="text-sm text-primary-700">
                          Start by adding your services in Settings, then create your first customer and lead to experience the full workflow.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Lead Management', desc: 'Track leads from initial contact to conversion' },
                      { title: 'Customer Database', desc: 'Store customer info, properties, and history' },
                      { title: 'Quote Builder', desc: 'Create professional quotes with line items' },
                      { title: 'Job Scheduling', desc: 'Calendar-based scheduling with team assignment' },
                      { title: 'Invoice Generation', desc: 'Automatic invoicing from completed jobs' },
                      { title: 'Payment Tracking', desc: 'Record payments and track outstanding balances' },
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-gray-900">{feature.title}</h4>
                          <p className="text-sm text-gray-500">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">The CleanPro Workflow</h3>
                  <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                    {['Lead', 'Quote', 'Job', 'Invoice', 'Payment'].map((step, idx, arr) => (
                      <div key={step} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-sm font-medium text-gray-700 mt-2">{step}</span>
                        </div>
                        {idx < arr.length - 1 && (
                          <ArrowRight className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Follow this flow to manage your cleaning business from start to finish
                  </p>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>
                  <div className="space-y-4">
                    {[
                      { role: 'Admin / Owner', permissions: 'Full access to all features including settings, pricing, team management, and reports', color: 'bg-red-100 text-red-800' },
                      { role: 'Manager / Dispatcher', permissions: 'Lead handling, scheduling, job assignment, and quality checks', color: 'bg-purple-100 text-purple-800' },
                      { role: 'Cleaner / Field Staff', permissions: 'View assigned jobs, update status, complete checklists, upload photos', color: 'bg-blue-100 text-blue-800' },
                      { role: 'Accountant', permissions: 'Invoice management, payment reconciliation, and financial reports', color: 'bg-green-100 text-green-800' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                          {item.role}
                        </span>
                        <p className="text-gray-600">{item.permissions}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'leads' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Leads</h2>
                  <p className="text-gray-600 mb-6">
                    Leads are potential customers who have shown interest in your services. Effective lead management
                    helps you convert inquiries into paying customers.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Lead Status Flow</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['New', 'Contacted', 'Walkthrough Scheduled', 'Quote Sent', 'Won', 'Lost'].map((status, idx, arr) => (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant={status === 'Won' ? 'success' : status === 'Lost' ? 'danger' : 'info'}>
                          {status}
                        </Badge>
                        {idx < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Create a Lead</h3>
                  <ol className="space-y-3 mb-6">
                    {[
                      'Navigate to the Leads section from the sidebar',
                      'Click the "New Lead" button in the top right',
                      'Fill in the lead\'s contact information (name, phone, email)',
                      'Select the lead source (Google Ads, Referral, Website, etc.)',
                      'Choose the service they\'re interested in',
                      'Add any notes from your conversation',
                      'Click "Create Lead" to save',
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-900">Best Practice</h4>
                        <p className="text-sm text-yellow-700">
                          Always set a follow-up date when creating a lead. This ensures no potential customer falls through the cracks.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Converting Leads</h3>
                  <p className="text-gray-600 mb-4">
                    When a lead is ready to proceed, you can convert them to a customer and create a quote:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Click "Create Quote" from the lead detail view</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>A new customer record is automatically created if one doesn't exist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>The lead status changes to "Quote Sent" when you send the quote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Mark as "Won" when the customer accepts the quote</span>
                    </li>
                  </ul>
                </Card>
              </div>
            )}

            {activeSection === 'customers' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Management</h2>
                  <p className="text-gray-600 mb-6">
                    The customer database is the heart of your CRM. Store all customer information,
                    track their properties, and view their complete service history.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Profile Sections</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      { title: 'Overview', desc: 'Contact details, tags, and key stats' },
                      { title: 'Properties', desc: 'Multiple addresses and property types' },
                      { title: 'Jobs', desc: 'Complete history of all cleaning jobs' },
                      { title: 'Quotes', desc: 'All quotes sent to this customer' },
                      { title: 'Invoices', desc: 'Billing history and outstanding amounts' },
                      { title: 'Notes', desc: 'Internal notes about the customer' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Adding Properties</h3>
                  <p className="text-gray-600 mb-4">
                    Customers can have multiple properties (e.g., home and office). Each property can have:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Full address with city</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Property type (Residential / Commercial)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Size (BHK, sq ft, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Special notes (access codes, pet info, etc.)</span>
                    </li>
                  </ul>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Pro Tip</h4>
                        <p className="text-sm text-blue-700">
                          Use tags to segment customers (e.g., "Premium", "Monthly Contract", "Corporate").
                          This helps with filtering and marketing campaigns.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'quotes' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Quotes</h2>
                  <p className="text-gray-600 mb-6">
                    The Quote Builder allows you to create professional, itemized quotes that you can
                    send to customers via email or WhatsApp.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quote Status Flow</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Draft', 'Sent', 'Accepted', 'Rejected', 'Expired'].map((status, idx, arr) => (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant={status === 'Accepted' ? 'success' : status === 'Rejected' ? 'danger' : 'default'}>
                          {status}
                        </Badge>
                        {idx < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Building a Quote</h3>
                  <ol className="space-y-3 mb-6">
                    {[
                      'Select the customer and property',
                      'Add line items from your service catalog',
                      'Adjust quantities (e.g., 3 BHK, 500 sq ft)',
                      'Apply discounts if applicable',
                      'Tax is calculated automatically based on settings',
                      'Add any terms or notes',
                      'Save as draft or send directly',
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Converting to Job</h3>
                  <p className="text-gray-600">
                    When a quote is accepted, click "Convert to Job" to automatically create a job
                    with all the quote details pre-filled. You can then schedule the date/time and assign team members.
                  </p>
                </Card>
              </div>
            )}

            {activeSection === 'jobs' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Scheduling</h2>
                  <p className="text-gray-600 mb-6">
                    The Jobs module provides both calendar and list views for managing your cleaning appointments.
                    Schedule jobs, assign team members, and track completion status.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Status Flow</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Scheduled', 'Assigned', 'In Progress', 'Completed', 'Quality Check', 'Closed'].map((status, idx, arr) => (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant={status === 'Closed' ? 'success' : 'info'}>
                          {status}
                        </Badge>
                        {idx < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Calendar Features</h3>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Month, week, and day views</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Click on any day to see all jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Color-coded status indicators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Quick job creation from calendar</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Field Staff View</h3>
                  <p className="text-gray-600">
                    Field staff (cleaners) see a simplified view with only their assigned jobs. They can:
                  </p>
                  <ul className="space-y-2 text-gray-600 mt-3">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>View job details and customer address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Start/complete jobs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Complete checklists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Upload before/after photos</span>
                    </li>
                  </ul>
                </Card>
              </div>
            )}

            {activeSection === 'invoicing' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoicing & Payments</h2>
                  <p className="text-gray-600 mb-6">
                    Generate professional invoices from completed jobs and track all payments in one place.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Invoice Status Flow</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Draft', 'Sent', 'Partially Paid', 'Paid', 'Overdue', 'Void'].map((status, idx, arr) => (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant={status === 'Paid' ? 'success' : status === 'Overdue' ? 'danger' : 'default'}>
                          {status}
                        </Badge>
                        {idx < arr.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Generating Invoices</h3>
                  <p className="text-gray-600 mb-4">
                    Invoices can be created in two ways:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-900">1. From a completed job:</span>
                      <span>Click "Generate Invoice" in job details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold text-gray-900">2. Manual creation:</span>
                      <span>Create invoice directly from the Invoices section</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recording Payments</h3>
                  <p className="text-gray-600 mb-4">
                    Support for multiple payment methods:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Cash</Badge>
                    <Badge variant="primary">Card</Badge>
                    <Badge variant="primary">UPI</Badge>
                    <Badge variant="primary">Bank Transfer</Badge>
                    <Badge variant="primary">Cheque</Badge>
                  </div>
                </Card>
              </div>
            )}

            {activeSection === 'team' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Management</h2>
                  <p className="text-gray-600 mb-6">
                    Manage your cleaning staff, track their performance, and assign them to jobs.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Adding Team Members</h3>
                  <p className="text-gray-600 mb-4">
                    For each team member, you can record:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Name and contact information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Role (Admin, Manager, Cleaner, Accountant)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Skills (Deep Cleaning, Carpet, Windows, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                      <span>Availability (Full-time, Part-time)</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Tracking</h3>
                  <p className="text-gray-600">
                    For each cleaner, you can view their completed jobs, upcoming assignments, and completion rates
                    to help with scheduling decisions.
                  </p>
                </Card>
              </div>
            )}

            {activeSection === 'reports' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h2>
                  <p className="text-gray-600 mb-6">
                    Get insights into your business performance with comprehensive reports.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Revenue Summary', desc: 'Weekly and monthly revenue tracking' },
                      { title: 'Jobs by Cleaner', desc: 'Performance metrics for each team member' },
                      { title: 'Lead Conversion', desc: 'Track your lead-to-customer conversion rate' },
                      { title: 'Outstanding Payments', desc: 'View all unpaid and overdue invoices' },
                      { title: 'Service Breakdown', desc: 'See which services are most popular' },
                      { title: 'Lead Sources', desc: 'Understand where your leads come from' },
                    ].map((report, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900">{report.title}</h4>
                        <p className="text-sm text-gray-500">{report.desc}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Help Section */}
            <Card className="mt-6 bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
                  <p className="text-gray-600 mb-4">
                    Can&apos;t find what you&apos;re looking for? Our support team is here to help.
                  </p>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
