import React from "react";
import { motion } from "framer-motion";
import { BorrowRequestCard } from "../pages/borrow/BorrowRequestCard"; // ✅ Correct component path
import { Loader } from "../common/Loader";
import { useMyBorrowRequests } from "../hooks/useBorrowRequests";

export const MyRequests = () => {
  const { data, isLoading, error } = useMyBorrowRequests();

  // ✅ Normalize data (safe array)
  const requests = Array.isArray(data)
    ? data
    : data?.data || data?.requests || [];

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
        <h1 className="text-3xl font-bold text-gray-900">My Borrow Requests</h1>
        <p className="text-gray-600 mt-1">Track your book borrowing requests</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No borrow requests yet</div>
          <p className="text-gray-400 mt-2">
            Add books to your cart and submit a request
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {requests.map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BorrowRequestCard request={request} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};
