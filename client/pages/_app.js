import { CookiesProvider } from 'react-cookie';
import { HotelProvider } from '../context/HotelsContext';
import { SearchProvider } from '../context/searchContext';
import { DashboardContextProvider } from '../context/DashboardContext';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <DashboardContextProvider>
        <SearchProvider>
          <HotelProvider>
            <Component {...pageProps} />
          </HotelProvider>
        </SearchProvider>
      </DashboardContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
