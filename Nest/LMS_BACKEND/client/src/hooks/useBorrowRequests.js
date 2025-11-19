import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { borrowApi } from '../api/borrowApi';
import toast from 'react-hot-toast';

export const useBorrowRequests = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: borrowApi.createFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['borrow-requests']);
      queryClient.invalidateQueries(['cart']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create borrow request');
    },
  });
};

export const useMyBorrowRequests = () => {
  return useQuery({
    queryKey: ['borrow-requests', 'my-requests'],
    queryFn: borrowApi.getMyRequests,
  });
};

export const useMyBorrowedBooks = () => {
  return useQuery({
    queryKey: ['borrowed-books'],
    queryFn: borrowApi.getMyBorrowedBooks,
  });
};

export const useMyBorrowHistory = () => {
  return useQuery({
    queryKey: ['borrow-history'],
    queryFn: borrowApi.getMyBorrowHistory,
  });
};

export const useAllBorrowRequests = () => {
  return useQuery({
    queryKey: ['borrow-requests', 'all'],
    queryFn: borrowApi.getAll,
  });
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: borrowApi.approve,
    onSuccess: () => {
      queryClient.invalidateQueries(['borrow-requests']);
      toast.success('Request approved successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to approve request');
    },
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, reason }) => borrowApi.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(['borrow-requests']);
      toast.success('Request rejected successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject request');
    },
  });
};

export const useReturnBooks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: borrowApi.returnBooks,
    onSuccess: () => {
      queryClient.invalidateQueries(['borrow-requests']);
      queryClient.invalidateQueries(['borrowed-books']);
      toast.success('Books returned successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to return books');
    },
  });
};