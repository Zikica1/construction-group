import axios from 'axios';

const axiosMain = axios.create({
  baseURL: 'https://construction-group-api.onrender.com',
  withCredentials: true,
});

export const axiosPrivate = axiosMain.create({
  baseURL: 'https://construction-group-api.onrender.com',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosMain;
