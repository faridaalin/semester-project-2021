import axios from '../utils/axios';
import Layout from '../components/layout/Layout';
import HotelCard from '../components/card/hotelCard/hotelCard';
import CardContainer from '../components/cardContainer/CardContainer';
import Search from '../components/form/search/Search';
import PageHeader from '../components/pageHeader/PageHeader';
import styles from './hotels.module.css';

export default function Hotels(props) {
  const { data } = props.data;

  return (
    <Layout>
      <PageHeader title='Hotels' />
      <section className={styles.searchHero}>
        <div className={styles.searchContainer}>
          <Search />
        </div>
      </section>
      <section className={styles.section}>
        <CardContainer>
          {!data && <div>Error happend..</div>}
          {data.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </CardContainer>
      </section>
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
