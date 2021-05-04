import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { useHotelsContext } from '../../context/HotelsContext';

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

  console.log('newFUnc', getHotelByCategory());
  if (!hotels || hotels.lenght === 0 || !router.query.slug) {
    return (
      <Layout>
        <h2> Hotel Category</h2>
        'Nothing here
      </Layout>
    );
  }
  return (
    <Layout>
      <h2> Hotel Category</h2>
      <h3> show hotels ...</h3>
      <>
        {getHotelByCategory().map((hotel, i) => (
          <p key={i}>{hotel.title}</p>
        ))}
      </>
    </Layout>
  );
};

export default Category;
