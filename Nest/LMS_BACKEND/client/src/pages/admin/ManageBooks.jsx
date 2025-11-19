import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from '../../hooks/useBooks';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal';
import { BookForm } from '../../components/layout/Books/BookForm';
import { Loader } from '../../common/Loader';
import toast from 'react-hot-toast';

export const ManageBooks = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const queryClient = useQueryClient();
  const { data: books, isLoading, error } = useBooks();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  const handleCreateBook = (bookData) => {
    createBookMutation.mutate(bookData, {
      onSuccess: () => {
        setShowCreateModal(false);
        toast.success('Book created successfully');
        queryClient.invalidateQueries(['books']);
      },
      onError: (error) => {
        toast.error('Failed to create book: ' + error.message);
      },
    });
  };

  const handleUpdateBook = (bookData) => {
    updateBookMutation.mutate({ id: editingBook._id, ...bookData }, {
      onSuccess: () => {
        setShowEditModal(false);
        setEditingBook(null);
        toast.success('Book updated successfully');
        queryClient.invalidateQueries(['books']);
      },
      onError: (error) => {
        toast.error('Failed to update book: ' + error.message);
      },
    });
  };

  const handleDeleteBook = () => {
    deleteBookMutation.mutate(bookToDelete._id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setBookToDelete(null);
        toast.success('Book deleted successfully');
        queryClient.invalidateQueries(['books']);
      },
      onError: (error) => {
        toast.error('Failed to delete book: ' + error.message);
      },
    });
  };

  if (isLoading) return <Loader size="lg" />;

  if (error) return <div className="text-red-600">Failed to load books</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Manage Books</h1>
        <Button onClick={() => setShowCreateModal(true)}>Add New Book</Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ISBN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books?.map((book) => (
              <tr key={book._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {book.availableCount}/{book.totalCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingBook(book);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      setBookToDelete(book);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Book Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Book"
      >
        <BookForm
          onSubmit={handleCreateBook}
          loading={createBookMutation.isLoading}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Book"
      >
        <BookForm
          book={editingBook}
          onSubmit={handleUpdateBook}
          loading={updateBookMutation.isLoading}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Book"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete "{bookToDelete?.title}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteBook}
              loading={deleteBookMutation.isLoading}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};