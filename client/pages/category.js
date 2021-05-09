import Layout from '../components/layout/Layout';
import HotelForm from '../components/form/hotelForm/HotelForm';

import Pill from '../components/pill/Pill';

export default function Category() {
  return (
    <Layout>
      <Pill name='Price' select={2} />
      <Pill name='Distance From Centre' select={1} />
      {/* <HotelForm /> */}
    </Layout>
  );
}
