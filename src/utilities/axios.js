import axios from 'axios';
export const base_api_url = 'https://verdant-store.herokuapp.com';

function getToken() {
  const token = JSON.parse(localStorage.getItem('token'));

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
