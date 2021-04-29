import Layout from '../components/layout/Layout';
import Card from '../components/card/Card';
import Search from '../components/form/search/Search';
import styles from './styles/home/home.module.css';

export default function Home() {
  return (
    <Layout title='Home'>
      {/* <section className={styles.home}>
        <div className={styles.background} />
        <div className={styles.content}>
          <span className={styles.explore}>Explore</span>
          <h1 className={styles.header}>Bergen</h1>

          <p className={styles.paragraph}>
            Bergen is the Gateway to the Fjords of Norway and a UNESCO World
            Heritage City.
          </p>
          <Search />
        </div>
      </section>
      <section>Customer Favs</section>
      <section>Choose your style</section>
      <section>Attractions in Bergen</section> */}
      Home
      <Card />
    </Layout>
  );
}
