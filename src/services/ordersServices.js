import axiosInstance from '../utilities/axios';

export function getOrdersService() {
  return axiosInstance.get('/admin/orders');
}
