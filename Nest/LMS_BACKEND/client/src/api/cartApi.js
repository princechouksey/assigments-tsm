import axiosClient from './axiosClient';

export const cartApi = {
  getCart: () => axiosClient.get('/cart').then(res => res.data),
  addToCart: (data) => axiosClient.post('/cart/add', data).then(res => res.data),
  updateCartItem: (bookId, data) => axiosClient.put(`/cart/item/${bookId}`, data).then(res => res.data),
  removeFromCart: (bookId) => axiosClient.delete(`/cart/item/${bookId}`).then(res => res.data),
  clearCart: () => axiosClient.delete('/cart/clear').then(res => res.data),
};