import axiosInstance from '../utilities/axios';

export function updateUserDetailsService(payload) {
  return axiosInstance.post('/admin/updateme', payload);
}
