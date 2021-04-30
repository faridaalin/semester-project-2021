import { HotelProvider } from '../context/HotelsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HotelProvider>
      <Component {...pageProps} />
    </HotelProvider>
  );
}

export default MyApp;
