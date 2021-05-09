import { CookiesProvider } from 'react-cookie';
import { HotelProvider } from '../context/HotelsContext';
import { AuthContextProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <HotelProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </HotelProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
