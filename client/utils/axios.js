import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API,
  withCredentials: true,
  responseType: 'json',
  withCredentials: true,
  timeout: 10000,
  credentials: 'include',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

export default instance;
