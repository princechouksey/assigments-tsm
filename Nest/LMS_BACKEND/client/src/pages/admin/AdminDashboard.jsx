import React from 'react';
import { StatsCard } from '../../pages/admin/StatsCard';
import { Loader } from '../../common/Loader';
import { useDashboardStats } from '../../hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useDashboardStats();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg">Failed to load dashboard</div>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Library management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Books" value={stats?.totalBooks || 0} icon="📚" color="blue" />
        <StatsCard title="Available Books" value={stats?.availableBooks || 0} icon="✅" color="green" />
        <StatsCard title="Borrowed Books" value={stats?.borrowedBooks || 0} icon="📖" color="yellow" />
        <StatsCard title="Total Users" value={stats?.totalUsers || 0} icon="👥" color="purple" />
        <StatsCard title="Total Requests" value={stats?.totalBorrowRequests || 0} icon="📋" color="blue" />
        <StatsCard title="Pending Requests" value={stats?.pendingRequests || 0} icon="⏳" color="yellow" />
        <StatsCard title="Total Revenue" value={`$${stats?.totalRevenue || 0}`} icon="💰" color="green" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ✅ Manage Books */}
          <div
            onClick={() => navigate('/admin/books')}
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary-red transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-medium text-gray-900">Manage Books</h3>
            <p className="text-sm text-gray-600 mt-1">Add, edit, or remove books</p>
          </div>

          {/* ✅ Manage Users */}
          <div
            onClick={() => navigate('/admin/users')}
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary-red transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-600 mt-1">View and manage users</p>
          </div>

          {/* ✅ Manage Requests */}
          <div
            onClick={() => navigate('/admin/requests')}
            className="text-center p-4 border border-gray-200 rounded-lg hover:border-primary-red transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-medium text-gray-900">Manage Requests</h3>
            <p className="text-sm text-gray-600 mt-1">Approve or reject requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};
