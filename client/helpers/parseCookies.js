import isBrowser from './isBrowser';
import cookie from 'cookie';
import { USER_TOKEN } from '../contants';

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export const isAdmin = () => {
  let admin;
  if (isBrowser) admin = localStorage.getItem(USER_TOKEN);

  return admin;
};
