'use client';

import { useState } from 'react';
import { Plus, Search, Mail, Phone, Calendar, Star, Edit, UserX, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { users, jobs } from '@/data/mockData';
import { format } from 'date-fns';
import { User, UserRole } from '@/lib/types';

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin',
  manager: 'Manager',
  cleaner: 'Field Staff',
  accountant: 'Accountant',
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  manager: 'bg-purple-100 text-purple-800',
  cleaner: 'bg-blue-100 text-blue-800',
  accountant: 'bg-green-100 text-green-800',
};

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'cleaner', label: 'Field Staff' },
    { value: 'accountant', label: 'Accountant' },
  ];

  const getCompletedJobsCount = (userId: string) =>
    jobs.filter((j) => j.assignedTeam.includes(userId) && j.status === 'closed').length;

  const getUpcomingJobsCount = (userId: string) =>
    jobs.filter((j) => j.assignedTeam.includes(userId) && j.status !== 'closed').length;

  return (
    <div className="min-h-screen">
      <Header
        title="Team"
        subtitle={`${filteredUsers.length} team members`}
        action={{
          label: 'Add Member',
          onClick: () => setIsCreateModalOpen(true),
          icon: <Plus className="w-4 h-4" />,
        }}
      />

      <div className="p-6 space-y-6 animate-fade-in">
        {/* Role Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['admin', 'manager', 'cleaner', 'accountant'] as UserRole[]).map((role) => {
            const count = users.filter((u) => u.role === role).length;
            return (
              <Card key={role}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{roleLabels[role]}s</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${roleColors[role]}`}>
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card className="!p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={roleOptions}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              hover
              className="group"
              onClick={() => setSelectedMember(user)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-xl flex-shrink-0">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                      {user.name}
                    </h3>
                  </div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
              </div>

              {user.role === 'cleaner' && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completed Jobs</span>
                    <span className="font-semibold text-green-600">{getCompletedJobsCount(user.id)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">Upcoming</span>
                    <span className="font-semibold text-blue-600">{getUpcomingJobsCount(user.id)}</span>
                  </div>
                  {user.skills && user.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {user.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="default" size="sm">{skill}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No team members found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Team Member Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add Team Member"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter full name" />
            <Input label="Phone" placeholder="Enter phone number" type="tel" />
          </div>
          <Input label="Email" placeholder="Enter email address" type="email" />
          <Select
            label="Role"
            options={[
              { value: '', label: 'Select role' },
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'cleaner', label: 'Field Staff' },
              { value: 'accountant', label: 'Accountant' },
            ]}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills (for Field Staff)</label>
            <Input placeholder="Enter skills separated by comma" />
          </div>
          <Select
            label="Availability"
            options={[
              { value: '', label: 'Select availability' },
              { value: 'Full-time', label: 'Full-time' },
              { value: 'Part-time', label: 'Part-time' },
              { value: 'Contract', label: 'Contract' },
            ]}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </Modal>

      {/* Member Detail Modal */}
      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title="Team Member Details"
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center font-semibold text-2xl">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${roleColors[selectedMember.role]}`}>
                  {roleLabels[selectedMember.role]}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedMember.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedMember.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{format(new Date(selectedMember.createdAt), 'MMMM yyyy')}</p>
                </div>
              </div>
              {selectedMember.availability && (
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    <p className="font-medium">{selectedMember.availability}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            {selectedMember.skills && selectedMember.skills.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill) => (
                    <Badge key={skill} variant="primary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stats for cleaners */}
            {selectedMember.role === 'cleaner' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-green-600">{getCompletedJobsCount(selectedMember.id)}</p>
                  <p className="text-sm text-green-700">Completed Jobs</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-blue-600">{getUpcomingJobsCount(selectedMember.id)}</p>
                  <p className="text-sm text-blue-700">Upcoming Jobs</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Details
              </Button>
              <Button variant="outline" className="gap-2 text-danger-600 hover:bg-danger-50">
                <UserX className="w-4 h-4" />
                Deactivate
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
