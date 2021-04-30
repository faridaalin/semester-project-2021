import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import SectionHeading from '../components/sectionHeading/SectionHeading';
import Search from '../components/form/search/Search';
import Card from '../components/card/Card';
import styles from './styles/home/home.module.css';

export default function Home(props) {
  const { data } = props;
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
        <div>
          {data.map((hotel) => (
            <Card key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </section>
      <section>
        <SectionHeading>Choose your style</SectionHeading>
      </section>
      <section>
        <SectionHeading>Attractions in Bergen</SectionHeading>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await axios.get('/hotels');

    const { data } = res.data;

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
