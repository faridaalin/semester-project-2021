import { createContext, useContext, useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const DashboardContext = createContext({
  messages: null,
  enquiries: null,
  logout: () => {},
});

export const DashboardContextProvider = ({ children }) => {
  const [showMessages, setShowMessages] = useState(null);
  const [showEnq, setShowEnq] = useState(null);
  const [content, setContent] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/users/logout');
      removeCookie('isAdmin', cookie, { path: '/', maxAge: 0, sameSite: true });
      localStorage.removeItem('userToken');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const getDashboardData = async () => {
    const messages = axios.get('/messages', options);
    const enquiries = axios.get('/enquiries', options);

    const [messagesRes, enquiriesRes] = await Promise.all([
      messages,
      enquiries,
    ]);

    if (!messagesRes.data || !enquiriesRes.data) {
      return {
        notFound: true,
      };
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        content,
        setContent,
        showMessages,
        setShowMessages,
        showEnq,
        setShowEnq,
        logout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default useDashboardContext;
