import axios from 'axios';

const axiosMain = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true,
});

export const axiosPrivate = axiosMain.create({
  baseURL: 'http://localhost:3500',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosMain;
