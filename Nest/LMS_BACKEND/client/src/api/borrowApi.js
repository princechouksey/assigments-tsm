import axiosClient from './axiosClient';

export const borrowApi = {
  createFromCart: () => 
    axiosClient.post('/borrow-requests/from-cart').then(res => res.data),

  getAll: () => 
    axiosClient.get('/borrow-requests').then(res => res.data),

  getMyRequests: () => 
    axiosClient.get('/borrow-requests/my-requests').then(res => res.data),

  getMyBorrowedBooks: () => 
    axiosClient.get('/borrow-requests/my-borrowed-books').then(res => res.data),

  getMyBorrowHistory: () => 
    axiosClient.get('/borrow-requests/my-borrow-history').then(res => res.data),

  getById: (id) => 
    axiosClient.get(`/borrow-requests/${id}`).then(res => res.data),

  approve: (id) => 
    axiosClient.put(`/borrow-requests/${id}/approve`).then(res => res.data),

  reject: (id, reason) => 
    axiosClient.put(`/borrow-requests/${id}/reject`, { rejectionReason: reason }).then(res => res.data),

  returnBooks: (id) => 
    axiosClient.put(`/borrow-requests/${id}/return`).then(res => res.data),
};