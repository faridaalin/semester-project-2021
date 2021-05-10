import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const DashboardContext = createContext({
  messages: null,
  enquiries: null,
});

export const DashboardContextProvider = ({ children }) => {
  const [showMessages, setShowMessages] = useState(null);
  const [showEnq, setShowEnq] = useState(null);

  return (
    <DashboardContext.Provider
      value={{ showMessages, setShowMessages, showEnq, setShowEnq }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function useDashboardContext() {
  return useContext(DashboardContext);
}

export default useDashboardContext;
