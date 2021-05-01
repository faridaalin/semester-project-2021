import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import getWindowWidth from '../components/helpers/getWindowWidth';
import SectionHeading from '../components/sectionHeading/SectionHeading';
import Search from '../components/form/search/Search';
import Card from '../components/card/Card';
import AttractionsCard from '../components/card/AttractionsCard';
import DesktopHero from '../components/desktopHero/DesktopHero';
import styles from './styles/home/home.module.css';

export default function Home(props) {
  const [desktopHero, setDesktopHero] = useState(false);
  const { hotels, attractions } = props;

  const images = [
    {
      imageurl: '/boutiqueHotel.png',
      type: 'Boutique Hotel',
      slug: 'boutique-hotel',
    },
    {
      imageurl: '/BB.png',
      type: 'Bed and Breakfast',
      slug: 'bed-and-breakfast',
    },
    {
      imageurl: '/apartment.png',
      type: 'Apartment Hotel',
      slug: 'apartment-hotel',
    },
  ];

  useEffect(() => {
    const breakpoint = 768;
    const showDesktopHero = () => {
      if (getWindowWidth() >= breakpoint) {
        setDesktopHero(true);
      }
    };
    window.addEventListener('resize', showDesktopHero);
    return () => {
      window.removeEventListener('resize', showDesktopHero);
    };
  }, [open]);

  console.log('Display Desktop Hero:', desktopHero);

  if (!hotels.data || hotels.data.length === 0) {
    return (
      <Layout>
        <div>Sorry, please come back later.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      {desktopHero ? (
        <DesktopHero />
      ) : (
        <div className={styles.heroSection}>
          <div className={styles.background}></div>
          <div className={styles.content}>
            <span className={styles.explore}>Explore</span>
            <h1 className={styles.header}>Bergen</h1>

            <p className={styles.paragraph}>
              Bergen is the Gateway to the Fjords of Norway and a UNESCO World
              Heritage City.
            </p>
            <Search />
          </div>
        </div>
      )}

      <section className={styles.section}>
        <SectionHeading>Customer Favourites</SectionHeading>
        <div className={styles.grid}>
          {hotels.data.map(
            (hotel) =>
              hotel.rating >= 5 && <Card key={hotel._id} hotel={hotel} />
          )}
        </div>
      </section>
      <section className={styles.section}>
        <SectionHeading>Choose your style</SectionHeading>
        <div className={styles.grid}>
          {images.map((style) => (
            <Card key={style.type} hotelStyle={style} />
          ))}
        </div>
      </section>
      <section className={styles.section}>
        <SectionHeading>Attractions in Bergen</SectionHeading>
        <div className={styles.grid}>
          {!attractions.data ||
            (attractions.data.length === 0 ? (
              <div>Sorry, error happend</div>
            ) : (
              attractions.data.map((attraction, i) => (
                <AttractionsCard key={i} attractions={attraction} />
              ))
            ))}
        </div>
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
