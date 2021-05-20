import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { IS_ADMIN, USER_TOKEN } from '../contants';

const DashboardContext = createContext({
  messages: null,
  enquiries: null,
  logout: () => {},
});

export const DashboardContextProvider = ({ children }) => {
  const [showMessages, setShowMessages] = useState(null);
  const [showEnq, setShowEnq] = useState(null);
  const [cookie, , removeCookie] = useCookies([IS_ADMIN]);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/users/logout');
      removeCookie(IS_ADMIN, cookie, { path: '/', maxAge: 0, sameSite: true });
      typeof window !== 'undefined'
        ? localStorage.removeItem(USER_TOKEN)
        : null;

      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    localStorage.getItem(USER_TOKEN);
  }, []);

  return (
    <DashboardContext.Provider
      value={[showMessages, setShowMessages, showEnq, setShowEnq, logout]}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default useDashboardContext;
