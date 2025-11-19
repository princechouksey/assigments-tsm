import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAllUsers, useUserDetails } from '../../hooks/useAdmin';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { Loader } from '../../common/Loader';
import toast from 'react-hot-toast';

export const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: users, isLoading, error } = useAllUsers();
  const userDetailsQuery = useUserDetails(selectedUser?._id);

  if (isLoading) return <Loader size="lg" />;

  if (error) return <div className="text-red-600">Failed to load users</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDetailsModal(true);
                    }}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="User Details"
        size="lg"
      >
        {userDetailsQuery.isLoading ? (
          <Loader size="md" />
        ) : userDetailsQuery.error ? (
          <div className="text-red-600">Failed to load user details</div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-sm text-gray-900">{userDetailsQuery.data?.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{userDetailsQuery.data?.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900">{userDetailsQuery.data?.user?.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900">{userDetailsQuery.data?.user?.role}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <p className="text-sm text-gray-900">{userDetailsQuery.data?.user?.address}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Borrowed Books</h3>
              {userDetailsQuery.data?.borrowedBooks?.length > 0 ? (
                <div className="space-y-2">
                  {userDetailsQuery.data.borrowedBooks.map((borrowed) => (
                    <div key={borrowed._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{borrowed.bookId?.title}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(borrowed.dueDate).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        borrowed.status === 'BORROWED' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {borrowed.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No borrowed books</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Borrow History</h3>
              {userDetailsQuery.data?.borrowHistory?.length > 0 ? (
                <div className="space-y-2">
                  {userDetailsQuery.data.borrowHistory.slice(0, 5).map((history) => (
                    <div key={history._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">Request #{history._id.slice(-6)}</p>
                        <p className="text-sm text-gray-600">Status: {history.status}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(history.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No borrow history</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};