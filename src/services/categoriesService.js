import axiosInstance from '../utilities/axios';

export function getCategoriesService() {
  return axiosInstance.get('/admin/categories');
}

export function deleteCategoryService(id) {
  return axiosInstance.delete(`/admin/category/${id}`);
}
