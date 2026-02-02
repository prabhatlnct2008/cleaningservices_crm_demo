'use client';

import { useState } from 'react';
import {
  Plus,
  Search,
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Camera,
  FileText,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { jobs, users, customers, properties, formatStatus, getStatusColor } from '@/data/mockData';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday, isSameMonth } from 'date-fns';
import { Job } from '@/lib/types';

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'quality_check', label: 'Quality Check' },
    { value: 'closed', label: 'Closed' },
  ];

  const cleaners = users.filter((u) => u.role === 'cleaner');

  // Calendar helpers
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getJobsForDay = (date: Date) =>
    jobs.filter((job) => isSameDay(new Date(job.scheduledDate), date));

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1));
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Jobs"
        subtitle={`${filteredJobs.length} total jobs`}
        action={{
          label: 'Schedule Job',
          onClick: () => setIsCreateModalOpen(true),
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Filters & View Toggle */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <div className="w-48">
                <Select
                  options={statusOptions}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
            </div>
          </div>
        </Card>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <Card>
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="bg-gray-50 p-3 text-center">
                  <span className="text-sm font-medium text-gray-500">{day}</span>
                </div>
              ))}

              {/* Calendar Days */}
              {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                <div key={`empty-${i}`} className="bg-gray-50 min-h-[120px]" />
              ))}

              {daysInMonth.map((day) => {
                const dayJobs = getJobsForDay(day);
                return (
                  <div
                    key={day.toISOString()}
                    className={`bg-white min-h-[120px] p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !isSameMonth(day, currentMonth) ? 'opacity-50' : ''
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium mb-1 ${
                      isToday(day)
                        ? 'w-7 h-7 flex items-center justify-center rounded-full bg-primary-600 text-white'
                        : 'text-gray-900'
                    }`}>
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {dayJobs.slice(0, 3).map((job) => (
                        <div
                          key={job.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJob(job);
                          }}
                          className={`text-xs p-1.5 rounded truncate cursor-pointer hover:opacity-80 ${getStatusColor(job.status)}`}
                        >
                          {job.scheduledTime} - {job.customerName}
                        </div>
                      ))}
                      {dayJobs.length > 3 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{dayJobs.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card
                key={job.id}
                hover
                className="group"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary-100 text-primary-700 flex flex-col items-center justify-center">
                    <span className="text-xs font-medium">
                      {format(new Date(job.scheduledDate), 'MMM')}
                    </span>
                    <span className="text-lg font-bold">
                      {format(new Date(job.scheduledDate), 'd')}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {job.customerName}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {formatStatus(job.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.scheduledTime}
                      </span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-4 h-4" />
                        {job.propertyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="info">{job.serviceType}</Badge>
                    {job.assignedTeam.length > 0 && (
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{job.assignedTeam.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
                <p className="text-gray-500">Schedule a new job to get started</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Schedule Job Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule New Job"
        size="lg"
      >
        <form className="space-y-4">
          <Select
            label="Customer"
            options={[
              { value: '', label: 'Select customer' },
              ...customers.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
          <Select
            label="Property"
            options={[
              { value: '', label: 'Select property' },
              ...properties.map((p) => ({ value: p.id, label: `${p.address}, ${p.city}` })),
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
          </div>
          <Select
            label="Service Type"
            options={[
              { value: '', label: 'Select service' },
              { value: 'Deep Cleaning', label: 'Deep Cleaning' },
              { value: 'Regular Cleaning', label: 'Regular Cleaning' },
              { value: 'Office Cleaning', label: 'Office Cleaning' },
            ]}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Assign Team</label>
            <div className="space-y-2 p-3 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
              {cleaners.map((cleaner) => (
                <label key={cleaner.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600" />
                  <span className="text-sm text-gray-700">{cleaner.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Job</Button>
          </div>
        </form>
      </Modal>

      {/* Job Detail Modal */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title="Job Details"
        size="lg"
      >
        {selectedJob && (
          <div className="space-y-6">
            {/* Job Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedJob.customerName}</h3>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {selectedJob.propertyAddress}
                </p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(selectedJob.status)}`}>
                {formatStatus(selectedJob.status)}
              </span>
            </div>

            {/* Job Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="font-medium">{selectedJob.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="font-medium">
                  {format(new Date(selectedJob.scheduledDate), 'MMM d, yyyy')} at {selectedJob.scheduledTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{selectedJob.duration} minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assigned Team</p>
                <p className="font-medium">
                  {selectedJob.assignedTeam.length > 0
                    ? selectedJob.assignedTeam.map((id) => users.find((u) => u.id === id)?.name).join(', ')
                    : 'Unassigned'}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                Checklist
              </h4>
              <div className="space-y-2">
                {selectedJob.checklist.map((item) => (
                  <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      readOnly
                      className="w-4 h-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className={item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                      {item.task}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Photos Section */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Camera className="w-5 h-5 text-gray-400" />
                Photos
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <p className="text-sm text-gray-500 mb-2">Before Photos</p>
                  <p className="text-xs text-gray-400">
                    {selectedJob.beforePhotos.length} photos
                  </p>
                </div>
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
                  <p className="text-sm text-gray-500 mb-2">After Photos</p>
                  <p className="text-xs text-gray-400">
                    {selectedJob.afterPhotos.length} photos
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              {selectedJob.status === 'scheduled' && (
                <Button className="flex-1">Assign Team</Button>
              )}
              {selectedJob.status === 'assigned' && (
                <Button className="flex-1">Start Job</Button>
              )}
              {selectedJob.status === 'completed' && (
                <>
                  <Button variant="outline" className="flex-1">Quality Check</Button>
                  <Button className="flex-1 gap-2">
                    <FileText className="w-4 h-4" />
                    Generate Invoice
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Day Detail Modal */}
      <Modal
        isOpen={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : ''}
      >
        {selectedDate && (
          <div className="space-y-3">
            {getJobsForDay(selectedDate).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No jobs scheduled for this day</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedDate(null);
                    setIsCreateModalOpen(true);
                  }}
                >
                  Schedule a Job
                </Button>
              </div>
            ) : (
              getJobsForDay(selectedDate).map((job) => (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedJob(job);
                  }}
                  className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{job.scheduledTime}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {formatStatus(job.status)}
                    </span>
                  </div>
                  <p className="text-gray-700">{job.customerName}</p>
                  <p className="text-sm text-gray-500">{job.serviceType}</p>
                </div>
              ))
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
