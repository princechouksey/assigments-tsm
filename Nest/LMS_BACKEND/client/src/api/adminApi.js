import axiosClient from './axiosClient';

export const adminApi = {
  getDashboardStats: async () => {
    const res = await axiosClient.get('/admin/dashboard');
    return res.data;  // 🔥 FIX HERE
  },

  getAllUsers: async () => {
    const res = await axiosClient.get('/admin/users');
    return res.data;
  },

  getUserDetails: async (id) => {
    const res = await axiosClient.get(`/admin/users/${id}`);
    return res.data;
  },
};
