import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api/adminApi';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard-stats'],
    queryFn: adminApi.getDashboardStats,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminApi.getAllUsers,
  });
};

export const useUserDetails = (id) => {
  return useQuery({
    queryKey: ['admin', 'users', id],
    queryFn: () => adminApi.getUserDetails(id),
    enabled: !!id,
  });
};