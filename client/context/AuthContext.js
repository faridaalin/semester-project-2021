import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuth: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export default useAuthContext;
