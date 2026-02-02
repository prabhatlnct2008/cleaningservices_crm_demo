// User roles
export type UserRole = 'admin' | 'manager' | 'cleaner' | 'accountant';

// Status types
export type LeadStatus = 'new' | 'contacted' | 'walkthrough_scheduled' | 'quote_sent' | 'won' | 'lost';
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
export type JobStatus = 'scheduled' | 'assigned' | 'in_progress' | 'completed' | 'quality_check' | 'closed';
export type InvoiceStatus = 'draft' | 'sent' | 'partially_paid' | 'paid' | 'overdue' | 'void';
export type PaymentMethod = 'cash' | 'card' | 'upi' | 'bank_transfer' | 'cheque';

// Core entities
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  skills?: string[];
  availability?: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  tags: string[];
  lastJobDate?: Date;
  outstandingAmount: number;
  createdAt: Date;
}

export interface Property {
  id: string;
  customerId: string;
  address: string;
  city: string;
  type: 'residential' | 'commercial';
  size?: string;
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  category: 'residential' | 'commercial' | 'both';
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  serviceInterest: string;
  status: LeadStatus;
  nextFollowUp?: Date;
  notes?: string;
  ownerId?: string;
  customerId?: string;
  propertyId?: string;
  createdAt: Date;
}

export interface QuoteLineItem {
  serviceId: string;
  serviceName: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Quote {
  id: string;
  customerId: string;
  customerName: string;
  propertyId?: string;
  leadId?: string;
  items: QuoteLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: QuoteStatus;
  validUntil: Date;
  notes?: string;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  task: string;
  completed: boolean;
}

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  propertyId: string;
  propertyAddress: string;
  quoteId?: string;
  serviceType: string;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in minutes
  status: JobStatus;
  assignedTeam: string[];
  checklist: ChecklistItem[];
  beforePhotos: string[];
  afterPhotos: string[];
  notes?: string;
  completionNotes?: string;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  jobId?: string;
  items: QuoteLineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paidAmount: number;
  dueDate: Date;
  status: InvoiceStatus;
  createdAt: Date;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  date: Date;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  entityType: 'lead' | 'customer' | 'quote' | 'job' | 'invoice' | 'payment';
  entityId: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

// Dashboard types
export interface DashboardStats {
  todaysJobs: number;
  openLeads: number;
  unassignedJobs: number;
  overdueInvoices: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}
