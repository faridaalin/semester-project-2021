import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API,
  withCredentials: true,
  credentials: 'include',
});

export default instance;
