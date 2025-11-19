import React from 'react';
import { Button } from '../../common/Button';

export const BorrowRequestCard = ({ request, onApprove, onReject, onReturn, isAdmin = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'returned': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-orange-100 text-orange-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Request #{request._id.slice(-6)}
          </h3>
          {isAdmin && request.userId && (
            <p className="text-sm text-gray-600">
              User: {request.userId.name} ({request.userId.email})
            </p>
          )}
          <p className="text-sm text-gray-500">
            Requested on: {formatDate(request.requestDate)}
          </p>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {request.books.map((bookItem, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                {bookItem.bookId?.title || 'Book details not available'}
              </p>
              <p className="text-sm text-gray-600">
                {bookItem.quantity} book(s) × {bookItem.duration} days
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ${(bookItem.perDayCharge * bookItem.duration * bookItem.quantity).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">${bookItem.perDayCharge}/day</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Total Amount: <span className="font-semibold text-primary-red">${request.totalAmount}</span>
        </div>
        
        {isAdmin && request.status === 'pending' && (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => onApprove(request._id)}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(request._id)}
            >
              Reject
            </Button>
          </div>
        )}

        {isAdmin && request.status === 'approved' && (
          <Button
            size="sm"
            onClick={() => onReturn(request._id)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Mark Returned
          </Button>
        )}

        {!isAdmin && request.status === 'approved' && request.dueDate && (
          <div className="text-sm">
            <p className="text-gray-600">Due: {formatDate(request.dueDate)}</p>
          </div>
        )}

        {request.rejectionReason && (
          <div className="text-sm text-red-600">
            Reason: {request.rejectionReason}
          </div>
        )}
      </div>
    </div>
  );
};