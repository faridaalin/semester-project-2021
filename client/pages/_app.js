import Head from 'next/head';
import { HotelProvider } from '../context/HotelsContext';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HotelProvider>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </HotelProvider>
    </>
  );
}

export default MyApp;
