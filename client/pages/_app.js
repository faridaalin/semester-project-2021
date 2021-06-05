import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { MediaContextProvider } from '../context/Media';
import { HotelProvider } from '../context/HotelsContext';
import { SearchProvider } from '../context/searchContext';
import { DashboardContextProvider } from '../context/DashboardContext';
import { Loader } from 'react-feather';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);
  return (
    <CookiesProvider>
      <MediaContextProvider>
        <DashboardContextProvider>
          <SearchProvider>
            <HotelProvider>
              <Head>
                <title>{Component.title}</title>
                <meta name='description' content={Component.description} />
              </Head>
              {pageLoading ? (
                <div className='globalSpinner'>
                  <Loader size={100} />
                </div>
              ) : (
                <Component {...pageProps} />
              )}
            </HotelProvider>
          </SearchProvider>
        </DashboardContextProvider>
      </MediaContextProvider>
    </CookiesProvider>
  );
}

export default MyApp;
