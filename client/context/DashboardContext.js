import { createContext, useContext, useState } from 'react';
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
  const [cookie, setCookie, removeCookie] = useCookies(['isAdmin']);
  const router = useRouter();

  const logout = async () => {
    console.log('User is logged out');
    try {
      await axios.get('/users/logout');
      removeCookie('isAdmin', cookie, { path: '/', maxAge: 0, sameSite: true });
      localStorage.removeItem('userToken');
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardContext.Provider
      value={{ showMessages, setShowMessages, showEnq, setShowEnq, logout }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default useDashboardContext;
