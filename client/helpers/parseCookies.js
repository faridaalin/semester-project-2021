import cookie from 'cookie';
import { useCookies } from 'react-cookie';

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}

export const isAdmin = () => {
  const [cookie] = useCookies(['user']);
  const admin = cookie.user?.user.role && 'admin';
  return admin;
};
