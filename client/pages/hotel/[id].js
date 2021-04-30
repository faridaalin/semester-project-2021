import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import axios from '../../utils/axios';

const HotelDetail = (props) => {
  const router = useRouter();
  const hotel = props.data.data;
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title='Hotel Detail'>
      Hotel Detail
      <h2>{hotel.title}</h2>
      <h2>{hotel.subheading}</h2>
    </Layout>
  );
};

export default HotelDetail;

export async function getStaticPaths() {
  let paths = [];
  try {
    const hotels = await axios.get(`/hotels`);
    const { data } = hotels.data;

    paths = data.map((hotel) => ({
      params: { id: hotel._id },
    }));
  } catch (err) {
    console.error(err);
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  try {
    const hotels = await axios.get(`/hotels/${params.id}`);
    const data = hotels.data;

    return { props: { data } };
  } catch (err) {
    console.error(err);
  }
}
