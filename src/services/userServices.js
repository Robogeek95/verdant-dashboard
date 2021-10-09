import axiosInstance from '../utilities/axios';

export function loginService(payload) {
  return axiosInstance.post('/admin/login', payload);
}

export function forgetPassReqService(payload) {
  return axiosInstance.post('/admin/forgetpassword', payload);
}
