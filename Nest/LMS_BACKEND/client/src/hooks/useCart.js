import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/cartApi';
import toast from 'react-hot-toast';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Book added to cart');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ bookId, data }) => cartApi.updateCartItem(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Cart updated');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Item removed from cart');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
      toast.success('Cart cleared');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
    },
  });
};