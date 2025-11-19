import React, { useState } from 'react';
import { BorrowRequestCard } from '../../pages/borrow/BorrowRequestCard';
import { Modal } from '../../common/Modal';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Loader } from '../../common/Loader';
import { 
  useAllBorrowRequests, 
  useApproveRequest, 
  useRejectRequest, 
  useReturnBooks 
} from '../../hooks/useBorrowRequests';

export const ManageRequests = () => {
  const [rejectModal, setRejectModal] = useState({ isOpen: false, requestId: null, reason: '' });
  const { data: requests, isLoading, error } = useAllBorrowRequests();
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();
  const returnMutation = useReturnBooks();

  const handleApprove = (requestId) => {
    approveMutation.mutate(requestId);
  };

  const handleReject = (requestId) => {
    setRejectModal({ isOpen: true, requestId, reason: '' });
  };

  const confirmReject = () => {
    if (rejectModal.requestId && rejectModal.reason.trim()) {
      rejectMutation.mutate({
        id: rejectModal.requestId,
        reason: rejectModal.reason
      });
      setRejectModal({ isOpen: false, requestId: null, reason: '' });
    }
  };

  const handleReturn = (requestId) => {
    returnMutation.mutate(requestId);
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
        <div className="text-red-600 text-lg">Failed to load requests</div>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manage Borrow Requests</h1>
        <p className="text-gray-600 mt-1">Approve, reject, and manage book requests</p>
      </div>

      {!Array.isArray(requests) || requests?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No borrow requests</div>
          <p className="text-gray-400 mt-2">All requests have been processed</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 gap-6"
        >
          {requests?.map((request) => (
            <div
              key={request._id}
            >
              <BorrowRequestCard
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
                onReturn={handleReturn}
                isAdmin={true}
              />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={rejectModal.isOpen}
        onClose={() => setRejectModal({ isOpen: false, requestId: null, reason: '' })}
        title="Reject Borrow Request"
      >
        <div className="space-y-4">
          <Input
            label="Reason for rejection"
            value={rejectModal.reason}
            onChange={(e) => setRejectModal(prev => ({ ...prev, reason: e.target.value }))}
            placeholder="Please provide a reason for rejection..."
          />
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setRejectModal({ isOpen: false, requestId: null, reason: '' })}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmReject}
              loading={rejectMutation.isLoading}
              disabled={!rejectModal.reason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};