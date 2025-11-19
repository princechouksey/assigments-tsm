import axiosClient from './axiosClient';

export const booksApi = {
  getAll: (search = '') => {
    const params = search ? { search } : {};
    return axiosClient.get('/books', { params }).then(res => res.data);
  },
  getById: (id) => axiosClient.get(`/books/${id}`).then(res => res.data),
  create: (bookData) => axiosClient.post('/books/create', bookData).then(res => res.data),
  update: (id, bookData) => axiosClient.put(`/books/${id}`, bookData).then(res => res.data),
  delete: (id) => axiosClient.delete(`/books/${id}`).then(res => res.data),
};
