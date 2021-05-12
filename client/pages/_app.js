import { CookiesProvider } from 'react-cookie';
import { HotelProvider } from '../context/HotelsContext';
import { DashboardContextProvider } from '../context/DashboardContext';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <DashboardContextProvider>
        <HotelProvider>
          <Component {...pageProps} />
        </HotelProvider>
      </DashboardContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
