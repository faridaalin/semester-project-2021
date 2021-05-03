import axios from '../utils/axios';
import Layout from '../components/layout/Layout';
import HotelCard from '../components/card/hotelCard/hotelCard';

export default function Hotels(props) {
  const { data } = props.data;
  console.log('data', data);

  return (
    <Layout title='Hotels'>
      {!data && <div>Error happend..</div>}
      {data.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const hotels = await axios.get('/hotels');
    const { data } = hotels;

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { data },
    };
  } catch (err) {
    console.error(err);
  }
}
