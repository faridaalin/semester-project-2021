import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import HotelCard from '../../components/card/hotelCard/hotelCard';
import CardContainer from '../../components/cardContainer/CardContainer';
import PageHeader from '../../components/pageHeader/PageHeader';
import { useHotelsContext } from '../../context/HotelsContext';

Category.title = 'Category';
Category.description = 'Holidaze is a hotel booking agency located in Bergen.';
const Category = (props) => {
  const router = useRouter();
  const [hotels, , getHotels] = useHotelsContext();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getHotels();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const getHotelByCategory = () => {
    let filteredHotels = [];

    if (router?.query?.slug === 'bed-and-breakfast') {
      filteredHotels = hotels.filter(
        (hotel) => hotel.category === 'Bed & Breakfast'
      );
    }
    if (router?.query?.slug === 'boutique-hotel') {
      filteredHotels = hotels.filter((hotel) => hotel.category === 'Boutique');
    }
    if (router?.query?.slug === 'apartment-hotel') {
      filteredHotels = hotels.filter(
        (hotel) => hotel.category === 'Apartments'
      );
    }

    return filteredHotels;
  };

  if (!hotels || hotels.lenght === 0 || !router.query.slug) {
    return (
      <Layout>
        <h2> Hotel Category</h2>
        <p>Sorry, please come back later.</p>
      </Layout>
    );
  }
  return (
    <Layout>
      <Head>
        <title>Category</title>
      </Head>
      <section className='section'>
        <PageHeader title='Hotels' />

        <CardContainer>
          {getHotelByCategory().map((hotel, i) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </CardContainer>
      </section>
    </Layout>
  );
};

export default Category;
