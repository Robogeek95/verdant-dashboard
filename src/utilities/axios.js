import axios from 'axios';
export const base_api_url = 'https://verdant-store.herokuapp.com';

function getToken() {
  let token = '';
  let userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo) {
    token = userInfo?.token;
  }

  return token;
}

const axiosInstance = axios.create({
  baseURL: base_api_url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  },
});

export default axiosInstance;
