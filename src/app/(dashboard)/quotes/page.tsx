'use client';

import { useState } from 'react';
import { Plus, Search, FileText, Send, Check, X, Clock, Trash2, Calculator } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { quotes, services, customers, formatCurrency, formatStatus, getStatusColor } from '@/data/mockData';
import { format } from 'date-fns';
import { Quote, QuoteLineItem } from '@/lib/types';

export default function QuotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Quote builder state
  const [quoteItems, setQuoteItems] = useState<QuoteLineItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const taxRate = 0.18;

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch = quote.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'expired', label: 'Expired' },
  ];

  const addLineItem = () => {
    setQuoteItems([
      ...quoteItems,
      { serviceId: '', serviceName: '', quantity: 1, rate: 0, total: 0 },
    ]);
  };

  const updateLineItem = (index: number, field: string, value: string | number) => {
    const updated = [...quoteItems];
    if (field === 'serviceId') {
      const service = services.find((s) => s.id === value);
      if (service) {
        updated[index] = {
          ...updated[index],
          serviceId: service.id,
          serviceName: service.name,
          rate: service.basePrice,
          total: service.basePrice * updated[index].quantity,
        };
      }
    } else if (field === 'quantity') {
      updated[index] = {
        ...updated[index],
        quantity: Number(value),
        total: updated[index].rate * Number(value),
      };
    }
    setQuoteItems(updated);
  };

  const removeLineItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const subtotal = quoteItems.reduce((sum, item) => sum + item.total, 0);
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen">
      <Header
        title="Quotes"
        subtitle={`${filteredQuotes.length} total quotes`}
        action={{
          label: 'New Quote',
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
                placeholder="Search quotes..."
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

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuotes.map((quote) => (
            <Card
              key={quote.id}
              hover
              className="group"
              onClick={() => setSelectedQuote(quote)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-mono">{quote.id.toUpperCase()}</p>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-primary-600 transition-colors">
                    {quote.customerName}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {formatStatus(quote.status)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {quote.items.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.serviceName}</span>
                    <span className="text-gray-900">{formatCurrency(item.total)}</span>
                  </div>
                ))}
                {quote.items.length > 2 && (
                  <p className="text-sm text-gray-400">+{quote.items.length - 2} more items</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(quote.total)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Valid until</p>
                  <p className="text-sm font-medium text-gray-700">
                    {format(new Date(quote.validUntil), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No quotes found</h3>
            <p className="text-gray-500">Create a new quote to get started</p>
          </div>
        )}
      </div>

      {/* Create Quote Modal (Quote Builder) */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setQuoteItems([]);
          setDiscount(0);
        }}
        title="Create New Quote"
        size="xl"
      >
        <div className="space-y-6">
          {/* Customer Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Customer"
              options={[
                { value: '', label: 'Select customer' },
                ...customers.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
            <Input label="Valid Until" type="date" />
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Line Items</h3>
              <Button variant="outline" size="sm" onClick={addLineItem} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {quoteItems.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  <Calculator className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">No items added yet</p>
                  <Button variant="ghost" size="sm" onClick={addLineItem} className="mt-2">
                    Add your first item
                  </Button>
                </div>
              ) : (
                quoteItems.map((item, index) => (
                  <div key={index} className="flex gap-3 items-end p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <Select
                        label="Service"
                        options={[
                          { value: '', label: 'Select service' },
                          ...services.map((s) => ({
                            value: s.id,
                            label: `${s.name} (${formatCurrency(s.basePrice)} ${s.unit})`,
                          })),
                        ]}
                        value={item.serviceId}
                        onChange={(e) => updateLineItem(index, 'serviceId', e.target.value)}
                      />
                    </div>
                    <div className="w-24">
                      <Input
                        label="Qty"
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', e.target.value)}
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        label="Rate"
                        value={formatCurrency(item.rate)}
                        disabled
                      />
                    </div>
                    <div className="w-32">
                      <Input
                        label="Total"
                        value={formatCurrency(item.total)}
                        disabled
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!p-2 text-gray-400 hover:text-danger-500 mb-0.5"
                      onClick={() => removeLineItem(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Totals */}
          {quoteItems.length > 0 && (
            <div className="border-t pt-4">
              <div className="max-w-xs ml-auto space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Discount</span>
                  <Input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-24 !py-1 text-right"
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (18%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
            <textarea
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
              placeholder="Add any notes or terms..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary">Save Draft</Button>
            <Button className="gap-2">
              <Send className="w-4 h-4" />
              Send Quote
            </Button>
          </div>
        </div>
      </Modal>

      {/* Quote Detail Modal */}
      <Modal
        isOpen={!!selectedQuote}
        onClose={() => setSelectedQuote(null)}
        title="Quote Details"
        size="lg"
      >
        {selectedQuote && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="text-sm text-gray-500 font-mono">{selectedQuote.id.toUpperCase()}</p>
                <h3 className="text-xl font-semibold text-gray-900">{selectedQuote.customerName}</h3>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedQuote.status)}`}>
                {formatStatus(selectedQuote.status)}
              </span>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Services</h4>
              {selectedQuote.items.map((item, idx) => (
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

            {/* Totals */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>{formatCurrency(selectedQuote.subtotal)}</span>
              </div>
              {selectedQuote.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(selectedQuote.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax</span>
                <span>{formatCurrency(selectedQuote.tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(selectedQuote.total)}</span>
              </div>
            </div>

            {/* Validity */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              Valid until {format(new Date(selectedQuote.validUntil), 'MMMM d, yyyy')}
            </div>

            {/* Actions */}
            {selectedQuote.status === 'draft' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button className="gap-2 flex-1">
                  <Send className="w-4 h-4" />
                  Send Quote
                </Button>
              </div>
            )}
            {selectedQuote.status === 'sent' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="gap-2 flex-1">
                  <X className="w-4 h-4" />
                  Mark Rejected
                </Button>
                <Button className="gap-2 flex-1">
                  <Check className="w-4 h-4" />
                  Mark Accepted
                </Button>
              </div>
            )}
            {selectedQuote.status === 'accepted' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button className="gap-2 flex-1">
                  Convert to Job
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
