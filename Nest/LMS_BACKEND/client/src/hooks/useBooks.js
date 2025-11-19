import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksApi } from '../api/booksApi';
import toast from 'react-hot-toast';

export const useBooks = (search = '') => {
  return useQuery({
    queryKey: ['books', search],
    queryFn: () => booksApi.getAll(search),
  });
};

export const useBook = (id) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => booksApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create book');
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => booksApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update book');
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      toast.success('Book deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    },
  });
};