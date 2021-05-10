import isBrowser from './isBrowser';
import cookie from 'cookie';
import { useCookies } from 'react-cookie';

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export const isAdmin = () => {
  let admin;
  if (isBrowser) {
    admin = localStorage.getItem('userToken');
  }
  console.log('Admin', admin);
  return admin;
};
