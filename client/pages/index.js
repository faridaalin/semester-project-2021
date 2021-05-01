import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import axios from '../utils/axios';
import getWindowWidth from '../components/helpers/getWindowWidth';
import SectionHeading from '../components/sectionHeading/SectionHeading';
import Card from '../components/card/Card';
import AttractionsCard from '../components/card/AttractionsCard';
import DesktopHero from '../components/desktopHero/DesktopHero';
import MobileHero from '../components/mobileHero/MobileHero';
import styles from './styles/home/home.module.css';

export default function Home(props) {
  const breakpoint = 768;
  const [desktopHero, setDesktopHero] = useState(
    getWindowWidth() >= breakpoint ? true : false
  );
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
    const showDesktopHero = () => {
      if (getWindowWidth() >= breakpoint) {
        setDesktopHero(true);
      } else {
        setDesktopHero(false);
      }
    };
    window.addEventListener('resize', showDesktopHero);
    return () => {
      window.removeEventListener('resize', showDesktopHero);
    };
  }, []);

  console.log('desktopHero', desktopHero);
  console.log('getWindowWidth>= breakpoint', getWindowWidth() >= breakpoint);

  if (!hotels.data || hotels.data.length === 0) {
    return (
      <Layout>
        <div>Sorry, please come back later.</div>
      </Layout>
    );
  }
  return (
    <Layout>
      {/* {desktopHero === true ? <DesktopHero /> : <MobileHero />} */}
      {desktopHero === true ? <DesktopHero /> : <div>Mobile</div>}

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
