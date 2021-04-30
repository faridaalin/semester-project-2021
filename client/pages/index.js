import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import SectionHeading from '../components/sectionHeading/SectionHeading';
import Search from '../components/form/search/Search';
import Card from '../components/card/Card';
import AttractionsCard from '../components/card/AttractionsCard';
import styles from './styles/home/home.module.css';

export default function Home(props) {
  const { hotels, attractions } = props;

  const images = [
    { imageurl: '/boutiqueHotel.png', type: 'Boutique Hotel' },
    { imageurl: '/BB.png', type: 'Bed and Breakfast' },
    { imageurl: '/apartment.png', type: 'Apartment Hotel' },
  ];

  if (!hotels.data || hotels.data.length === 0) {
    return (
      <Layout>
        <div>Nothing here</div>
      </Layout>
    );
  }
  return (
    <Layout title='Home'>
      <section className={styles.home}>
        <div className={styles.background} />
        <div className={styles.content}>
          <span className={styles.explore}>Explore</span>
          <h1 className={styles.header}>Bergen</h1>

          <p className={styles.paragraph}>
            Bergen is the Gateway to the Fjords of Norway. As a UNESCO World
            Heritage City and a European City of Culture, the Bergen region has
            the ideal combination of nature, culture and exciting urban life all
            year around.
          </p>
          <Search />
        </div>
      </section>
      <section>
        <SectionHeading>Customer Favourites</SectionHeading>
        <div className={styles.grid}>
          {hotels.data.map(
            (hotel) =>
              hotel.rating >= 5 && <Card key={hotel._id} hotel={hotel} />
          )}
        </div>
      </section>
      <section>
        <SectionHeading>Choose your style</SectionHeading>
        <div className={styles.grid}>
          {images.map((style) => (
            <Card key={style.type} hotelStyle={style} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeading>Attractions in Bergen</SectionHeading>
        {!attractions.data ||
          (attractions.data.length === 0 ? (
            <div>Sorry, error happend</div>
          ) : (
            attractions.data.map((attraction, i) => (
              <AttractionsCard key={i} attractions={attraction} />
            ))
          ))}
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const hotels = axios.get('/hotels');
    const attractions = axios.get('/attractions');
    const [hotelsResult, attractionsResult] = await Promise.all([
      hotels,
      attractions,
    ]);

    if (!hotelsResult.data || !attractionsResult.data) {
      return {
        notFound: true,
      };
    }

    return {
      props: { hotels: hotelsResult.data, attractions: attractionsResult.data },
    };
  } catch (err) {
    console.error(err);
  }
}
