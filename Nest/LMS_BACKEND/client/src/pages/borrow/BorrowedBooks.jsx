import React from 'react';
import { Loader } from '../../common/Loader';
import { useMyBorrowedBooks } from '../../hooks/useBorrowRequests';

export const BorrowedBooks = () => {
  const { data: borrowedBooks, isLoading, error } = useMyBorrowedBooks();

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

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
        <div className="text-red-600 text-lg">Failed to load borrowed books</div>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Borrowed Books</h1>
        <p className="text-gray-600 mt-1">Books currently in your possession</p>
      </div>

      {borrowedBooks?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No borrowed books</div>
          <p className="text-gray-400 mt-2">Your approved borrow requests will appear here</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-4"
        >
          {borrowedBooks?.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {book.bookId?.title}
                  </h3>
                  <p className="text-gray-600 mb-1">By {book.bookId?.author}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Borrowed on: {new Date(book.borrowDate).toLocaleDateString()}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Due Date:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(book.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Days Remaining:</span>
                      <span className={`ml-2 font-semibold ${
                        getDaysRemaining(book.dueDate) <= 3 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {getDaysRemaining(book.dueDate)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        book.status === 'overdue' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {book.fineAmount > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-red-600 font-semibold">
                      Fine: ${book.fineAmount}
                    </p>
                    <p className={`text-xs ${book.finePaid ? 'text-green-600' : 'text-red-600'}`}>
                      {book.finePaid ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};