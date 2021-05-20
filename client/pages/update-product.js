import { useState, useEffect } from 'react';
import { parseCookies } from '../helpers/parseCookies';
import Layout from '../components/layout/Layout';
import PageHeader from '../components/pageHeader/PageHeader';
import HotelForm from '../components/form/hotelForm/HotelForm';
import {
  updateHotelSchema,
  initialProductValues,
} from '../validationSchema/productSchema';
import { ITEM_TO_UPDATE, COOKIE_VALUE } from '../config/contants';

export default function UpdateProduct({ admin, token }) {
  const [itemToUpdate, setItemToUpdate] = useState(null);

  useEffect(() => {
    const hotel = localStorage.getItem(ITEM_TO_UPDATE);
    setItemToUpdate(JSON.parse(hotel));
  }, []);

  const initialProductValues = {
    title: itemToUpdate && itemToUpdate.title,
    subheading: itemToUpdate && itemToUpdate.subheading,
    address: itemToUpdate && itemToUpdate.address,
    description: itemToUpdate && itemToUpdate.description,
    main_image: itemToUpdate && itemToUpdate.main_image,
    images: itemToUpdate && itemToUpdate.images,
    rating: itemToUpdate && itemToUpdate.rating,
    category: itemToUpdate && itemToUpdate.category,
    rooms: itemToUpdate && itemToUpdate.rooms,
  };

  return (
    <Layout>
      <PageHeader title='Update hotel' />
      {itemToUpdate ? (
        <HotelForm
          schema={updateHotelSchema}
          initalValues={initialProductValues}
          endpoint={`/hotels/${itemToUpdate && itemToUpdate._id}/update`}
          token={token}
          rating={itemToUpdate && itemToUpdate.rating ? true : false}
          update
        />
      ) : (
        <>
          <p>
            Ops, something happend. Please try again with a specific product.
          </p>
        </>
      )}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const cookie = parseCookies(context.req);
  const token = cookie.jwt;
  const admin = cookie.isAdmin;

  if (!admin || admin !== COOKIE_VALUE || !token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { admin, token },
  };
}
