import { CookiesProvider } from 'react-cookie';
import { HotelProvider } from '../context/HotelsContext';
import { SearchProvider } from '../context/searchContext';
import { DashboardContextProvider } from '../context/DashboardContext';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'mapbox-gl/dist/mapbox-gl.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
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
